
const SET_PAGES_MENU_VALUE = 'SET_PAGES_MENU_VALUE';

const SET_SORT_MENU_VALUE = 'SET_SORT_MENU_VALUE';

const SET_PAGE = 'SET_PAGE_PLACES';

const SET_MORE_PAGES_SHOW = 'SET_MORE_PAGES_SHOW';

const CHANGE_PLACES_FIXED_CLASS = 'CHANGE_PLACES_FIXED_CLASS';

const SET_PLACES_PANEL_SELECTED_ELEMENT = 'SET_PLACES_PANEL_SELECTED_ELEMENT';

const SET_PLACES_LIST = 'SET_PLACES_LIST';

const SET_SELECTED_TAG = 'SET_SELECTED_TAG';

const SET_SELECTED_DIRECTION = 'SET_SELECTED_DIRECTION';

const SET_ROUTES_LIST = 'SET_ROUTES_LIST';

const setRoutesList = function(routesList, directions, country){
  
  return{
    type: SET_ROUTES_LIST,
    routesList: routesList,
    directions: directions,
    country: country
  }
}
const setSelectedDirection = function(directionId){
  return{
    type: SET_SELECTED_DIRECTION,
    directionId: directionId
  }
}
const setSelectedTag = function(tagId){
  return{
    type: SET_SELECTED_TAG,
    tagId: tagId
  }
}
const setPlacesList = function(placesList, tags, directions,country){
  return {
    type: 'SET_PLACES_LIST',
    placesList: placesList,
    tags: tags,
    directions:directions,
    country:country
  }
}
const setPagesMenuValue = function (pagesMenuValue){
    return {
      type: 'SET_PAGES_MENU_VALUE',
      pagesMenuValue: pagesMenuValue
    }
  }
const setSortMenuValue = function (sortMenuValueText){
  return {
    type: 'SET_SORT_MENU_VALUE',
    sortMenuValueText: sortMenuValueText
  }

}
const  setPage= function(page){
  return{
    type: SET_PAGE,
    page: page
  }
}
const setMorePagesShow = function (){
  console.log("setMorePagesShow call");
  return{
      type: SET_MORE_PAGES_SHOW
  }
}
const changePlacesFixedClass = function(value){
  return{
    type: CHANGE_PLACES_FIXED_CLASS,
    placePanelFixedClass: value
  }
}
const setPlacesPanelSelectedElement = function(value){
  return{
    type: SET_PLACES_PANEL_SELECTED_ELEMENT,
    placePanelSelectedElement: value
  }
}
  export {

    setPagesMenuValue, SET_PAGES_MENU_VALUE,
    setSortMenuValue, SET_SORT_MENU_VALUE,
    setPage, SET_PAGE,
    setMorePagesShow, SET_MORE_PAGES_SHOW,
    changePlacesFixedClass, CHANGE_PLACES_FIXED_CLASS,
    setPlacesPanelSelectedElement, SET_PLACES_PANEL_SELECTED_ELEMENT,
    setPlacesList,SET_PLACES_LIST,
    setSelectedTag,SET_SELECTED_TAG,
    setSelectedDirection,SET_SELECTED_DIRECTION,
    setRoutesList, SET_ROUTES_LIST
  }