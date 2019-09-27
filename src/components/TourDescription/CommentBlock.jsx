import React from 'react';
import { connect } from 'react-redux';

import CreateComment from '../driverProfile/CreateComment';
import ShowComments from '../driverProfile/ShowComments';
import Manipulator from '../manipulator/Manipulator';

class CommentBlockClass extends React.Component {
    /*constructor(props){
        super(props);
    }*/
    shouldComponentUpdate(nextProps) {
        return !(JSON.stringify(this.props) === JSON.stringify(nextProps));
    }
    render() {

        console.log("CommentBlock render");

        let selectedComments = this.props.comments.slice((this.props.page - this.props.showPages) * 5, (this.props.page) * 5);
        let textInfo = this.props.storeState.languageTextMain.tourDescription.commentBlock;

        return (
            <div className="placeDescription_block d-flex flex-column" style={{ marginBottom: '100px' }} id={this.props.id}>
                {
                    !this.props.noHeader &&
                        <div className="placeDescription_fragmentName">{textInfo.comments}</div>
                }               
                <div className="render_otherPlaces" style={{ marginTop: "15px" }}>
                    {this.props.targetId ? <>
                        <CreateComment targetType={this.props.targetType} targetId={this.props.targetId} createCommentString={textInfo.createCommentString}
                            startRolling={this.props.startRolling ? () => this.props.startRolling() : () => { }} endRolling={this.props.endRolling ? (result) => this.props.endRolling(result) : () => { }} />
                    </> : <React.Fragment />}

                    <ShowComments selectedComments={selectedComments} />

                </div>
                {
                    selectedComments.length > 0 ?
                        <Manipulator number={this.props.comments.length} page={this.props.page} elementsNumber={5}
                            setPage={this.props.setPage} showMorePages={this.props.showMorePages} />
                        : <React.Fragment />
                }

            </div>
        )
    }
}

const CommentBlock = connect(
    (state) => ({
        storeState: state.AppReduser,
    }),

)(CommentBlockClass);

export default CommentBlock;