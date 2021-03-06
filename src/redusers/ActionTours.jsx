
const SET_TOURS_MORE_PAGES_SHOW = 'SET_TOURS_MORE_PAGES_SHOW';

const SET_TOURS_PAGE = 'SET_TOURS_PAGE';

const CHANGE_PANEL_FIXED_CLASS = 'CHANGE_PANEL_FIXED_CLASS';

const SET_TOUR_PANEL_SELECTED_ELEMENT = 'SET_TOUR_PANEL_SELECTED_ELEMENT';

const SET_TOURS_LIST ='SET_TOURS_LIST';

const SET_MAX_PRICE ='SET_MAX_PRICE';

const SET_TEMP_PRICE_PART_TOUR = 'SET_TEMP_PRICE_PART_TOUR';

const SET_PRICE_PART_TOUR = 'SET_PRICE_PART_TOUR';

const CHANGE_VISUAL_TYPE = 'CHANGE_VISUAL_TYPE';

const changeVisualType = function(tourPageVisualType,toDefault){
  return {
    type: CHANGE_VISUAL_TYPE,
    tourPageVisualType:tourPageVisualType,
    toDefault: toDefault
  }
}
const setToursList=function(toursList, categories, tags, directions,daysNumber,departurePoint){
  return{
    type: SET_TOURS_LIST,
    toursList: toursList,
    categories: categories,
    tags: tags,
    directions: directions,
    daysNumber:daysNumber,
    departurePoint:departurePoint
  }
}
const setToursMorePagesShow = function (){
    return{
        type: SET_TOURS_MORE_PAGES_SHOW
    }
  }

const setToursPage = function(page){
    return{
      type: SET_TOURS_PAGE,
      toursPage: page
    }
  }

  const changePanelFixedClass = function(value){
    return{
      type: CHANGE_PANEL_FIXED_CLASS,
      tourPanelFixedClass: value
    }
  }
  const setTourPanelSelectedElement = function(value){
    return{
      type: SET_TOUR_PANEL_SELECTED_ELEMENT,
      tourPanelSelectedElement: value
    }
  }

  const setMaxPrice = (value)=>{
    return{
      type: SET_MAX_PRICE,
      maxPrice: value
    }
  }
  const setTempPricePartTour = (tempPricePart, valueMenu)=> {
    return {
        type: SET_TEMP_PRICE_PART_TOUR,
        tempPricePart: tempPricePart,
        valueMenu: valueMenu
    }
}

const setPricePartTour = (pricePart, valueMenu)=> {
    return {
        type: SET_PRICE_PART_TOUR,
        pricePart: pricePart,
        valueMenu: valueMenu
    }
}

export {
    setToursMorePagesShow, SET_TOURS_MORE_PAGES_SHOW,
    setToursPage, SET_TOURS_PAGE,
    changePanelFixedClass, CHANGE_PANEL_FIXED_CLASS,
    setTourPanelSelectedElement, SET_TOUR_PANEL_SELECTED_ELEMENT,
    setToursList,SET_TOURS_LIST,
    setMaxPrice,SET_MAX_PRICE,
    setTempPricePartTour,SET_TEMP_PRICE_PART_TOUR,
    setPricePartTour,SET_PRICE_PART_TOUR,
    changeVisualType,CHANGE_VISUAL_TYPE
}