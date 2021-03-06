import React from 'react';
import { connect } from 'react-redux';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
import requests from '../../config';
import getUserData from './DriverProfileRequest';

import flags from '../media/flags.png'

import TextField from 'material-ui/TextField';
import ReactTelInput from 'react-telephone-input'
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'

// import RefreshIndicator from 'material-ui/RefreshIndicator';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class DriverProfileSettingsClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.globalReduser.profile;
        this.state = {
            thisPasswordType: true,
            newPasswordType: true,
            confirmPasswordType: true,
            mailing: true,
            settingsValues: {
                email: profile.email,
                password: "",
                newPassword: "",
                newPassword2: "",
                privatePhone: profile.privatePhone,
                subscription: profile.subscription
            },

        }
    }


    applyChanges = (sendedData) => {

        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            function checkPasswords(values) {
                if (values.newPassword === values.newPassword2) {
                    return true;
                }
                else {
                    return false;
                }
            }
            function isPasswordsFilled(values) {
                return values.password.length !== 0 && values.newPassword.length !== 0 && values.newPassword.length !== 0;
            }
            let value = {};
            let data = sendedData ? sendedData : this.state.settingsValues;
            if (isPasswordsFilled(data)) {
                if (checkPasswords(data)) {
                    value = {
                        email: data.email,
                        privatePhone: data.privatePhone,
                        password: data.password,
                        newPassword: data.newPassword,
                        subscription: data.subscription
                    };
                }
                else {
                    alert('they are different');
                }
            }
            else {
                value = {
                    email: data.email,
                    privatePhone: data.privatePhone,
                    subscription: data.subscription
                }
            }
            if (value.email) {//если не заполнено - значит есть ошибки
                let that = this;
                startRefresherGlobal(this,true)
                let body = JSON.stringify(value);
                fetch(requests.profileUpdateRequest, {
                    method: 'PUT', body: body,
                    headers: { 'content-type': 'application/json', Authorization: `Bearer ${jwt}` }
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(function (data) {
                        if (data.error) {
                            console.log("bad");
                            throw data.error;
                        }
                        else {
                            
                            console.log("good");
                            console.log(data);
                            that.setState({
                                password: '',
                                newPassword: '',
                                privatePhone: data.privatePhone,
                                subscription: data.subscription
                            });
                            let profile = that.props.globalReduser.profile;
                            profile.privatePhone = data.privatePhone;
                            profile.subscription = data.subscription;
                            that.props.dispatch(setProfileData(profile));
                            thenFuncGlobal(that);
                            //getUserData( thenFuncGlobal, catchFuncGlobal,that);

                        }
                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:');
                        console.log(error);
                        catchFuncGlobal(that);
                        //that.state.sendResultLocal(false,{error: error});
                    });
            }

        }
        else {
            this.props.dispatch(setUrlAddress(window.location.pathname));
            this.props.history.push('/' + cookies.get('userLangISO', { path: "/" }) + '/login/');
            //return null;
        }
    }
    formSubmit = (event) => {
        this.applyChanges();
        event.preventDefault();
    }
    inputChange = (value, variable) => {
        let settingsValues = this.state.settingsValues;
        switch (variable) {
            case 'email': {
                settingsValues.email = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'password': {
                settingsValues.password = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'newPassword': {
                settingsValues.newPassword = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'newPassword2': {
                settingsValues.newPassword2 = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            case 'privatePhone': {
                settingsValues.privatePhone = value;
                this.setState({
                    settingsValues: settingsValues
                })
                break;
            }
            default:
        }
    }

    componentDidMount(){
        //thenFuncGlobal(this)
    }

    render() {

        let textPage = this.props.storeState.languageText.driverProfileRegistration.DriverProfileSettings;
        let profile = this.props.globalReduser.profile;
        return (
            <div className="driverProfilesettingsBody pb-1">
                <div className="driverProfilesettingsBodyTitle  d-md-block d-none">
                    <p>{textPage.settingsBodyTitle}</p>
                </div>
                <form onSubmit={this.formSubmit} id="profileSettings" className="driverProfileSettingsContent d-flex flex-column col-12" >
                    <div className="driverProfileSettingsContentRow d-md-flex d-none align-items-center">
                        <label htmlFor="sittingsEmail" className="col-md-2 col-11 ">{textPage.sittingsEmail.floatingLabelText}:</label>
                        <input id="sittingsEmail" className= "col-md-4 col-12" type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={this.state.settingsValues.email}
                            onChange={(e) =>/*this.inputChange(e.target.value,'email')*/console.log('disabled')} disabled
                        />
                        <p className="  d-md-block d-none pl-2">{textPage.sittingsEmail.description}</p>
                    </div>
                    <TextField
                        floatingLabelText={textPage.sittingsEmail.floatingLabelText}
                        className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                        fullWidth="100%"
                        floatingLabelFocusStyle={{ color: "#304269" }}
                        underlineFocusStyle={{ borderColor: "#304269" }}
                        value={this.state.settingsValues.email}
                        onChange={(e) =>/*this.inputChange(e.target.value,'email')*/console.log('disabled')}
                        disabled
                    // errorText="This field is required"
                    />

                    <div className="d-flex flex-md-row flex-column align-items-start">
                        <p className="driverProfileSettingsContentPasswordText  d-md-block d-none col-md-2 col-11 ">{textPage.ContentPasswordText}:</p>
                        <div className="driverProfileSettingsContentPassword d-flex flex-column justify-content-end col-md-4 col-12  p-0">
                            <label htmlFor="sittingsCurrentPassword" className=" d-md-block d-none">{textPage.sittingsCurrentPassword.floatingLabelText}</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsCurrentPassword" className=" d-md-block d-none" type={this.state.thisPasswordType ? "password" : "text"}
                                    pattern="[A-Za-z0-9]{6,}" title="Должен содержать не менее 6-ти сомволов латинских букв (заглавных или строчных) и цифр"
                                    value={this.state.settingsValues.password} onChange={(e) => this.inputChange(e.target.value, 'password')} />
                                <TextField
                                    type={this.state.thisPasswordType ? "password" : "text"}
                                    floatingLabelText={textPage.sittingsCurrentPassword.floatingLabelText}
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.settingsValues.password}
                                    onChange={(e) => this.inputChange(e.target.value, 'password')}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ thisPasswordType: !this.state.thisPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>

                            <label htmlFor="sittingsNewPassword" className=" d-md-block d-none">{textPage.sittingsNewPassword.floatingLabelText}</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsNewPassword" className=" d-md-block d-none" type={this.state.newPasswordType ? "password" : "text"}
                                    pattern="[A-Za-z0-9]{6,}" title="Должен содержать не менее 6-ти сомволов латинских букв (заглавных или строчных) и цифр"
                                    value={this.state.settingsValues.newPassword} onChange={(e) => this.inputChange(e.target.value, 'newPassword')} />
                                <TextField
                                    type={this.state.newPasswordType ? "password" : "text"}
                                    floatingLabelText={textPage.sittingsNewPassword.floatingLabelText}
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.settingsValues.newPassword}
                                    onChange={(e) => this.inputChange(e.target.value, 'newPassword')}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ newPasswordType: !this.state.newPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>
                            <label htmlFor="sittingsConfirmPassword" className=" d-md-block d-none">{textPage.sittingsConfirmPassword.floatingLabelText}</label>
                            <div className="driverProfileSettingsContentRow">
                                <input id="sittingsConfirmPassword" className=" d-md-block d-none mb-4" type={this.state.confirmPasswordType ? "password" : "text"}
                                    title="Must match the previous field" value={this.state.settingsValues.newPassword2} onChange={(e) => this.inputChange(e.target.value, 'newPassword2')} />
                                <TextField
                                    type={this.state.confirmPasswordType ? "password" : "text"}
                                    floatingLabelText={textPage.sittingsConfirmPassword.floatingLabelText}
                                    className="inputClass sittingsTextField d-xl-none d-lg-none d-md-none d-sm-block d-block"
                                    fullWidth="100%"
                                    floatingLabelFocusStyle={{ color: "#304269" }}
                                    underlineFocusStyle={{ borderColor: "#304269" }}
                                    value={this.state.settingsValues.newPassword2}
                                    onChange={(e) => this.inputChange(e.target.value, 'newPassword2')}
                                // errorText="This field is required"
                                />
                                <span onClick={() => { this.setState({ confirmPasswordType: !this.state.confirmPasswordType }) }} className="driverProfileSettingsContentPasswordEyeIcon" />
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-md-row flex-column align-items-xl-center align-items-lg-center align-items-md-center align-items-sm-start align-items-start ">
                        <label htmlFor="sittingsPhoneNumber" className=" d-md-block d-none col-md-2 col-11">{textPage.sittingsPhoneNumber.label}:</label>
                        <ReactTelInput
                            defaultCountry={this.props.storeState.isoCountryMap}
                            classNames="myPhoneInput col-md-4 col-12 p-0"
                            flagsImagePath={flags}
                            onChange={(telNumber, selectedCountry) => { this.inputChange(telNumber, 'privatePhone'); }}
                            onBlur={(value) => { console.log(value) }}
                            initialValue={this.state.settingsValues.privatePhone}

                        />
                        <p className="  d-md-block d-none pl-2">{textPage.sittingsPhoneNumber.description}</p>
                    </div>
                    <div className="d-flex flex-md-row flex-column align-items-center py-3">
                        <label className="col-2" />
                        <div className="d-flex flex-column driverProfileSettingsContentUnsubscribe">
                            <p style={{ paddingBottom: '5px' }}>{textPage.infoText}</p>
                            <div className="d-flex justify-content-md-start justify-content-center">
                                <button htmlFor="profileSettings" type="submit">{textPage.sittingsSaveBt}</button>
                            </div>
                        </div>

                    </div>
                </form>
                <div className="d-flex flex-md-row flex-column  align-items-md-center align-items-start pb-3 col-12">
                    <p className="col-2"></p>
                    <div className="driverProfileSettingsContentUnsubscribe d-flex flex-column">
                        <p className="driverProfileSettingsContentUnsubscribeButton" onClick={() => {
                            let settingsValues = this.state.settingsValues;
                            settingsValues.subscription = !settingsValues.subscription;
                            this.setState({ settingsValues: settingsValues });
                            this.applyChanges({
                                email: profile.email,
                                password: "",
                                newPassword: "",
                                newPassword2: "",
                                privatePhone: profile.privatePhone,
                                subscription: this.state.settingsValues.subscription
                            })
                        }
                        }>{this.state.settingsValues.subscription ? textPage.unsubscribeButton.mailing.unsubscribe : textPage.unsubscribeButton.mailing.subscribe}</p>
                        <p>{textPage.unsubscribeButton.message}</p>
                    </div>
                </div>
            </div>
        );
    }
}

const DriverProfileSettings = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(DriverProfileSettingsClass);

export default DriverProfileSettings;