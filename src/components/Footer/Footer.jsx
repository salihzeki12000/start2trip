import React from 'react';
import './Footer.css'
import facebookIcon from "./pictures/facebook-letter-logo.svg"
import instagramIcon from "./pictures/instagram.svg"
import logoTripfer from "./pictures/logo_tripfer_white.svg"
import upArrowIcon from "./pictures/up-arrow.svg"
import { whichPageRenderHistory } from "../../redusers/ActionGlobal"
import { openFilterShow } from "../../redusers/ActionDrivers"
import { connect } from 'react-redux';
import MobileFilter from '../drivers/DriversBody/DriversProperties/MobileFilter/MobileFilter'

class FooterClass extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
    }
  }
  render() {
    let loc;
    if(this.props.globalhistory.history){
     loc = this.props.globalhistory.history.location.pathname;
    }
    let flagBt = true;
    let flagDiv = true;
    // if(loc =="/drivers"){
    //   flagBt=true;
    // }
    // if(loc =="/home"){
    //   flagDiv=false;
    // }
    return (
      <React.Fragment>
        <div className="footer d-xl-flex d-lg-flex d-md-flex d-sm-none d-none justify-content-center align-items-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
          <div className="footerButtonUp" onClick={() => { window.scroll(0, 0) }}><img src={upArrowIcon} width="20px" height="20px" alt="upArrowIcon" /></div>
          <div className="footer_block d-flex  justify-content-between align-items-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <img className="col-1 p-0" src={logoTripfer} width="110px" height="18px" alt="logoWhiteIcon" />
            <div className="footerButtons d-flex justify-content-around col-xl-8 col-lg-9 col-md-11 col-sm-12 col-12">
              <button className="footerButtons_button">О сервисе</button>
              <button className="footerButtons_button">Партнерам</button>
              <button className="footerButtons_button">Лицензионное соглашение</button>
              <button className="footerButtons_button">Помощь</button>
              <button className="footerButtons_button">Контакты</button>
              <div className="footerButtonsIcon d-flex">
                <img src={facebookIcon} width="16px" height="16px" alt="facebookIcon" />
                <img src={instagramIcon} width="17px" height="17px" alt="instagramIcon" />
              </div>
            </div>
          </div>
        </div>

        <div className="footerMobile d-xl-none d-lg-none d-md-none d-sm-flex d-flex">
          <div className="footerMobileButtonUp" style={{height: flagBt ? "80px":"40px", display: flagDiv ? "block":"none"}}>
           
            <i className="footerMobileIconFilter" style={{display: flagBt ? "flex":"none"}} onClick={()=>{this.props.dispatch(openFilterShow(true))}} />
          </div>
          <div className="d-flex flex-column align-items-center justify-content-end foterMobaileItem col-3 " >
            <div className="footerMobileIconRoutes" />
            <div className="footerMobileTextRoutes">Маршруты</div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-end foterMobaileItem col-3 " >
            <div className="footerMobileIconTours" />
            <div className="footerMobileTextTours">Туры</div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-end foterMobaileItem col-3 " >
            <div className="footerMobileIconPlaces" />
            <div className="footerMobileTextPlaces">Места</div>
          </div>
          <div className="d-flex flex-column align-items-center justify-content-end foterMobaileItem col-3 " >
            <div className="footerMobileIconProfile" />
            <div className="footerMobileTextProfile">Профиль</div>
          </div>
        </div>
        <MobileFilter />
      </React.Fragment>
    );
  }

}

const Footer = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
  }),
)(FooterClass);

export default Footer;