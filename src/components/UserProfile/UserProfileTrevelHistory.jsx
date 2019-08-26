import React from 'react';
import { connect } from 'react-redux'
import requests from '../../config';

import Stars from '../stars/Stars';

class UserProfileTrevelHistoryClass extends React.Component {

    render() {
        function createCorrectRoute(route, length, time) {
            let routeString = route[0].point;
            for (let i = 1; i < route.length; i++) {
                routeString += ' - ' + route[i].point;
            }
            routeString += ' (' + length + ', ' + time + ")";
            return routeString;
        }
        function findCurrencyEl(that, iso) {
            for (let i = 0; i < that.props.globalReduser.profile.currencies.length; i++) {
                if (iso === that.props.globalReduser.profile.currencies[i].ISO) {
                    return i;
                }
            }
        }
        let that = this;
        let textInfo = this.props.storeState.languageTextMain.userProfile.userProfileTravelHistory;
        return (
            <div className="d-flex flex-wrap justify-content-center">
                {this.props.trevelHistory.map((element, index) =>
                    <div className="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-11 p-2">
                        <div className="trevelHistoryBody  d-flex flex-column">
                            <div className="d-flex flex-column historyBodyHeader">
                                <div className="d-flex justify-content-between">
                                    <span>{element.startDefault ? this.props.globalReduser.createDateTimeString(element.startDefault) : ''}</span>
                                    <span className="historyBodyHeaderType">{element.tripType.type_en}</span>
                                </div>
                                <span className="historyBodyHeaderRoute">{createCorrectRoute(element.route, element.travelLength, element.travelTime)}</span>
                                <hr />
                            </div>
                            <div className="d-flex flex-column historyBodyElement ">
                                <h5>{textInfo.drivercar}</h5>
                                <div className="historyBodyElementDriver d-flex align-items-center">
                                    <img src={requests.serverAddressImg + element.carrier.image} alt={''} />
                                    <div className="d-flex flex-column ml-1">
                                        <span>{element.carrier.firstName}</span>
                                        <Stars value={element.carrier.rating} commentNumber={element.carrier.comments + " "+textInfo.comments} valueDisplay={true} commentNumberDisplay={true} />
                                    </div>

                                </div>
                                <span>{element.carrier.workPhone}</span>
                                <span>{element.carrier.email}</span>
                                <div className="historyBodyElementDriver d-flex align-items-center">
                                    <img src={requests.serverAddressImg + element.car.image} alt={''} />
                                    <div className="d-flex flex-column ml-1">
                                        <span>{element.car.carBrand}</span>
                                    </div>
                                </div>
                                {/* <span>{textInfo.passengerNumber+': ' + element.passengerNumber}</span> */}
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>{textInfo.startPlace}</h5>
                                <span>{element.startPlace}</span>
                            </div>
                            <div className="d-flex flex-column historyBodyElement">
                                <h5>{textInfo.price}</h5>
                                <span>{this.props.globalReduser.profile.currencies ? this.props.globalReduser.profile.currencies[findCurrencyEl(that, element.currencyType)].symbol + element.price : ''}</span>
                            </div>
                            {
                                this.props.isHistory ?
                                    <React.Fragment>
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>{textInfo.startFact}</h5>
                                            <span>{element.startFact ? this.props.globalReduser.createDateTimeString(element.startFact) : textInfo.notStart}</span>
                                        </div>
                                        <div className="d-flex flex-column historyBodyElement">
                                            <h5>{textInfo.endFact}</h5>
                                            <span>{element.endFact ? this.props.globalReduser.createDateTimeString(element.endFact) : textInfo.notEnd}</span>
                                        </div>
                                    </React.Fragment>
                                    : <React.Fragment>

                                    </React.Fragment>
                            }
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const UserProfileTrevelHistory = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser
    }),
)(UserProfileTrevelHistoryClass);

export default UserProfileTrevelHistory;