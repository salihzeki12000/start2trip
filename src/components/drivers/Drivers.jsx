import React from 'react';
import './Drivers.css';
import {set_state} from '../../redusers/Action'

import DriversBody from './DriversBody/DriversBody';
import { connect } from 'react-redux'
import StartTravelForm from '../startTravelForm/StartTravelForm'
import StartTravelSuccess from '../startTravelForm/StartTravelSuccess'

class DriversClass extends React.Component {
  constructor(props) {

    function maxPriceCalc(array) {
      let maxValue = 0;
      for (let i = 0; i < array.length; i++) {
        if (array[i].price > maxValue) {
          maxValue = array[i].price;
        }
      }
      return maxValue;
    }
    super(props);
    let maxPrice = maxPriceCalc(this.props.driversState.drivers);
    this.state = {
      travelVisibility: 'none',
      successVisibility: 'none',
      maxPrice: maxPrice
    }
  }
  componentWillMount() {
    this.props.setMaxPrice(this.state.maxPrice);
  }
  changeTravelVisibility=(value)=> {
    this.setState({
      travelVisibility: value
    })
  }
  changeSuccessVisibility=(value)=> {
    this.setState({
      successVisibility: value
    })
  }
  parseStringToArray=(cities,country)=>{
    debugger
    let newCities = [];
    let newString = cities.slice(5);
    let newArrayCities = newString.split("-to-");
    for(let i = 0; i<newArrayCities.length;i++){
      let stringWhithSpaces = newArrayCities[i].replace(/-/g, ' ');
      stringWhithSpaces = stringWhithSpaces + ' , ' +country;
      newCities[i]={point: stringWhithSpaces, lat: "", long: ""};
    }
    this.props.setCities(newCities)
  }
  

  render() {
    if(this.props.match){
      if(this.props.storeState.cities[0].point === ""){
        debugger
        let cities = this.props.match.params.cities;
        let country = this.props.match.params.country;
        this.parseStringToArray(cities,country);
      }
    }
   
   
    // let country = this.props.match.params.country;
    return (
      <React.Fragment>
        <div className="wrapper d-flex flex-column">
          <div className="drivers_bottom_background d-flex flex-column" >
            <DriversBody changeTravelVisibility={this.changeTravelVisibility} />
          </div>
        </div>
        <StartTravelForm changeTravelVisibility={this.changeTravelVisibility} changeSuccessVisibility={this.changeSuccessVisibility}
          travelVisibility={this.state.travelVisibility} successVisibility={this.changeSuccessVisibility} />
        <StartTravelSuccess successVisibility={this.state.successVisibility} changeSuccessVisibility={this.changeSuccessVisibility} />
      </React.Fragment>
    );
  }
}
const Drivers = connect(
  (state) => ({
    storeState: state.AppReduser,
    driversState: state.DriversReduser
  }),
  (dispatch) => ({
    setCities:(cities) => dispatch({type:"SET_CITIES",cities:cities}),
    setMaxPrice: (maxPrice) => dispatch({ type: "SET_MAX_PRICE", maxPrice: maxPrice, pricePart: 100 })
  })
)(DriversClass);

export default Drivers;