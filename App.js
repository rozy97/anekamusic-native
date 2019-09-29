import React from 'react';
import AppNavigator from './src/navigation/app-navigator';
import {Provider} from 'react-redux';
import store from './src/public/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
