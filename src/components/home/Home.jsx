import React from 'react';
import './Home.css';
import './text.css';
import georgiaImg from '../media/georgia.png'
import Drivers from '../drivers/Drivers'
import HomeBodyBottom from './HomeBodyBottom'
import { connect } from 'react-redux';
import {Route} from 'react-router-dom';
import requests from '../../config'

//import HomeHeader from './HomeHeader/HomeHeader.jsx'
import Header from '../header/Header';
import HomeBody from './HomeBody/HomeBody.jsx'
import { isMobileOnly } from 'react-device-detect';
import FirstEnterModal from './FirstEnterModal';
import Cookies from 'universal-cookie';
import {Helmet} from 'react-helmet';
const cookies = new Cookies();


class HomeClass extends React.Component {
  constructor(props) {
    super(props);
    let firstEnterCookie = this.props.globalReduser.readCookie('firstEnter');
    this.state = {
      firstEnter: firstEnterCookie ? false : true,
      
    };
  }
  redirectFunc=(where)=> {
    
    this.props.history.push(where);

  }
  render() {
    //console.log(isMobileOnly , "isMobileOnly")
    //console.log(isTablet , "isTablet")
    console.log('Home render');
    console.log('this.props')
    console.log(this.props);
    console.log('this.state');
    console.log(this.state);
    
    
    
    let textInfo = this.props.storeState.languageTextMain.home.home;
    
    let selectedDirection=this.props.match.params.direction;
    return (
      <React.Fragment>
      {
        /*
        <Helmet>
          <title>Tripfer in home</title>
          <meta name="description" content="Tripfer in header" />
          <link rel="icon" sizes="any" type="image/svg+xml" href="favicon.svg" />
        </Helmet>

        */
      }
        
        <main className="d-flex flex-column container-fluid p-0">
          {
            this.state.firstEnter ?
            <FirstEnterModal whatRender="user"/> : <React.Fragment/>
          }
          

          <div className="home_window">
            <Header history={this.props.history} />

            <div className="home_block col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
              {!isMobileOnly ?
                <div className="home_text col-xl-10 col-lg-10 col-md-12 col-sm-11 col-11 p-0">
                  <div className="text_firstLine">{textInfo.homeTextFirstLine}</div>
                  <div className="text_secondLine">{textInfo.homeTextSecondLine}</div>
                  <div className="text_changeBodyBlock">
                    <div className="text_changeBodyBlock_element changeBody_element_select changeBodyBlock_element_left">{textInfo.changeBodyBlock.left}</div>
                    <div className="text_changeBodyBlock_element changeBodyBlock_element_right">{textInfo.changeBodyBlock.right}</div>
                  </div>
                </div>
                :
                <div />}
              <div className="home_body d-flex justify-content-center col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 p-0">
                <HomeBody redirectToDrivers={() => this.redirectFunc('/'+requests.routeMap+"-"+cookies.get('userLangISO',{path:"/"})+'/drivers')} />
              </div>
            </div>

          </div>
          
          {
            selectedDirection ? 
              <Route path={'/'+requests.routeMap+"/routes-:direction"} component={HomeBodyBottom} />
            :
              <Route path={'/'+requests.routeMap+"/routes"} component={HomeBodyBottom} />
          }          
          <Route path={'/'+requests.routeMap+"/drivers/:cities"} component={Drivers} />
        </main>

      </React.Fragment>
    )
  }
}

const Home = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
    globalReduser: state.GlobalReduser
  }),
)(HomeClass);

export default Home;
