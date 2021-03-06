import React from 'react';
import { connect } from 'react-redux';

import ShowComments from '../usefulСomponents/ShowComments';

class AgencyProfileFeedbackClass extends React.Component {
    constructor(props) {
        super(props);
        let profile = this.props.globalReduser.profile;
        this.state = {
            comments: profile.comments
        }
    }

    render() {
        return (
            <div className="d-flex flex-wrap">
                <ShowComments selectedComments={this.state.comments} profile={this.props.profile} />
            </div>
        )
    }
}
const AgencyProfileFeedback = connect(
    (state) => ({
        storeState: state.AppReduser,
        globalReduser: state.GlobalReduser,
    }),
)(AgencyProfileFeedbackClass);

export default AgencyProfileFeedback;