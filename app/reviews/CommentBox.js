import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebaseRef from '../firebase/index';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

class CommentBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        }; // <- set up react state
    }
    componentWillMount(){
      /* Create reference to comments in Firebase Database */
      let commentsRef = firebaseRef.database().ref('comments').orderByKey().limitToLast(100);
      commentsRef.on('child_added', snapshot => {
        /* Update React state when comment is added at Firebase Database */
        let commentRef = snapshot.val()
        commentRef = {id: snapshot.key, author: commentRef.author, text: commentRef.text };
        this.setState({ comments: [commentRef].concat(this.state.comments) });
      })
    }
    render() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.comments} />
                <CommentForm user={this.props.user} />
            </div>
        );
    }
}

export default CommentBox;