import React from 'react';
import marked from 'react-marked';
import Remarkable from 'remarkable';

var Comment = React.createClass({
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    return { __html: rawMarkup };
  },

  render: function() {
    return (
      <div className="content comment">
        <img src="" />
        <h3>{this.props.author}</h3>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  }
});

export default Comment;