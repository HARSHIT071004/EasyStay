import React, { Component } from 'react';
import axios from 'axios';
import cookie from 'react-cookies';
import ReactDropzone from "react-dropzone";
import SweetAlert from 'react-bootstrap-sweetalert';
import { Navigate } from 'react-router-dom';
import homeawayLogo from '/homeaway_logo.png';

const acceptedFileTypes = 'image/x-png, image/png, image/jpg, image/jpeg, image/gif';
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => { return item.trim() });
const imageMaxSize = 1000000000; // bytes

class OwnerPropertyPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: cookie.load('cookie3'),
            startDate: new Date(),
            endDate: new Date(),
            sleeps: 1,
            headline: "",
            streetAddress: "",
            city: "",
            state: "",
            country: "",
            zipcode: 0,
            description: "",
            propertyType: "Family Home",
            amenities: "",
            bedrooms: 0,
            bathrooms: 0,
            minStay: 0,
            currency: "USD",
            baseRate: 0,
            uploadedPhotos: [],
            uploadedPhotoLimit: 5,
            previewuploadedPhotos: [],
            inputPhotos: [],
            alert: null,
            posted: false,
        };
        this.logout = this.logout.bind(this);
        this.streetAddressChangeHandler = this.streetAddressChangeHandler.bind(this);
        this.cityChangeHandler = this.cityChangeHandler.bind(this);
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.countryChangeHandler = this.countryChangeHandler.bind(this);
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this);
        this.amenitiesChangeHandler = this.amenitiesChangeHandler.bind(this);
        this.minStayChangeHandler = this.minStayChangeHandler.bind(this);
        this.baseRateChangeHandler = this.baseRateChangeHandler.bind(this);
        this.descriptionChangeHandler = this.descriptionChangeHandler.bind(this);
        this.propertyTypeChangeHandler = this.propertyTypeChangeHandler.bind(this);
        this.bedroomsChangeHandler = this.bedroomsChangeHandler.bind(this);
        this.sleepsChangeHandler = this.sleepsChangeHandler.bind(this);
        this.bathroomsChangeHandler = this.bathroomsChangeHandler.bind(this);
        this.startDateChangeHandler = this.startDateChangeHandler.bind(this);
        this.endDateChangeHandler = this.endDateChangeHandler.bind(this);
        this.currencyChangeHandler = this.currencyChangeHandler.bind(this);
        this.headlineChangeHandler = this.headlineChangeHandler.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.addProperty = this.addProperty.bind(this);
        this.handleValidation = this.handleValidation.bind(this);
        this.submitListing = this.submitListing.bind(this);
    }

    streetAddressChangeHandler = (e) => { this.setState({ streetAddress: e.target.value }) }
    cityChangeHandler = (e) => { this.setState({ city: e.target.value }) }
    stateChangeHandler = (e) => { this.setState({ state: e.target.value }) }
    countryChangeHandler = (e) => { this.setState({ country: e.target.value }) }
    zipcodeChangeHandler = (e) => { this.setState({ zipcode: e.target.value }) }
    headlineChangeHandler = (e) => { this.setState({ headline: e.target.value }) }
    descriptionChangeHandler = (e) => { this.setState({ description: e.target.value }) }
    amenitiesChangeHandler = (e) => { this.setState({ amenities: e.target.value }) }
    minStayChangeHandler = (e) => { this.setState({ minStay: e.target.value }) }
    baseRateChangeHandler = (e) => { this.setState({ baseRate: e.target.value }) }
    propertyTypeChangeHandler = (e) => { this.setState({ propertyType: e.target.value }) }
    bedroomsChangeHandler = (e) => { this.setState({ bedrooms: e.target.value }) }
    bathroomsChangeHandler = (e) => { this.setState({ bathrooms: e.target.value }) }
    sleepsChangeHandler = (e) => { this.setState({ sleeps: e.target.value }) }
    currencyChangeHandler = (e) => { this.setState({ currency: e.target.value }) }
    startDateChangeHandler = (e) => this.setState({ startDate: e.target.value })
    endDateChangeHandler = (e) => this.setState({ endDate: e.target.value })

    logout = () => {
        cookie.remove('cookie1', { path: '/' });
        cookie.remove('cookie2', { path: '/' });
        cookie.remove('cookie3', { path: '/' });
        console.log("All cookies removed!");
        window.location = "/";
    }

    handleValidation() {
        let formIsValid = true;

        // From Date
        if (!this.state.startDate) {
            formIsValid = false;
            alert("From Date is a Required field");
            console.log("From Date cannot be empty");
        } else {
            var CurrentDate = new Date();
            CurrentDate.setHours(0, 0, 0, 0);
            var GivenstartDate = new Date(this.state.startDate.replace(/-/g, '\/'));
            if (GivenstartDate < CurrentDate) {
                alert('From date should be greater than the current date.');
                formIsValid = false;
            }
        }

        // End Date
        if (!this.state.endDate) {
            formIsValid = false;
            alert("To Date is a Required field");
            console.log("To Date cannot be empty");
        } else {
            var CurrentDate = new Date();
            CurrentDate.setHours(0, 0, 0, 0);
            var GivenendDate = new Date(this.state.endDate.replace(/-/g, '\/'));

            if (GivenendDate < CurrentDate) {
                alert('To date should be greater than the current date.');
                formIsValid = false;
            } else {
                if (GivenendDate <= GivenstartDate) {
                    alert('To date should be greater than from date.');
                    formIsValid = false;
                }
            }
        }

        // Number of guests
        if (!this.state.sleeps) {
            formIsValid = false;
            alert("Number of Guests is a Required field");
            console.log("Number of guests cannot be empty");
        }

        return formIsValid;
    }

    submitListing = () => {
        console.log("In submit")
        if (this.handleValidation()) {
            console.log("in setting alert");
            const getAlert = () => (
                <SweetAlert
                    success
                    title="Congratulations!!"
                    onConfirm={() => this.addProperty()}
                >
                    You successfully listed your property!!!
                </SweetAlert>
            );

            this.setState({
                alert: getAlert(),
            })
        }
    }

    addProperty = (e) => {
        console.log("In Add Property");
        console.log(this.state.startDate);
        var data = {
            listedBy: cookie.load('cookie2'),
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            streetAddress: this.state.streetAddress,
            city: this.state.city,
            state: this.state.state,
            country: this.state.country,
            zipcode: this.state.zipcode,
            headline: this.state.headline,
            description: this.state.description,
            propertyType: this.state.propertyType,
            bedrooms: this.state.bedrooms,
            sleeps: this.state.sleeps,
            bathrooms: this.state.bathrooms,
            baseRate: this.state.baseRate,
            currency: this.state.currency,
            minStay: this.state.minStay,
            amenities: this.state.amenities,
        }

        var formdata = new FormData();

        for (var i = 0; i < this.state.uploadedPhotos.length; i++) {
            formdata.append('uploadedPhoto', this.state.uploadedPhotos[i]);
            console.log(this.state.uploadedPhotos[i]);
        }

        Object.keys(data).forEach(function (key) {
            formdata.append(key, data[key]);
        });

        // Display the key/value pairs
        for (var pair of formdata.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        axios.defaults.withCredentials = true;
        axios.post('http://localhost:3001/homeaway/owner/listproperty', formdata)
            .then(response => {
                if (response.data) {
                    console.log("Successful post property");
                    this.setState({ posted: true })
                }
            })
            .catch(error => {
                console.log("Post Property Server error")
            })
    }

    verifyFile = (files) => {
        if (files) {
            const currentFile = files;
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            if (currentFileSize > imageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        }
    }

    onDrop = (selectedFiles, rejectedFiles) => {
        let index;
        for (index = 0; index < selectedFiles.length; ++index) {
            const selectedfile = selectedFiles[index];
            const rejectedfile = rejectedFiles[index];
            if (rejectedfile) {
                this.verifyFile(rejectedfile)
            }

            if (selectedfile) {
                const isVerified = this.verifyFile(selectedfile)
                if (isVerified) {
                    if (this.state.previewuploadedPhotos.length < this.state.uploadedPhotoLimit) {
                        this.setState(({ previewuploadedPhotos }) => ({
                            previewuploadedPhotos: previewuploadedPhotos.concat(selectedfile)
                        }))

                        console.log(this.state.selectedfile);

                        this.setState({
                            uploadedPhotos: this.state.uploadedPhotos.concat(selectedfile)
                        })

                        console.log(this.state.uploadedPhotos);

                    } else {
                        console.log(this.state.previewuploadedPhotos.length);
                        alert("You can upload a maximum of 5 images only!")
                    }
                }
            }
        }
    }

    render() {
        if (cookie.load('cookie1') !== 'ownercookie') {
            return <Navigate to="/owner/login" replace />;
        }

        if (this.state.posted) {
            return <Navigate to="/owner/mylistings" replace />;
        }

        return (
            <div className="min-h-screen text-white" style={{
                backgroundColor: '#1A535C',
                backgroundImage: `url(/homepage_background.png)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed'
            }}>
                {/* Navigation Bar */}
                <nav className="fixed top-0 left-0 right-0 z-10 bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 shadow-lg">
                    <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                        <a href="#" className="flex items-center">
                            <img src={homeawayLogo} alt="Homeaway Logo" className="h-8" />
                        </a>
                        <div className="relative group">
                            <button className="text-white font-semibold hover:text-F7C948 transition duration-300">
                                Hello {this.state.name}
                            </button>
                            <div className="absolute hidden group-hover:block bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-lg shadow-lg mt-2 right-0">
                                <a href="/Profile" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-t-lg">Profile</a>
                                <a href="/owner/mylistings" className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20">My Listings</a>
                                <a href="#" onClick={this.logout} className="block px-4 py-2 text-white hover:bg-F7C948 hover:bg-opacity-20 rounded-b-lg">Logout</a>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Main Content */}
                <div className="container mx-auto pt-24 pb-12 flex flex-col items-center justify-center min-h-screen">
                    <div className="w-full max-w-4xl space-y-6">
                        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-6 shadow-lg">
                            <a href="#collapseOne" className="text-xl font-semibold text-white hover:text-F7C948">Property Location</a>
                            <div id="collapseOne" className="mt-4">
                                <h2 className="text-2xl font-semibold text-white mb-4">Verify the location of your rental</h2>
                                <hr className="border-white border-opacity-20 mb-6" />
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input
                                        id="streetAddress"
                                        name="streetAddress"
                onChange={this.streetAddressChangeHandler}
                value={this.state.streetAddress}
                placeholder="Street Address"
                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                required
                type="text"
                                    />
                                    <input
                name="city"
                onChange={this.cityChangeHandler}
                value={this.state.city}
                placeholder="City"
                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                required
                type="text"
                                    />
                                    <select
                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-F7C948"
                onChange={this.stateChangeHandler}
                value={this.state.state}
                                    >
                                        <option value="" disabled hidden>State</option>
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
                id="zipcode"
                name="zipcode"
                onChange={this.zipcodeChangeHandler}
                value={this.state.zipcode}
                placeholder="Zip Code"
                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                required
                type="text"
                                    />
                                    <input
                name="country"
                onChange={this.countryChangeHandler}
                value={this.state.country}
                placeholder="Country"
                className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                required
                type="text"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-6 shadow-lg">
                            <a href="#collapseTwo" className="text-xl font-semibold text-white hover:text-F7C948">Property Details</a>
                            <div id="collapseTwo" className="mt-4">
                                <h2 className="text-2xl font-semibold text-white mb-4">Describe your property</h2>
                                <hr className="border-white border-opacity-20 mb-6" />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="col-span-2">
                                        <h6 className="text-white mb-4">Start out with a detailed summary of your property:</h6>
                                        <input
                                            id="headline"
                                            name="headline"
                                            onChange={this.headlineChangeHandler}
                                            value={this.state.headline}
                                            placeholder="Headline"
                                            className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 mb-4 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                            required
                                            type="text"
                                        />
                                        <textarea
                                            id="textarea"
                                            placeholder="Property Description"
                                            onChange={this.descriptionChangeHandler}
                                            value={this.state.description}
                                            name="textarea"
                                            rows="5"
                                            className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 mb-4 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                        ></textarea>
                                        <textarea
                                            id="textarea"
                                            placeholder="Amenities"
                                            onChange={this.amenitiesChangeHandler}
                                            value={this.state.amenities}
                                            name="textarea"
                                            rows="3"
                                            className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 mb-4 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                        ></textarea>
                                        <select
                                            name="propertyType"
                                            onChange={this.propertyTypeChangeHandler}
                                            value={this.state.propertyType}
                                            className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-F7C948"
                                        >
                                            <option value="" disabled hidden>Property Type</option>
                                            <option value="Home">Family Home</option>
                                            <option value="Studio">Studio</option>
                                            <option value="Villa">Villa</option>
                                            <option value="Apartment">Apartment</option>
                                        </select>
                                    </div>
                                    <div>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="text-white mb-2">Bedrooms</label>
                                                <input
                                                    onChange={this.bedroomsChangeHandler}
                                                    value={this.state.bedrooms}
                                                    type="number"
                                                    min="0"
                                                    className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-white mb-2">Accommodates</label>
                                                <input
                                                    onChange={this.sleepsChangeHandler}
                                                    value={this.state.sleeps}
                                                    type="number"
                                                    min="1"
                                                    className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-white mb-2">Bathrooms</label>
                                                <input
                                                    onChange={this.bathroomsChangeHandler}
                                                    value={this.state.bathrooms}
                                                    type="number"
                                                    min="0"
                                                    className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-6 shadow-lg">
                            <a href="#collapseFour" className="text-xl font-semibold text-white hover:text-F7C948">Photos</a>
                            <div id="collapseFour" className="mt-4">
                                <h2 className="text-2xl font-semibold text-white mb-4">Add up to 5 photos of your property</h2>
                                <hr className="border-white border-opacity-20 mb-4" />
                                <p className="text-white text-sm mb-4">Showcase your property’s best features (no pets or people, please). Requirements: JPEG, at least 1920 x 1080 pixels, less than 20MB file size, 2 photos minimum.</p>
                                {this.state.previewuploadedPhotos.length > 0 && (
                                    <div className="mb-4">
                                        <h2 className="text-xl text-white mb-2">Preview of {this.state.previewuploadedPhotos.length} uploaded files</h2>
                                        <div className="flex flex-wrap gap-4">
                                            {this.state.previewuploadedPhotos.map((selectedfile) => (
                                                <img
                                                    key={selectedfile.name}
                                                    className="w-32 h-32 object-cover rounded-lg"
                                                    src={selectedfile.preview}
                                                    alt="Property Preview"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <h2 className="text-xl text-white mb-2">Uploaded {this.state.uploadedPhotos.length} Files</h2>
                                <ReactDropzone
                                    name="uploadedPhoto"
                                    onDrop={this.onDrop}
                                    accept={acceptedFileTypes}
                                    multiple={true}
                                    maxSize={imageMaxSize}
                                    className="w-full bg-white bg-opacity-20 border-2 border-white border-dashed border-opacity-30 rounded-lg p-6 text-white text-center cursor-pointer hover:bg-opacity-30 transition duration-300"
                                >
                                    Drop your images here!!
                                </ReactDropzone>
                            </div>
                        </div>
                        <div className="bg-white bg-opacity-10 backdrop-blur-md border border-white border-opacity-20 rounded-xl p-6 shadow-lg">
                            <a href="#collapseFive" className="text-xl font-semibold text-white hover:text-F7C948">Pricing and Availability</a>
                            <div id="collapseFive" className="mt-4">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="col-span-1">
                                        <h2 className="text-2xl font-semibold text-white mb-4">Currency</h2>
                                        <hr className="border-white border-opacity-20 mb-4" />
                                        <input
                                            type="text"
                                            onChange={this.baseRateChangeHandler}
                                            value={this.state.baseRate}
                                            className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 mb-4 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                            placeholder="Enter value"
                                        />
                                        <h2 className="text-2xl font-semibold text-white mb-4">Nightly Base Rate</h2>
                                        <hr className="border-white border-opacity-20 mb-4" />
                                        <select
                                            id="currency"
                                            name="currency"
                                            onChange={this.currencyChangeHandler}
                                            value={this.state.currency}
                                            className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-F7C948"
                                        >
                                            <option value="" disabled hidden>Currency</option>
                                            <option value="USD">US Dollar (USD)</option>
                                            <option value="AUD">Australian Dollar (AUD)</option>
                                            <option value="EUR">Euros (EUR)</option>
                                            <option value="GBP">Great British Pound (GBP)</option>
                                            <option value="CAD">Canadian Dollar (CAD)</option>
                                            <option value="NZD">New Zealand Dollar (NZD)</option>
                                            <option value="BRL">Brazil Real (BRL)</option>
                                        </select>
                                        <h2 className="text-2xl font-semibold text-white mb-4">Minimum Stay</h2>
                                        <hr className="border-white border-opacity-20 mb-4" />
                                        <input
                                            onChange={this.minStayChangeHandler}
                                            value={this.state.minStay}
                                            className="w-full bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-F7C948"
                                            type="number"
                                            min="1"
                                        /> Night
                                    </div>
                                    <div className="col-span-2 text-center">
                                        <h6 className="text-white mb-4">Already know when you would like your property to be available?</h6>
                                        <h2 className="text-2xl font-semibold text-white mb-4">Select dates for setting up your availability</h2>
                                        <hr className="border-white border-opacity-20 mb-4" />
                                        <div className="flex justify-center space-x-4 mb-4">
                                            <input
                                                style={{ width: "130px" }}
                                                onChange={this.startDateChangeHandler}
                                                type="date"
                                                name="fromdate"
                                                className="bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-F7C948"
                                            />
                                            <input
                                                style={{ width: "130px" }}
                                                onChange={this.endDateChangeHandler}
                                                type="date"
                                                name="todate"
                                                className="bg-transparent border border-white border-opacity-30 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-F7C948"
                                            />
                                        </div>
                                        <p className="text-white mb-4">By clicking Submit, you agree to our Terms & Conditions, Visitor Agreement and Privacy Policy.</p>
                                        <button
                                            type="button"
                                            onClick={this.submitListing}
                                            className="bg-F7C948 text-white font-semibold py-2 px-6 rounded-lg hover:bg-F7C948 hover:opacity-90 transition duration-300"
                                        >
                                            Submit
                                        </button>
                                        {this.state.alert}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default OwnerPropertyPost;