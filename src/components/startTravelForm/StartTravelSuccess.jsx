import React from "react";
import './StartTravelForm.css';
import './StartTravelSuccess.css';
import './StartTravelBlockStyles.css';

import successImage from '../media/success.svg'
export default class StartTravelSuccess extends React.Component {
    render() {
        return (
            <div className="travelFormBlock"  style={{ display: this.props.successVisibility }}/*style={{ display: "none" }}*/
                /*onClick={(e) => { if (e.currentTarget === e.target) { this.props.changeSuccessVisibility('none') } }}*/>
                <div className="startTravelForm" style={{width: 'auto', height: '100%'}}>
                    <div className="d-flex flex-column" style={{margin: 'auto', background: '#fff', padding: '30px', borderRadius: '5px'}}>
                        <div className="successImageBlock">
                            <img src={successImage} width="100%" height="100%" alt="SUCCESS"></img>
                        </div>
                        <div className="successThanks">
                            <div className="successThanks_value">{this.props.textInfo.thanks}</div>
                        </div>
                        <div className="success_blueLine" />
                        <div className="success_driverInfo">
                            <div className="success_driverInfo_textLine">
                                {this.props.textInfo.textLine[0]}
                            </div>
                            <div className="success_driverInfo_textLine" style={{}}>
                                {this.props.textInfo.textLine[1]}
                            </div>
                        </div>
                        <button className="success_continueButton" onClick={() => this.props.changeSuccessVisibility('none')}>
                            <div className="success_continueButton_value">{this.props.textInfo.successButton}</div>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}