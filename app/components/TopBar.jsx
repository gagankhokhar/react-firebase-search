import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import ControlsBar from 'ControlsBar'


class TopBar extends Component {

  render () {
    let {uid, email} = this.props.auth;
    const renderOr = () => {
      if (uid) {
        return (
            <Link className='btn btn-default nav-link mb-4' to='/user'>{email}</Link>
        )
      } else {
        return (
            <Link className='btn btn-default nav-link mb-4' to='/registration'>Sign up</Link>
        )
      }
    }


    return (

        <header className='main-header'>
            <nav className='navbar'>
                <div className='container'>
                    <a className='navbar-brand' href='/'>Bachabox</a>

                    <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>

                    <ControlsBar/>

                    {renderOr()}
                </div>
            </nav>
            <div className='sitenav bg-light'>
                <div className='container'>
                    <ul className='navbar justify-content-center'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/'>Main</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='map'>Map</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='add'>Add</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    )
  }
}

export default connect(({auth})=>{
  return {
    auth
  }
})(TopBar)
