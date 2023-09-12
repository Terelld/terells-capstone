import { Component } from "react";
import { login } from '../../utilities/users-service';
// import { useNavigate } from "react-router-dom";




export default class SignInForm extends Component {
  constructor() {
    super();
    this.state = {
      credentials: {
        email: "",
        password: "",
      },
      loginError: null,
    };
  }

  handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { credentials } = this.state;
    console.log("Credentials: ", credentials);
    // const Navigate = useNavigate();
    try {
      const user = await login(credentials);
      console.log(user);
      this.props.setUser(user);
      
    // Navigate('/bandmate/user-profile');
      
    } catch (error) {
      this.setState({ loginError: error.message });
    }
  };

  render() {
    const { credentials } = this.state;

    return (
      <form className="form"  onSubmit={this.handleLoginSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          value={credentials.email}
          onChange={(e) =>
            this.setState({
              credentials: { ...credentials, email: e.target.value },
            })
          }
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={credentials.password}
          onChange={(e) =>
            this.setState({
              credentials: { ...credentials, password: e.target.value },
            })
          }
        />

        <button className="button" type="submit">Login</button>
      </form>
    );
  }
}