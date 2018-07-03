import firebase, {firebaseRef} from 'firebaseConf'
import moment from 'moment'
import Rating from 'rating'




export const startRating = (ratingValue) => {

  return (dispatch, getState) => {

    const uid = getState().auth.uid;
    const ratingRef = firebaseRef.child('reviews').push(rating);


    return ratingRef.then(() => {
      dispatch(addRating({
        ...rating,
        id: ratingRef.value
      }))
    })
  }
};

export const addReviews = (commentVal) => {
  return (dispatch, getState) => {
    const createdAt = moment().unix();
    const formatedDate = moment.unix(createdAt).format('MMMM, YYYY');
    const review =
      {
        ...commentVal,
        completed: 'Not completed',
        createdAt,
        completedAt: null,
        formatedDate
       };
    const commentRef = firebaseRef.child('reviews').push(review);
    return commentRef.then(() => {
      dispatch(addComment({
        ...review,
        id: commentRef.key
      }))
    })
  }
};


export const startGetReviews = () => {
  return (dispatch, getState) => {
      const commentRef = firebaseRef.child('reviews');
      return commentRef.once('value').then((snapshot) => {
        const commentsVal = snapshot.val() || {};
        let reviews = [];
        const tasksKeys = Object.keys(commentsVal);
        tasksKeys.forEach((id) => {
          reviews.push({
            id,
            ...commentVal[id]
          });
        });
        console.log(reviews);
        dispatch(addComments(reviews))
      })
  }
};

export const startAddTask = (taskVal) => {
  return (dispatch, getState) => {
    const createdAt = moment().unix();
    const formatedDate = moment.unix(createdAt).format('MMMM, YYYY');
    const task =
      {
        ...taskVal,
        completed: 'Not completed',
        createdAt,
        completedAt: null,
        formatedDate
       };
    const taskRef = firebaseRef.child('tasks').push(task);
    return taskRef.then(() => {
      dispatch(addTask({
        ...task,
        id: taskRef.key
      }))
    })
  }
};

export const startGetTasks = () => {
  return (dispatch, getState) => {
      const taskRef = firebaseRef.child('tasks');
      return taskRef.once('value').then((snapshot) => {
        const tasksVal = snapshot.val() || {};
        let tasks = [];
        const tasksKeys = Object.keys(tasksVal);
        tasksKeys.forEach((id) => {
          tasks.push({
            id,
            ...tasksVal[id]
          });
        });
        console.log(tasks);
        dispatch(addTasks(tasks))
      })
  }
};




export const show = (id) => {
    return (dispatch, getState) =>{
        const showRef = firebaseRef.child('tasks/${id}');
        return showRef.once('value')
    }
}


export const commentShow = (id) => {
    return (dispatch, getState) =>{
        const commentRef = firebaseRef.child('reviews/${id}');
        return commentRef.once('value')
    }
}




export const startSort = (sort) => ({
  type: 'START_SORT',
  sort
});




export const startEditTask = (task) => {
  return (dispatch, getState) => {
    var taskRef = firebaseRef.child('tasks/${task.id}');

    return taskRef.update(task).then(()=>{
      dispatch(editTask(task))
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

export const removeTask = (id) => {
  return {
    type: 'REMOVE_TASK',
    id
  }
};

export const startRemovingTask = (id) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid;
    const taskRef = firebaseRef.child('tasks/${id}');
    return taskRef.once('value').then((snapshot) => {
      const tasksVal = snapshot.val() || {};
      if(uid === tasksVal.uid) {
        return taskRef.remove().then(() => {
          dispatch(removeTask(id))
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


export const addTasks = (tasks) => {
  return {
    type:'ADD_TASKS',
    tasks
  }
}


export const addTask = (task) => {
  return {
    type:'ADD_TASK',
    task
  };
}


export const addComment = (task) => {
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

export const editTask = (task) => {
  return {
    type: 'EDIT_TASK',
    task
  }
}

export const changeLoader = (isLoading) => {
  return {
    type: 'CHANGE_LOADER',
    isLoading
  }
}
