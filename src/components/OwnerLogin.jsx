import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';
import homeawayLogo from '/homeaway_logo.png';

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      authFlag: false
    };
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
  }

  componentWillMount() {
    this.setState({ authFlag: false });
  }

  emailChangeHandler = (e) => {
    this.setState({ email: e.target.value });
  };

  passwordChangeHandler = (e) => {
    this.setState({ password: e.target.value });
  };

  handleValidation() {
    let formIsValid = true;
    if (!this.state.email) {
      formIsValid = false;
      alert("Login ID is a Required field");
    }
    if (!this.state.password) {
      formIsValid = false;
      alert("Password is a Required field");
    }
    return formIsValid;
  }

  submitLogin(event) {
    event.preventDefault();
    if (this.handleValidation()) {
      const data = {
        email: this.state.email,
        password: this.state.password
      };

      axios.defaults.withCredentials = true;
      axios
        .post('http://localhost:3001/homeaway/user/login', data)
        .then(response => {
          if (response.status === 200) {
            this.setState({ authFlag: true });
          }
        })
        .catch(error => {
          alert("Authentication Failed! Please try again");
        });
    }
  }

  render() {
    let redirectVar = null;
    if (cookie.load('cookie1') === 'usercookie') {
      redirectVar = <Navigate to="/user/dashboard" />;
    }
    return (

      <div className="min-h-screen w-full" style={{
      backgroundImage: `url(/easystay6.webp)`,
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover'
    }}>
        {redirectVar}
        {/* Inline Glassmorphic and Tailwind Styles */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
            .glassmorphic {
              background: rgba(0, 0, 0, 0.3);
              backdrop-filter: blur(10px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
              border-radius: 24px;
            }
            .glassmorphic-nav {
              background: rgba(0, 0, 0, 0.2);
              backdrop-filter: blur(10px);
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .glassmorphic-input {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: white;
              font-family: 'Poppins', sans-serif;
              border-radius: 12px;
              padding: 14px;
              transition: border-color 0.3s ease;
            }
            .glassmorphic-input:focus {
              outline: none;
              border-color: rgba(246, 224, 94, 0.5);
            }
            .glassmorphic-input::placeholder {
              color: rgba(255, 255, 255, 0.6);
            }
            .glassmorphic-button {
              background: linear-gradient(to right, #f6e05e, #ecc94b);
              color: #1a202c;
              font-family: 'Poppins', sans-serif;
              font-weight: 600;
              border-radius: 12px;
              padding: 12px 24px;
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .glassmorphic-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(246, 224, 94, 0.5);
            }
            .glassmorphic-social-button {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: white;
              font-family: 'Poppins', sans-serif;
              border-radius: 12px;
              padding: 12px 24px;
              transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
            }
            .glassmorphic-social-button:hover {
              transform: translateY(-2px);
              background: rgba(255, 255, 255, 0.2);
              border-color: rgba(246, 224, 94, 0.3);
            }
            .animate-glow {
              animation: glow 2s ease-in-out infinite;
            }
            @keyframes glow {
              0%, 100% { text-shadow: 0 0 5px rgba(246, 224, 94, 0.5); }
              50% { text-shadow: 0 0 10px rgba(246, 224, 94, 0.8); }
            }
          `}
        </style>

        {/* Navbar */}
        {/* <nav className="fixed top-0 left-0 right-0 z-10 glassmorphic-nav">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="glassmorphic p-1 rounded-full">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="url(#grad)" />
                  <path d="M8 12H16M12 8V16" stroke="white" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f6e05e" />
                      <stop offset="1" stopColor="#ecc94b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-xl font-bold text-white animate-glow">EaseStay</span>
            </a>
          </div>
        </nav> */}

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="glassmorphic p-10 max-w-md w-full">
            <div className="text-center mb-8">
              <div className="mx-auto mb-4">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" fill="url(#grad)" />
                  <path d="M8 12H16M12 8V16" stroke="white" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#f6e05e" />
                      <stop offset="1" stopColor="#ecc94b" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <p
                className="text-4xl font-semibold"
                style={{ fontFamily: '"Dancing Script", cursive, sans-serif' }}
              >
                User Account <span className="text-yellow-400">Login</span>
              </p>
              <p className="mt-3 text-gray-300">
                Need an account?{' '}
                <a href="/owner/signup1" className="text-yellow-400 hover:underline">
                  Sign Up
                </a>
              </p>
            </div>

            <div className="space-y-6 flex flex-col gap-2">
              <input
                onChange={this.emailChangeHandler}
                type="text"
                className="w-full glassmorphic-input"
                placeholder="Email Address"
                required
              />
              <input
                onChange={this.passwordChangeHandler}
                type="password"
                className="w-full glassmorphic-input"
                placeholder="Password"
                required
              />
              <button
                type="button"
                className="text-yellow-400 hover:underline text-sm text-left w-full"
              >
                Forgot Password?
              </button>
              <button
                onClick={this.submitLogin}
                className="w-full glassmorphic-button"
              >
                Log In
              </button>
              <div className="text-center text-gray-300 my-4">
                <span className="px-2 text-sm italic">or</span>
              </div>
              <button
                className="w-full glassmorphic-social-button flex items-center justify-center space-x-2"
              >
                <span>Log in with Facebook</span>
              </button>
              <button
                className="w-full glassmorphic-social-button flex items-center justify-center space-x-2"
              >
                <span>Log in with Google</span>
              </button>
              <p className="text-xs text-gray-300 text-center">
                We don't post anything without your permission.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(255, 255, 255, 0.1)"
            fillOpacity="1"
            d="M0,192L48,176C96,160,192,128,288,138.7C384,149,480,203,576,213.3C672,224,768,192,864,181.3C960,171,1056,181,1152,186.7C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        <div className="text-center mt-8 text-xs text-gray-400">
          Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.
          <br />
          ©2018 HomeAway. All rights reserved.
        </div>
      </div>
    );
  }
}

export default UserLogin;