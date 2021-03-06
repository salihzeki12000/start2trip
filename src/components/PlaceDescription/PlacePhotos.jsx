import React from 'react';
import { isMobileOnly, isMobile } from 'react-device-detect'
import requests from '../../config';
import { connect } from 'react-redux';
// import Carousel from '../usefulСomponents/Carousel';

class PlacePhotosClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShortPhotos: true,
            update: 0
        }
    }

    shouldComponentUpdate(nextProps, nextState) {

        return !(JSON.stringify(this.props) === JSON.stringify(nextProps)) || JSON.stringify(nextState) !== JSON.stringify(this.state);
    }

    photoStateChange = (value) => {
        this.setState({
            isShortPhotos: value
        });
    }
    render() {

        console.log('placePhotos render');

        console.log('isMobileOnly', isMobileOnly);
        console.log('isMobile', isMobile);
        console.log(this.state.update);
        console.log(this.props.photoArray);
        var isOver = false;
        let photoBlock = document.getElementById("photoBlock");
        var widthSum = 0;
        let maxWidth = photoBlock ? photoBlock.offsetWidth * 2 : 0;
        //let textInfo = this.props.storeState.languageTextMain.placePhotos;
        let className = " col-lg-3 col-md-6 col-3  placePhotos_elementBlock";/*placePhotos_elementBlock*/
        let textInfo = this.props.storeState.languageTextMain.places.popularPlaces;
        return (
            <>
                {
                    /*

                    <Carousel photoArray={this.props.photoArray} width={this.props.width} height={this.props.height}
                        widthCarouselEl={this.props.width/this.props.number}
                        heightCarouselEl={this.props.height/this.props.number} type={"horisontal"}
                    />

                    */
                }

                <div id="photoBlock" className="d-flex col-12 flex-md-wrap flex-nowrap p-1 pb-4 popularPlacesRender">
                    {
                        this.props.photoArray.map((element, index) => {

                            photoBlock = document.getElementById("photoBlock");
                            maxWidth = photoBlock ? photoBlock.offsetWidth * 2 : 0;
                            console.log('maxWidth', maxWidth);
                            if (maxWidth === 0 && index === 0) {
                                this.setState({
                                    update: this.state.update + 1
                                })
                            }
                            /*
                            if(index===0){
                                
                            }
                            */
                            if (!this.state.isShortPhotos || maxWidth === 0 || isMobile) {
                                return (
                                    <>
                                        <div className={className} id={"photono" + index}>
                                            <img style={{ borderRadius: '5px' , maxHeight:(this.props.isComment?"80px":"155px") }} src={requests.serverAddressImg + element.url} width="100%" height="100%" alt={"/picture " + index} onClick={() => this.props.showMask(index)} />
                                        </div>
                                    </>
                                )
                            }
                            else {
                                if (isOver) {
                                    return (<React.Fragment />);
                                }
                                else {
                                    if (index > 0) {
                                        let temp = document.getElementById("photono" + (index - 1));
                                        if (temp) {
                                            widthSum += temp.offsetWidth;
                                            
                                            if (maxWidth - widthSum < 2 * temp.offsetWidth && index !== this.props.photoArray.length-1) {
                                                isOver = true;
                                                return (
                                                    <div className={className} id={"photono" + index} >
                                                        <img style={{ borderRadius: '5px' , maxHeight:(this.props.isComment?"80px":"155px") }}  className="placePhotos_imageStyle" src={requests.serverAddressImg + element.url} width="100%" height="100%" alt={"/picture " + index} />
                                                        <div className="placePhotos_maskBlock" onClick={() => this.photoStateChange(false)}>
                                                            <div className="d-flex placePhotos_maskBlock_inner">
                                                                <div className="placePhotos_maskBlock_innerText">{textInfo.more}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        }
                                    }
                                    return (
                                        <div className={className} id={"photono" + index}>
                                            <img style={{ borderRadius: '5px' , maxHeight:(this.props.isComment?"80px":"155px") }} src={requests.serverAddressImg + element.url} width="100%" height="100%" alt={"/picture " + index} onClick={() => { this.props.showMask(index, this.props.photoArray) }} />
                                        </div>
                                    )
                                }
                            }
                        })
                    }
                </div>
            </>
        )
    }
}

const PlacePhotos = connect(
    (state) => ({
        storeState: state.AppReduser
    })
)(PlacePhotosClass);

export default PlacePhotos;