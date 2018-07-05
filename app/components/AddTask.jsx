import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import * as actions from 'actions'
import * as API from 'API'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
import ImageUploader from './ImageUploader/index'




class AddTask extends Component {

  constructor (props) {
    super(props)
    this.state = {
      cities: [],
      hidden: true,
      tabIndex: 0
    }
  }

  check () {
      const refsKeys = Object.keys(this.refs);
        refsKeys.forEach((key) => {
        const node = document.createElement('LABEL');
        node.classList.add('warning-lable');
        const textNode = document.createTextNode('This field can\'t be empty!');
        node.appendChild(textNode);
         
        if (!this.refs[key].value && key !== 'form' && key !== 'category') {
          this.refs[key].parentElement.appendChild(node);
        }
         
      });
    }



  handleGetCities () {
      //probaly may create erros
    const city = this.refs.city.value ? this.refs.city.value : ' ';
    const service = new google.maps.places.AutocompleteService();
    const res = service.getPlacePredictions({ input: city, types: ['(cities)'] },
     (predictions, status) => {
       this.setState({cities: predictions ? predictions : []})
     });
  }

  geocode (location) {
    const geocoder = new google.maps.Geocoder();
    const promise = new Promise((resolve, reject) => {
      geocoder.geocode({'address': location}, (results, status) => {
        resolve(results)
      })
    });
    return promise
  }

  addNewTask (e) {
    e.preventDefault();
    // this.check();
    const {uid, email} = this.props.auth;
    const name = this.refs.name.value;
    const location = this.refs.location.value;
    const info = this.refs.info.value;
    const description = this.refs.description.value;
    const city = this.refs.city.value;
    const category = this.refs.category.innerHTML;
    const kids_menu = this.kids_menu_select.value;
    const kids_menu_description = this.refs.kids_menu_description.value;
    const nursing_great = this.nursing_great_select.value;
    const nursing_great_description = this.refs.nursing_great_description.value;
    const kids_eat_free = this.kids_eat_free_select.value;
    const kids_eat_free_description = this.refs.kids_eat_free_description.value;
    const parking = this.parking_select.value;
    const parking_description = this.refs.parking_description.value;
    const parentnotes = this.refs.parentnotes.value;
    let latLng ={};
    let cityImg = '';
    const fulllocation = `${city}, ${location}`;
    //remove all special char
    const regExp = (/[^\w\s]/gi);
    const cityArr = city.split(regExp);
    if (name && location && city) {
    API.getPlace(cityArr[0]).then((res) => {
      if (res) {
        cityImg = res.photos[0].image.mobile;
      }

    this.geocode(fulllocation).then((res) => {

      latLng.lat = res[0].geometry.location.lat();
      latLng.lng = res[0].geometry.location.lng();

        const task = {
          uid,
          email,
          name,
          location,
          info,
          kids_menu,
          kids_menu_description,
          nursing_great,
          nursing_great_description,
          kids_eat_free,
          kids_eat_free_description,
          parking,
          parking_description,
          description,
          parentnotes,
          city: cityArr[0].trim(),
          category,
          latLng,
          cityImg
        };
        this.props.dispatch(actions.startAddTask(task));
        this.refs.form.reset();
      

    });
    });
    }
  }
  addPredict (e) {
    this.refs.city.value = e.target.innerHTML;
    this.setState({
      cities: []
    });
  }

  showList () {
    this.setState({
      hidden: !this.state.hidden
    })
  }

  selectCategory (e) {
    console.log(e.target.innerHTML);
    if (e.target && e.target.nodeName == 'P') {
      this.refs.category.innerHTML = e.target.innerHTML;
      this.showList()
    }
  }



  render () {

    const predictions = this.state.cities.map((city) => {
      return <li onClick={this.addPredict.bind(this)} key={city.id}>{city.description}</li>
    });
    const renderList = () => {
      if(this.state.cities.length) {
        return <ul className='list-unstyled city-auto'>{predictions}</ul>
      }
    }
    const renderCategoryList = () => {
      if(!this.state.hidden) {
        return (
          <div onClick={this.selectCategory.bind(this)} className='hidden'>
            <p>Baby Products</p>
            <p>Activities for Kids</p>
            <p>Toys & Gifts</p>
            <p>DIY</p>
            <p>Other</p>
          </div>
        )
      }
    }
    return (
      <div className='NewPlace'>
        <h3 className='action-title'>Add new Store</h3>

                
                <Tabs defaultIndex={1} onSelect={index => console.log(index)}>
                  <TabList>
                    <Tab>About</Tab>
                    <Tab>Photos</Tab>
                    <Tab>Location</Tab>
                  </TabList>
                  <TabPanel>
                    <h3>Description</h3>
                      <form ref='form' onSubmit={this.addNewTask.bind(this)}>
                        <div className='row'>
                          <div className='col-6'>
                            <div className="form-group">
                              <label>Name</label>
                              <input ref='name' type="text" className="form-control"  placeholder="Enter name of Store"/>
                            </div>
                            <div className="form-group">
                              <label>Category</label>
                              <div className='drop-wrap'>
                                <div onClick={this.showList.bind(this)} ref='category' className="form-control category-list">
                                  Other
                                </div>
                                {renderCategoryList()}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Store City</label>
                              <input onChange={this.handleGetCities.bind(this)} ref='city' type="text" className="form-control"  placeholder="Enter Store City name"/>
                                {renderList()}
                            </div>
                            <div className="form-group">
                              <label>Description</label>
                              <textarea ref='description' rows="5" className="form-control"  placeholder="Please describe this place in a factual and neutral tone."/>
                            </div>
                            <div className="form-group">
                              <label>Information for Parents</label>
                              <textarea ref='parentnotes' rows="5" className="form-control"  placeholder="What should parents know about visiting this place with children?"/>
                            </div>
                          </div>
                          <div className='col-6'>
                            <div className="form-group">
                              <label>Store Location</label>
                              <input ref='location' type="text" className="form-control"  placeholder="Enter location of your store"/>
                            </div>
                            <div className="form-group">
                              <label>Store Contact info</label>
                              <input ref='info' type="text" className="form-control"  placeholder="Enter your Store Contact info"/>
                            </div>
                          </div>
                        </div>

                        <div className='row'>
                            <fieldset className='col-6'>
                                <h5 className='NewPlace--heading'>Family Amenities</h5>
                                <div className="form-group">
                                    <h6>Are there comfortable seats where you could feed/nurse a baby?</h6>
                                    <select className='form-control' ref={nursing_great => this.nursing_great_select = nursing_great}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='nursing_great_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Do they have a kids menu?</h6>
                                    <select className='form-control' ref={kids_menu => this.kids_menu_select = kids_menu}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='kids_menu_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Do kids eat free?</h6>
                                    <select className='form-control' ref={kids_eat_free => this.kids_eat_free_select = kids_eat_free}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='kids_eat_free_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there plenty of parking available?</h6>
                                    <select className='form-control' ref={parking => this.parking_select = parking}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='parking_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                            </fieldset>
                        </div>

                        
                        <button type="submit" className="btn">Submit</button>
                      </form>
                  </TabPanel>
                  <TabPanel>
                    <section className="photos">
                        <div>
                            <h3>Photos</h3>
                        </div>
                        <div className="photos">

                                <ImageUploader />
                        </div>
                    </section>
                  </TabPanel>
                  <TabPanel></TabPanel>
                </Tabs>

          
      </div>
    )
  }
}

export default connect(({auth})=>{
  return {
    auth
  }
})(AddTask);
