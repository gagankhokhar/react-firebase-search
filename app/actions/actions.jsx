import firebase, {firebaseRef} from '../firebase/index'
import moment from 'moment'
// import Rating from 'rating'




// export const startRating = (ratingValue) => {

//   return (dispatch, getState) => {

//     const uid = getState().auth.uid;
//     const ratingRef = firebaseRef.database().ref('users/review').push(rating);


//     return ratingRef.then(() => {
//       dispatch(addRating({
//         ...rating,
//         id: ratingRef.value
//       }))
//     })
//   }
// };






// export const addReviews = (commentVal) => {
//   return (dispatch, getState) => {
//     const placeRef = firebaseRef.database().ref(`places/${id}`);
//     const {id} = placeRef.key
    
//     const placeId = firebaseRef.database().ref(`places/${id}`);

//     const createdAt = moment().unix();
//     const formatedDate = moment.unix(createdAt).format('DDDD, MMMM, YYYY');
//     const review =
//       {
//         ...commentVal,
//         formatedDate
//        };

//     const commentRef = firebaseRef.database().ref(`${placeId}/review`).push(review);
//     return commentRef.then(() => {
//       dispatch(addComment({
//         ...review,
//         id: placeRef.key
//       }))
//     })
//   }
// };


// export const startGetReviews = () => {
//   return (dispatch, getState) => {
//     const userId = firebaseRef.auth().currentUser.uid;
//     const placeId = firebaseRef.database().ref(`places/${id}`);

//       const commentRef = firebaseRef.database().ref(`users/${placeId}/review`);
//       return commentRef.once('value').then((snapshot) => {
//         const commentsVal = snapshot.val() || {};
//         let reviews = [];
//         const commentKeys = Object.keys(commentsVal);
//         commentKeys.forEach((id) => {
//           reviews.push({
//             id,
//             ...commentVal[id]
//           });
//         });
//         console.log(reviews);
//         dispatch(addComments(reviews))
//       })
//   }
// };

export const startAddPlace = (placeVal) => {
  return (dispatch, getState) => {
    const createdAt = moment().unix();
    const formatedDate = moment.unix(createdAt).format('MMMM, YYYY');
    const place =
      {
        ...placeVal,
        createdAt,
        formatedDate
       };
    const placeRef = firebaseRef.database().ref('places').push(place);
    return placeRef.then(() => {
      dispatch(addPlace({
        ...place,
        id: placeRef.key
      }))
    })
  }
};

export const startGetPlaces = () => {
  return (dispatch, getState) => {
      const placeRef = firebaseRef.database().ref('places');
      return placeRef.once('value').then((snapshot) => {
        const placesVal = snapshot.val() || {};
        let places = [];
        const placesKeys = Object.keys(placesVal);
        placesKeys.forEach((id) => {
          places.push({
            id,
            ...placesVal[id]
          });
        });
        // console.log(places);
        dispatch(addPlaces(places))
      })
  }
};




export const show = (id) => {
    return (dispatch, getState) =>{
        const showRef = firebaseRef.database().ref(`places/${id}`);
        return showRef.once('value')
    }
}


export const commentShow = (id) => {
    return (dispatch, getState) =>{
        const commentRef = firebaseRef.database().ref(`users/${userId}/review`);
        return commentRef.once('value')
    }
}




export const startSort = (sort) => ({
  type: 'START_SORT',
  sort
});




export const startEditPlace = (place) => {
  return (dispatch, getState) => {
    var placeRef = firebaseRef.database().ref(`places/${place.id}`);

    return placeRef.update(place).then(()=>{
      dispatch(editPlace(place))
    })
  }
}

export const startCreatingUser = (userObj) => {
  return (dispatch, getState) => {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.pass).catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    })
  }
}


export const startLogin = (userObj) => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.pass).catch((error) => {
      //console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      dispatch(errorMsg(errorMessage));
    })
  }
}

export const errorMsg = (msg) => ({
    type: 'ERROR_MSG',
    msg
})

export const startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then((res) => {
      console.log('logout');
    }, (err) => {
      console.log(err);
    })
  }
}

export const removePlace = (id) => {
  return {
    type: 'REMOVE_PLACE',
    id
  }
};

export const startRemovingPlace = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const placeRef = firebaseRef.database().ref(`places/${id}`);
    return placeRef.once('value').then((snapshot) => {
      const placesVal = snapshot.val() || {};
      if(uid === placesVal.uid) {
        return placeRef.remove().then(() => {
          dispatch(removePlace(id))
        })
      }
    })

  }
};

export const login = (user) => {
  return {
    type: 'LOGIN',
    user
  }
};

export const logout = () => {
  return {
    type: 'LOGOUT'
  }
};


export const addPlaces = (places) => {
  return {
    type:'ADD_PLACES',
    places
  }
}


export const addPlace = (place) => {
  return {
    type:'ADD_PLACE',
    place
  };
}


export const addComment = (comment) => {
  return {
    type:'ADD_COMMENT',
    comment
  };
}

export const getSearch = (search) => {
  return {
    type: 'GET_SEARCH',
    search
  }
}

export const filterBy = (key, property) => {
  return {
    type: 'UPDATE_LIST',
    key,
    property
  }
}

export const removeFilter = (key, property) => {
  return {
    type: 'REMOVE_FILTER',
    key,
    property
  }
}

export const editPlace = (place) => {
  return {
    type: 'EDIT_PLACE',
    place
  }
}

export const changeLoader = (isLoading) => {
  return {
    type: 'CHANGE_LOADER',
    isLoading
  }
}
