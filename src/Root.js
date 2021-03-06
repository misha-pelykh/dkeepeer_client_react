import React                 from 'react';
import { Router }            from 'react-router';
import { Provider }          from 'react-redux';
import routes                from './routes';
import { createRedux }       from './utils/redux';

const store = createRedux();

export default class Root extends React.Component {
  static propTypes = {
    history: React.PropTypes.object.isRequired
  }

  render() {
    return (
      <Provider store={store}>
        <Router
          history={this.props.history}
          routes={routes(store, true)}
        />
      </Provider>
    );
  }
}
