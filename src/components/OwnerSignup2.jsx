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
    password: ''
  });

  const [authFlag, setAuthFlag] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleValidation = () => {
    const { firstname, lastname, email, password } = formData;
    let isValid = true;

    if (!firstname) {
      alert("First Name is a Required field");
      isValid = false;
    } else if (!firstname.match(/^[a-zA-Z ]+$/)) {
      alert("First Name cannot contain numbers");
      isValid = false;
    }

    if (!lastname) {
      alert("Last Name is a Required field");
      isValid = false;
    } else if (!lastname.match(/^[a-zA-Z ]+$/)) {
      alert("Last Name cannot contain numbers");
      isValid = false;
    }

    if (!email) {
      alert("Login ID is a Required field");
      isValid = false;
    } else {
      const lastAtPos = email.lastIndexOf('@');
      const lastDotPos = email.lastIndexOf('.');
      if (
        !(lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          email.indexOf('@@') === -1 &&
          lastDotPos > 2 &&
          email.length - lastDotPos > 2)
      ) {
        alert("Login ID is invalid");
        isValid = false;
      }
    }

    if (!password) {
      alert("Password is a Required field");
      isValid = false;
    }

    return isValid;
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    if (!handleValidation()) return;

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post('http://localhost:3001/homeaway/owner/signup', formData);

      if (response.status === 200) {
        setAuthFlag(true);
        alert("Owner profile created");
      } else if (response.status === 201) {
        setAuthFlag(true);
        alert("Owner profile added to Traveler login. You can now use the same login details");
      }
    } catch (err) {
      console.error(err);
      alert("Cannot Create User. Login ID already exists");
      setAuthFlag(false);
    }
  };

  if (cookie.load('cookie1') === 'ownercookie') {
    return <Navigate to="/owner/propertypost" />;
  }

  return (
    <div
      className="min-h-screen text-white"
      style={{
        // backgroundColor: '#1A535C',
        backgroundImage: `url(/homepage_background.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Navigation Bar
      <nav className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center">
            <img src={homeawayLogo} alt="Homeaway Logo" className="h-8" />
          </a>
        </div>
      </nav> */}

      <div className="container mx-auto pt-24 pb-12 flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-8">
        <p className="text-4xl text-black font-semibold text-center mb-6"   style={{ fontFamily: '"Dancing Script", cursive, sans-serif' }} >Sign Me <span className='text-white'>Up</span> </p>

          <p className="text-white">
            Already have an account?{' '}
            <a href="/owner/login" className="text-F7C948 hover:underline">Log in</a>
          </p>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl p-6 w-full max-w-md shadow-xl">
          <form className="space-y-6" onSubmit={submitSignup}>
            <div className="grid grid-cols-2 gap-4">
              <input
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
                className="bg-white bg-opacity-50 border border-white border-opacity-30 rounded-lg p-3 text-black placeholder-gray-900 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
              />
              <input
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
                className="bg-white bg-opacity-50 border border-white border-opacity-30 rounded-lg p-3 text-black placeholder-gray-900 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
              />
            </div>
            <input
              name="email"
              placeholder="Email Address"
              onChange={handleChange}
              className="w-full bg-white bg-opacity-50 border border-white border-opacity-30 rounded-lg p-3 text-black placeholder-gray-900 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
            /> <br/> <br/>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full bg-white bg-opacity-50 border border-white border-opacity-30 rounded-lg p-3 text-black placeholder-gray-900 placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
            />
            <br/>
            <br/>
            <button
              type="submit"
              className="w-full bg-blue-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-F7C948 focus:ring-opacity-50 bg-opacity-90 hover:bg-opacity-100 hover:-translate-y-1"
            >
              Sign me Up
            </button>

            <div className="w-full border-b border-white border-opacity-20 text-center">
              <span className="bg-F7C948 bg-opacity-10 px-2 text-white text-sm italic">or</span>
            </div>

            <button
              type="button"
              className="w-full bg-[#627aac] text-white rounded-xl py-3 flex items-center justify-center space-x-2 hover:bg-opacity-90 transition duration-300"
              style={{
                backgroundImage: 'url(facebook_small.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '10px center',
                paddingLeft: '35px'
              }}
            >
              Log in with Facebook
            </button>

            <button
              type="button"
              className="w-full bg-[#f3f3f3] text-[#787878] rounded-xl py-3 flex items-center justify-center space-x-2 hover:bg-opacity-90 transition duration-300"
              style={{
                backgroundImage: 'url(google_logo.png)',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: '10px center',
                paddingLeft: '35px'
              }}
            >
              Log in with Google
            </button>

            <p className="text-xs text-center text-white">
              We don't post anything without your permission.
              <br />
              By creating an account you are accepting our Terms and Conditions and Privacy Policy.
            </p>
          </form>
        </div>

        <div className="mt-8 text-center text-xs text-white">
          Use of this Web site constitutes acceptance of the HomeAway.com Terms and Conditions and Privacy Policy.
          <br />
          ©2018 HomeAway. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Signup2;
