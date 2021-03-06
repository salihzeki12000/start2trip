import React from 'react';
import './DriversProfileComments.css';
import { connect } from 'react-redux'

// import CreateComment from './CreateComment.jsx';

import ShowComments from './ShowComments.jsx';

class DriversProfileCommentsClass extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "Заинтересованный посетитель",
        }
    }

    render() {
        function dateConversion(comments) {
            for (let i = 0; i < comments.length; i++) {
                comments[i].date = new Date(comments[i].date);
            }
            return comments;
        }

        let comments = this.props.driver.comments ? [...this.props.driver.comments].reverse() : [];
        let selectedComments = comments.slice((this.props.page - this.props.showPages) * 5, (this.props.page) * 5);
        selectedComments = dateConversion(selectedComments);
        return (
            <>
                <div className="driverProfileComments_commentBlock d-flex flex-column">
                    <ShowComments selectedComments={selectedComments} profile={this.props.profile} />
                </div>
            </>
        )
    }
}
const DriversProfileComments = connect(
    (state) => ({
        commentState: state.CommentReduser
    }),

)(DriversProfileCommentsClass);

export default DriversProfileComments;