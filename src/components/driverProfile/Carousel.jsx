import React from 'react';
import "./Carousel.css"


const PhotoSelect = (props) => {

    let { src, selectPhoto, photoIndex, selectedPhotoIndex } = props;
    return (
        <div className={selectedPhotoIndex === photoIndex ? "carouselChoiceEl carouselChoiceEl-active" : "carouselChoiceEl"} onClick={() => { selectPhoto(photoIndex) }}>
            <img src={src} width="100%" height="100%" alt={"/picture " + photoIndex} />
        </div>
    )
}
export default class Carousel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPhotoIndex: 0,
        }
    }
    selectPhoto = (photoIndex) => {
        this.setState({
            selectedPhotoIndex: photoIndex,
        })
    }
    render() {


        switch (this.props.type) {
            case "vertical": {
                return (
                    <div className="d-flex col-12 p-0" id="tourDescriptionId2">

                        <div className="col-md-10 col-9 p-0 carouselMainPhoto">
                            <img key={this.state.selectedPhotoIndex + "/change"} src={this.props.photoArray[this.state.selectedPhotoIndex]} alt="/Selected" />
                        </div>

                        <div className="carouselChoice"  >
                            <div className="d-flex flex-column photoCarouselClass" >
                                {
                                    this.props.photoArray.map((element, index) =>
                                        <PhotoSelect src={element} selectPhoto={this.selectPhoto} photoIndex={index}
                                            selectedPhotoIndex={this.state.selectedPhotoIndex} />
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )
            }
            default: {

                return (
                    <div className="d-flex flex-column col-12 p-0" id="tourDescriptionId2">
                        <div className="col-12 p-0 carouselMainPhotoHorizontal">
                            <img key={this.state.selectedPhotoIndex + "/change"} src={this.props.photoArray[this.state.selectedPhotoIndex]} width="100%" height="100%" alt="/Selected" />
                        </div>
                        <div className="carouselChoiceHorizontal" >
                            {
                                this.props.photoArray.map((element, index) =>
                                    <PhotoSelect src={element} selectPhoto={this.selectPhoto} photoIndex={index} selectedPhotoIndex={this.state.selectedPhotoIndex} />
                                )
                            }
                        </div>
                    </div>
                )
            }

        }

    }
}