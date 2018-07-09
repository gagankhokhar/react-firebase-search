import React, {Component} from 'react'
import placeholder from '../img/placeholder.png'
import moment from 'moment'


class Place extends Component {
  showPlace (e) {
    window.location = `#/place/${this.props.id}`;
    e.preventDefault();
  }

  render () {

    const {id, name, location, info, description, cityImg, createdAt, city} = this.props;
    const imgSrc = cityImg || placeholder;
    const date = moment.unix(createdAt).format('MMMM Do, YYYY @ k:mm ');
    return (
      <div onClick={this.showPlace.bind(this)} className='place-item'>
        <img src={imgSrc}/>
        <div>
          <h3 className='font-weight-normal mb-0'>{name}</h3>
          <small className='text-muted d-block'>{city}, {location}</small>
          <p className='mt-1 place-item__des'>{description}</p>
        </div>
      </div>

    )
  }
}

export default Place
