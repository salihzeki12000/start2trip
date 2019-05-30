import React from 'react';
import {connect} from 'react-redux';
import '../driverProfileRegistration/DriverProfileAffiliateProgram.css';
import copy from '../driverProfileRegistration/img/copy.svg';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import requests from '../../config';
class AgencyProfileAffiliateProgrammClass extends React.Component{
    constructor(props){
        super(props);
    }
    copyValue = (id) =>{
        let selectedInput = document.getElementById(id);
        selectedInput.select();
        document.execCommand("copy");
    }
    render(){
        function paymentsCalculation(partners){
            let res = 0;
            
            for(let i=0; i<partners.length; i++){
                res = res + partners[i].payments;
            }
            res = Math.round(res*100)/100;
            return res;
        }
        var allPayments = paymentsCalculation(this.props.globalReduser.profile.partners ? this.props.globalReduser.profile.partners : []);
        let partners = this.props.globalReduser.profile.partners ? this.props.globalReduser.profile.partners : [];
        return (
            <div className="affiliateProgramBody">
                <div className="d-flex flex-column ">
                    <div className="d-flex flex-column align-items-center">
                        <h3>Партнерская программа</h3>
                        <p className="col-xl-8 col-lg-8 col-md-9 col-sm-10 col-10">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Recusandae impedit odio aspernatur veniam obcaecati veritatis fugit id voluptate excepturi nam aliquam architecto quam laboriosam suscipit deserunt neque, ab dolorem alias?</p>
                    </div>
                    <div className="affiliateProgramButton d-flex flex-sm-row flex-column justify-content-between align-items-center">
                        <div>
                            <div>Ваши партнёрские ссылки</div>
                            <div>
                                Ссылка на регистрацию
                            </div>
                            <div className="d-flex flex-row">
                                <input id="partnerRegistrationLink" placeholder="Ссылка 1" style={{width: '400px'}} value={requests.frontendAddress+'/register/'+this.props.globalReduser.profile._id}/>
                                <div onClick = {()=>this.copyValue("partnerRegistrationLink")} style={{background: 'url('+copy+') no-repeat center'}} className="copyElement"/>
                            </div>
                            <div>
                                Ссылка на главную
                            </div>
                            <div className="d-flex flex-row">
                                <input id="partnerMainPageLink" placeholder="Ссылка 1" style={{width: '400px'}} value={requests.frontendAddress+'/start/'+this.props.globalReduser.profile._id}/>
                                <div onClick = {()=>this.copyValue("partnerMainPageLink")} style={{background: 'url('+copy+') no-repeat center'}} className="copyElement"/>
                            </div>
                        </div>                   
                        <div className="d-flex flex-sm-row flex-column">
                        {
                            /*
                                <span>Партнерские ссылки</span>
                                <span>Пригласить друга</span>
                            */
                           <span>Промо материалы</span>
                        }
                              
                        </div>
                    </div>
                </div>
                <div>
                    <div className="affiliateProgramContent col-12">
                        <div className="affiliateProgramTitle d-flex">
                            <i className="questionicon"></i>
                            <span>Начисления никогда не заканчиваются. Чем больше у вас рефералов, и чем лучше они работают - тем больше вы получаете каждый день</span>
                        </div>
                        <div className="affiliateProgramAllEl d-flex flex-sm-row flex-column justify-content-around">
                            <div className="col-sm-4 col-12 ">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="peopleicon"></i>
                                    <span>{this.props.globalReduser.profile.partners ? this.props.globalReduser.profile.partners.length : 0}</span>
                                    <span>Всего рефералов</span>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="percenticon"></i>
                                    <span>14%</span>
                                    <span>С каждой оплаты</span>
                                </div>
                            </div>
                            <div className="col-sm-4 col-12 ">
                                <div className="affilitaProgramEl d-flex flex-column align-items-center justify-content-center">
                                    <i className="currencyicon"></i>
                                    <span>{allPayments+'$'}</span>
                                    <span>Заработанно Всего</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="affiliateProgramTableBody">
                        <Table className="affiliateProgramTable">
                            <TableHeader 
                            className="affiliateProgramTableHeader"
                            displaySelectAll={false} 
                            adjustForCheckbox={false}>
                                <TableRow >
                                    <TableHeaderColumn>EMAIL</TableHeaderColumn>
                                    <TableHeaderColumn>Дата регистрации</TableHeaderColumn>
                                    <TableHeaderColumn>Тип пользователя</TableHeaderColumn>
                                    <TableHeaderColumn>Начисления</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                className="affiliateProgramTable"
                                stripedRows={true} 
                                displayRowCheckbox={false}>
                                {partners.map((element, index)=>{
                                    function dateConverter(value){
                                        let day = value.getDate();
                                        let month = value.getMonth()+1;
                                        let year = value.getFullYear();
                                        if(day<10){
                                            day='0'+day;
                                        }
                                        if(month<10){
                                            month='0'+month;
                                        }
                                        return day+'.'+month+'.'+year;
                                    }
                                    function typeCreator(element){
                                        let type = 'Not selected';
                                        if(element.isDriver){
                                            type='Driver';
                                        }
                                        if(element.isCustomer){
                                            type='Customer';
                                        }
                                        if(element.isAgency){
                                            type='Agency';
                                        }
                                        return type;
                                    }
                                    let type = typeCreator(element);
                                    let dayString = dateConverter(new Date(element.registrationDate));
                                    return(
                                    <TableRow>
                                        <TableRowColumn>{element.email}</TableRowColumn>
                                        <TableRowColumn>{dayString}</TableRowColumn>
                                        <TableRowColumn>{type}</TableRowColumn>
                                        <TableRowColumn>{element.payments+'$'}</TableRowColumn>
                                    </TableRow>)
                                }                                   
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        );
    }
}
const AgencyProfileAffiliateProgramm = connect(
    (state) => ({
        storeState: state.AppReduser,
        profileReduser: state.DriverProfileRegistrationReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileAffiliateProgrammClass);

export default AgencyProfileAffiliateProgramm;