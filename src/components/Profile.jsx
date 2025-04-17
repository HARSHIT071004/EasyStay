import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import { Navigate } from 'react-router-dom';
import homeawayLogo from '/homeaway_logo.png';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { profiledata: [], year: "" };

        this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
        this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
        this.aboutmeChangeHandler = this.aboutmeChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.companyChangeHandler = this.companyChangeHandler.bind(this);
        this.schoolChangeHandler = this.schoolChangeHandler.bind(this);
        this.hometownChangeHandler = this.hometownChangeHandler.bind(this);
        this.genderChangeHandler = this.genderChangeHandler.bind(this);
        this.phoneChangeHandler = this.phoneChangeHandler.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
    }

    logout = () => {
        cookie.remove('cookie1', { path: '/' });
        cookie.remove('cookie2', { path: '/' });
        cookie.remove('cookie3', { path: '/' });
        console.log("All cookies removed!");
        window.location = "/";
    }

    componentWillMount() {
        if (cookie.load('cookie1')) {
            var input_email = cookie.load('cookie2');
            console.log(input_email);
            const data = { email: input_email };
            axios.post('http://localhost:3001/homeaway/profile', data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response.data);
                        this.setState({
                            profiledata: response.data
                        });
                        this.refs.myfirstname.value = this.state.profiledata[0].firstname;
                        this.state.firstname = this.state.profiledata[0].firstname;
                        this.refs.mylastname.value = this.state.profiledata[0].lastname;
                        this.state.lastname = this.state.profiledata[0].lastname;
                        this.refs.createdyear.value = this.state.profiledata[0].created;
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert("Cannot fetch details");
                    this.setState({
                        authFlag: false
                    });
                });
        }
    }

    firstnameChangeHandler = (e) => { this.setState({ firstname: e.target.value }) }
    lastnameChangeHandler = (e) => { this.setState({ lastname: e.target.value }) }
    aboutmeChangeHandler = (e) => { this.setState({ aboutMe: e.target.value }) }
    cityChangeHandler = (e) => { this.setState({ city: e.target.value }) }
    stateChangeHandler = (e) => { this.setState({ state: e.target.value }) }
    countryChangeHandler = (e) => { this.setState({ country: e.target.value }) }
    companyChangeHandler = (e) => { this.setState({ company: e.target.value }) }
    schoolChangeHandler = (e) => { this.setState({ school: e.target.value }) }
    hometownChangeHandler = (e) => { this.setState({ hometown: e.target.value }) }
    genderChangeHandler = (e) => { this.setState({ gender: e.target.value }) }
    phoneChangeHandler = (e) => { this.setState({ phone: e.target.value }) }

    handleValidation() {
        let formIsValid = true;

        if (!this.state.firstname) {
            formIsValid = false;
            alert("First Name is a Required field");
            console.log("First name cannot be empty");
        }

        if (!this.state.lastname) {
            formIsValid = false;
            alert("Last Name is a Required field");
            console.log("Last name cannot be empty");
        }

        return formIsValid;
    }

    saveChanges(event) {
        console.log("Inside save form");
        event.preventDefault();
        if (this.handleValidation()) {
            console.log("Profile Form data submitted");
            var input_email = cookie.load('cookie2');
            console.log(input_email);
            const data = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                aboutMe: this.state.aboutMe,
                city: this.state.city,
                state: this.state.state,
                country: this.state.country,
                company: this.state.company,
                school: this.state.school,
                hometown: this.state.hometown,
                gender: this.state.gender,
                phone: this.state.phone,
                email: input_email,
            }

            console.log(data);
            axios.defaults.withCredentials = true;
            axios.post('http://localhost:3001/homeaway/profilesave', data)
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response.data);
                        this.setState({ profiledata: response.data });
                        alert("Profile Data was successfully saved!");
                    }
                })
                .catch(error => {
                    console.log("Error is:", error);
                    alert("Profile data save error!");
                });
        }
    }

    render() {
        let redirectVar = null;
        console.log(cookie.load('cookie1'));
        if (!cookie.load('cookie1')) {
            redirectVar = <Navigate to="/" />;
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
                        <a href="/" className="flex items-center">
                            <img src={homeawayLogo} alt="Homeaway Logo" className="h-8" />
                        </a>
                        <div className="relative group">
                            <button className="text-white font-semibold hover:text-F7C948 transition duration-300">
                                Hello {cookie.load('cookie3')}
                            </button>
                            <div className="absolute hidden group-hover:block bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg shadow-lg mt-2 right-0">
                                {(cookie.load('cookie1') === 'travellercookie') ? (
                                    <>
                                        <a href="/traveller/mytrips" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-t-lg">My Trips</a>
                                        <a href="/" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20">Book My Trip</a>
                                        <a href="#" onClick={this.logout} className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-b-lg">Logout</a>
                                    </>
                                ) : (
                                    <>
                                        <a href="/owner/propertypost" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-t-lg">Post Property</a>
                                        <a href="/owner/mylistings" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20">My Listings</a>
                                        <a href="#" onClick={this.logout} className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-b-lg">Logout</a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container mx-auto pt-24 pb-12 flex flex-col items-center justify-center min-h-screen">
                    <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-2xl p-6 w-full max-w-md shadow-xl">
                        <div className="text-center space-y-4">
                            <h1 className="text-3xl font-semibold text-white">{cookie.load('cookie3')}</h1>
                            <h2 className="text-white">
                                <small>Member since{' '}
                                    <input
                                        id="year"
                                        ref="createdyear"
                                        type="text"
                                        readOnly
                                        className="bg-transparent border-none text-white focus:outline-none"
                                    />
                                </small>
                            </h2>
                            <h1 className="text-xl font-medium text-white"><small>Profile Information</small></h1>
                        </div>
                        <div className="space-y-6 mt-6">
                            <input
                                ref="myfirstname"
                                onChange={this.firstnameChangeHandler}
                                type="text"
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                name="firstname"
                                placeholder="First Name"
                                required
                            />
                            <input
                                ref="mylastname"
                                onChange={this.lastnameChangeHandler}
                                type="text"
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                name="lastname"
                                placeholder="Last Name or Initial"
                                required
                            />
                            <textarea
                                onChange={this.aboutmeChangeHandler}
                                type="text"
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 h-24 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                name="aboutme"
                                placeholder="About me"
                            />
                            <input
                                onChange={this.cityChangeHandler}
                                type="text"
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                name="city"
                                placeholder="City"
                            />
                            <select
                                onChange={this.stateChangeHandler}
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-F7C948"
                            >
                                <option value="" hidden>State</option>
                                <option value="Alabama">Alabama</option>
                                <option value="Alaska">Alaska</option>
                                <option value="Arizona">Arizona</option>
                                <option value="Arkansas">Arkansas</option>
                                <option value="California">California</option>
                                <option value="Colorado">Colorado</option>
                                <option value="Connecticut">Connecticut</option>
                                <option value="Delaware">Delaware</option>
                                <option value="District of Columbia">District of Columbia</option>
                                <option value="Florida">Florida</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Guam">Guam</option>
                                <option value="Hawaii">Hawaii</option>
                                <option value="Idaho">Idaho</option>
                                <option value="Illinois">Illinois</option>
                                <option value="Indiana">Indiana</option>
                                <option value="Iowa">Iowa</option>
                                <option value="Kansas">Kansas</option>
                                <option value="Kentucky">Kentucky</option>
                                <option value="Louisiana">Louisiana</option>
                                <option value="Maine">Maine</option>
                                <option value="Maryland">Maryland</option>
                                <option value="Massachusetts">Massachusetts</option>
                                <option value="Michigan">Michigan</option>
                                <option value="Minnesota">Minnesota</option>
                                <option value="Mississippi">Mississippi</option>
                                <option value="Missouri">Missouri</option>
                                <option value="Montana">Montana</option>
                                <option value="Nebraska">Nebraska</option>
                                <option value="Nevada">Nevada</option>
                                <option value="New Hampshire">New Hampshire</option>
                                <option value="New Jersey">New Jersey</option>
                                <option value="New Mexico">New Mexico</option>
                                <option value="New York">New York</option>
                                <option value="North Carolina">North Carolina</option>
                                <option value="North Dakota">North Dakota</option>
                                <option value="Northern Marianas Islands">Northern Marianas Islands</option>
                                <option value="Ohio">Ohio</option>
                                <option value="Oklahoma">Oklahoma</option>
                                <option value="Oregon">Oregon</option>
                                <option value="Pennsylvania">Pennsylvania</option>
                                <option value="Puerto Rico">Puerto Rico</option>
                                <option value="Rhode Island">Rhode Island</option>
                                <option value="South Carolina">South Carolina</option>
                                <option value="South Dakota">South Dakota</option>
                                <option value="Tennessee">Tennessee</option>
                                <option value="Texas">Texas</option>
                                <option value="Utah">Utah</option>
                                <option value="Vermont">Vermont</option>
                                <option value="Virginia">Virginia</option>
                                <option value="Virgin Islands">Virgin Islands</option>
                                <option value="Washington">Washington</option>
                                <option value="West Virginia">West Virginia</option>
                                <option value="Wisconsin">Wisconsin</option>
                                <option value="Wyoming">Wyoming</option>
                            </select>
                            <input
                                onChange={this.countryChangeHandler}
                                type="text"
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                name="country"
                                placeholder="Country"
                            />
                            <input
                                onChange={this.companyChangeHandler}
                                type="text"
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                name="company"
                                placeholder="Company"
                            />
                            <input
                                onChange={this.schoolChangeHandler}
                                type="text"
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                name="school"
                                placeholder="School"
                            />
                            <input
                                onChange={this.hometownChangeHandler}
                                type="text"
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                name="hometown"
                                placeholder="Hometown"
                            />
                            <select
                                value={this.state.gender}
                                onChange={this.genderChangeHandler}
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-F7C948"
                            >
                                <option value="" hidden>Gender</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="other">Other</option>
                            </select>
                            <h6 className="text-left text-white text-sm mt-1">This is never shared</h6>
                            <input
                                onChange={this.phoneChangeHandler}
                                type="text"
                                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                name="phone"
                                placeholder="Phone Number"
                            />
                            <button
                                onClick={this.saveChanges}
                                className="w-full bg-F7C948 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-F7C948 focus:ring-opacity-50 bg-opacity-90 hover:bg-opacity-100 hover:-translate-y-1 mt-6"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;