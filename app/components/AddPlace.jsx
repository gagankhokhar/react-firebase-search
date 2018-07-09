import React, {Component} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import * as actions from 'actions'
import * as API from 'API'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.scss'
import {firebaseRef} from '../firebase/index'
// import ImageUploader from './ImageUploader/index'




class AddPlace extends Component {

  constructor (props) {
    super(props)
    this.state = {
      cities: [],
      hidden: true,
      tabIndex: 0,
      file: '', 
      imagePreview: '' 
    };
    console.log('imageuploader');
    console.log(this.props.images);

    this.handlePreview = this.handlePreview.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
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

  addNewPlace (e) {
    e.preventDefault();
    const {uid, email} = this.props.auth;
    const name = this.refs.name.value;
    const images = this.refs.images.value;
    const location = this.refs.location.value;
    const zipcode = this.refs.zipcode.value;
    const placeEmail = this.refs.placeEmail.value;
    const website = this.refs.website.value;
    const phone = this.refs.phone.value;
    const description = this.refs.description.value;
    const parentnotes = this.refs.parentnotes.value;
    const city = this.refs.city.value;
    const category = this.refs.category.innerHTML;
    const nursing_great = this.nursing_great_select.value;
    const nursing_great_description = this.refs.nursing_great_description.value;
    const changing_table = this.changing_table_select.value;
    const changing_table_description = this.refs.changing_table_description.value;
    const kids_menu = this.kids_menu_select.value;
    const kids_menu_description = this.refs.kids_menu_description.value;
    const kids_eat_free = this.kids_eat_free_select.value;
    const kids_eat_free_description = this.refs.kids_eat_free_description.value;
    const highchair = this.highchair_select.value;
    const highchair_description = this.refs.highchair_description.value;
    const stroller_at_table = this.stroller_at_table_select.value;
    const stroller_at_table_description = this.refs.stroller_at_table_description.value;
    const parking = this.parking_select.value;
    const parking_description = this.refs.parking_description.value;
    const drive_thru = this.drive_thru_select.value;
    const drive_thru_description = this.refs.drive_thru_description.value;
    const restroom = this.restroom_select.value;
    const restroom_description = this.refs.restroom_description.value;
    const mothers_room = this.mothers_room_select.value;
    const mothers_room_description = this.refs.mothers_room_description.value;
    const child_care = this.child_care_select.value;
    const child_care_description = this.refs.child_care_description.value;
    const adults_only = this.adults_only_select.value;
    const adults_only_description = this.refs.adults_only_description.value;
    const fun_for_grownups = this.fun_for_grownups_select.value;
    const fun_for_grownups_description = this.refs.fun_for_grownups_description.value;
    const play_great = this.play_great_select.value;
    const play_great_description = this.refs.play_great_description.value;
    const indoor_play = this.indoor_play_select.value;
    const indoor_play_description = this.refs.indoor_play_description.value;
    const water_play = this.water_play_select.value;
    const water_play_description = this.refs.water_play_description.value;
    let latLng ={};
    let cityImg = '';
    const fulllocation = `${city}, ${location}, ${zipcode}`;
    //remove all special char
    const regExp = (/[^\w\s]/gi);
    const cityArr = city.split(regExp);
    if (name && location && city && zipcode) {
    API.getPlace(cityArr[0]).then((res) => {
      if (res) {
        cityImg = res.photos[0].image.mobile;
      }

    this.geocode(fulllocation).then((res) => {

      latLng.lat = res[0].geometry.location.lat();
      latLng.lng = res[0].geometry.location.lng();

        const place = {
          uid,
          images,
          email,
          name,
          location,
          zipcode,
          placeEmail,
          website,
          phone,
          description,
          parentnotes,
          city: cityArr[0].trim(),
          category,
          latLng,
          cityImg,
          nursing_great,
          nursing_great_description,
          changing_table,
          changing_table_description,
          kids_menu,
          kids_menu_description,
          kids_eat_free,
          kids_eat_free_description,
          highchair,
          highchair_description,
          stroller_at_table,
          stroller_at_table_description,
          parking,
          parking_description,
          drive_thru,
          drive_thru_description,
          restroom,
          restroom_description,
          mothers_room,
          mothers_room_description,
          child_care,
          child_care_description,
          adults_only,
          adults_only_description,
          fun_for_grownups,
          fun_for_grownups_description,
          play_great,
          play_great_description,
          indoor_play,
          indoor_play_description,
          water_play,
          water_play_description
        };
        this.props.dispatch(actions.startAddPlace(place));
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

  handleUpload() {

    const uploadTask = firebaseRef.storage().ref()
      .child(`place/${this.state.file.name}`)
      .put(this.state.file);
    
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log(error);
      },
      () => {
        // final url of the image
        console.log(uploadTask.snapshot);
        console.log(uploadTask.snapshot.downloadURL);
        this.refs.images.value = uploadTask.snapshot.downloadURL;
       // this.props.images.value = uploadTask.snapshot.downloadURL;
       // this.props.image_field.value = uploadTask.snapshot.downloadURL;
      },
    );
  }

  handlePreview(file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        file: file[0],
        imagePreview: reader.result,
      });
    };
    reader.readAsDataURL(file[0]);
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
            <p>Other</p>
          </div>
        )
      }
    }
    return (
      <div className='NewPlace'>
        <h3 className='action-title'>Add new Store</h3>

            <form ref='form' onSubmit={this.addNewPlace.bind(this)}>

                <Tabs forceRenderTabPanel defaultIndex={0}>
                    <TabList>
                        <Tab>About</Tab>
                        <Tab>Photos</Tab>
                        <Tab>Location</Tab>
                    </TabList>
                    <TabPanel>
                        <div className='row'>
                            <div className='col-6'>
                                <h4 className='mt-3'>Description</h4>
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
                                    <label>Description</label>
                                    <textarea ref='description' rows="5" className="form-control"  placeholder="Please describe this place in a factual and neutral tone."/>
                                </div>
                                <div className="form-group">
                                    <label>Information for Parents</label>
                                    <textarea ref='parentnotes' rows="5" className="form-control"  placeholder="What should parents know about visiting this place with children?"/>
                                </div>
                            </div>
                            <div className='col-6'>
                                <h4 className='mt-3'>Contact Information</h4>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input ref='placeEmail' type="text" className="form-control"  placeholder="email@example.com"/>
                                </div>
                                <div className="form-group">
                                    <label>Website</label>
                                    <input ref='website' type="text" className="form-control"  placeholder="http://www.example.com"/>
                                </div>
                                <div className="form-group">
                                    <label>Phone</label>
                                    <input ref='phone' type="text" className="form-control"  placeholder="+91 (555) 555-5555"/>
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
                                    <h6>Is there a changing table or place to change a diaper in the restroom?</h6>
                                    <select className='form-control' ref={changing_table => this.changing_table_select = changing_table}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='changing_table_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
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
                                    <h6>Do they have highchairs?</h6>
                                    <select className='form-control' ref={highchair => this.highchair_select = highchair}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='highchair_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is this place stroller friendly?</h6>
                                    <select className='form-control' ref={stroller_at_table => this.stroller_at_table_select = stroller_at_table}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='stroller_at_table_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there plenty of parking available?</h6>
                                    <select className='form-control' ref={parking => this.parking_select = parking}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='parking_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there a drive-thru?</h6>
                                    <select className='form-control' ref={drive_thru => this.drive_thru_select = drive_thru}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='drive_thru_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there at least one restroom?</h6>
                                    <select className='form-control' ref={restroom => this.restroom_select = restroom}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='restroom_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there a private lactation room?</h6>
                                    <select className='form-control' ref={mothers_room => this.mothers_room_select = mothers_room}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='mothers_room_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there child care offered here at any time?</h6>
                                    <select className='form-control' ref={child_care => this.child_care_select = child_care}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='child_care_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is this place off limits to children?</h6>
                                    <select className='form-control' ref={adults_only => this.adults_only_select = adults_only}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='adults_only_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is it good for date night without the kids?</h6>
                                    <select className='form-control' ref={fun_for_grownups => this.fun_for_grownups_select = fun_for_grownups}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='fun_for_grownups_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there a good place for children to play?</h6>
                                    <select className='form-control' ref={play_great => this.play_great_select = play_great}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='play_great_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is this an indoor place for children to play?</h6>
                                    <select className='form-control' ref={indoor_play => this.indoor_play_select = indoor_play}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='indoor_play_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                                <div className="form-group">
                                    <h6>Is there a splash pad, pool, or beach here?</h6>
                                    <select className='form-control' ref={water_play => this.water_play_select = water_play}>
                                        <option value='yes'>yes</option>
                                        <option value='no'>no</option>
                                    </select>
                                    <textarea ref='water_play_description' rows="1" className="form-control mt-1"  placeholder="Add an optional note..."/>
                                </div>
                            </fieldset>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <section className="photos">
                            <div>
                                <h3>Photos</h3>
                            </div>
                            <ul className="photos">
                              <li>
                                <div className="upload">
                                    <input type="hidden" ref="images"/>
                                    <label>
                                        <input
                                            placeholder="ImageUpload"
                                            type="file"
                                            onChange={(event) => {
                                              this.handlePreview(event.target.files);
                                            }}
                                          />
                                        <span className='plus'>+</span>
                                    </label>
                                </div>
                                <span className='btn btn-link' onClick={this.handleUpload}>Upload</span>
                              </li>
                              <li className="photo">
                                {this.state.imagePreview && <img src={this.state.imagePreview} />}
                              </li>
                              <li className="photo">
                              </li>
                            </ul>

                        </section>
                    </TabPanel>
                    <TabPanel>
                        <div className='row NewPlace_location'>
                            <div className='col-6'>
                                <div className="form-group">
                                    <label>Street Location</label>
                                    <input ref='location' type="text" className="form-control"  placeholder="Enter location of your store"/>
                                </div>
                                <div className="form-group">
                                    <label>Store City</label>
                                    <input onChange={this.handleGetCities.bind(this)} ref='city' type="text" className="form-control"  placeholder="Enter Store City name"/>
                                    {renderList()}
                                </div>
                                <div className="form-group">
                                    <label>Zip Code</label>
                                    <input ref='zipcode' type="text" className="form-control" />
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Tabs>

                <button type="submit" className="btn">Submit</button>
            </form>

          
      </div>
    )
  }
}

export default connect(({auth})=>{
  return {
    auth
  }
})(AddPlace);
