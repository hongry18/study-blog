import React from 'react';
import { connect } from 'react-redux';
import { Header, Write, NeededLogin } from 'components';
import { postRequest } from 'actions/post';

class NewPost extends React.Component {

    constructor(props) {
        super(props);
        this.handlePost = this.handlePost.bind(this);
    }

    handlePost(title, content) {
        return this.props.postRequest(title, content)
            .then( () => {
                if (this.props.postStatus === 'SUCCESS') {
                    Materialize.toast('Success!', 2000);
                } else {
                    let $toastContent = $('<span style="color: #FFB4BA">' + this.props.errorMessage + '</span>');
                    Materialize.toast($toastContent, 2000);
                }
            });
    }

    render() {
        const write = (
            <Write
                onPost={this.handlePost}
            />
        );
        return (
            <div className="wrapper">
                { this.props.isLoggedIn ? write : <NeededLogin /> }
            </div>
        );
    }
}

const mapState2Props = (state) => {
    return {
        isLoggedIn: state.authentication.status.isLoggedIn,
        postStatus: state.post.post,
        errorMessage: state.post.error
    };
};

const mapDispatch2Props = (dispatch) => {
    return {
        postRequest: (title, content) => {
           return dispatch(postRequest(title, content)); 
        }
    };
};

export default connect(mapState2Props, mapDispatch2Props)(NewPost);
