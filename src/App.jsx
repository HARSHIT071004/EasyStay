import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import PropertySearchResults from './components/PropertySearchResults';
import PropertyDetails from './components/PropertyDetails';
import TravellerLogin from './components/TravellerLogin';
import TravellerTripListings from './components/TravellerTripListings';
import OwnerLogin from './components/OwnerLogin';
import OwnerPropertyPost from './components/OwnerPropertyPost';
import OwnerPropertyListings from './components/OwnerPropertyListings';
import Signup1 from './components/Signup1';
import Signup2 from './components/Signup2';
import OwnerSignup1 from './components/OwnerSignup1';
import OwnerSignup2 from './components/OwnerSignup2';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <div className="container-fluid ">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/property/searchresult" element={<PropertySearchResults propDummy={50} />} />
          <Route path="/property/:id/:location/:fromdate/:todate/:noOfGuests" element={<PropertyDetails />} />
          <Route path="/traveller/login" element={<TravellerLogin />} />
          <Route path="/traveller/signup1" element={<Signup1 />} />
          <Route path="/traveller/signup2" element={<Signup2 />} />
          <Route path="/traveller/mytrips" element={<TravellerTripListings />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/owner/signup1" element={<OwnerSignup1 />} />
          <Route path="/owner/signup2" element={<OwnerSignup2 />} />
          <Route path="/owner/propertypost" element={<OwnerPropertyPost />} />
          <Route path="/owner/mylistings" element={<OwnerPropertyListings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; // Exporting App component
