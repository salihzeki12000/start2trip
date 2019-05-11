import React from 'react';
import './DriverProfileRegistration.css'
import { connect } from 'react-redux';
import Header from '../header/Header'
import DriverProfileNavigation from './DriverProfileNavigation'
import DriverProfileCar from './DriverProfileCar'
import DriverProfileBasicInformation from './DriverProfileBasicInformation'
import DriverProfileFeedback from './DriverProfileFeedback'
import DriverProfileTripSettingsTrip from './DriverProfileTripSettingsTrip'
import DriverProfileTripSettingsTour from './DriverProfileTripSettingsTour'
import DriverProfileSettings from './DriverProfileSettings'
import DriverProfileHistory from './DriverProfileHistory'
import DriverProfileBilling from './DriverProfileBilling'
import DriverProfileAffiliateProgram from './DriverProfileAffiliateProgram'
import {Route} from 'react-router-dom';

import requests from '../../config';
import axios from 'axios';

import { setProfileData } from "../../redusers/ActionDriverProfileRegistration"

import people1 from './img/001372a9a88e12c88b532a.jpg'
import people2 from './img/person.jpg'
import people3 from './img/mina.jpg'
import people4 from './img/gruzinskaja-kuhnja.jpg'

class DriverProfileRegistrationClass extends React.Component {
  constructor(props) {
    super(props);
    const that = this;
    function getUserData(callback,params){
      let jwt = that.props.globalReduser.readCookie('jwt');
      if(jwt && jwt!=="-"){    
        axios.get(requests.profileRequest+'?ISO=RUS&countryISO=IRO', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        })
        .then(response =>{
          that.props.dispatch(setProfileData(response.data));
          if(callback){
            callback(params);
          }        
        })
        .catch(error => {
          console.log('error, here must be return to authorization window! or smth else');
        })
      }
    }
    function tempCallbackFunc(params){
      alert(params);
    }
    getUserData();
    this.state = {
      photo:[people1,people2,people3,people4,people2]
    }

  }
  render() {
    let profile = this.props.storeState.profile;
    return (
      <React.Fragment>
      {
        profile.isDriver ? 
        <React.Fragment>
        <Header driver={true} history={this.props.history} />
        <DriverProfileNavigation />
        <div className="registrationWrapper d-flex flex-column col-12 p-0">
          <div className="d-flex contentHeight col-12 p-0">
            <div className="d-flex flex-column justify-content-start col-lx-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
            <Route path="/account/driver/trips" component={DriverProfileHistory} />
            <Route path="/account/driver/profile" component={DriverProfileBasicInformation} />
            <Route path="/account/driver/cars" component={DriverProfileCar} />
            <Route path="/account/driver/tripsSettings" component={DriverProfileTripSettingsTrip} />
            <Route path="/account/driver/tours" component={DriverProfileTripSettingsTour} />
            <Route path="/account/driver/reviews" component={DriverProfileFeedback} />
            <Route path="/account/driver/settings" component={DriverProfileSettings} />
            <Route path="/account/driver/billing" component={DriverProfileBilling} />
            <Route path="/account/driver/referrals" component={DriverProfileAffiliateProgram} />
              {/* {{
                0: <DriverProfileHistory />,
                1: <DriverProfileBasicInformation />,
                2: <DriverProfileCar />,
                3: <DriverProfileTripSettingsTrip />,
                4: <DriverProfileTripSettingsTour />,
                5: <DriverProfileFeedback />,
                6: <DriverProfileSettings />,
                7: <DriverProfileBilling />,
                8: <DriverProfileAffiliateProgram />,
              }[this.props.storeState.pageRender]} */}
            </div>
            
          </div>
        </div>
        </React.Fragment> : <div/>
      }
      </React.Fragment>
    );
  }
}

const DriverProfileRegistration = connect(
  (state) => ({
    storeState: state.DriverProfileRegistrationtReduser,
    globalReduser: state.GlobalReduser,
  }),
)(DriverProfileRegistrationClass);

export default DriverProfileRegistration;