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
        const response = await axios.post('https://easy-stay-backend.vercel.app/homeaway/traveller/signup', {
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
      <div className="min-h-screen w-full" style={{
        backgroundImage: `url(/easystay6.webp)`,
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}>
        {/* Inline Styles */}
        <style>
          {`
            .signup-container {
              max-width: 600px;
              width: 100%;
              background: white;
              padding: 24px;
              border-radius: 24px;
              box-shadow: 0px 0px 10px #d3d3d3;
              margin: 24px auto;
            }
            .signup-form input {
              border-radius: 5px;
              border: 1px solid #ced4da;
              padding: 8px;
              font-size: 14px;
              margin-bottom: 12px;
            }
            .signup-form input:focus {
              border-color: #007bff;
              box-shadow: 0 0 5px rgba(0,123,255,0.3);
              outline: none;
            }
            .or-divider {
              position: relative;
              margin: 16px 0;
            }
            .or-divider span {
              background: white;
              padding: 0 10px;
              color: #6c757d;
              font-size: 14px;
              position: relative;
              z-index: 1;
            }
            .or-divider::before {
              content: '';
              position: absolute;
              top: 50%;
              left: 0;
              right: 0;
              border-top: 1px solid #ced4da;
              z-index: 0;
            }
          `}
        </style>

        {/* Navbar (Commented Out to Match Signup1) */}
        {/* <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/" className="logo">
              <img src={homeawayLogo} alt="Homeaway Logo" height="30" />
            </Navbar.Brand>
          </Container>
        </Navbar> */}

        {/* Main Content */}
        <div
          className="signup-body"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 20px',
          }}
        >
          <div
            className="signup-container"
            style={{
              fontFamily: '"Dancing Script", cursive, sans-serif'
            }}
          >
            <img
              src={logo}
              alt="Logo"
              className="signup-logo"
              style={{ height: '70px', marginBottom: '20px', display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
            />
            <p
              className="text-4xl text-black font-semibold text-center mb-6"
              style={{ fontFamily: '"Dancing Script", cursive, sans-serif' }}
            >
              Sign Up With <span className="text-blue-500">Email</span>
            </p>
            <div className="signup-centerm-5">
              <h5 className="text-center mt-2">
                Already have an account?{' '}
                <a className="text-primary" href="/traveller/login">
                  Log in
                </a>
              </h5>

              <form className="signup-form mt-4" onSubmit={this.submitSignup}>
                <div className="row mb-3">
                  <div className="col">
                    <input
                      name="firstname"
                      onChange={this.handleChange}
                      type="text"
                      className="form-control"
                      placeholder="First Name"
                    />
                  </div>
                  <div className="col">
                    <input
                      name="lastname"
                      onChange={this.handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                <input
                  name="email"
                  onChange={this.handleChange}
                  type="email"
                  className="form-control mb-3"
                  placeholder="Email Address"
                />
                <input
                  name="password"
                  onChange={this.handleChange}
                  type="password"
                  className="form-control mb-3"
                  placeholder="Password"
                />
                <button type="submit" className="btn btn-warning w-100 mb-3">
                  Sign me Up
                </button>

                <div className="or-divider text-center my-3">
                  <span>or</span>
                </div>

                <button type="button" className="btn btn-primary w-100 mb-2">
                  Log in with Facebook
                </button>
                <button type="button" className="btn btn-danger w-100">
                  Log in with Google
                </button>

                <p className="text-muted text-center mt-3" style={{ fontSize: '12px' }}>
                  We don't post anything without your permission.
                  <br />
                  By creating an account you are accepting our{' '}
                  <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
                </p>
              </form>
            </div>

            <footer className="signup-footer mt-4 text-center text-muted" style={{ fontSize: '12px' }}>
              <small>
                Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions
                and Privacy Policy.
                <br />
                ©2018 HomeAway. All rights reserved.
              </small>
            </footer>
          </div>
        </div>
      </div>
    );
  }
}

export default Signup2;