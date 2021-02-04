import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { safeCredentials, handleErrors } from './utils/fetchHelper';
import './style.scss';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup_username: '',
      signup_email: '',
      signup_password: '',
      signin_email: '',
      signin_password: '',
    };

    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

  handleSignUp(event) {
    event.preventDefault();
    const inputs = event.target.getElementsByClassName('SignUpFormElements');

    fetch('/api/users', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          username: inputs.signup_username.value,
          email: inputs.signup_email.value,
          password: inputs.signup_password.value
        }
      })
    }))
    .then(handleErrors)
    .then(response => {
      if (response.success == false) {
        console.log(response);
        alert("Please try again");
      }
      else {
        window.location.href = '/feed';
      }
    })
  }

  handleSignIn(event) {
    event.preventDefault();
    const inputs = event.target.getElementsByClassName('SignInElements');

    fetch('/api/sessions', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        user: {
          email: inputs.signin_email.value,
          password: inputs.signin_password.value
        }
      })
    }))
    .then(handleErrors)
    .then(response => {
      if (response.success == true) {
        window.location.href = '/feed';
        }
      else {
        console.log(response);
        alert("Wrong email or password, please try again");
      }
    })
  }

  render() {
    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-lg-6 d-flex align-items-center justify-content-center twitter-blue p-0">
            <div className="text-white">
              <h5><i className="fas fa-search"></i> Follow your interests.
              <br />
              <br />
              <br />
              <i className="fas fa-user-friends"></i> Hear what people are talking about.
              <br />
              <br />
              <br />
              <i className="fas fa-comments"></i> Join the conversation.</h5>
            </div>
          </div>
          <div className="col-lg-6 order-first order-lg-last p-0">
            <div className="h-100 d-flex flex-column">
              <form onSubmit={this.handleSignIn}>
                <div className="row mx-0 my-3">
                  <div className="col-3">
                  </div>
                  <div className="col-3">
                    <input type="email" className="form-control SignInElements" aria-describedby="emailHelp" name="signin_email" placeholder="Email" />
                  </div>
                  <div className="col-3">
                    <input type="password" className="form-control SignInElements" placeholder="Password" name="signin_password" />
                  </div>
                  <div className="col-3">
                    <button type="submit" className="btn btn-twitter-outline rounded">Log in</button>
                  </div>
                </div>
              </form>
              <div className="d-flex flex-column flex-grow-1 justify-content-center">
                <div className="row m-0">
                  <div className="col-3">
                  </div>
                  <div className="col-9">
                    <i className="fab fa-twitter fa-3x" id="twitter-icon"></i>
                  </div>
                </div>
                <br />
                <div className="row m-0">
                  <div className="col-3">
                  </div>
                  <div className="col-6">
                    <h3 className="font-weight-bold">See what's happening in the world right now</h3>
                  </div>
                  <div className="col-3">
                  </div>
                </div>
                <br />
                <br />
                <div className="row m-0">
                  <div className="col-3">
                  </div>
                  <div className="col-9">
                    <h6>Join Twitter today.</h6>
                  </div>
                </div>
                <br />
                <div className="row m-0">
                  <div className="col-3">
                  </div>
                  <div className="col-5">
                    <button type="button" className="btn btn-twitter-filled btn-block py-2 text-white font-weight-bold rounded" data-toggle="modal" data-target="#SignUpForm">Sign up</button>
                      <div className="modal fade" id="SignUpForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header border-bottom-0 d-flex justify-content-center">
                              <i className="fab fa-twitter fa-2x" id="twitter-icon"></i>
                            </div>
                            <form onSubmit={this.handleSignUp}>
                              <div className="modal-body">
                                <h4 className="modal-title font-weight-bold" id="exampleModalLabel">Create your account</h4>
                                <br />
                                <div className="form-group">
                                  <input type="username" className="form-control py-4 SignUpFormElements" name="signup_username" aria-describedby="emailHelp" placeholder="Username" />
                                </div>
                                <div className="form-group">
                                  <input type="email" className="form-control py-4 SignUpFormElements" name="signup_email" placeholder="Email address" />
                                </div>
                                <div className="form-group">
                                  <input type="password" className="form-control py-4 SignUpFormElements" name="signup_password" placeholder="Password" />
                                </div>
                              </div>
                              <div className="modal-footer border-top-0 d-flex justify-content-center">
                                <button type="submit" className="btn btn-twitter-filled btn-block py-2 text-white font-weight-bold rounded">Create account</button>
                              </div>
                            </form>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-4">
                  </div>
                </div>
                <br />
                <div className="row m-0">
                  <div className="col-3">
                  </div>
                  <div className="col-5">
                    <button type="button" className="btn btn-twitter-outline btn-block py-2 font-weight-bold rounded" data-toggle="modal" data-target="#LogInForm">Log in</button>
                      <div className="modal fade" id="LogInForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header border-bottom-0 d-flex justify-content-center">
                              <i className="fab fa-twitter fa-2x" id="twitter-icon"></i>
                            </div>
                            <form onSubmit={this.handleSignIn}>
                              <div className="modal-body">
                                <h4 className="modal-title font-weight-bold" id="exampleModalLabel">Log in to your account</h4>
                                <br />
                                <div className="form-group">
                                  <input type="email" className="form-control py-4 SignInElements" name="signin_email" aria-describedby="emailHelp" placeholder="Email" />
                                </div>
                                <div className="form-group">
                                  <input type="password" className="form-control py-4 SignInElements" name="signin_password" placeholder="Password" />
                                </div>
                              </div>
                              <div className="modal-footer border-top-0 d-flex justify-content-center">
                                <button type="submit" className="btn btn-twitter-filled btn-block py-2 text-white font-weight-bold rounded">Log in</button>
                              </div>
                            </form>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div className="col-4">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar fixed-bottom navbar-expand-custom navbar-light bg-light justify-content-center small py-2">
          <div className="text-muted navbar-collapse collapse justify-content-center">
            <ul className="list-group list-group-horizontal">
              <a href="#" className="mx-2 text-muted">About</a>
              <a href="#" className="mx-2 text-muted">Help Center</a>
              <a href="#" className="mx-2 text-muted">Terms of Service</a>
              <a href="#" className="mx-2 text-muted">Privacy Policy</a>
              <a href="#" className="mx-2 text-muted">Cookie Policy</a>
              <a href="#" className="mx-2 text-muted">Ads info</a>
              <a href="#" className="mx-2 text-muted">Blog</a>
              <a href="#" className="mx-2 text-muted">Status</a>
              <a href="#" className="mx-2 text-muted">Careers</a>
              <a href="#" className="mx-2 text-muted">Brand Resources</a>
              <a href="#" className="mx-2 text-muted">Advertising</a>
              <a href="#" className="mx-2 text-muted">Marketing</a>
              <a href="#" className="mx-2 text-muted">Twitter for Business</a>
              <a href="#" className="mx-2 text-muted">Developers</a>
              <a href="#" className="mx-2 text-muted">Directory</a>
              <a href="#" className="mx-2 text-muted">Settings</a>
              &copy; {(new Date().getFullYear())} Twitter, Inc.
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement('div.h-100')),
  )
})
