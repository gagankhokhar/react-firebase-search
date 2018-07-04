import React from 'react';
import firebaseRef from '../firebase/index';

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.props.user.displayName;
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    firebaseRef.database().ref('comments').push( {author: author, text: text} );
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      <div className="content">
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input type="text"
            placeholder="Leave a comment"
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <input type="submit" value="Post" />
        </form>
      </div>
    );
  }
});

export default CommentForm;