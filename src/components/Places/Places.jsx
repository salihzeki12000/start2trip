import React from 'react';
import './Places.css';
import Header from '../header/Header';
import Footer from '../Footer/Footer';
import PlacesCountryInfo from './PlacesCountryInfo'
import PlacesPanel from './PlacesPanel';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';
import PlacesList from './PlacesList';
import { connect } from 'react-redux';
import Manipulator from '../manipulator/Manipulator';
import {setPage} from '../../redusers/ActionPlaces';

class PlacesClass extends React.Component {
    constructor(props){
      super(props);
      this.setPageFunc=this.setPageFunc.bind(this);
    }
    setPageFunc(page){
      if(page !== "..."){
        this.props.dispatch(setPage(page));
      }
    }
    render(){
        return(
            <React.Fragment>
              <div className = "drivers_top_background col-12">
                <div className="wrapper d-flex flex-column">
                  <Header colorClass="colorClass" colorClass2="colorClass2" backgroundColorClass="backgroundColorClass"
                  borderColorClass="borderColorClass" labelColorClass="labelColorClass" type={1}/>
                  <PlacesCountryInfo/>
                 </div>
              </div>
              <div className="wrapper d-flex flex-column">
                <div className = "drivers_bottom_background d-flex flex-column" >
                  <div className="drivers_body d-flex">
                    <div className="left_body_part col-9">
                      <PlacesPanel/>
                      <PlacesList/>
                      <Manipulator number={this.props.placesState.places[0].places.length} page={this.props.placesState.page} setPage={this.setPageFunc}
                        elementsNumber = {this.props.placesState.pagesMenuValue} showMorePages={function(){console.log("ShowMorePages placeholder")}}
                      />
                    </div>
                    <div className="right_body_part col-3">
                      <DriversCommercial/>
                    </div>
                  </div>
                
                </div>  
              </div>
              <Footer/>           
          </React.Fragment>
        )
    }
}

const Places = connect(
  (state) => ({
    placesState: state.PlacesReduser
  }),

)(PlacesClass);

export default Places;