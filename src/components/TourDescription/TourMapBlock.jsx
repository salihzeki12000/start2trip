import React from 'react';
import CurrentLocation from '../home/HomeBody/CurrentLocation.jsx';
import bookmarkEmpty from '../Places/pictures/bookmark_contour.svg';
import userBlueIcon from '../drivers/DriversBody/DriversBlock/pictures/user_blue.svg';
import { Link } from 'react-router-dom';
export default class TourMapBlock extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){
        console.log("TMB");

        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        console.log("MapBlock render");
    const mapStyles = {
        map: {
          position: 'absolute',
          width: '870px',
          height: '400px',
          borderRadius: '0 5px 5px 0',
        }
      };
    //let {tour} = props;
    return (
    <div className="placeDescription_block d-flex flex-column" id="tourDescriptionId3">
        <div className="placeDescription_fragmentName">Карта тура</div>
        <div className="placeDescription_fragmentName_mapBlock" style={{marginTop: "15px"}}>
            <div className="placeDescription_fragmentName_mapBlock" style={{position: "relative"}}>

            <CurrentLocation
                centerAroundCurrentLocation
                google={window.google}
                cities={this.props.cities}
                setLengthTime={()=>{}}
                mapUpdate={true}
                mapStyles={mapStyles}
            >                
            </CurrentLocation>
                
            <text style={{position: "absolute", color: "red", backgroundColor: "blue"}}>ВНИМАНИЕ! Карта является макетом! Все данные, выводимые на экран, забиты вручную.</text>
                
            </div>
        </div>
        <div className = "d-flex flex-column mapBlock_tourData col-12" style={{fontFamily: "Roboto", color: "#304269"}}>
            <div className="d-flex">
                <div className="d-flex mapBlock_dateBlock" >
                    <div style={{height: "100%"}}>{"Дата:"}</div>
                    <div className="mapBlock_dateBlock_dateValue">{this.props.tour.departureDate.toDateString()}</div>
                </div>
                <div className="mapBlock_bookmarkBlock">
                    <div className="d-flex toursList_rightBlock_firstLine">
                        <div className="d-flex" style={{margin: "0 auto" }}>
                            <div className="toursList_rightBlock_userIcon" style={{ background: "url(" + userBlueIcon + ")", backgroundSize: "10px 10px" }} />
                            <div className="toursList_rightBlock_available">{"Свободных мест: " + this.props.tour.passengersAvailable}</div>
                        </div>
                        <div className="toursList_rigntBlock_bookmark" style={{ background: "url(" + bookmarkEmpty + ")", backgroundSize: "20px 25px" }} />
                    </div>
                </div>
            </div>
            <div className="d-flex" >
               
                <div className="d-flex mapBlock_locationBlock">
                    {
                        this.props.tour.places.map((element,index)=>
                        <div className="d-flex mapBlock_locationBlock_element">
                            <div className="mapBlock_location"></div>
                            <div className="mapBlock_locationLine"></div>
                            <div className="mapBlick_locationPointName">{element}</div>
                        </div>
                        )
                    }
                </div>
                <div className="mapBlock_bookmarkBlock d-flex flex-column">
                    <div className="mapBlock_tourPrice">{"$"+this.props.tour.price}</div>
                    <button className="tourInfo_buttonStyle">ЗАКАЗАТЬ ТУР</button>
                    <div className="tourInfo_priceInfo mapBlock_priceInfo">Стоимость за человека</div>
                </div>
            </div>       
            <div className="mapBlock_selfTourBlock d-flex">
                <div>{"Не подобрали тур? Постройте"}</div>
                <Link to="/" className="mapBlock_selfTourBlock_selfTour">{"индивидуальный маршрут!"}</Link>
            </div>               
        </div>
    </div>
    )
    }
}