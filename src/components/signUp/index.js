import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth, db } from "../../firebase";
import * as routes from "../../constants/routes";

import * as analytics from "./../../analytics/analytics";

const SignUpPage = ({ history }) => (
  <div>
    <SignUpForm history={history} />
  </div>
);

const INITIAL_STATE = {
  displayName: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null,
};

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

class SignUpForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    analytics.initGA();
    analytics.logPageView();
  }

  onSubmit = (event) => {
    const { displayName, email, passwordOne } = this.state;
    const { history } = this.props;

    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // create a user in the firebase db too
        db.doCreateUser(authUser.uid, displayName, email)
          .then(() => {
            this.setState(() => ({ ...INITIAL_STATE }));
            history.push(routes.HOME);
          })
          .catch((error) => {
            this.setState(byPropKey("error", error));
          });

        if (!authUser.emailVerified) {
          // send a verification mail to user
          authUser
            .sendEmailVerification()
            .then(function () {
              history.push(routes.USER_VERIFICATION);
            })
            .catch(function (error) {
              alert("something went wrong: ", error);
            });
        }
      })
      .catch((error) => {
        this.setState(byPropKey("error", error));
      });

    event.preventDefault();
  };

  handleDisplayNameChange = (event) => {
    const value = event.target.value;
    const regex = /^[A-Za-z\s]*$/; // Regular expression to allow only alphabetic characters and spaces
    if (regex.test(value)) {
      this.setState(byPropKey("displayName", value));
    }
  };

  handleEmailChange = (event) => {
    const value = event.target.value;
    this.setState(byPropKey("email", value));
  };

  validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  render() {
    const { displayName, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      displayName === "" ||
      !this.validateEmail(email);

    return (
      <div className="login-page">
        <form onSubmit={this.onSubmit} className="form">
          <input
            value={displayName}
            onChange={this.handleDisplayNameChange}
            type="text"
            placeholder="Display Name"
          />
          <input
            value={email}
            onChange={this.handleEmailChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            value={passwordOne}
            onChange={(event) =>
              this.setState(byPropKey("passwordOne", event.target.value))
            }
            type="password"
            placeholder="Password"
          />
          <input
            value={passwordTwo}
            onChange={(event) =>
              this.setState(byPropKey("passwordTwo", event.target.value))
            }
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">
            Sign Up
          </button>

          {error && <p>{error.message}</p>}
        </form>
        <p style={StyleInSignUp}>
          Already a user? <Link to={routes.SIGN_IN}>Sign in</Link>
        </p>
      </div>
    );
  }
}

const style = {
  textAlign: "center",
};

const StyleInSignUp = {
  marginTop: "-10px",
  textAlign: "center",
};

const SignUpLink = () => (
  <p style={style}>
    Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
);

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
