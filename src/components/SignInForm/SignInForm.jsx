import { Component } from "react";
import sendRequest from '../../utilities/send-request';
import { BASE_URL } from '../../utilities/users-api';

export async function login(credentials) {
  try {
    const response = await sendRequest(`${BASE_URL}/login`, `POST`, credentials);
    // Handle the response and return any necessary data
    return response;
  } catch (error) {
    // Handle errors, such as network errors or authentication failures
    throw new Error('Login failed: ' + error.message);
  }
}

export default class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      loginData: {
        email: "",
        password: "",
      },
      loginError: null,
    };
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { loginData } = this.state;

    try {
      // Call the login function defined at the module level
      const result = await login(loginData);

      // Handle the result, e.g., update UI or redirect on successful login
    } catch (error) {
      this.setState({ loginError: error.message });
    }
  };

  render() {
    const { loginData } = this.state;

    return (
      <form onSubmit={this.handleLoginSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={loginData.email}
          onChange={(e) =>
            this.setState({
              loginData: { ...loginData, email: e.target.value },
            })
          }
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={loginData.password}
          onChange={(e) =>
            this.setState({
              loginData: { ...loginData, password: e.target.value },
            })
          }
        />

        <button type="submit">Login</button>
      </form>
    );
  }
}