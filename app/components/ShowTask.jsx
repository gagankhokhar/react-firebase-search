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
      parentnotes: '',
      kidsmenu: '',
      kidsmenuinput: '',
      nursinggreat: '',
      nursinggreatInput: '',
      id: 0,
      info: '',
      city: '',
      category: '',
      email: ''
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
      parentnotes: res.parentnotes,
      kidsmenu: res.kidsmenu,
      kidsmenu: res.kidsmenuinput,
      nursinggreat: res.nursinggreat,
      nursinggreatInput: res.nursinggreatInput,
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

  // check () {
  //     const refsKeys = Object.keys(this.refs);
  //       refsKeys.forEach((key) => {
  //       const node = document.createElement('LABEL');
  //       node.classList.add('warning-lable');
  //       const textNode = document.createTextNode('This field can\'t be empty!');
  //       node.appendChild(textNode);
         
  //       if (!this.refs[key].value && key !== 'form' && key !== 'comment') {
  //         this.refs[key].parentElement.appendChild(node);
  //       }
         
  //     });
  //   }



  // addNewComment (e) {
  //   e.preventDefault();
  //   this.check();
  //   const comment = this.refs.comment.value;

  //   const review = {
  //     comment
  //   };
  //   this.props.dispatch(actions.addReviews(review));
  //   this.refs.form.reset();
  // }


  render () {


    const {name, location, description, kidsmenu, kidsmenuinput, nursinggreat, nursinggreatInput, parentnotes, info, city, category, email, createdAt} = this.state;
    const date = moment.unix(createdAt).format('MMMM Do, YYYY @ k:mm ');
    const userEmail = email || 'Anonimus';
    return (
      <div className='current-task col-7'>
        <h3>{name}</h3>
        <div>
          <p><span className='colored-gray'>Category:</span> {category}</p>
          <p><span className='colored-gray'>Created at:</span> {date}</p>
          <p><span className='colored-gray'>Location:</span> {city}, {location}</p>
          <p><span className='colored-gray'>Contact info:</span> {info}</p>
          <p><span className='colored-gray'>Description:</span> {description}</p>
          <p><span className='colored-gray'>Information for Parents:</span> {parentnotes}</p>
        </div>
        <hr/>
        <ul className='place_guide'>
          <h4>Family Amenities</h4>
          <li className='place_guide__info'>
            <p><span className='colored-gray'>Good for Nursing:</span> {nursinggreat}</p>
            <p>{nursinggreatInput}</p>
          </li>
          <li>
            <p><span className='colored-gray'>Kids menu:</span> {kidsmenu}</p>
            <p>{kidsmenuinput}</p>
          </li>
        </ul>

        <div ref='map' className='map-show-task'>
          <p>Map will be here</p>
        </div>



        
      </div>

    )
  }
}



export default connect(({tickets}) => {
  return {
    tickets
  }
})(ShowTask);
