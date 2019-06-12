import { normalize, schema } from 'normalizr';
import { camelizeKeys } from 'humps';
import { sessionService } from 'redux-react-session';

const API_ROOT =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080/api'
    : 'http://prod:8080/api';

const storeSessionPlayer = session => {
  sessionService.deleteSession();
  sessionService
    .saveSession({ session })
    .then(() => {
      sessionService
        .saveUser({
          session: session
        })
        .then(() => {
          // return data.history.push('/app');
        });
    })
    .catch(err => console.error(err));
};

const callApi = (endpoint, schema, data) => {
  const fullUrl =
    endpoint.indexOf(API_ROOT) === -1 ? API_ROOT + endpoint : endpoint;

  if (schema._key === 'trigger') {
    return fetch(fullUrl, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).then(response =>
      response.json().then(json => {
        const data = camelizeKeys(json);

        return Object.assign({}, normalize(data, schema));
      })
    );
  } else {
    const email = data.username;
    return fetch(`${fullUrl}/${email}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response =>
        response.json().then(json => {
          const data = camelizeKeys(json);
          storeSessionPlayer(data, false);
          return Object.assign({}, normalize(data, schema));
        })
      )
      .catch(error => console.error(error));
  }
};

const userSchema = new schema.Entity(
  'user',
  {},
  {
    idAttribute: user => user.id
  }
);

const triggerPusher = new schema.Entity(
  'trigger',
  {},
  {
    idAttribute: trigger => trigger.code
  }
);

export const Schemas = {
  USER: userSchema,
  USER_ARRAY: [userSchema],
  TRIGGER: triggerPusher
};

export const CALL_API = 'Call API';

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }
  let { endpoint, data } = callAPI;
  const { schema, types } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Specify one of the exported Schemas.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return callApi(endpoint, schema, data).then(
    response =>
      next(
        actionWith({
          response,
          type: successType
        })
      ),
    error =>
      next(
        actionWith({
          type: failureType,
          error: error.message || 'Something bad happened'
        })
      )
  );
};
