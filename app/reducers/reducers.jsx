export const ticketsReducer = (state=[], action) => {
  switch (action.type) {
    case 'ADD_PLACE':
      return [...state, action.place];
    case 'ADD_PLACES':
      return action.places;
    case 'REMOVE_PLACE':
    const removedFromArr = state.filter((item)=>{
      if(action.id !== item.id) {
        return item
      }
    })
      return removedFromArr;
    case 'EDIT_PLACE':
    const editedArr = state.map((place) => {
      if(place.id != action.place.id){
        return place;
      } else {
        return {
          ...place,
          name: action.place.name,
          location: action.place.location,
          info: action.place.info,
          description: action.place.description,
          city: action.place.city,
          category: action.place.category
        }
      }
    })
      return editedArr;
    default:
      return state;
  }
}

export const sortReducer = (state='createdAt', action) => {
  switch (action.type) {
    case 'START_SORT':
      return  action.sort;
    default:
      return state;
  }
}

export const errorReducer = (state='', action) => {
  switch (action.type) {
    case 'ERROR_MSG':
      return  action.msg;
  default:
      return state;
  }
}



export const serchReducer = (state='', action) => {
  switch (action.type) {
    case 'GET_SEARCH':
      return  action.search;
    default:
      return state;
  }
}

export const loaderReducer = (state=true, action) => {
  switch (action.type) {
    case 'CHANGE_LOADER':
      return  action.isLoading;
    default:
      return state;
  }
}


const filterByState = {
  city:[{key:'city', property:'All'}],
  formatedDate:[{key:'formatedDate', property:'All'}],
  category:[{key:'category', property:'All'}]
};
export const filterByReducer = (state=filterByState, action) => {
  switch (action.type) {
    case 'UPDATE_LIST':
      let currentState;
      if (action.property === 'All') {
        currentState = [{key: action.key, property: 'All'}]
      } else {
        currentState = state[action.key];
        currentState = [...currentState, {key:action.key, property: action.property}];
      }
      let arrWithoutDupe = currentState.filter((item, index, self) => self.findIndex((t) => {
        return  t.property === item.property; }) === index);
      if(arrWithoutDupe.length > 1){
      arrWithoutDupe = arrWithoutDupe.filter((item) => {
          if(item.property != 'All'){
            return item;
          }
        })
      }
      let newState = {...state};
      newState[action.key] = arrWithoutDupe;
      return newState
    case 'REMOVE_FILTER':
      const filterRemoved = state[action.key].filter((item) => {
        if (item.property != action.property) {
          return item
        }
      })

      let oldState = {...state};
      let all = [{key:action.key, property:'All'}];
      oldState[action.key] = filterRemoved.length ? filterRemoved : all;
      return oldState;
    default:
      return state;
  }
}


export const authReducer = (state={}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
      uid: action.user.uid,
      email: action.user.email
      } ;
    case 'LOGOUT':
      return {
        uid: undefined,
        email: undefined
      } ;
    default:
      return state;
  }
};
