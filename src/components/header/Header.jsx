import React from 'react';
import './header_css.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import RenderModalCountry from './RenderModalCountry'
import RenderModalRegistration from './RenderModalRegistration'
import mapWorldIcon from './pictures/mapWorld.svg'
import { connect } from 'react-redux';
import crossIconModal from './pictures/close.svg'
import geoFlag from './pictures/georgia.svg'
import ruFlag from './pictures/russia.svg'
import enFlag from './pictures/united-kingdom.svg'
import espFlag from './pictures/spain.svg'
import { Link } from 'react-router-dom';
import { Collapse } from 'reactstrap';
import { Modal, ModalBody } from 'reactstrap';
import requests from '../../config';
import axios from 'axios';
import { setUser } from '../../redusers/Action';
import { disablePageScroll, clearQueueScrollLocks, enablePageScroll } from 'scroll-lock';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import arrowDownIcon from './pictures/down-arrow.svg'
import { whichPageRender } from "../../redusers/ActionDriverProfileRegistration"
import { whichPageRenderHistory } from "../../redusers/ActionGlobal"


const ModalRegistration = (props) => {
  let { modalRegistration, toggle, className, authorization } = props;
  return (
    <Modal isOpen={modalRegistration} toggle={toggle} className={className + " p-0"}>
      <ModalBody>
        <RenderModalRegistration close={toggle} authorization={authorization} />
      </ModalBody>
    </Modal>
  )
}
const CountrySelect = (props) => {
  let { modalCountry, toggleModalCountry, className } = props;
  return (
    <Modal isOpen={modalCountry} toggle={toggleModalCountry} className={className}>
      <ModalBody>
        <div className="d-flex flex-column col-12">
          <div className="d-flex  justify-content-center col-12 p-4">
            <img src={mapWorldIcon} height="150px" alt="mapWorldIcon" />
            <button className="modalCountryButtton" onClick={() => { toggleModalCountry() }}><img src={crossIconModal} width="20px" height="20px" alt="crossIconModal" /></button>
          </div>
          <div className="modalCountry d-flex flex-column align-items-center mb-5">
            <h4 className="mb-4">ВЫБЕРИТЕ ВАШУ СТРАНУ</h4>
            <RenderModalCountry close={toggleModalCountry} />
          </div>
        </div>
      </ModalBody>
    </Modal>
  )
}

class HeaderClass extends React.Component {
  constructor(props) {
    function readCookie(name) {
      var name_cook = name + "=";
      var spl = document.cookie.split(";");
      for (var i = 0; i < spl.length; i++) {
        var c = spl[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(name_cook) == 0) {
          return c.substring(name_cook.length, c.length);
        }
      }
      return null;
    }
    super(props);
    if (this.props.history) {
      this.props.dispatch(whichPageRenderHistory(this.props.history));
    }
    console.log('storeState');
    console.log(this.props.storeState);
    this.authorization();
    let avatarUrl = readCookie('avatarUrl');
    let userName = readCookie('userName');
    let jwt = readCookie('jwt');
    console.log('Header constructor');
    console.log("get data from cookie");
    console.log(avatarUrl);
    console.log(userName);
    if (jwt && jwt !== "-" && (this.props.storeState.avatarUrl !== avatarUrl || this.props.storeState.userName !== userName)) {
      this.props.dispatch(setUser(userName, avatarUrl));
    }
    this.state = {
      dropdownLanguageOpen: false,
      burgerMenu: false,
      dropdownOpen: false,
      activLanguage: [{ flag: ruFlag, string: "RU" }, { flag: enFlag, string: "EN" }, { flag: geoFlag, string: "GEO" }, { flag: espFlag, string: "ESP" }],
      activLanguageNumber: 0,
      activeCurrency: ["₽ RUB", "$ USD", "₾ GEL", "€ EUR"],
      activeCurrencyNumber: 0,
      modalCountry: false,
      collapse: false,
      modalRegistration: false,
      buttonMassElements: [
        {
          to: "/",
          value: "Маршруты"
        },
        {
          to: "/places",
          value: "Места"
        },
        {
          to: "/tours",
          value: "Туры"
        }
      ],
      currencyValues: [
        "₽ RUB", "$ USD", "₾ GEL", "€ EUR"
      ],
      languageValues: [
        {
          src: ruFlag,
          value: "RU"
        },
        {
          src: enFlag,
          value: "EN"
        },
        {
          src: geoFlag,
          value: "GEO"
        },
        {
          src: espFlag,
          value: "ESP"
        },
      ],
      avatarUrl: "",
      userName: "",
      menuItems: ["Профиль", "Автомобиль", "Настройки поездок", "Туры", "Отзывы", "Настройки", "Биллинг", "Партнерская программа", "Выход"],
      history: props.history,
    };
    this.toggleLanguage = this.toggleLanguage.bind(this);
    this.toggleDropdownOpen = this.toggleDropdownOpen.bind(this);
    this.toggleModalCountry = this.toggleModalCountry.bind(this);
    this.toggleModalRegistration = this.toggleModalRegistration.bind(this);
    this.authorization = this.authorization.bind(this);
    this.logOffFunc = this.logOffFunc.bind(this);
  }
  toggleModalCountry() {
    this.setState(prevState => ({
      modalCountry: !prevState.modalCountry
    }));
  }
  toggleModalRegistration() {
    this.setState(prevState => ({
      modalRegistration: !prevState.modalRegistration
    }));
  }
  toggleLanguage() {
    this.setState({
      dropdownLanguageOpen: !this.state.dropdownLanguageOpen
    });
  }
  toggleDropdownOpen() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  authorization() {
    function readCookie(name) {
      var name_cook = name + "=";
      var spl = document.cookie.split(";");
      for (var i = 0; i < spl.length; i++) {
        var c = spl[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(name_cook) == 0) {
          return c.substring(name_cook.length, c.length);
        }
      }
      return null;
    }
    let jwt = readCookie('jwt');
    //console.log('jwt');
    // console.log(jwt);
    if (jwt && jwt !== "-") {
      axios.get(requests.meRequest, {
        headers: {
          //Authorization: `${jwt}`
          Authorization: `Bearer ${jwt}`
        }
      })
        .then(response => {
          // Handle success.
          //console.log('Data: ');
          // console.log(response.data);
          let avatarUrl = requests.serverAddress + response.data.url;
          let userName = response.data.firstName;
          if (avatarUrl !== this.props.storeState.avatarUrl || userName !== this.props.storeState.userName) {
            this.props.dispatch(setUser(userName, avatarUrl));
          }

        })
        .catch(error => {
          this.props.dispatch(setUser("", ""));
          //console.log('log off');
          //console.log('An error occurred:', error);
        });
    }
    /*
    else{
      this.props.dispatch(setUser("",""));
      console.log('log off');
    }  */
  }
  logOffFunc() {
    //console.log("logOffFunc");
    let date = new Date(Date.now() - 100000000);
    let jwtstring = "jwt=-; expires=" + date.toString();
    let jwtstatus = "jwtstatus=-; expires=" + date.toString();
    document.cookie = jwtstring;
    document.cookie = jwtstatus;
    let avatarString = "avatarUrl=-; expires=" + date.toString();
    let usernameString = "userName=-; expires=" + date.toString();
    document.cookie = avatarString;
    document.cookie = usernameString;
    this.props.dispatch(setUser("", ""));
  }
  render() {

    return (
      <React.Fragment>
        <ModalRegistration modalRegistration={this.state.modalRegistration} toggle={this.toggleModalRegistration} className={this.props.className} authorization={this.authorization} />
        <CountrySelect modalCountry={this.state.modalCountry} toggleModalCountry={this.toggleModalCountry} className={this.props.className} />
        <div className="headerMobail d-xl-none d-lg-none d-md-none d-sm-flex d-flex align-items-center justify-content-between">
          {/* <div onClick={this.toggleModalCountry} className="headerGeoButton">
            <span>{this.props.storeState.country}</span>
          </div> */}
          <Link className="" to="">
            <h3 />
          </Link>
          <div className="headerSelect d-flex align-items-center justify-content-end ">
            <button className={this.state.burgerMenu ? "headerMobailButton-active" : "headerMobailButton"} onClick={() => {
              if (this.state.burgerMenu) {
                clearQueueScrollLocks(); enablePageScroll();
              } else {
                disablePageScroll()
              }
              this.setState({ burgerMenu: !this.state.burgerMenu });
            }}></button>
            <nav className={this.state.burgerMenu ? "burgerMenu burgerMenu-active" : "burgerMenu"}>
              <div className="burgerMenuBg">
                <div className="burgerMenuTop">
                  <DropDownMenu anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} className="burgerMenuTopDropDown" menuStyle={{ width: "30px" }} value={this.state.activLanguageNumber} onChange={(event, index, value) => { this.setState({ activLanguageNumber: value }); console.log(this.state.activLanguageNumber) }}>
                    {this.state.activLanguage.map((element, index) =>
                      <MenuItem value={index} primaryText={<React.Fragment><img className="mb-1" src={element.flag} width="15px" height="15px" alt={element.string} /><span className="burgerMenuTopDropDownSpan">{element.string}</span></React.Fragment>} ></MenuItem>
                    )}
                  </DropDownMenu>
                  <DropDownMenu menuItemStyle={{ color: "#304269", fontSize: "14px", fontWeight: "400" }} selectedMenuItemStyle={{ color: "#f60" }} anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} className="burgerMenuTopDropDown" menuStyle={{ width: "30px" }} value={this.state.activeCurrencyNumber} onChange={(event, index, value) => { this.setState({ activeCurrencyNumber: value }) }}>
                    {this.state.activeCurrency.map((element, index) =>
                      <MenuItem value={index} primaryText={element} />
                    )}
                  </DropDownMenu>
                  <DropDownMenu anchorOrigin={{ vertical: 'bottom', horizontal: 'left', }} className="burgerMenuTopDropDown" menuStyle={{ width: "30px" }} value={this.state.activLanguageNumber} onChange={(event, index, value) => { this.setState({ activLanguageNumber: value }); console.log(this.state.activLanguageNumber) }}>
                    {this.state.activLanguage.map((element, index) =>
                      <MenuItem value={index} primaryText={<React.Fragment><img className="mb-1" src={element.flag} width="15px" height="15px" alt={element.string} /><span className="burgerMenuTopDropDownSpan">{element.string}</span></React.Fragment>} ></MenuItem>
                    )}
                  </DropDownMenu>
                </div>
                <div className="burgerMenuBottom">
                  <span onClick={() => { this.setState({ collapse: !this.state.collapse }) }} style={{ background: "url(" + arrowDownIcon + ") no-repeat" }}>Мои поездки</span>
                  <Collapse isOpen={this.state.collapse}>
                    <div className="d-flex flex-column">
                      <span style={{ paddingLeft: "20px" }}>Предстоящие поездки</span>
                      <span style={{ paddingLeft: "20px" }}>История поездок</span>
                    </div>
                  </Collapse>
                  {this.state.menuItems.map((element, index) =>
                    <span>{element}</span>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>

        <div className={this.props.driver ? "driverHeader" : "homeHeader"}>
          <div className='header d-xl-flex d-lg-flex d-md-flex d-sm-none d-none align-items-stretch justify-content-between'>
            <div className="d-flex align-items-center col-xl-2 col-lg-2 col-md-3 col-sm-2 col-2">
              <Link className="col-xl-8 col-lg-9 col-md-8 col-sm-8 col-7" to="">
                <h3 />
              </Link>
              <div onClick={this.toggleModalCountry} className="headerGeoButton col-xl-5 col-lg-5 col-md-4 col-sm-5 col-5">
                <span>{this.props.storeState.country}</span>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-end col-xl-6 col-lg-7 col-md-8 col-sm-6 col-6">
              <div className="headerButtonMass d-flex align-self-stretch justify-content-end col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 ">
                {
                  this.state.buttonMassElements.map((element, index) =>
                    <Link to={element.to} className="buttonMassLink align-self-stretch">{element.value}</Link>
                  )
                }
              </div>
              <div className="headerSelect d-flex align-items-center justify-content-end col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3">
                <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdownOpen} className="selectGeneral">
                  <DropdownToggle className="selectGeneralButton" caret size="sm">
                    {this.state.activeCurrency[this.state.activeCurrencyNumber]}
                  </DropdownToggle>
                  <DropdownMenu className="dropdownMenu currenty" >
                    {
                      this.state.currencyValues.map((element, index) =>
                        <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activeCurrencyNumber: index }) }}>{element}</DropdownItem>
                      )
                    }
                  </DropdownMenu>
                </Dropdown>
                <Dropdown setActiveFromChild="true" isOpen={this.state.dropdownLanguageOpen} toggle={this.toggleLanguage} className="selectGeneral">
                  <DropdownToggle className="selectGeneralButton" caret size="sm">
                    <img src={this.state.activLanguage[this.state.activLanguageNumber].flag} height="15px" width="15px" alt="flag" />{this.state.activLanguage[this.state.activLanguageNumber].string}
                  </DropdownToggle>
                  <DropdownMenu className="dropdownMenu">
                    {
                      this.state.languageValues.map((element, index) =>
                        <DropdownItem className="dropdownMenu" onClick={() => { this.setState({ activLanguageNumber: index }) }}><img src={element.src} height="15px" width="15px" alt="RU" />{element.value}</DropdownItem>
                      )
                    }
                  </DropdownMenu>
                </Dropdown>
              </div>
              <div className="headerRegistration d-flex justify-content-start col-xl-1 col-lg-1 col-md-2 col-sm-1 col-1">
                <span style={{ display: this.props.storeState.isAuthorized ? 'none' : 'block' }} onClick={this.toggleModalRegistration}>Войти</span>
                <div style={{ display: this.props.storeState.isAuthorized ? 'flex' : 'none' }} className="openMenu position-relative align-items-center">
                  <div className="avatar" style={{ background: 'url(' + this.props.storeState.avatarUrl + ') no-repeat' }}></div>
                  <i className="openDropDownMenuBt"></i>
                  <div className="hederMenu">
                    <span onClick={() => { this.props.dispatch(whichPageRender(1)); this.props.globalhistory.history.push("/account/driver/profile") }}>Профиль</span>
                    <span onClick={() => { this.props.dispatch(whichPageRender(0)); this.props.globalhistory.history.push("/account/driver/trips") }}>Мои поездки</span>
                    <span onClick={() => { this.props.dispatch(whichPageRender(6)); this.props.globalhistory.history.push("/account/driver/settings") }}>Настройки</span>
                    <span onClick={() => { this.props.dispatch(whichPageRender(8)); this.props.globalhistory.history.push("/account/driver/referrals") }}>Партнерская программа</span>
                    <span onClick={this.logOffFunc}>Выйти</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}


const Header = connect(
  (state) => ({
    storeState: state.AppReduser,
    globalhistory: state.GlobalReduser,
  }),
)(HeaderClass);

export default Header;
