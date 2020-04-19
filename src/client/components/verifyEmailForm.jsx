import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import './spinner.css';

export default class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'pending',
      token: this.props.queryParam.token,
    };

    console.log("Ready to verify Emails");
    this.sendConfirmation();
  }

  sendConfirmation() {
    this.state.status = 'pending';
    const url = `http://localhost:8081/api/verifyEmail?token=${this.state.token}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          this.setState({ status: 'success' });
        } else if (response.status === 404) {
          this.setState({ status: 'notfound' });
        } else {
          this.setState({ status: 'failed' });
        }
      })
      .then(() => {
        console.log(this.state);
      });
  }

  // eslint-disable-next-line class-methods-use-this
  pending() {
    return (
      <div>
        <h1> Welcome to the club</h1>
        <div className="formContainer">
          <h3>Confirming!</h3>
          <div id="loading" />
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className="submit-button"
          >
            <Link to="/">Return Home</Link>
          </Button>
        </div>

      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  failed() {
    return (
      <div>
        <h1> Welcome to the club</h1>
        <div className="formContainer">
          <h3>Sorry, something went wrong</h3>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className="submit-button"
          >
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // eslint-disable-next-line class-methods-use-this
  success() {
    return (
      <div>
        <div className="formContainer">
          <h1> Welcome to the club</h1>
          <h3>Verified!</h3>
          <Button
            variant="contained"
            type="submit"
            color="primary"
            className="submit-button"
          >
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  render() {
    console.log(this.state);
    if (this.state.status === 'pending') {
      return this.pending();
    }
    if (this.state.status === 'failed') {
      return this.failed();
    }
    if (this.state.status === 'success') {
      return this.success();
    }
    return (<h1>Anything</h1>);
  }
}
