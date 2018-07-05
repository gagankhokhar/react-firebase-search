import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {styles} from 'MapStyle'
import {show} from 'actions'
import {commentShow} from 'actions'
import * as API from 'API'
import * as actions from 'actions'
import CommentBox from '../reviews/CommentBox'


class ShowTask extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      location: '',
      description: '',
      parentnotes: '',
      kids_menu: '',
      kids_menu_description: '',
      nursing_great: '',
      nursing_great_description: '',
      kids_eat_free: '',
      kids_eat_free_description: '',
      parking: '',
      parking_description: '',
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
      kids_menu: res.kids_menu,
      kids_menu_description: res.kids_menu_description,
      nursing_great: res.nursing_great,
      nursing_great_description: res.nursing_great_description,
      kids_eat_free: res.kids_eat_free,
      kids_eat_free_description: res.kids_eat_free_description,
      parking: res.parking,
      parking_description: res.parking_description,
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


    const {
      name, 
      location, 
      description, 
      parentnotes, 
      info, 
      city, 
      category, 
      email, 
      createdAt,
      kids_menu, 
      kids_menu_description, 
      nursing_great, 
      nursing_great_description, 
      kids_eat_free,
      kids_eat_free_description,
      parking,
      parking_description
    } = this.state;
    const date = moment.unix(createdAt).format('MMMM Do, YYYY @ k:mm ');
    const userEmail = email || 'Anonimus';
    const show_parentnotes = this.state.parentnotes == 'yes' ? true : false;
    const show_nursing = this.state.nursing_great == 'yes' ? true : false;
    const show_kids_menu = this.state.kids_menu == 'yes' ? true : false;
    const show_kids_food = this.state.kids_eat_free == 'yes' ? true : false;
    const show_parking = this.state.parking == '' ? false : true;
    return (
      <div className='current-task col-7'>
        <h3>{name}</h3>
        <div>
          <p><span className='colored-gray'>Category:</span> {category}</p>
          <p><span className='colored-gray'>Created at:</span> {date}</p>
          <p><span className='colored-gray'>Location:</span> {city}, {location}</p>
          <p><span className='colored-gray'>Contact info:</span> {info}</p>
          <p><span className='colored-gray'>Description:</span> {description}</p>
          { show_nursing  ? (
            <p><span className='colored-gray'>Information for Parents:</span> {parentnotes}</p>
          ) : ('')
            }
        </div>
        <hr/>
        <ul className='place_guide'>

            { show_nursing  ? (
              <li className='place_guide__info'>
                <i className="fa fa-check"></i>
                <div>
                  <h5>Good for Nursing:</h5>
                  <p>{nursing_great_description}</p>
                </div>
              </li>
            ) : ('')
              }

            { show_kids_menu  ? (
              <li className='place_guide__info'>
                <i className="fa fa-check"></i>
                <div>
                  <h5>Kids menu:</h5>
                  <p>{kids_menu_description}</p>
                </div>
              </li>
            ) : ('')
              }

              { show_kids_food  ? (
                <li className='place_guide__info'>
                  <i className="fa fa-check"></i>
                  <div>
                    <h5>Free Food:</h5>
                    <p>{kids_eat_free_description}</p>
                  </div>
                </li>
              ) : ('')
                }

              { parking  ? (
                <li className='place_guide__info'>
                  <i className="fa fa-check"></i>
                  <div>
                    <h5>Parking</h5>
                    <p>{parking_description}</p>
                  </div>
                </li>
              ) : ('')
                }

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
