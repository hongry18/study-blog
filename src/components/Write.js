import React from 'react';

class Write extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            content: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handlePost = this.handlePost.bind(this);
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handlePost() {
        let title = this.state.title;
        let content = this.state.content;

        this.props.onPost(title, content)
            .then(() => {
                this.setState({
                    title: '',
                    content: ''
                });
            });
    }

    render() {
        return(
            <div className="container write">
                <div className="card">

                    <div className="input-field col s12 username">
                        <label>Title</label>
                        <input
                            name="title"
                            type="text"
                            className="validate"
                            value={this.state.title}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="card-content">
                        <textarea
                            className="materialize-textarea"
                            name="content"
                            placeholder="Write down your memo"
                            value={this.state.contents}
                            onChange={this.handleChange}
                        ></textarea>
                    </div>
                    <div className="card-action">
                        <a onClick={this.handlePost}>POST</a>
                    </div>
                </div>
            </div>
        );
    }
}

Write.propTypes = {
    onPost: React.PropTypes.func
};
 
Write.defaultProps = {
    onPost: (contents) => { console.error('post function not defined'); }
};

export default Write;
