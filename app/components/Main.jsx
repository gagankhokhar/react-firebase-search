import React, {Component} from 'react'
import TopBar from 'TopBar'
import SideBar from 'SideBar'
import ControlsBar from 'ControlsBar'
import Footer from 'Footer'



class Main extends Component {
  render () {
    return (
      <div className='main'>
        <TopBar/>
        <div className='container'>
          <div className='row mt-3 mb-3'>
            <div className='col'>
              
              {this.props.children}
            </div>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Main
