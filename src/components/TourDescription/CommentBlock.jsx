import React from 'react';
import CreateComment from '../driverProfile/CreateComment';
import ShowComments from '../driverProfile/ShowComments';
import Manipulator from '../manipulator/Manipulator';
export default class CommentBlock extends React.Component{
    constructor(props){
        super(props);
    }
    shouldComponentUpdate(nextProps){ 
        return !(JSON.stringify(this.props)===JSON.stringify(nextProps));
    }
    render(){
        console.log("CommentBlock render");
        let selectedComments = this.props.comments.slice((this.props.page - this.props.showPages) * 5, (this.props.page) * 5);
        return (
            <div className="placeDescription_block d-flex flex-column" id={this.props.id}>
                <div className="placeDescription_fragmentName">Отзывы</div>
                <div className="render_otherPlaces" style={{ marginTop: "15px" }}>
                    <CreateComment userName={this.props.userName} createCommentString={"Оцените данное место"} />
                    <ShowComments selectedComments={selectedComments} />
                </div>
                <Manipulator number={this.props.comments.length} page={this.props.page} elementsNumber={5}
                    setPage={this.props.setPage} showMorePages={this.props.showMorePages} />
            </div>
        ) 
    }
}