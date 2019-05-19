import React from 'react';
import axios from 'axios';
import {API_URL, username, password} from '../config';

export default class Login extends React.Component {
  login() {
    return (
      axios.post(`${API_URL}/login`, {
        "username": username,
        "password": password
      })
      .then(res => {
        if (res.status === 200) {
          localStorage.setItem('token', res.headers.authorization);
          this.props.history.push('/notes');
        }
      })
      .catch(err => console.log(err))
      );
  }

  render() {  
    return (
      <div>
        <h3>Login Page</h3>
        <button onClick={() => this.login()}>Login</button>
      </div>
    );
  }
}

