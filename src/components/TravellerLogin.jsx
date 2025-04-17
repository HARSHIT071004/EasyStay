import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Navigate, useNavigate } from 'react-router-dom';
import homeawayLogo from '/homeaway_logo.png';
class TravellerLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authFlag: false
    };
  }

  componentDidMount() {
    this.setState({ authFlag: false });
  }

  emailChangeHandler = (e) => this.setState({ email: e.target.value });
  passwordChangeHandler = (e) => this.setState({ password: e.target.value });

  handleValidation = () => {
    if (!this.state.email) {
      alert("Email is required");
      return false;
    }
    if (!this.state.password) {
      alert("Password is required");
      return false;
    }
    return true;
  };

  submitLogin = (e) => {
    e.preventDefault();
    if (this.handleValidation()) {
      const data = {
        email: this.state.email,
        password: this.state.password
      };

      axios.defaults.withCredentials = true;
      axios.post('http://localhost:3001/homeaway/traveller/login', data)
        .then(response => {
          if (response.status === 200) {
            this.setState({ authFlag: true });
          }
        })
        .catch(error => {
          console.log("Login Error:", error);
          alert("Authentication failed");
        });
    }
  };

  render() {
    if (cookie.load('cookie1')) {
      return <Navigate to="/" />;
    }

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
         

<img src={homeawayLogo} alt="Logo" />
          </div>
          <p className="text-4xl text-black font-semibold text-center mb-6"   style={{ fontFamily: '"Dancing Script", cursive, sans-serif' }}>Log In <span className='text-white'>EasyStay</span> </p>
          <p className="text-center text-sm text-gray-500 mt-1">
            Need an account? <a href="/traveller/signup1" className="text-indigo-600 hover:underline">Sign up</a>
          </p>

          <form className="mt-6 space-y-4" onSubmit={this.submitLogin}>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              onChange={this.emailChangeHandler}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none"
              onChange={this.passwordChangeHandler}
              required
            />
            <div className="flex justify-end text-sm text-indigo-600 hover:underline cursor-pointer">
              Forgot Password?
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-sm text-gray-400">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 mb-2 transition duration-300">
            Log in with Facebook
          </button>
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300">
            Log in with Google
          </button>

          <p className="text-xs text-gray-400 text-center mt-4">
            We don't post anything without your permission.
          </p>
        </div>

        <p className="text-xs text-gray-400 text-center mt-4 max-w-md">
          Use of this website constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy. <br />
          ©2018 HomeAway. All rights reserved.
        </p>
      </div>
    );
  }
}

export default function (props) {
  const navigate = useNavigate();
  return <TravellerLogin {...props} navigate={navigate} />;
}
