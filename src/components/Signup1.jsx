import React, { Component } from 'react';
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';
import { Navbar, Container } from 'react-bootstrap';
import homeawayLogo from '/homeaway_logo.png';
import logo from '/logo.png';

class Signup1 extends Component {
  render() {
    let redirectVar = null;
    if (cookie.load('cookie1')) {
      redirectVar = <Navigate to="/" />;
    }

    return (
      <div className="signup-wrapper" style={{ minHeight: '100vh', backgroundColor: 'rgb(249,231,247)' }}>
        {redirectVar}
{/* 
        <Navbar bg="light" expand="lg" className="shadow-sm">
          <Container>
            <Navbar.Brand href="/" className="logo">
              <img src={homeawayLogo} alt="Homeaway Logo" height="30" />
            </Navbar.Brand>
          </Container>
        </Navbar> */}

<div className="min-h-screen w-full" style={{
      backgroundImage: `url(/easystay6.webp)`,
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover'
    }}>
          <img
            src={logo}
            alt="Logo"
            className="signup-logo"
            style={{ height: '70px', marginBottom: '20px' }}
          />
                    <p className="text-4xl text-black font-semibold text-center mb-6"   style={{ fontFamily: '"Dancing Script", cursive, sans-serif' }}>Sign Up With <span className='text-blue-500'>Email</span> </p>
                    <br/><br/><br/>
          <div
            className="signup-center"
            style={{
              maxWidth: '400px',
              width: '100%',
              background: 'white',
              padding: '30px',
              borderRadius: '10px',
              boxShadow: '0px 0px 10px #d3d3d3',
              margin: '0 auto',
            }}
          >
           
            <h5 className="text-center mt-2">
              Already have an account?{' '}
              <a className="text-primary" href="/traveller/login">
                Log in
              </a>
            </h5>

            <div className="signup-form mt-4">
              <a href="/traveller/signup2">
                <button className="btn btn-warning w-100">Sign Up with Email</button>
              </a>

              <div className="or-divider text-center my-3">
                <span>or</span>
              </div>

              <button className="btn btn-primary w-100 mb-2">Log in with Facebook</button>
              <button className="btn btn-danger w-100">Log in with Google</button>

              <p className="text-muted text-center mt-3" style={{ fontSize: '12px' }}>
                We don't post anything without your permission.
                <br />
                By creating an account you are accepting our{' '}
                <a href="#">Terms and Conditions</a> and <a href="#">Privacy Policy</a>.
              </p>
            </div>
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
    );
  }
}

export default Signup1;
