import React, { useState } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';
import homeawayLogo from '/homeaway_logo.png';

const Signup2 = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });

  const [authFlag, setAuthFlag] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleValidation = () => {
    const { firstname, lastname, email, password } = formData;
    let isValid = true;

    if (!firstname) {
      alert('First Name is a Required field');
      isValid = false;
    } else if (!firstname.match(/^[a-zA-Z ]+$/)) {
      alert('First Name cannot contain numbers');
      isValid = false;
    }

    if (!lastname) {
      alert('Last Name is a Required field');
      isValid = false;
    } else if (!lastname.match(/^[a-zA-Z ]+$/)) {
      alert('Last Name cannot contain numbers');
      isValid = false;
    }

    if (!email) {
      alert('Login ID is a Required field');
      isValid = false;
    } else {
      const lastAtPos = email.lastIndexOf('@');
      const lastDotPos = email.lastIndexOf('.');
      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2
        )
      ) {
        alert('Login ID is invalid');
        isValid = false;
      }
    }

    if (!password) {
      alert('Password is a Required field');
      isValid = false;
    }

    return isValid;
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        'https://easy-stay-backend.vercel.app/homeaway/owner/signup',
        formData
      );

      if (response.status === 200) {
        setAuthFlag(true);
        alert('Owner profile created');
      } else if (response.status === 201) {
        setAuthFlag(true);
        alert(
          'Owner profile added to Traveler login. You can now use the same login details'
        );
      }
    } catch (err) {
      console.error(err);
      alert('Cannot Create User. Login ID already exists');
      setAuthFlag(false);
    }
  };

  if (cookie.load('cookie1') === 'ownercookie') {
    return <Navigate to="/owner/propertypost" />;
  }

  return (
    <div className="min-h-screen w-full" style={{
      backgroundImage: `url(/easystay6.webp)`,
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover'
    }}>
      {/* Inline Glassmorphic and Tailwind Styles */}
      <style>
        {`
          @import url('Dancing Script:wght@400;600&display=swap');
          .glassmorphic {
            background: rgba(0, 0, 0, 0.3);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
            border-radius: 24px;
          }
          .glassmorphic-input {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            font-family: 'Poppins', sans-serif;
            border-radius: 12px;
            padding: 12px 16px;
            transition: border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .glassmorphic-input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }
          .glassmorphic-input:focus {
            outline: none;
            border-color: rgba(246, 224, 94, 0.5);
            box-shadow: 0 0 8px rgba(246, 224, 94, 0.3);
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

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="glassmorphic p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="mx-auto mb-4">
              <svg
                width="60"
                height="60"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="12" r="10" fill="url(#grad)" />
                <path
                  d="M8 12H16M12 8V16"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <defs>
                  <linearGradient
                    id="grad"
                    x1="0"
                    y1="0"
                    x2="24"
                    y2="24"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#f6e05e" />
                    <stop offset="1" stopColor="#ecc94b" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1
              className="text-4xl md:text-5xl font-semibold mb-4"
              style={{ fontFamily: '"Dancing Script", cursive, sans-serif' }}
            >
              Sign Up For <span className="text-yellow-400">EaseStay</span>
            </h1>
            <p className="text-gray-300">
              Already have an account?{' '}
              <a href="/owner/login" className="text-yellow-400 hover:underline">
                Log in
              </a>
            </p>
          </div>

          <form className="space-y-6" onSubmit={submitSignup}>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                className="glassmorphic-input"
              />
              <input
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                className="glassmorphic-input"
              />
            </div>
            <input
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full glassmorphic-input"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full glassmorphic-input"
            />
            <button type="submit" className="w-full glassmorphic-button">
              Sign me Up
            </button>

            <div className="w-full text-center">
              <span className="px-2 text-sm italic text-gray-300">or</span>
            </div>

            <button
              type="button"
              className="w-full glassmorphic-social-button flex items-center justify-center space-x-2"
            >
              <span>Log in with Facebook</span>
            </button>
            <button
              type="button"
              className="w-full glassmorphic-social-button flex items-center justify-center space-x-2"
            >
              <span>Log in with Google</span>
            </button>

            <p className="text-xs text-gray-300 text-center">
              We don't post anything without your permission.
              <br />
              By creating an account you are accepting our Terms and Conditions
              and Privacy Policy.
            </p>
          </form>
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
        Use of this Web site constitutes acceptance of the HomeAway.com Terms and
        Conditions and Privacy Policy.
        <br />
        ©2018 HomeAway. All rights reserved.
      </div>
    </div>
  );
};

export default Signup2;