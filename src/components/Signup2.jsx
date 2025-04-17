import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';
import { Navbar, Container } from "react-bootstrap";
import homeawayLogo from '/homeaway_logo.png';
import logo from '/logo.png';

class Signup2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      authFlag: false
    };
  }

  componentDidMount() {
    this.setState({ authFlag: false });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleValidation = () => {
    const { firstname, lastname, email, password } = this.state;
    let formIsValid = true;

    if (!firstname || !/^[a-zA-Z ]+$/.test(firstname)) {
      alert("Valid First Name is required");
      formIsValid = false;
    }

    if (!lastname || !/^[a-zA-Z ]+$/.test(lastname)) {
      alert("Valid Last Name is required");
      formIsValid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert("Valid Email is required");
      formIsValid = false;
    }

    if (!password) {
      alert("Password is required");
      formIsValid = false;
    }

    return formIsValid;
  }

  submitSignup = async (e) => {
    e.preventDefault();

    if (this.handleValidation()) {
      const { firstname, lastname, email, password } = this.state;

      try {
        const response = await axios.post('http://localhost:3001/homeaway/traveller/signup', {
          firstname, lastname, email, password
        }, { withCredentials: true });

        if (response.status === 200) {
          this.setState({ authFlag: true });
        }
      } catch (err) {
        console.error(err);
        alert("Cannot Create User. Login ID already exists");
        this.setState({ authFlag: false });
      }
    }
  }

  render() {
    if (this.state.authFlag || cookie.load('cookie1')) {
      return <Navigate to="/" />;
    }

    return (
      <div
        style={{
          background: "linear-gradient(to bottom, #1a202c, #2d3748)",
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          color: "white",
        }}
      >
        {/* Inline Glassmorphic and Tailwind Styles */}
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
            .glassmorphic {
              background: rgba(0, 0, 0, 0.3);
              backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
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
              padding: 12px;
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
              transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .glassmorphic-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 4px 16px rgba(246, 224, 94, 0.4);
            }
            .glassmorphic-social-button {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: white;
              font-family: 'Poppins', sans-serif;
              border-radius: 12px;
              transition: transform 0.3s ease, background 0.3s ease;
            }
            .glassmorphic-social-button:hover {
              transform: translateY(-2px);
              background: rgba(255, 255, 255, 0.2);
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
        <Navbar className="glassmorphic-nav">
          <Container>
            <Navbar.Brand href="/">
              <div className="flex items-center space-x-2">
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
              </div>
            </Navbar.Brand>
          </Container>
        </Navbar>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="glassmorphic p-8 max-w-md w-full">
            <div className="text-center mb-6">
              <img src={logo} alt="Logo" height="60" className="mx-auto mb-4" />
              <p
                className="text-4xl font-semibold"
                style={{ fontFamily: '"Dancing Script", cursive, sans-serif' }}
              >
                Sign Me <span className="text-yellow-400">Up</span>
              </p>
              <p className="mt-2 text-gray-300">
                Already have an account?{' '}
                <a href="/traveller/login" className="text-yellow-400 hover:underline">
                  Log in
                </a>
              </p>
            </div>

            <form onSubmit={this.submitSignup}>
              <div className="flex gap-4 mb-4">
                <input
                  name="firstname"
                  onChange={this.handleChange}
                  type="text"
                  className="form-control glassmorphic-input flex-1"
                  placeholder="First Name"
                />
                <input
                  name="lastname"
                  onChange={this.handleChange}
                  type="text"
                  className="form-control glassmorphic-input flex-1"
                  placeholder="Last Name"
                />
              </div>

              <input
                name="email"
                onChange={this.handleChange}
                type="email"
                className="form-control glassmorphic-input mb-4"
                placeholder="Email Address"
              />
              <input
                name="password"
                onChange={this.handleChange}
                type="password"
                className="form-control glassmorphic-input mb-4"
                placeholder="Password"
              />
              <button type="submit" className="btn glassmorphic-button w-full mb-4">
                Sign me Up
              </button>
            </form>

            <div className="text-center">
              <p className="text-gray-300 mb-2">or</p>
              <button className="btn glassmorphic-social-button w-full mb-2">
                Log in with Facebook
              </button>
              <button className="btn glassmorphic-social-button w-full mb-2">
                Log in with Google
              </button>
              <p style={{ fontSize: "12px", color: "rgba(255, 255, 255, 0.7)" }}>
                We don't post anything without your permission. <br />
                By creating an account you are accepting our Terms and Conditions and Privacy Policy.
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

        <footer className="text-center mt-4 text-gray-400" style={{ fontSize: "12px" }}>
          <small>
            Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.
            <br />
            ©2018 HomeAway. All rights reserved.
          </small>
        </footer>
      </div>
    );
  }
}

export default Signup2;