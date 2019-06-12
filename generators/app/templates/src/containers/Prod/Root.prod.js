import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import App from './../../components/App';
import Page404 from './../../components/Page404';

const Root = ({ store }) =>
  <Provider store={store}>
    <div>
      <Switch>
        <Route exact path='/' component={App} />
        <Route component={Page404} />
      </Switch>
    </div>
  </Provider>;

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
