import React, { Component } from 'react';
import Auth from './Auth'
import UserData from './UserData';

class App extends Component {
  render() {
    return (
      <Auth>
        <div>
          <UserData/>
        </div>
      </Auth>
    );
  }
}

export default App;
