import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { safeCredentials, handleErrors } from './utils/fetchHelper';
import './style.scss';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      tweets: [],
      userTweets: [],
      changeTweet: false,
      userTweetsOnly: false,
    };

    this.handleLogOut = this.handleLogOut.bind(this);
    this.handleNewTweet = this.handleNewTweet.bind(this);
    this.handleDeleteTweet = this.handleDeleteTweet.bind(this);
    this.handleAllTweets = this.handleAllTweets.bind(this);
    this.handleUserTweetsOnly = this.handleUserTweetsOnly.bind(this);
  }

  componentDidMount() {
    this.fetchUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.changeTweet !== this.state.changeTweet) {
      this.fetchTweets();
      this.setState({
        changeTweet: false
      });
    }
    if (prevState.user !== this.state.user) {
      this.fetchTweets();
      this.fetchUserTweets();
    }
    if (prevState.userTweetsOnly !== this.state.userTweetsOnly) {
      if (this.state.userTweetsOnly) {
        this.fetchUserTweets();
      } else {
        this.fetchTweets();
      }
    }
  }

  fetchTweets() {
    fetch('/api/tweets')
    .then(handleErrors)
    .then(response => {
      this.setState({
        tweets: response.tweets,
      });
    })
  }

  fetchUser() {
    fetch('/api/authenticated')
    .then(handleErrors)
    .then(response => {
      if (response.authenticated) {
        this.setState({
          user: response.username,
        }, () => this.fetchTweets());
      } else {
        window.location.href = '/';
      }
    });
  }

  fetchUserTweets() {
    fetch('/api/users/' + this.state.user + '/tweets')
    .then(handleErrors)
    .then(response => {
      this.setState({
        userTweets: response.tweets,
      });
    })
  }

  handleLogOut() {
    event.preventDefault();

    fetch('/api/sessions', safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(response => {
      window.location.href = '/';
    })
  }

  handleNewTweet() {
    event.preventDefault();
    const inputs = event.target.getElementsByClassName('TweetElements');

    fetch('/api/tweets', safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        tweet: {
          message: inputs.tweet_message.value
        }
      })
    }))
    .then(handleErrors)
    .then(response => {
      this.setState({
        tweets: [],
        changeTweet: true,
      });
    })
  }

  handleAllTweets() {
    event.preventDefault();
    if (this.state.userTweetsOnly) {
      this.setState({
        tweets: [],
        userTweetsOnly: false,
      });
    }
  }

  handleUserTweetsOnly() {
    event.preventDefault();
    if (!this.state.userTweetsOnly) {
      this.setState({
        tweets: [],
        userTweetsOnly: true,
      });
    }
  }

  handleDeleteTweet() {
    event.preventDefault();
    const idValue = event.target.getAttribute('id');

    fetch('/api/tweets/' + idValue, safeCredentials({
      method: 'DELETE',
    }))
    .then(handleErrors)
    .then(response => {
      this.setState({
        tweets: [],
        changeTweet: true,
      });
    })
  }

  render() {
    const { user, tweets, userTweets, userTweetsOnly } = this.state;

    return (
      <div className="container-fluid h-100">
        <div className="row h-100">
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0 col-0 p-0">
          </div>
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3 col-2 p-0">
            <div className="h-100 d-flex flex-column">
              <div className="row m-2 py-2">
                <i className="m-0 fab fa-twitter fa-2x" id="twitter-icon"></i>
              </div>
              <div className="row hover-class align-items-center m-2 py-1" onClick={this.handleAllTweets} id={this.state.userTweetsOnly ? "" : "twitter-icon"}>
                <i className="mr-3 fas fa-home fa-2x"></i>
                <button className="btn bg-transparent"><span className="m-0 font-weight-bold h5" id={this.state.userTweetsOnly ? "" : "twitter-icon"}>Home</span></button>
              </div>
              <div className="row hover-class align-items-center m-2 py-1" onClick={this.handleUserTweetsOnly} id={this.state.userTweetsOnly ? "twitter-icon" : ""}>
                <i className="mr-3 fas fa-user-friends fa-2x"></i>
                <button className="btn bg-transparent"><span className="m-0 font-weight-bold h5" id={this.state.userTweetsOnly ? "twitter-icon" : ""}>Profile</span></button>
              </div>
              <div className="row m-2 py-1">
                <button type="button" className="btn btn-twitter-filled btn-block text-white font-weight-bold rounded" data-toggle="modal" data-target="#TweetForm">Tweet</button>
                  <div className="modal fade" id="TweetForm" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                      <div className="modal-content d-flex">
                        <div className="modal-header ">
                          <button type="button" className="close " data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <form onSubmit={this.handleNewTweet}>
                          <div className="modal-body">
                            <div className="form-group">
                              <textarea row="2" className="form-control py-4 border-0 TweetElements" name="tweet_message" placeholder="What's happening?" />
                            </div>
                          </div>
                          <div className="modal-footer border-top-0 d-flex justify-content-center">
                            <button type="submit" className="btn btn-twitter-filled btn-block py-2 text-white font-weight-bold rounded">Tweet</button>
                          </div>
                        </form>
                      </div>
                    </div>
                </div>
              </div>
              <div className="d-flex flex-column">
                <a href="" className="text-decoration-none text-reset" onClick={this.handleLogOut}>
                  <div className="row hover-class align-items-center m-2 py-1">
                    <i className="mr-3 fas fa-user-circle" id=""></i>
                    <span className="m-0 font-weight-bold h6" id="">Log out</span>
                  </div>
                </a>
              </div>
            </div>

          </div>
          <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 col-4 p-0 border">
            <div className="p-3 border-bottom">
              <h5 className="font-weight-bold">Home</h5>
            </div>
            <form onSubmit={this.handleNewTweet}>
              <div className="m-3 pb-3 border-bottom">
                <div className="d-inline-block align-top">
                  <i className="fas fa-user-circle fa-2x" id=""></i>
                </div>
                <div className="d-inline-block col-10">
                  <textarea rows="2" className="form-control border-0 TweetElements" name="tweet_message" placeholder="What's happening?" />
                </div>
              </div>
              <div className="pb-3 border-bottom align-items-center">
                <div className="col-xl-3 col-lg-5 col-md-6 col-sm-6 col-xs-10 col-10 ml-auto">
                  <button type="submit" className="btn btn-twitter-filled btn-block text-white font-weight-bold rounded">Tweet</button>
                </div>
              </div>
            </form>
            { !userTweetsOnly &&
              tweets.map((element, index) => (
                <div key={index}>
                  <div className="p-3 border-bottom">
                    <div className="d-inline-block align-top">
                      <i className="fas fa-user-circle fa-2x" id=""></i>
                    </div>
                    <div className="d-inline-block col-11">
                      <div className="row ml-1">
                        <span className="font-weight-bold">{element.username}</span>
                        { (user === element.username) &&
                          <button className="btn bg-transparent ml-auto"><span className="h4" onClick={this.handleDeleteTweet} id={element.id}>&times;</span></button>
                        }
                      </div>
                      <div className="row ml-1">
                        <span>{element.message}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
            { (userTweetsOnly) &&
              userTweets.map((element, index) => (
                <div key={index}>
                  <div className="p-3 border-bottom">
                    <div className="d-inline-block align-top">
                      <i className="fas fa-user-circle fa-2x" id=""></i>
                    </div>
                    <div className="d-inline-block col-11">
                      <div className="row ml-1">
                        <span className="font-weight-bold">{element.username}</span>
                        { (user === element.username) &&
                          <button className="btn bg-transparent ml-auto"><span className="h4" onClick={this.handleDeleteTweet} id={element.id}>&times;</span></button>
                        }
                      </div>
                      <div className="row ml-1">
                        <span>{element.message}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-3 col-xs-3 col-3 p-0">
          </div>
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-0 col-xs-0 col-0 p-0">
          </div>
        </div>
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Feed />,
    document.body.appendChild(document.createElement('div.h-100')),
  )
})
