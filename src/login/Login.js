import React from 'react';
import { Redirect } from 'react-router-dom';
import { fakeAuth } from '../fakeAuth';

class Login extends React.Component {
  state = { redirectToAbout: false };

  constructor(props) {
    super(props);

    this.onLoginSubmit = this.onLoginSubmit.bind(this);
  }

  onLoginSubmit(event) {
    event.preventDefault();
    fakeAuth.authenticate(
      () => this.setState({ redirectToAbout: true })
    );
  }

  render() {
    const { redirectToAbout } = this.state;

    if (redirectToAbout) {
      return <Redirect to="/about" />;
    }

    return (
      <>
        <p>Nie jesteś zalogowany!</p>
        <form onSubmit={this.onLoginSubmit}>
          <button type="submit">Zaloguj</button>
        </form>
      </>
    );
  }
}

export default Login;
