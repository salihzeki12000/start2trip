import React from 'react';
import './contacts.css'
import { connect } from 'react-redux';
import {
    isMobileOnly, osVersion, osName,
    fullBrowserVersion, browserName,
    mobileVendor, mobileModel,
    engineName, engineVersion
} from 'react-device-detect';
import { Helmet } from 'react-helmet';

import mailSvg from '../media/mail.svg'
import phone_callSvg from '../media/phone-call.svg'
import placeholderSvg from '../media/placeholder.svg'
import webSvg from '../media/web.svg'
import Header from '../header/Header';
import * as EmailValidator from 'email-validator';
import Cookies from 'universal-cookie';
import requests from '../../config';
import { startRefresherGlobal, thenFuncGlobal, catchFuncGlobal, } from '../../redusers/GlobalFunction'
const cookies = new Cookies();

class contactsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            valideName: true,
            email: "",
            valideEmail: true,
            message: "",
            valideMessage: true,

        }
    }
    sendMessage = () => {

        let userLang = (cookies.get('userLang', { path: "/" })).toUpperCase()
        let country = (cookies.get('country', { path: "/" }))
        let userCurr = (cookies.get('userCurr', { path: "/" }))
        let today = new Date()

        var messageInfo = new FormData();

        // Validate
        let valideEmail = EmailValidator.validate(this.state.email)
        if (!valideEmail) {
            this.setState({ valideEmail: valideEmail })
        }
        if (this.state.name === "") {
            this.setState({ valideName: false })
        }
        if (this.state.message === "") {
            this.setState({ valideMessage: false })
        }
        // Validate

        if (this.state.valideName && valideEmail && this.state.valideMessage) {
            startRefresherGlobal(this, true)
            messageInfo.append('name', this.state.name);
            messageInfo.append('email', this.state.email);
            messageInfo.append('message', this.state.message);
            messageInfo.append('userLangCookies', userLang);
            messageInfo.append('country', country);
            messageInfo.append('userCurr', userCurr);
            messageInfo.append('dateNow', today);
            messageInfo.append('mobileVendor', mobileVendor);
            messageInfo.append('mobileModel', mobileModel);
            messageInfo.append('engineName', engineName);
            messageInfo.append('engineVersion', engineVersion);
            messageInfo.append('osName', osName);
            messageInfo.append('osVersion', osVersion);
            messageInfo.append('browserName', browserName);
            messageInfo.append('browserVersion', fullBrowserVersion);

            const request = new XMLHttpRequest();
            request.open('PUT', requests.userFeedback);
            let that = this;
            request.onreadystatechange = function () {
                if (request.readyState === XMLHttpRequest.DONE && request.status === 200) {
                    let responseText = JSON.parse(request.responseText);
                    console.log(responseText)
                    that.setState({
                        name: "",
                        valideName: true,
                        email: "",
                        valideEmail: true,
                        message: "",
                        valideMessage: true,
                    })
                    thenFuncGlobal(that)
                }
                if (request.readyState === XMLHttpRequest.DONE && request.status === 0) {
                    console.log('we lose');
                    catchFuncGlobal(that)
                }
            }
            request.send(messageInfo);
        }

       

    }
    render() {
        let text = this.props.storeState.languageTextMain.footerPage.contacts;
        let helmet = this.props.storeState.languageTextMain.helmets.contacts;

        return (
            <>
                <Helmet>
                    <title>{helmet.basic.title}</title>
                    <meta name="description" content={helmet.basic.description} />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={document.URL} />
                    <meta property="og:title" content={helmet.basic.title} />
                    <meta property="og:description" content={helmet.basic.description} />
                </Helmet>
                <Header driver={true} history={this.props.history} />
                <div className="wrapper" style={{ minHeight: "82.1vh" }}>
                    <div className="contacts d-flex" >
                        <div className="contacts_Title col-12 p-0">
                            <h2>{text.h2}</h2>
                            <div className="contacts_content_left d-flex flex-md-row flex-column justify-content-md-between">
                                <div className="col-md-6 col-12 pl-0">
                                    <h4>{text.h4}</h4>
                                    <p className="col-md-8 col-12 p-0">{text.text}</p>
                                    <form onSubmit={(e) => { e.preventDefault(); this.sendMessage() }} id="contactsForm" className="d-flex flex-md-wrap flex-nowrap flex-md-row flex-column mt-4">
                                        <input className={"col mr-md-2" + (this.state.valideName ? "" : " contacts_error")} placeholder={text.firstNamePlaceholder} value={this.state.name} onChange={(e) => { this.setState({ name: e.target.value, valideName: true }) }} type="text" />
                                        <input className={"col ml-md-2 mt-md-0 mt-3 " + (this.state.valideEmail ? "" : " contacts_error")} placeholder="Email" value={this.state.email} onChange={(e) => { this.setState({ email: e.target.value, valideEmail: true }) }} type="text" />
                                        <textarea className={"col-12 mt-3" + (this.state.valideMessage ? "" : " contacts_error")} placeholder={text.messege} value={this.state.message} onChange={(e) => { this.setState({ message: e.target.value, valideMessage: true }) }} rows="1"></textarea>
                                        <div className="d-flex justify-content-end col-12 p-0 my-3">
                                            <input className="contacts_contentBt col-md-5 col-12" value={text.buttonSubmit} type="submit" />
                                        </div>
                                    </form>
                                </div>
                                <div className="d-flex flex-column justify-content-center col-md-4 col-12">
                                    <div className="contacts_content_right " >
                                        <div className="contacts_content_rightHeder">
                                            <span>{text.nameFirm}</span>
                                        </div>
                                        <div className="contacts_content_rightMiddle d-flex flex-column">
                                            <h5>{text.h5}</h5>
                                            <div className="d-flex">
                                                <label style={{ background: "url(" + phone_callSvg + ")no-repeat" }} className="col-md-2 col-3 p-0" htmlFor="tel">{text.labelPhone}</label>
                                                <span id="tel">+1 347-771-1833</span>
                                            </div>
                                            <div className="d-flex">
                                                <label style={{ background: "url(" + mailSvg + ")no-repeat" }} className="col-md-2 col-3 p-0" htmlFor="email">Email:</label>
                                                <span id="email">support@tripfer.com</span>
                                            </div>
                                            <div className="d-flex align-items-start">
                                                <label style={{ background: "url(" + webSvg + ")no-repeat" }} className="col-md-2 col-3 p-0">{text.labelSocialNetwork}</label>
                                                <a href="" className="instagram" />
                                                <a href="" className="facebook" />
                                            </div>
                                        </div>
                                        <div className="contacts_content_rightFooter d-flex">
                                            <label style={{ background: "url(" + placeholderSvg + ")no-repeat" }} className="col-md-2 col-3 mr-3" htmlFor="adress">{text.labelAddress}</label>
                                            <span id="adress">{text.addressText1}{isMobileOnly ? <React.Fragment /> : <br />} {text.addressText2}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </>
        )
    }
}

const contacts = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),
)(contactsClass);
export default contacts;