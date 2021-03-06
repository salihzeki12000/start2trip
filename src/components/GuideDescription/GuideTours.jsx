import React from 'react';
import '../Places/PlacesList.css';
import { connect } from 'react-redux';
import { setPage, setMorePagesShow } from '../../redusers/ActionGuides';
import { setMaxPrice } from '../../redusers/ActionTours';
import {startRefresherGlobal, thenFuncGlobal, catchFuncGlobal,findTagName,getCurrencies,placesSort} from '../../redusers/GlobalFunction'

import ToursListElement from '../Tours/ToursListElement';
import Manipulator from '../manipulator/Manipulator';

// import requests from '../../config';

class GuideToursClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    showMorePages = () => {
        this.props.dispatch(setMorePagesShow());
    }
    setPageFunc = (page) => {
        if (page !== "...") {
            this.props.dispatch(setPage(page));
        }
    }
    
    sortArrayByDate = (element, departureDate) => {
        let calendary = element.calendary;
        let isGood = false;
        let daily = element.daily;
        if (!daily) {
            if (calendary.length > 0) {
                let today = this.props.departureDate === null ? new Date() : new Date(this.props.departureDate)
                let day = today.getDate();
                let mounth = today.getMonth();
                let year = today.getFullYear();
                for (let i = 0; i < calendary.length; i++) {
                    let calendaryDate = new Date(calendary[i])
                    let calendaryDay = calendaryDate.getDate();
                    let calendaryMounth = calendaryDate.getMonth();
                    let calendaryYear = calendaryDate.getFullYear();
                    if (year <= calendaryYear && mounth <= calendaryMounth && day <= calendaryDay) {
                        if (departureDate === null) {
                            departureDate = calendaryDate;
                        } else if (departureDate.getDate() >= calendaryDay && departureDate.getMonth() >= calendaryMounth) {
                            departureDate = calendaryDate;
                        }
                    }
                }
            }
        }

        let date = departureDate
        if (departureDate !== null && !daily) {
            departureDate = departureDate.getDate() + "." + ((departureDate.getMonth() + 1) < 10 ? "0" + (departureDate.getMonth() + 1) : (departureDate.getMonth() + 1)) + "." + departureDate.getFullYear();
            isGood = true;
        } else if (daily) {
            let today = this.props.departureDate === null ? new Date() : new Date(this.props.departureDate);
            date = new Date(today.getFullYear(), today.getMonth(), today.getDate())
            departureDate = today.getDate() + "." + ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + "." + today.getFullYear();
            isGood = true;
        }
        return ({ isGood: isGood, departureDate: departureDate, date: date, element: element });
    }
    render() {
        
        let tours = this.props.guidesReduser.guideData && this.props.guidesReduser.guideData.tours ?
         [...this.props.guidesReduser.guideData.tours] : [];
        let selectedTours = [];

        if (tours.length > 0 && this.props.storeState.currencies.length > 0) {
            selectedTours = tours.slice((this.props.guidesReduser.page - this.props.guidesReduser.showPages) * this.props.guidesReduser.pagesMenuValue,
                this.props.guidesReduser.page * this.props.guidesReduser.pagesMenuValue);

        }

        let textInfo = this.props.storeState.languageTextMain.home.homeBottom.homeRoutesList;
        let pageNotFound = this.props.storeState.languageTextMain.home.pageNotFound;
        let isEmpty = (selectedTours.length === 0 && this.props.isStaying);
        let isLoading = (selectedTours.length === 0 && !this.props.isStaying);

        return (

            <>
                <div className="drivers_block d-flex flex-wrap">
                    {selectedTours.map((element, index) => {
                        return (
                            <>
                                <ToursListElement element={element} index={index} findTagName={(tag) => findTagName(tag, this)}
                                    departureDate={undefined} changeTravelVisibility={this.props.changeTravelVisibility}
                                    isGuideTours={true} noDateSeatsData={true} isRedirectButton={true}
                                />
                            </>
                        )                     
                    })}
                    {
                        isLoading || isEmpty ?
                            <>
                                {isLoading ?
                                    <div className="placesList_loading">
                                        <span>{pageNotFound.loading}</span>
                                    </div> :
                                    <div className="placesList_noElementsBlock">
                                        <span>{pageNotFound.text1 + " " + pageNotFound.text2}<br />{pageNotFound.text3}</span>
                                    </div>
                                }
                            </>
                            : <React.Fragment />
                    }
                </div>
                <Manipulator number={tours.length} page={this.props.guidesReduser.page} setPage={this.setPageFunc}
                    elementsNumber={this.props.guidesReduser.pagesMenuValue} showMorePages={this.showMorePages}
                />
            </>

        )
    }
}
const GuideTours = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
        guidesReduser: state.GuidesReduser
    }),
)(GuideToursClass);

export default GuideTours;