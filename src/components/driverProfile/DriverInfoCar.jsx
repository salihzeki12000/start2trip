import React from 'react';
import Carousel from '../usefulСomponents/Carousel';
import { isMobileOnly } from 'react-device-detect';
import requests from '../../config';
import information from '../media/information.svg';
class DriverInfoCar extends React.Component {
    render(){
        //компонент, составляющий правую часть Driverinfo
        //принимает element = car
        function getCarTypeNumber(element, carTypes) {
            for (let i = 0; i < carTypes.length; i++) {
                if (carTypes[i].id === element.carType) {
                    return i;
                }
            }
            return -1;
        }
        function createCorrectUrls(urlArray) {
            let res = [];
            for (let i = 0; i < urlArray.length; i++) {
                res[i] = requests.serverAddress + urlArray[i];
            }
            return res;
        }
        let element = this.props.element;
        let carTypeNumber = getCarTypeNumber(element, this.props.carTypes);
        let carComfort = element.carComfort ? element.carComfort : [];
        let imageUrls = createCorrectUrls(element.carImages ? element.carImages : []);
        let textInfo = this.props.storeState.languageTextMain.drivers;

        debugger;
        console.log(carComfort);
        if(carComfort.length>0){
            carComfort[3]=!carComfort[3];// we paint element when false! not true
        }
        console.log(this.props.storeState.comfort);
        let parallelArray = [1,0,2,3];
        return(
            
            <>
                <div className="d-flex flex-md-row flex-column justify-content-between col-12">
                    <div className="block_element_infoBlock_name driversInfo_driverName d-flex" >
                        {element.carBrand}
                        <div className="driverInfo_informationIcon" style={{ background: "url(" + information + ")", backgroundSize: "18px 18px" }}>
                            <div className="driverInfo_informationBlock">
                                {
                                    carComfort.map((element, index) =>
                                        element ?
                                            <div className="d-flex">
                                                <i className="driverInfo_comfortIconStyle" style={{ background: "url(" + this.props.storeState.comfort[parallelArray[index]].icon + ") no-repeat", backgroundSize: "15px 15px" }} />
                                                <span className="driverInfo_comfortTextStyle">{this.props.storeState.comfort[parallelArray[index]].title}</span>
                                            </div>
                                            :
                                            <React.Fragment />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className="driverInfo_carTypeValue">{carTypeNumber >= 0 ? (this.props.carTypes[carTypeNumber].name_en + ', ' + element.carCapacity + ' '+textInfo.driverInfo.seats) : ''}</div>
                </div>
                <Carousel photoArray={imageUrls} type={isMobileOnly ? "horizontal" : "vertical"} />
            </>
        )
    }
}

export default DriverInfoCar;