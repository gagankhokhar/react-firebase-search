import React, {Component} from 'react'
import UserPlace from 'UserPlace'

class UsersPlaces extends Component {
  render () {
    const {current} = this.props;
    const renderPlaces = current.map((place)=>{
      return <UserPlace key={place.id} {...place}/>
    })
    return (
      <div className='users-places row'>
        {renderPlaces}
      </div>
    )
  }
}

export default UsersPlaces
