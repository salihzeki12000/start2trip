import React from 'react';
import RenderFourEl from '../home/HomeBody/RenderFourEl.jsx';
import ToursListElement from '../Tours/ToursListElement';
export default class SimularToursBlock extends React.Component {
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    render() {
        function findTagName(tagId, that) {
            if (that.props.tags.length > 0) {
                let tags = that.props.tags;
                let id = -1;

                for (let i = 0; i < that.props.tags.length; i++) {
                    if (that.props.tags[i].id === tagId) {
                        id = i;
                        break;
                    }
                }
                if (id === -1) {
                    return '';
                }
                return tags[id].tagLoc.name;
            }
            return '';
        }
        function findDepartureDate(element){
            let calendary = element.calendary;
            let departureDate = null;
            let isGood = false;
            let daily = element.daily;
            if(!daily){
               if(calendary.length >0){
                   let today = new Date();
                   let day = today.getDate();
                   let mounth = today.getMonth();
                   let year = today.getFullYear();
                   for(let i=0; i < calendary.length; i++){
                       let calendaryDate = new Date(calendary[i])
                       let calendaryDay = calendaryDate.getDate();
                       let calendaryMounth = calendaryDate.getMonth();
                       let calendaryYear = calendaryDate.getFullYear();
                       if(year<=calendaryYear&&mounth<=calendaryMounth&&day<=calendaryDay){
                           if(departureDate === null){
                               departureDate = calendaryDate;
                           }else if(departureDate.getDate()>=calendaryDay&&departureDate.getMonth()>=calendaryMounth){
                               departureDate = calendaryDate;
                           }
                       }
                   }
               }
           }
           
           let date = departureDate
           if(departureDate !== null&& !daily){
           departureDate = departureDate.getDate()+"."+((departureDate.getMonth()+1)<10?"0"+(departureDate.getMonth()+1):(departureDate.getMonth()+1))+"."+departureDate.getFullYear();
           isGood = true;
           }else if(daily){
               let today = new Date();
               departureDate = today.getDate()+"."+((today.getMonth()+1)<10?"0"+(today.getMonth()+1):(today.getMonth()+1))+"."+today.getFullYear();
               isGood = true;
           }
           return departureDate;
       }
        let tours = this.props.tours;
        let outerBlock = document.getElementById(this.props.outerBlock);
        
        console.log('outerBlock', outerBlock ? outerBlock.offsetWidth : 0);
        return (
            <>
                <div className="placeDescription_fragmentName">{this.props.fragmentName}</div>
                <div className="d-flex col-12 flex-md-wrap flex-nowrap p-0 popularPlacesRender" >
                
                    {   
                        tours.map((element, index) => {
                            if (index > 0) {
                                let temp = document.getElementById("addPlace" + (index - 1));
                                console.log('temp', temp ? temp.offsetWidth : 0);
                            }
                            return (
                                <ToursListElement element={element} index={'addPlace' + index} findTagName={(tagId) => findTagName(tagId, this)}
                                    departureDate={findDepartureDate(element)}
                                />
                            )
                        })
                        
                    }
                    {
                        /*
                        
                        <text>Нужно закончить работу над ToursListElement, чтобы открыть это</text>
                        */
                    }
                    
                </div>
            </>
        )
    }
}