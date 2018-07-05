import React, { Component } from 'react';
import firebase, {firebaseRef} from '../..//firebase/index'

export default class ImageUploader extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreview: '' };

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
    const storageRef = firebaseRef.storage().ref();
    const uploadTask = storageRef
      .child(`place/${this.state.file.name}`)
      .put(this.state.file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        console.log('handleUpload error');
        console.log(error);
      },
      (success) => {
        console.log(uploadTask.snapshot);
        console.log(uploadTask.snapshot.downloadURL);
      },
    );
  }

  render() {
    return (
      <ul className="photos">
        <li>
          <form className="upload">
              <label>
                  <input
                      placeholder="ImageUpload"
                      type="file"
                      onChange={(event) => {
                        this.handlePreview(event.target.files);
                      }}
                    />
                  <span>+</span>
              </label>
              <button onClick={this.handleUpload}>Upload</button>
          </form>
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
