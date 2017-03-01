import React, { PropTypes } from 'react';
import { connect }          from 'react-redux';
import { signup }           from '../../actions/auth';

@connect(state => ({
  auth: state.auth
}), {
  signup
})

export default class Signup extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    signup: PropTypes.func.isRequired
  }

  static contextTypes = {
    router: React.PropTypes.object
  }

  state = {
    user: {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordConfirmation: ''
    }
  };

  handleChange = field => e => {
    e.preventDefault();
    this.setState({ ['user']: {
      ...this.state.user,
      [field]: e.target.value
    } });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const router = this.context.router;
    const { user } = this.state;
    this.props.signup(user, router);
  }

  render() {
    const { auth: { error } } = this.props;
    const { user } = this.state;
    const { 
      email, 
      firstName, 
      lastName, 
      password, 
      passwordConfirmation 
    } = user;

    return(
      <div>
        <h2>Sign up</h2>

        {error
          ? <div>{error.message}</div>
          : null}

        <form onSubmit={this.handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={this.handleChange('email')}
            id="email"
            type="email"
            placeholder="Email"
            required
          />

          <label htmlFor="firstName">First name</label>
          <input
            value={firstName}
            onChange={this.handleChange('firstName')}
            id="firstName"
            type="text"
            placeholder="First name"
            required
          />

          <label htmlFor="lastName">Last name</label>
          <input
            value={lastName}
            onChange={this.handleChange('lastName')}
            id="lastName"
            type="text"
            placeholder="Last name"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={this.handleChange('password')}
            id="password"
            type="password"
            placeholder="Password"
            required
          />

          <label htmlFor="passwordConfirmation">Password confirmation</label>
          <input
            value={passwordConfirmation}
            onChange={this.handleChange('passwordConfirmation')}
            id="passwordConfirmation"
            type="password"
            placeholder="Password confirmation"
            required
          />

          <button type="submit">
            Sign me up
          </button>
        </form>
      </div>
    );
  }
}
