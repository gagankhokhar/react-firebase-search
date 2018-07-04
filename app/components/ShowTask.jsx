import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {styles} from 'MapStyle'
import {show} from 'actions'
import {commentShow} from 'actions'
import * as API from 'API'
import * as actions from 'actions'
import CommentBox from '../reviews/CommentBox';

class ShowTask extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      description: '',
      parentNotes: '',
      kidsmenu: '',
      id: 0,
      info: '',
      city: '',
      category: '',
      email: '',
      comment: '',
      reviews: [
          {content: 'This is a test review'},
          {content: 'Oh hai, world!'}
      ],
      commentBeingTyped: ''
    };
  }


  componentDidMount () {
    const {tickets} = this.props;
    const {id} = this.props.params;
    let current;
    const promise = new Promise((resolve, reject) => {
      current = tickets.find((item) => {
      if(item.id == id){
        return item
      }
      }) || this.props.dispatch(show(id)).then((res) => {
        //console.log(res.val());
        return res.val() || {};
      });
      resolve(current)
    });
    
    promise.then((res) => {
    this.setState({
      name: res.name,
      location: res.location,
      description: res.description,
      parentNotes: res.parentNotes,
      kidsmenu: res.kidsmenu,
      id: res.id,
      info: res.info,
      city: res.city,
      category: res.category,
      email: res.email,
      createdAt: res.createdAt,
      latLng: res.latLng,
      comment: res.comment,
    }, this.setMap(res.latLng),
    );
    })
  }

  setMap (latLng) {
    const map = new google.maps.Map(this.refs.map, {
      zoom: 15,
      center: latLng,
      styles: styles
    });

    const marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
  }

  check () {
      const refsKeys = Object.keys(this.refs);
        refsKeys.forEach((key) => {
        const node = document.createElement('LABEL');
        node.classList.add('warning-lable');
        const textNode = document.createTextNode('This field can\'t be empty!');
        node.appendChild(textNode);
         
        if (!this.refs[key].value && key !== 'form' && key !== 'comment') {
          this.refs[key].parentElement.appendChild(node);
        }
         
      });
    }



  addNewComment (e) {
    e.preventDefault();
    this.check();
    const comment = this.refs.comment.value;

    const review = {
      comment
    };
    this.props.dispatch(actions.addReviews(review));
    this.refs.form.reset();
  }


  render () {

    const {comment} = this.state;
    const {name, location, description, kidsmenu, parentNotes, info, city, category, email, createdAt} = this.state;
    const date = moment.unix(createdAt).format('MMMM Do, YYYY @ k:mm ');
    const userEmail = email || 'Anonimus';
    return (
      <div className='current-task'>
        <h3>{name}</h3>
        <p><span className='colored-gray'>Category:</span> {category}</p>
        <p><span className='colored-gray'>Created at:</span> {date}</p>
        <p><span className='colored-gray'>Location:</span> {city}, {location}</p>
        <p><span className='colored-gray'>Contact info:</span> {info}</p>
        <p><span className='colored-gray'>Description:</span> {description}</p>
        <p><span className='colored-gray'>Information for Parents:</span> {parentNotes}</p>
        <p><span className='colored-gray'>Kids menu:</span> {kidsmenu}</p>

        <div ref='map' className='map-show-task'>
          <p>Map will be here</p>
        </div>



        <form ref='form' onSubmit={this.addNewComment.bind(this)}>
          <div className="form-group">
            <label>Description</label>
            <textarea ref='comment' rows="5" className="form-control"  placeholder="Enter your comment"/>
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>

        <h3>{this.state.user ? `Hello, ${this.state.user.displayName}!` : 'Please login!'}</h3>
        <CommentBox user={this.state.user} />

          <p><span className='colored-gray'>User Email:</span> {userEmail}</p>
          <p><span className='colored-gray'>Reviews:</span> {comment}</p>
      </div>

    )
  }
}



export default connect(({tickets}) => {
  return {
    tickets
  }
})(ShowTask);
