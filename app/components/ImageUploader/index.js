import React, { Component } from 'react';
import {firebaseRef} from '../../firebase/index'

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreview: '' };
    console.log('imageuploader');
    console.log(this.props.image_field);

    this.handlePreview = this.handlePreview.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
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
        console.log(uploadTask.snapshot.downloadURL);
        // this.refs.images.value = uploadTask.snapshot.downloadURL;
       this.refs.images.value = uploadTask.snapshot.downloadURL;

      },
    );
  }

  render() {
    return (
      <ul className="photos">
        <li>
          <div className="upload">
              <label>
              <input type="hidden" ref="images" name="store_images" />
                  <input
                      placeholder="ImageUpload"
                      type="file"
                      onChange={(event) => {
                        this.handlePreview(event.target.files);
                      }}
                    />
                  <span>+</span>
              </label>
          </div>
          <span onClick={this.handleUpload}>Upload</span>
        </li>
        <li className="photo">
          {this.state.imagePreview && <img src={this.state.imagePreview} />}
        </li>
        <li className="photo">
        </li>
      </ul>
    );
  }
}
