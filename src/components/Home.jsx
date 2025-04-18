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
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };
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
    <div className="min-h-screen w-full" style={{
      backgroundImage: `url(/easystay6.webp)`,
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundSize: 'cover'
    }}>
      {/* Navigation Bar */}
      <nav className=" z-20 bg-opacity-30 backdrop-blur-md border-b border-image-gradient shadow-xl">
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');
            .border-image-gradient {
              border-image: linear-gradient(to right, #f6e05e, #ecc94b) 1;
            }
            .glassmorphic-dropdown {
              background: rgba(0, 0, 0, 0.5);
              backdrop-filter: blur(12px);
              border: 1px solid rgba(255, 255, 255, 0.2);
              box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
              border-radius: 12px;
              overflow: hidden;
            }
            .glassmorphic-dropdown-item {
              font-family: 'Poppins', sans-serif;
              font-size: 0.875rem;
              font-weight: 500;
              color: white;
              padding: 10px 20px;
              transition: all 0.3s ease;
            }
            .glassmorphic-dropdown-item:hover {
              background: linear-gradient(to right, #f6e05e, #ecc94b);
              color: #1a202c;
              transform: translateX(4px);
            }
            .glassmorphic-dropdown-item.border-b {
              border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            .navbar-button {
              transition: all 0.3s ease;
            }
            .navbar-button:hover {
              transform: scale(1.05);
              color: #f6e05e;
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
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center tracking-widest">
            <h1 className="text-lg font-semibold text-white animate-glow" style={{ letterSpacing: '2px', fontFamily: '"Poppins", sans-serif' }}>
              EaseStay
            </h1>
          </a>
          <div className="flex items-center space-x-4">
            <button className="text-white font-semibold navbar-button">
              Trip Boards
            </button>
            {!isTravelerLoggedIn ? (
              <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white font-semibold px-4 py-2 rounded-lg navbar-button"
              >
                Login
              </button>
              {showDropdown && (
                <div className="absolute flex flex-col glassmorphic-dropdown mt-2 right-0 min-w-[180px] transition-all duration-300 z-50">
                  <a
                    href="/traveller/login"
                    className="glassmorphic-dropdown-item border-b"
                  >
                    Traveller Login
                  </a>
                  <a
                    href="/owner/login"
                    className="glassmorphic-dropdown-item"
                  >
                    Owner Login
                  </a>
                </div>
              )}
            </div>
            ) : (
              <div className="relative group">
                <button className="text-white font-semibold navbar-button">
                  Hello {cookie.load('cookie3')}
                </button>
                <div className="absolute hidden group-hover:flex flex-col glassmorphic-dropdown mt-2 right-0 min-w-[180px] transition-all duration-300 z-50">
                  <a href="/Profile" className="glassmorphic-dropdown-item border-b">Profile</a>
                  <a href="/traveller/mytrips" className="glassmorphic-dropdown-item border-b">My Trips</a>
                  <a href="#" onClick={logout} className="glassmorphic-dropdown-item">Logout</a>
                </div>
              </div>
            )}
            <a
              href="/owner/login"
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold px-6 py-2 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105"
            >
              Turn Space Profitable
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container text-white mx-auto flex flex-col items-center justify-center min-h-screen">
        <p className="text-4xl font-semibold mb-2 uppercase text-[rgb(0,0,0)]">
          worldwide rental homes, cabins, condos aur beach houses!
        </p>
        <br/>
        <p className="text-4xl font-bold text-[rgb(255,229,136)]">
          Ghar se door, ek naya ghar 
        </p>
        <div className="backdrop-blur-sm bg-opacity-70 shadow-2xl border-[0.5px] border-white/30 rounded-3xl p-6 w-[140vh] max-w-4xl">
          <p
            className="text-2xl text-white text-center mt-2"
            style={{ fontFamily: '"Dancing Script", cursive, sans-serif' }}
          >
            LIST NOW OR
            <span
              className="ml-3 text-blue-500"
              style={{ textShadow: '0 2px 4px rgba(0, 0, 255, 0.3)' }}
            >
              BOOK YOUR STAY
            </span>
            {" "}?
          </p>
          <div className="grid grid-cols-6 gap-3 items-center">
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
                  viewBox="0 24 24"
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
        </div>
      </div>
    </div>
  );
}

export default Home;