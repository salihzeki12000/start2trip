import React from 'react';
import RenderModalRegistration from '../header/RenderModalRegistration';
import { Modal, ModalBody } from 'reactstrap';
import { connect } from 'react-redux';
import Header from '../header/Header'
import {Helmet} from 'react-helmet';

import './AuthRedirect.css';
import { setProfileData, setUrlAddress } from "../../redusers/ActionGlobal"
const ModalRegistration = (props) => {
    let { modalRegistration, toggle, className, authorization } = props;
    return (
        <Modal isOpen={modalRegistration} toggle={/*toggle*/{}} className={className + " p-0"}>

            <ModalBody>
                <RenderModalRegistration close={toggle} authorization={authorization} />
            </ModalBody>

        </Modal>
    )
}
class AuthRedirectClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.props.dispatch(setProfileData({}));
    }
    authorization=()=> {
        return 0;
    }
    toggle=()=> {//функция завершения работы
        //this.props.globalhistory.history.pop();
        
        
        let address = this.props.globalReduser.previousUrl;
        let jwt = this.props.globalReduser.readCookie('jwt');
        if (jwt && jwt !== "-") {
            
            if(address.length===0){
                this.props.history.push('/');
            }
            else{
                
                //let urlAddress = new Url(address);
                this.props.dispatch(setUrlAddress(""));
                

                this.props.history.push(address);
            };

            console.log('toggle end');
        }
        else {
            console.log('Ошибка! JWT не установлен!');
            this.props.history.push('/login');
        }
    }
    render() {
        return (
            <React.Fragment>
                <Helmet>
                    <title>{'Авторизация'}</title>
                    <meta name="description" content={'Авторизация'} />
                    <meta property="og:site_name" content="Tripfer" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://tripfer.com/login" />
                    <meta property="og:title" content={'Авторизация'} />
                    <meta property="og:description" content={'Авторизация'} /> 
                </Helmet>
                <div className="home_window" style={{ minHeight: "95vh" }}>
                    <Header history={this.props.history} />
                    <ModalRegistration modalRegistration={/*this.state.modalRegistration*/true} toggle={this.toggle} className={'authRedirect_background'} authorization={this.authorization} />
                </div>
            </React.Fragment>
        )
    }
}
const AuthRedirect = connect(
    (state) => ({
        //storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        //globalReduser: state.GlobalReduser,*/
    }),
)(AuthRedirectClass);

export default AuthRedirect;