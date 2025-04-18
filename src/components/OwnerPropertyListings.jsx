import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';
import homeawayLogo from '/homeaway_logo.png';

class OwnerPropertyListings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            isLoading: true,
            allListings: [{}],
            detailsFetched: false,
        };

        this.renderListings = this.renderListings.bind(this);
        this.logout = this.logout.bind(this);
    }

    logout = () => {
        cookie.remove('cookie1', { path: '/' });
        cookie.remove('cookie2', { path: '/' });
        cookie.remove('cookie3', { path: '/' });
        console.log("All cookies removed!");
        window.location = "/";
    }

    componentWillMount() {
        const data = {
            listedBy: cookie.load('cookie2'),
        };
        console.log("Calling Property Listings in Will Mount");
        console.log(data);
        axios.post('https://easy-stay-backend.vercel.app/homeaway/owner/propertylistings', data)
            .then(response => {
                console.log("Status Code : ", response.status);
                if (response.status === 200) {
                    console.log(response.data)
                    this.setState({
                        allListings: response.data,
                        isLoading: false
                    });
                }
            });
    }

    renderListings() {
        const { allListings } = this.state;
        const { isLoading } = this.state;
        if (!isLoading) {
            console.log("generating content...")
            return Object.keys(allListings).map((i) => {
                return <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-6 mb-6 shadow-lg" key={allListings[i].ID}>
                    <div className="flex flex-col md:flex-row items-start">
                        <a href="#" target="_parent" className="mr-4 mb-4 md:mb-0">
                            <img alt="Thumbnail View of Property" className="w-32 h-32 object-cover rounded-lg" src={`http://localhost:3001/uploads/${allListings[0].image1}`} />
                        </a>
                        <div className="flex-1">
                            <h4 className="text-xl font-semibold text-white mb-2">{allListings[i].headline}</h4>
                            <h6 className="text-gray-200 mb-4">{allListings[i].description}</h6>

                            <ul className="flex flex-wrap gap-2 mb-4">
                                <li className="flex items-center">
                                    <img alt="Pindrop Sign" style={{ height: "20px" }} src={require('./pindrop.png')} className="mr-1" />
                                </li>
                                <li className="text-white">{allListings[i].streetAddress}</li>
                                <li className="text-white">{allListings[i].city}</li>
                                <li className="text-white">{allListings[i].state}</li>
                                <li className="text-white">{allListings[i].country}</li>
                            </ul>

                            <ul className="flex flex-wrap gap-2 mb-4">
                                <li className="text-white">{allListings[i].propertyType}</li>
                                <li className="text-white">•</li>
                                <li className="text-white">{allListings[i].bedrooms} BR</li>
                                <li className="text-white">•</li>
                                <li className="text-white">{allListings[i].bathrooms} BA</li>
                                <li className="text-white">•</li>
                                <li className="text-white">Sleeps {allListings[i].sleeps}</li>
                                <li className="text-white">•</li>
                                <li className="text-white">Min Stay {allListings[i].minStay}</li>
                            </ul>

                            <span className="text-white">
                                <strong className="text-xl"><span>${allListings[i].currency + ' ' + allListings[i].baseRate + ' /night'}</span></strong>
                            </span>

                            {allListings[i].bookedBy.length > 0 ? (
                                <div className="mt-4">
                                    <table className="w-full text-white">
                                        <thead>
                                            <tr className="border-b border-white border-opacity-20">
                                                <th className="py-2 text-left">Booking ID</th>
                                                <th className="py-2 text-left">Booked By</th>
                                                <th className="py-2 text-left">From</th>
                                                <th className="py-2 text-left">To</th>
                                                <th className="py-2 text-left">No. Of Guests</th>
                                                <th className="py-2 text-left">Price</th>
                                            </tr>
                                        </thead>
                                        {this.renderbookingTable(allListings[i])}
                                    </table>
                                </div>
                            ) : (
                                <div className="mt-4 text-center text-white">
                                    <h2>No Booking History!</h2>
                                </div>
                            )}
                        </div>
                    </div>
                </div>;
            });
        }
    }

    renderbookingTable(listingData) {
        const { isLoading } = this.state;
        if (!isLoading) {
            console.log("generating table content...")
            return Object.keys(listingData.bookedBy).map((j) => {
                return <tbody key={j}>
                    <tr className="border-b border-white border-opacity-20">
                        <td className="py-2">{listingData.bookingID[j]}</td>
                        <td className="py-2">{listingData.bookedBy[j]}</td>
                        <td className="py-2">{listingData.bookedFrom[j]}</td>
                        <td className="py-2">{listingData.bookedTo[j]}</td>
                        <td className="py-2">{listingData.noOfGuests[j]}</td>
                        <td className="py-2">$ {listingData.price[j]}</td>
                    </tr>
                </tbody>;
            });
        }
    }

    render() {
        let redirectVar = null;
        console.log(cookie.load('cookie1'))
        if (cookie.load('cookie1') !== 'ownercookie') {
            redirectVar = <Navigate to="/owner/login" />;
        }

        if (this.state.allListings.length === 0) {
            this.state.detailsFetched = false
        } else {
            this.state.detailsFetched = true
        }

        return (
            <div className="min-h-screen text-white" style={{ 
                backgroundColor: '#1A535C', 
                backgroundImage: `url(/homepage_background.png)`, 
                backgroundSize: 'cover', 
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
                {redirectVar}
                {/* Navigation Bar */}
                <nav className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <a href="#" className="flex items-center">
                            <img src={homeawayLogo} alt="Homeaway Logo" className="h-8" />
                        </a>
                        <div className="relative group">
                            <button className="text-white font-semibold hover:text-F7C948 transition duration-300">
                                Hello {cookie.load('cookie3')}
                            </button>
                            <div className="absolute hidden group-hover:block bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg shadow-lg mt-2 right-0">
                                <a href="/Profile" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-t-lg">Profile</a>
                                <a href="/owner/propertypost" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20">Post Property</a>
                                <a href="#" onClick={this.logout} className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-b-lg">Logout</a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="container mx-auto pt-24 pb-12 flex flex-col items-center justify-center min-h-screen">
                    {this.state.detailsFetched ? (
                        <div className="w-full max-w-4xl">
                            <div className="space-y-6">
                                {this.renderListings()}
                            </div>
                        </div>
                    ) : (
                        <div className="text-center text-white">
                            <h1 className="text-2xl">You have not listed any Property!</h1>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default OwnerPropertyListings;