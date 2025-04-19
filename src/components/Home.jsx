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
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

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
  };

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
  };

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
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(/easystay6.webp)` }}>
      {/* Navbar */}
      <nav className="z-20 bg-opacity-30 backdrop-blur-md border-b border-yellow-300 shadow-xl font-poppins">
  <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
    <h1 className="text-2xl sm:text-lg font-semibold text-white animate-glow tracking-widest">EaseStay</h1>

    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 w-full sm:w-auto">
      <button className="text-white font-semibold navbar-button w-full sm:w-auto text-center">Trip Boards</button>

      {!isTravelerLoggedIn ? (
        <div className="relative w-full sm:w-auto">
          <button
            onClick={toggleDropdown}
            className="text-white font-semibold px-4 py-2 rounded-lg navbar-button w-full sm:w-auto text-center"
          >
            Login
          </button>
          {showDropdown && (
           <div className="absolute right-0 mt-2 w-full sm:min-w-[200px] sm:w-auto flex flex-col bg-white/10 backdrop-blur-md border border-yellow-300 rounded-xl shadow-2xl z-50 animate-fadeIn overflow-hidden">
           <a
             href="/traveller/login"
             className="px-5 py-3 text-white hover:bg-yellow-500/20 transition-colors duration-300 border-b border-yellow-200 tracking-wide"
           >
             Traveller Login
           </a>
           <a
             href="/owner/login"
             className="px-5 py-3 text-white hover:bg-yellow-500/20 transition-colors duration-300 tracking-wide"
           >
             Owner Login
           </a>
         </div>
         
          )}
        </div>
      ) : (
        <div className="relative group w-full sm:w-auto">
          <button className="text-white font-semibold navbar-button w-full sm:w-auto text-center">
            Hello {cookie.load('cookie3')}
          </button>
          <div className="absolute hidden group-hover:flex flex-col glassmorphic-dropdown mt-2 right-0 w-full sm:min-w-[180px] sm:w-auto z-50">
            <a href="/Profile" className="glassmorphic-dropdown-item border-b">Profile</a>
            <a href="/traveller/mytrips" className="glassmorphic-dropdown-item border-b">My Trips</a>
            <a href="#" onClick={logout} className="glassmorphic-dropdown-item">Logout</a>
          </div>
        </div>
      )}

      <a
        href="/owner/login"
        className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-semibold px-6 py-2 rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 w-full sm:w-auto text-center"
      >
        Turn Space Profitable
      </a>
    </div>
  </div>
</nav>


      {/* Main Content */}
      <div className="container text-white mx-auto flex flex-col items-center justify-center px-4 py-10">
        <p className="text-2xl md:text-4xl font-semibold mb-2 text-black text-center uppercase">
          worldwide rental homes, cabins, condos aur beach houses!
        </p>
        <p className="text-2xl md:text-4xl font-bold text-yellow-300 text-center">
          Ghar se door, ek naya ghar
        </p>
        <div className="backdrop-blur-sm bg-opacity-70 shadow-2xl border-[0.5px] border-white/30 rounded-3xl p-4 sm:p-6 w-full max-w-4xl mt-6">
          <p className="text-lg sm:text-2xl text-white text-center font-cursive mb-4">
            LIST NOW OR <span className="ml-2 text-blue-500" style={{ textShadow: '0 2px 4px rgba(0, 0, 255, 0.3)' }}>BOOK YOUR STAY</span>?
          </p>
          <form onSubmit={searchProperty}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
              <input type="text" placeholder="Where to?" onChange={(e) => setSearchLocation(e.target.value)} className="bg-white/70 border rounded-xl p-2 text-black col-span-2" />
              <input type="date" onChange={(e) => setFromDate(e.target.value)} className="bg-white/70 border rounded-xl p-2 text-black col-span-1" />
              <input type="date" onChange={(e) => setToDate(e.target.value)} className="bg-white/70 border rounded-xl p-2 text-black col-span-1" />
              <input type="number" min="1" onChange={(e) => setGuests(e.target.value)} placeholder="Guests" className="bg-white/70 border rounded-xl p-2 text-black col-span-1" />
              <button type="submit" className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-xl p-2 col-span-1">Search</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
