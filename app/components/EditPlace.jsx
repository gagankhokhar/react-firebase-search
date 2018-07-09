import React, {Component} from 'react'
import {connect} from 'react-redux'
import {startEditPlace} from 'actions'

class EditPlace extends Component {

  constructor (props) {
    super(props);
    this.state = {
      cities: [],
      name: '',
      location: '',
      description: '',
      parentnotes: '',
      id: 0,
      placeEmail: '',
      website: '',
      phone: '',
      city: '',
      kids_menu: '',
      kids_menu_description: '',
      nursing_great: '',
      nursing_great_description: '',
      changing_table: '',
      changing_table_description: '',
      kids_eat_free: '',
      kids_eat_free_description: '',
      parking: '',
      parking_description: '',
      hidden: true
    }
  }

  handleGetCities (e) {
    this.handleEdit(e)
    const city = this.refs.city.value ? this.refs.city.value : ' ';
    const service = new google.maps.places.AutocompleteService();
    const res = service.getPlacePredictions({ input: city, types: ['(cities)'] },
     (predictions, status) => {
       this.setState({cities: predictions ? predictions : []})
     });
  }
    
    check () {
      const refsKeys = Object.keys(this.refs);
        refsKeys.forEach((key) => {
            if (!this.refs[key].value && key !== 'form') {

                const node = document.createElement('LABEL');                 
                const textNode = document.createTextNode('This field can\'t be empty!');      
                node.appendChild(textNode); 
                this.refs[key].parentElement.appendChild(node);

            }
        });
    }

  editPlace (e) {
    e.preventDefault();
    const editState = {
      id: this.state.id,
      name: this.state.name,
      location: this.state.location,
      description: this.state.description,
      parentnotes: this.state.parentnotes,
      placeEmail: this.state.placeEmail,
      website: this.state.website,
      phone: this.state.phone,
      city: this.state.city,
      kids_menu: this.state.kids_menu,
      kids_menu_description: this.state.kids_menu_description,
      nursing_great: this.state.nursing_great,
      nursing_great_description: this.state.nursing_great_description,
      changing_table: this.state.changing_table,
      changing_table_description: this.state.changing_table_description,
      kids_eat_free: this.state.kids_eat_free,
      kids_eat_free_description: this.state.kids_eat_free_description,
      parking: this.state.parking,
      parking_description: this.state.parking_description

    };
    
    // this.check();
    if (
        editState.name 
        && editState.location 
        && editState.placeEmail 
        && editState.website 
        && editState.phone 
        && editState.description 
        && editState.city 
        && editState.parentnotes 
        && editState.kids_menu 
        && editState.kids_menu_description 
        && editState.nursing_great 
        && editState.nursing_great_description 
        && editState.changing_table 
        && editState.changing_table_description 
        && editState.kids_eat_free 
        && editState.kids_eat_free_description 
        && editState.parking 
        && editState.parking_description
        ){
        this.props.dispatch(startEditPlace(editState));
        console.log(editState);
        window.location = `#/user/`;
    }
    
    
  }

  handleEdit (e) {
   this.setState({[e.target.dataset.ref]: e.target.value});
 }

  componentDidMount () {
    const {tickets} = this.props;
    const {id} = this.props.params;
    const current = tickets.find((item) => {
      if(item.id == id){
        return item
      }
    });
    this.setState({
      name: current.name,
      location: current.location,
      description: current.description,
      id: current.id,
      placeEmail: current.placeEmail,
      website: current.website,
      phone: current.phone,
      city: current.city,
      parentnotes: current.parentnotes,
      kids_menu: current.kids_menu,
      kids_menu_description: current.kids_menu_description,
      nursing_great: current.nursing_great,
      nursing_great_description: current.nursing_great_description,
      changing_table: current.changing_table,
      changing_table_description: current.changing_table_description,
      kids_eat_free: current.kids_eat_free,
      kids_eat_free_description: current.kids_eat_free_description,
      parking: current.parking,
      parking_description: current.parking_description
    })
  }

  showList () {
    this.setState({
      hidden: !this.state.hidden
    })
  }
    


  addPredict (e) {
    this.setState({
      cities: [],
      city: e.target.innerHTML
    });
  }

  render () {
    const predictions = this.state.cities.map((city) => {
      return <li onClick={this.addPredict.bind(this)} key={city.id}>{city.description}</li>
    });
    const renderList = () => {
      if(this.state.cities.length) {
        return <ul className='list-unstyled city-auto'>{predictions}</ul>
      }
    };

    return (
        <div className='edit-place'>
            <h3 className='action-title'>Edit</h3>
            <form ref='form' onSubmit={this.editPlace.bind(this)}>
                <div className='row'>
                    <div className='col-6'>
                        <div className="form-group">
                            <label>Name</label>
                            <input data-ref='name' onChange={this.handleEdit.bind(this)} value={this.state.name} ref='name' type="text" className="form-control"  placeholder="Enter Name of store"/>
                        </div>
                        <div className="form-group">
                            <label>City</label>
                            <input data-ref='city'  value={this.state.city} onChange={this.handleGetCities.bind(this)} ref='city' type="text" className="form-control"  placeholder="City name"/>
                            {renderList()}
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea data-ref='description' onChange={this.handleEdit.bind(this)} value={this.state.description} ref='description' rows="5" className="form-control"  placeholder="Enter your description"/>
                        </div>
                        <div className="form-group">
                            <label>Information for Parents</label>
                            <textarea
                                data-ref='parentnotes'
                                ref='parentnotes'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.parentnotes}
                                rows="5"
                                className="form-control"
                                placeholder="What should parents know about visiting this place with children?"
                            />
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="form-group">
                            <label>Location</label>
                            <input data-ref='location' onChange={this.handleEdit.bind(this)} value={this.state.location} ref='location' type="text" className="form-control"  placeholder="Enter location"/>
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input data-ref='placeEmail' onChange={this.handleEdit.bind(this)} value={this.state.placeEmail} ref='placeEmail' type="text" className="form-control"  placeholder="email@example.com"/>
                        </div>
                        <div className="form-group">
                            <label>Website</label>
                            <input data-ref='website' onChange={this.handleEdit.bind(this)} value={this.state.website} ref='website' type="text" className="form-control"  placeholder="http://www.example.com"/>
                        </div>
                        <div className="form-group">
                            <label>Phone</label>
                            <input data-ref='phone' onChange={this.handleEdit.bind(this)} value={this.state.phone} ref='phone' type="text" className="form-control"  placeholder="+91 (555) 555-5555"/>
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
                            <textarea
                                data-ref='nursing_great_description'
                                ref='nursing_great_description'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.nursing_great_description}
                                rows="1" className="form-control
                                mt-1"
                                placeholder="Add an optional note..."
                            />
                        </div>
                        <div className="form-group">
                            <h6>Is there a changing table or place to change a diaper in the restroom?</h6>
                            <select className='form-control' ref={changing_table => this.changing_table_select = changing_table}>
                                <option value='yes'>yes</option>
                                <option value='no'>no</option>
                            </select>
                            <textarea 
                                data-ref='changing_table_description'
                                ref='changing_table_description'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.changing_table_description}
                                rows="1" 
                                className="form-control mt-1"  
                                placeholder="Add an optional note..."
                            />
                        </div>
                        <div className="form-group">
                            <h6>Do they have a kids menu?</h6>
                            <select className='form-control' ref={kids_menu => this.kids_menu_select = kids_menu}>
                                <option value='yes'>yes</option>
                                <option value='no'>no</option>
                            </select>
                            <textarea 
                                data-ref='kids_menu_description'
                                ref='kids_menu_description'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.kids_menu_description}
                                rows="1" 
                                className="form-control mt-1"  
                                placeholder="Add an optional note..."
                            />
                        </div>
                        <div className="form-group">
                            <h6>Do kids eat free?</h6>
                            <select className='form-control' ref={kids_eat_free => this.kids_eat_free_select = kids_eat_free}>
                                <option value='yes'>yes</option>
                                <option value='no'>no</option>
                            </select>
                            <textarea 
                                data-ref='kids_eat_free_description'
                                ref='kids_eat_free_description'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.kids_eat_free_description}
                                rows="1" 
                                className="form-control mt-1" 
                                placeholder="Add an optional note..."
                            />
                        </div>
                        <div className="form-group">
                            <h6>Is there plenty of parking available?</h6>
                            <select className='form-control' ref={parking => this.parking_select = parking}>
                                <option value='yes'>yes</option>
                                <option value='no'>no</option>
                            </select>
                            <textarea 
                                data-ref='parking_description'
                                ref='parking_description'
                                onChange={this.handleEdit.bind(this)}
                                value={this.state.parking_description}
                                rows="1" 
                                className="form-control mt-1" 
                                placeholder="Add an optional note..."
                            />
                        </div>
                    </fieldset>
                </div>
                <button type="submit" className="btn">Submit</button>
            </form>
        </div>
    )
  }
}

export default connect(({tickets}) => {
  return {
    tickets
  }
})(EditPlace)
