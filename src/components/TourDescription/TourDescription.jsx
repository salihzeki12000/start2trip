import React from 'react';
import Header from '../header/Header';
import TourInfo from './TourInfo.jsx';
import TourPanel from './TourPanel.jsx';
import DriversCommercial from '../drivers/DriversBody/DriversCommercial/DriversCommercial';

import './TourDescription.css';
import carthage from '../Tours/pictures/Carthage.webp';
import antioch from './pictures/antioch.jpg';
import roma from './pictures/roma.jpg';
import alexandria from './pictures/alexandria.jpg';
import konstantinople from './pictures/konstantinople.jpg';

import { connect } from 'react-redux';
import georgiaImg from '../home/HomeBody/pictures/georgia.png';

import TourProgram from './TourProgram.jsx';
import TourPhotos from './TourPhotos.jsx';
import TourMapBlock from './TourMapBlock.jsx';
import SimularToursBlock from './SimularToursBlock.jsx';
import CommentBlock from './CommentBlock.jsx';

import {changePanelFixedClass} from '../../redusers/ActionTours';
class TourDescriptionClass extends React.Component {
    constructor(props) {
        super(props);
        //window.scroll.addEventListener('change', (e)=>{console.log(e)});
        
        let countryId = this.props.match.params.country;
        let tourId = this.props.match.params.id;
        let tour = this.props.toursState.tours[countryId].tours[tourId];

        let widthAll = 870;
        let heightAll = 500;
        let n = 7;

        let width = widthAll/n;
        let height = heightAll/n;

        this.state = {
            userName: "Заинтересованный посетитель",
            page: 1,
            showPages: 1,
            photoSlice: 0,
            selectedPhotoIndex: 0,
            tour: tour,
            width: width,
            height: height,
            photoArray: [carthage, antioch, roma,alexandria, konstantinople,carthage,
            antioch, roma,alexandria, konstantinople,carthage, antioch, roma,
            alexandria, konstantinople,carthage, antioch, roma,alexandria,
            konstantinople],
            popularPlaces: [
                { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "32 отзыва", prise: "120$" },
                { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "12 отзывов", prise: "80$" },
                { img: georgiaImg, title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, sapiente dolor fugiat maiores quibusdam eum tempore delectus accusamus facere", link: "/driver", reviews: "55 отзыва", prise: "150$" },
            ],
        }
        
        
        
        this.selectPhoto=this.selectPhoto.bind(this);
        this.showMorePages=this.showMorePages.bind(this);
        this.setPage=this.setPage.bind(this);
        
    }
    showMorePages() {
        this.setState({
            page: this.state.page + 1,
            showPages: this.state.showPages + 1
        })
    }
    setPage(page) {
        if (page !== "...") {
            this.setState(
                {
                    page: page,
                    showPages: 1
                }
            )
        }
    }
    selectPhoto(photoIndex){
        function calculatePhotoSlice(photoIndex, length,OldPhotoIndex, OldPhotoSlice){
            let photoSlice=0;
            if(OldPhotoIndex<photoIndex){
                photoSlice = OldPhotoSlice+1;
            }
            else{
                photoSlice = OldPhotoSlice-1;
            }
            if(length<=7){
                return 0;
            }
            else{
                while(photoSlice<0){
                    photoSlice++;
                }
                while(length-photoSlice<7){
                    photoSlice--;
                }
                return photoSlice;
            }
        }
        let photoSlice = calculatePhotoSlice(photoIndex, this.state.photoArray.length,this.state.selectedPhotoIndex,this.state.photoSlice);
        this.setState({
            selectedPhotoIndex: photoIndex,
            photoSlice: photoSlice
        })       
    }
    render() {
        console.log("TourDescription render");
        //console.log(window.onscroll);

        
        let comments = [...this.props.commentState.comments].reverse();

        let topBlockId = "tourDescriptionId";
               
        return(
            <React.Fragment>
                <div className="drivers_top_background placeDescription_background col-12" id={topBlockId}>
                    <img src={carthage} width="100%" height="100%" style={{ position: "absolute" }} alt="noImage" />
                    <div style={{ position: "absolute", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)" }} />
                    <div className="wrapper d-flex flex-column">
                        <Header colorWhite={true}/>
                        <TourInfo tour={this.state.tour}/>
                    </div>
                </div>
                <div className="wrapper d-flex flex-column" key="aaa">
                    <div className = "drivers_bottom_background d-flex flex-column" >
                    <div className="drivers_body d-flex">
                        <div className="left_body_part col-9">
                            <TourPanel topBlockId={topBlockId} descriptionId={"tourDescriptionId"} variantsArray={["Программа тура","Фотографии","Карта тура","Похожие туры","Отзывы"]}
                            setPanelStateFunc={changePanelFixedClass} panelFixedClass={this.props.toursState.tourPanelFixedClass}/>
                            <TourProgram tour={this.state.tour}/>
                            <TourPhotos photoSlice={this.state.photoSlice} photoArray={this.state.photoArray} 
                            selectPhoto={this.selectPhoto} selectedPhotoIndex={this.state.selectedPhotoIndex} 
                            width={this.state.width} height={this.state.height}/>
                            <TourMapBlock tour={this.state.tour} cities={["Стамбул", "Антакья", "Александрия", "Картадж", "Рим"]}/>
                            <SimularToursBlock tours={this.state.popularPlaces}/>
                            <CommentBlock comments={comments} userName={this.state.userName} page={this.state.page}
                            setPage={this.setPage} showMorePages={this.showMorePages} showPages={this.state.showPages} id={"tourDescriptionId5"}/>
                        </div>
                        <div className="right_body_part col-3">
                            <DriversCommercial/>
                        </div>
                    </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
const TourDescription = connect(
    (state) => ({
        toursState: state.ToursReduser,
        commentState: state.CommentReduser
    }),

)(TourDescriptionClass);

export default TourDescription;