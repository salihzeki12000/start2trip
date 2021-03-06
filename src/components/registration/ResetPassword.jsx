import React from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux'

import requests from '../../config';

import Header from '../header/Header';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,} from '../../redusers/GlobalFunction'

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class ResetPasswordClass extends React.Component {
    constructor(props) {
        super(props);
        let code = this.props.match.params.code;
        this.state = {
            passwords: ["", ""],
            code: code,
            isChanged: false,
            falde: false,
            noChange: false,
            isMatchUp: false,
            isChangePasswordType: false,
            isChangePasswordType2: false,
        }
        if (code.length === 0) {
            this.props.history.push("/" + this.props.storeState.country + "-" + cookies.get('userLangISO', { path: "/" }) + '/routes/');
        }

    }
    passwordonchange = (value, number) => {
        let passwords = this.state.passwords;
        passwords[number] = value;
        this.setState({
            isChanged: true,
            passwords: passwords
        });
    }
    sendRequest = () => {
        if (this.state.isChanged) {
            if (this.state.passwords[0] === this.state.passwords[1] && this.state.passwords[0].length > 0) {
                this.setState({
                    isChanged: false
                })
                let body = JSON.stringify({
                    password: this.state.passwords[0],
                    passwordConfirmation: this.state.passwords[1],
                    code: this.state.code
                });
                let that = this;
                startRefresherGlobal(this,true)
                fetch(requests.resetPassword, {
                    method: 'POST', body: body
                })
                    .then(response => {
                        return response.json();
                    })
                    .then(function (data) {
                        console.log('reset password server answer');
                        console.log(data);
                        
                        if (data.error) {
                            throw Error('самшит');
                        }
                        if (data.message) {
                            if (data.message === "Too many attempts, please try again in a minute.") {
                                //throw Error('не кликой. подумой! а то я сейчас кликну!');
                                //that.props.history.push('/');
                                thenFuncGlobal(that)
                            }
                        }

                    })
                    .catch(function (error) {
                        console.log("bad");
                        console.log('An error occurred:', error);
                        catchFuncGlobal(that)
                    });
            }
            else {
                this.setState({
                    noChange: true,
                    isMatchUp: false,
                });
            }
        }
        else {
            this.setState({
                noChange: true,
                isMatchUp: true,
            });
        }
    }
    render() {
        console.log('Reset password render');
        console.log(this.state);
        let textInfo = this.props.storeState.languageTextMain.registration.resetPassword;
        let helmet = this.props.storeState.languageTextMain.helmets.resetPassword;

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
                <div className="forgotPasswordBody d-flex flex-column align-items-center">
                    <Header driver={true} history={this.props.history} />
                    <div className="forgotPasswordContent d-flex flex-column align-items-center col-md-8 col-11">
                        <div className="d-flex justify-content-center align-items-center">
                            <span>{textInfo.newPasswordText}</span>
                        </div>
                        <div className={this.state.isChangePasswordType ? "resetPasswordInput resetPasswordInput-active col-md-5 col-12" : "resetPasswordInput col-md-5 col-12"}>
                            <input className={this.state.falde ? "forgotPasswordInput-error" : ""}
                                placeholder={textInfo.firstPlaceholder} type={this.state.isChangePasswordType ? "text" : "password"}
                                value={this.state.passwords[0]} onChange={(e) => {
                                    this.passwordonchange(e.target.value, 0);
                                    this.setState({ falde: false, isSended: false, noChange: false, })
                                }} />
                            <i onClick={() => { this.setState({ isChangePasswordType: !this.state.isChangePasswordType }) }} />
                        </div>
                        <div className={this.state.isChangePasswordType2 ? "resetPasswordInput resetPasswordInput-active col-md-5 col-12" : "resetPasswordInput col-md-5 col-12"}>
                            <input className={this.state.falde ? "forgotPasswordInput-error" : ""}
                                placeholder={textInfo.secondPlaceholder} type={this.state.isChangePasswordType2 ? "text" : "password"}
                                value={this.state.passwords[1]} onChange={(e) => {
                                    this.passwordonchange(e.target.value, 1);
                                    this.setState({ falde: false, isSended: false, noChange: false, })
                                }} />
                            <i onClick={() => { this.setState({ isChangePasswordType2: !this.state.isChangePasswordType2 }) }} />
                        </div>
                        {
                            this.state.isSended ?
                                <div className={this.state.isGood ? "forgotPasswordContent-active"
                                    : "forgotPasswordContent-error"}>{this.state.isGood ? textInfo.passwordChangeGood : textInfo.passwordChangeBad}</div> :
                                <React.Fragment />
                        }
                        {
                            this.state.noChange ?
                                <div className="forgotPasswordContent-error">{this.state.isMatchUp ? textInfo.errorLazy : textInfo.errorMatch}</div> :
                                <React.Fragment />
                        }
                        <div className="forgotPasswordBt mt-3 mb-5" onClick={() => this.sendRequest()}><span>{textInfo.sendRequest}</span></div>

                    </div>
                </div>

            </>
        )
    }
}
const ResetPassword = connect(
    (state) => ({
        storeState: state.AppReduser
    }),
)(ResetPasswordClass)
export default ResetPassword;