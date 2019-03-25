
const SET_TOURS_MORE_PAGES_SHOW = 'SET_TOURS_MORE_PAGES_SHOW';

const SET_TOURS_PAGE = 'SET_TOURS_PAGE';

const CHANGE_PANEL_FIXED_CLASS = 'CHANGE_PANEL_FIXED_CLASS';

const SET_TOUR_PANEL_SELECTED_ELEMENT = 'SET_TOUR_PANEL_SELECTED_ELEMENT';

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
export {
    setToursMorePagesShow, SET_TOURS_MORE_PAGES_SHOW,
    setToursPage, SET_TOURS_PAGE,
    changePanelFixedClass, CHANGE_PANEL_FIXED_CLASS,
    setTourPanelSelectedElement, SET_TOUR_PANEL_SELECTED_ELEMENT
}