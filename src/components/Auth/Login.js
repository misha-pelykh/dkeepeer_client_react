import React, { PropTypes }      from 'react';
import { connect }               from 'react-redux';
import { login }                 from '../../actions/auth';
import FormInput                 from '../Layout/Form/Input';
import extractPropertyFromObject from '../../utils/extractPropertyFromObject';

@connect(state => ({
  auth: state.auth
}), { login })
export default class Login extends React.Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
  };

  static contextTypes = {
    router: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    
    this.userState = {
      email: {
        value: '',
        blured: false
      },
      password: {
        value: '',
        blured: false
      }
    }

    this.state = {
      user: this.userState,
      canSubmit: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange = (field, values) => {
    this.setState((prevState) => ({
      user: {
        ...prevState.user,
        [field]: {
          ...prevState.user[field],
          ...values
        }
      }
    }));
  }

  handleSubmit = model => {
    const { user } = this.state;
    const router = this.context.router;
    const userValues = extractPropertyFromObject(user, 'value');

    this.props.login(userValues, router);
  }

  resetForm() {
    this.refs.form.reset();
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    });
  }

  disableButton = () => {
    this.setState({
      canSubmit: false
    });
  }

  render() {
    // const { auth: { error } } = this.props;
    const { email, password } = this.state.user;

    return(
      <div className="row">
        <div className="col-md-6 col-md-offset-3">

          <h3>Login</h3>

          <Formsy.Form 
            ref='form'
            onValidSubmit={this.handleSubmit} 
            onValid={this.enableButton} 
            onInvalid={this.disableButton}
          >

            <FormInput 
              title="Email"
              name="email"
              type="email"
              value={email.value}
              isBlured={email.blured}
              validations="isEmail"
              validationErrors={{
                isEmail: "Email is not valid",
                isRequired: "Email is required"
              }}
              handleChange={this.handleChange}
              required
            />

            <FormInput 
              title="Password"
              name="password"
              type="password"
              value={password.value}
              isBlured={password.blured}
              validations="minLength:6"
              validationErrors={{
                minLength: "Minimum password length is 6",
                isRequired: "Password is required"
              }}
              handleChange={this.handleChange}
              required
            />

            <button 
              type="submit" 
              className="btn btn-success"
              disabled={!this.state.canSubmit}
            >Sign in</button>

          </Formsy.Form>

        </div>
      </div>
    );
  }
}
