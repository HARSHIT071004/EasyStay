import React, { useState, useEffect } from 'react';
import cookie from 'react-cookies';
import { useNavigate } from 'react-router-dom';
import homeawayLogo from '/homeaway_white.svg';

const Home = () => {
  const [email, setEmail] = useState("");
  const [isTravelerLoggedIn, setIsTravelerLoggedIn] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [guests, setGuests] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookie.load('cookie1')) {
      navigate('/');
    } else {
      setIsTravelerLoggedIn(true);
    }
  }, [navigate]);

  const logout = () => {
    cookie.remove('cookie1', { path: '/' });
    cookie.remove('cookie2', { path: '/' });
    cookie.remove('cookie3', { path: '/' });
    console.log("All cookies removed!");
    navigate('/');
  }

  const searchLocationChangeHandler = (e) => {
    setSearchLocation(e.target.value);
  }

  const fromDateChangeHandler = (e) => {
    setFromDate(e.target.value);
  }

  const toDateChangeHandler = (e) => {
    setToDate(e.target.value);
  }

  const guestsChangeHandler = (e) => {
    setGuests(e.target.value);
  }

  const handleValidation = () => {
    let formIsValid = true;

    if (!searchLocation) {
      formIsValid = false;
      alert("Search Location is a Required field");
    }

    let CurrentDate = new Date();
    CurrentDate.setHours(0, 0, 0, 0);

    if (!fromDate) {
      formIsValid = false;
      alert("From Date is a Required field");
    } else {
      let GivenfromDate = new Date(fromDate.replace(/-/g, '/'));
      if (GivenfromDate < CurrentDate) {
        alert('From date should be greater than the current date.');
        formIsValid = false;
      }
    }

    if (!toDate) {
      formIsValid = false;
      alert("To Date is a Required field");
    } else {
      let GiventoDate = new Date(toDate.replace(/-/g, '/'));
      if (GiventoDate < CurrentDate) {
        alert('To date should be greater than the current date.');
        formIsValid = false;
      } else if (GiventoDate <= new Date(fromDate.replace(/-/g, '/'))) {
        alert('To date should be greater than from date.');
        formIsValid = false;
      }
    }

    if (!guests) {
      formIsValid = false;
      alert("Number of guests is a Required field");
    }

    return formIsValid;
  }

  const searchProperty = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      navigate('/property/searchresult', {
        state: {
          location: searchLocation,
          fromDate: fromDate,
          toDate: toDate,
          noOfGuests: guests
        }
      });
    }
  }

  return (
    <div className="min-h-screen text-white " style={{
      backgroundImage: `url(/homepage_background.png)`,
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      {/* Inline Glassmorphic Styles for EaseStay Heading */}
      <style>
        {`
          .glassmorphic-logo {
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }
          .animate-glow {
            animation: glow 2s ease-in-out infinite;
          }
          @keyframes glow {
            0%, 100% { text-shadow: 0 0 5px rgba(96, 165, 250, 0.5), 0 0 10px rgba(167, 139, 250, 0.4); }
            50% { text-shadow: 0 0 10px rgba(96, 165, 250, 0.8), 0 0 20px rgba(167, 139, 250, 0.6); }
          }
        `}
      </style>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-10 border border-white border-opacity-20 shadow-lg">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <a href="/" className="flex items-center  tracking-widest">

            <h1 className="text-lg font-semibold text-black" style={{ letterSpacing: '2px', fontFamily: '"Poppins", sans-serif' }}>
              EaseStay
            </h1>

          </a>
          <div className="flex items-center space-x-6">
            <button className="text-white font-semibold hover:text-F7C948 transition duration-300">
              Trip Boards
            </button>
            {!isTravelerLoggedIn ? (
              <div className="relative group ml-6">
                <button className="text-white font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out hover:text-yellow-400">
                  Login
                </button>
                <div className="absolute hidden group-hover:flex flex-col bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl shadow-lg mt-2 right-0 min-w-[180px] overflow-hidden transition-all duration-300 z-50">
                  <a
                    href="/traveller/login"
                    className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black transition duration-200 text-sm font-medium border-b border-white border-opacity-10"
                  >
                    Traveller Login
                  </a>
                  <a
                    href="/owner/login"
                    className="px-5 py-3 text-white hover:bg-yellow-400 hover:text-black transition duration-200 text-sm font-medium"
                  >
                    Owner Login
                  </a>
                </div>
              </div>

            ) : (
              <div className="relative group">
                <button className="text-white font-semibold hover:text-F7C948 transition duration-300">
                  Hello {cookie.load('cookie3')}
                </button>
                <div className="absolute hidden group-hover:block bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg shadow-lg mt-2 right-0">
                  <a href="/Profile" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-t-lg">Profile</a>
                  <a href="/traveller/mytrips" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20">My Trips</a>
                  <a href="#" onClick={logout} className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-b-lg">Logout</a>
                </div>
              </div>
            )}
            <a
              href="/owner/login"
              className="bg-F7C948 text-white font-semibold px-6 py-2 rounded-full hover:bg-F7C948 hover:opacity-90 transition duration-300"
            >
              List your Property
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto flex flex-col items-center justify-center min-h-screen">
        <div className="text-center mb-2">
          <h1 className="text-3xl mb-2 uppercase text-[rgb(250,250,249)]">
            Book beach houses, cabins ,condos
          </h1>
          <h1 className="text-3xl uppercase text-[rgb(250,250,249)]">
            and more, worldwide
          </h1>
        </div>
        <div style={{
          backgroundColor:"rgba(0,0,0,0.3)"
        }} className="backdrop-blur-sm bg-opacity-70 shadow-2xl border-[0.5px] border-white/30 rounded-3xl p-6 w-[140vh] max-w-4xl ">

          <p
            className="text-2xl text-white text-center mt-2"
            style={{ fontFamily: '"Dancing Script", cursive, sans-serif' }}
          >
            LIST NOW OR
            <span
              className="ml-3 text-blue-500 "
              style={{ textShadow: '0 2px 4px rgba(0, 0, 255, 0.3)' }}
            >
              BOOK YOUR STAY
            </span>
            {" "}?
          </p><div className="grid grid-cols-6 gap-3 items-center">
            <input
              type="text"
              className="col-span-2 bg-white/50 bg-opacity-50 border-[0.5px] border-white/30 placeholder-gray-900 border-opacity-30 rounded-2xl p-2 text-black focus:outline-none focus:ring-2 focus:ring-F7C948 transition duration-300 text-sm md:text-base"
              placeholder="Where to?"
              onChange={searchLocationChangeHandler}
            />
            <input
              type="date"
              className="col-span-1 bg-white/50 bg-opacity-50 border-[0.5px] border-white/30 rounded-2xl p-2 text-black focus:outline-none focus:ring-2 focus:ring-F7C948 transition duration-300 text-sm"
              onChange={fromDateChangeHandler}
            />
            <input
              type="date"
              className="col-span-1 bg-white/50 bg-opacity-50 border-[0.5px] border-white/30 rounded-2xl p-2 text-black focus:outline-none focus:ring-2 focus:ring-F7C948 transition duration-300 text-sm"
              onChange={fromDateChangeHandler}
            />
            <input
              type="number"
              min="1"
              className="col-span-1 bg-white/50 bg-opacity-50 border rounded-2xl p-2 text-black placeholder-gray-900 focus:outline-none focus:ring-2 focus:ring-F7C948 transition duration-300 text-sm"
              placeholder="Guests"
              onChange={guestsChangeHandler}
            />
            <div className="col-span-1 flex justify-end">
              <div
                onClick={searchProperty}
                className="bg-blue-500 text-white font-semibold w-32 h-11 rounded-2xl shadow-xl hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-F7C948 focus:ring-opacity-50 bg-opacity-90 backdrop-blur-sm border-[1px] border-white/30 border-opacity-20 hover:bg-opacity-100 hover:-translate-y-1 flex items-center justify-center"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>


          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default Home;