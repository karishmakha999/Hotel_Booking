import React, { Component } from 'react'
import { RoomContext } from '../context';
import { Link } from 'react-router-dom';
import moment from 'moment';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import defaultBcg from '../images/room-3.jpeg';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';




export default class Booknow extends Component {


    constructor (props){
        super(props);
        this.state = {
            
        slug: this.props.match.params.slug,
        defaultBcg,
        checkIn: new Date(),
        checkOut: new Date(),
        bookingId: null,    
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        firstNameError: "",
        lastNameError: "",
        emailError: "",
        phoneNumberError: ""        
        
}
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
    this.handleChangeStart = this.handleChangeStart.bind(this);
    }


    handleChangeStart(date) {
        this.setState({
        checkIn: date
        });
    }
    handleChangeEnd(date) {
        this.setState({
        checkOut: date
        });
    }


    handleChange = e =>{
        
        this.setState({[e.target.name]: e.target.value})
 
    }

    validate = () => {
        let isError = false;
        const errors = {
            firstNameError: "",
            lastNameError: "",
            emailError: "",
            phoneNumberError: ""
        }
 
        if(!this.state.firstName) {
            isError = true;
            errors.firstNameError = "Field Cannot be Blank"
        }
        if(!this.state.lastName) {
            isError = true;
            errors.lastNameError = "Field Cannot be Blank"
        }
        if (!this.state.email) {
            isError = true
         errors.emailError = "Email is required!";
       
       }
       if(this.state.phoneNumber < 10){
           isError = true;
         errors.phoneNumberError ="Mobile number must cantain 10 digits";
       }
       this.setState({
           ...this.state,
           ...errors
       });
       return isError;
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        const err = this.validate();
 
        if(!err) {
            this.setState({
                firstName: "",
                firstNameError: "",
                lastName: "",
                lastNameError: "",
                email: "",
                emailError: "",
                phoneNumber: "",
                phoneNumberError: ""
            }
            )
            this.props.history.push("/delay")
             
    }

}


   


    calculateDaysLeft(checkIn, checkOut) {
       var startDate = moment(checkIn,"MM-DD-YYYY")
       var endDate = moment(checkOut,"MM-DD-YYYY")
        return moment.duration(endDate.diff(startDate)).asDays();
    }
    static contextType = RoomContext;

    render() {
        const { getRoom } = this.context;
        const room = getRoom(this.state.slug);
        // var len = 10;
        // var random = parseInt((Math.random() * 9 + 1) * Math.pow(10,len-1), 10);
        
        const checkIn = this.state.checkIn    
        const checkOut = this.state.checkOut
        let checkinFormattedDate = moment(checkIn).format('MM-DD-YYYY')
        let checkoutFormattedDate = moment(checkOut).format('MM-DD-YYYY')
        const daysLeft = this.calculateDaysLeft(checkinFormattedDate, checkoutFormattedDate);
        


       
    if(!room){
        return (<div className="container roomerror">
            <div className="row my-5">
                <div className="col-md-6 col-12 mx-auto">
                    <div className="card shadow-lg border-0 p-4 error">
                        <h1 className="text-center display-4">SORRY</h1>
                        <h3>No such room could be found...</h3>
                        <Link to="/rooms" className="btn btn-warning mt-4 ">Back to Rooms</Link>
                    </div>
                </div>
            </div>
        </div>);
        }
        const {name,capacity,size,price,breakfast,pets,images} = room;
        const [mainImg, ...defaultBcg] = images;
        return (
         <div> 
             <Navbar/>
        <div className="container my-5">
            <div className="row">
                <div className="col-md-10 mx-auto col-12 card shadow-lg border-0 p-4">
                    <div>
                        <h1 className="display-4">Booking</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-12 my-auto">
                            <img src={mainImg || defaultBcg} className="img-fluid" alt="selected room" />
                        </div>
                        <div className="col-md-6 col-12 my-auto">
                            <h1>Rooms Details</h1>
                            <table className="table">
                                <thead className="thead-light">
                                    <tr>
                                        <th>Room Type</th>
                                        <td>{name}</td>
                                    </tr>
                                    <tr>
                                        <th>Capacity</th>
                                        <td>{capacity}</td>
                                    </tr>
                                    <tr>
                                        <th>Size</th>
                                        <td>{size} sqft.</td>
                                    </tr>
                                    <tr>
                                        <th>Breakfast</th>
                                        <td>{breakfast === true ? `Included`: `Not Included`}</td>
                                    </tr>
                                    <tr>
                                        <th>Pets</th>
                                        <td>{pets ===true ? `Allowed` : `Not Allowed`}</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                 
                    <div className="row">
                        <div className="col-md-6 col-12">
                            <mark>Please make sure Checkin time is from 9 am to 12 pm</mark>
                        </div>

                        <div className="col-md-6 col-12">
                            <h6 className="font-weight-bold">Price per day : <span className="badge badge-info">Rs {price}</span></h6>
                            
                        </div>
                    </div>
                    <form className='style' onSubmit={this.handleSubmit}>
                        <h2 style={{paddingLeft:'35%'}}>Enter the Details</h2>
                        <br/>
  <div className="form-group">
  <div className='row'>
  <div className="col-md-6 col-12">
    <label for="firstName">First Name</label>
    <input className="form-control" placeholder="Enter First Name*" type="text" name="firstName" onChange={this.handleChange} value={this.state.firstName} autoComplete="off"></input>
    { <p className='text-danger'>{this.state.firstNameError}</p> }
    </div>
  <div className="col-md-6 col-12">
  <div className="form-group">
    <label for="lastName">Last Name</label>
    <input className="form-control" placeholder="Enter Last Name*" type="text" name="lastName" onChange={this.handleChange} value={this.state.lastName} autoComplete="off"></input>
    { <p className='text-danger'>{this.state.lastNameError}</p> }
  </div>
  </div>
  </div>

  <div className='row'>
  <div className="col-md-6 col-12">
    <label for="exampleInputEmail1">Email</label>
    <input className="form-control" placeholder="Enter Email*" type="email" name="email" onChange={this.handleChange} value={this.state.email} autoComplete="off"></input>
    { <p className='text-danger'>{this.state.emailError}</p> }
    </div>
    <div className="col-md-6 col-12">
    <label for="phoneNumber">Phone Number</label>
    <input className="form-control" placeholder="Enter Phone Number*" type="number" name="phoneNumber" onChange={this.handleChange} value={this.state.phoneNumber} autoComplete="off"></input>
    { <p className='text-danger'>{this.state.phoneNumberError}</p> }
    </div>
</div>

</div>

<div className="row" style={{paddingTop:"10px"}}>
<div className="col-md-6 col-12">
<label htmlFor="Fromdate" className="font-weight-bolder mr-3">Check In </label><br/>
<DatePicker selected={this.state.checkIn} onChange={this.handleChangeStart} minDate={moment().toDate()} className="form-control" />
</div>
<div className="col-md-6 col-12">
<label htmlFor="Todate" className="font-weight-bolder mr-3">Check Out </label><br/>
<DatePicker selected={this.state.checkOut} onChange={this.handleChangeEnd} minDate={moment().toDate()} className="form-control" />
</div>
<h6 htmlFor="noOfDays" style={{paddingLeft:'17px', paddingTop:'30px'}}>Number of days : {daysLeft}</h6>
</div>
<br/>
<div className='row'>
  
  <div className="col-md-6 col-12">
  <div className="form-group">
    <label for="lastName">Room Type</label>
    <input type="text" class="form-control" id="exampleInputPassword1" value={name}></input>
  </div>
  </div>
  <div className="col-md-6 col-12" >
  <div className="form-group" >
    <label for="lastName">Price</label>
    <input type="text" class="form-control" id="exampleInputPassword1" value={daysLeft*price}></input>
  </div>
  </div>
  </div>

  <div className="row my-4">
                        <div className="col-md-6 col-12">
                            <div className="form-group">
                                <label htmlFor="payment" className="font-weight-bolder">Payment Options</label>
                                <select className="form-control">
                                    <option disabled>Select payment option</option>
                                    <option value="SMS-OTP">SMS OTP</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6 col-12 my-auto">
                            <div className="col-md-6 col-12 float-right">
                                <button className="btn btn-block btn-outline-primary">Confirm Booking</button>
                            </div>
                        </div>     
                       
                    </div>
                    </form>
                </div>
            </div>
        </div>
        <Footer/>
        </div>
        )
    }
}