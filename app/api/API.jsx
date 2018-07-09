import axios from 'axios'


export const noDupe = (arr, key) => {
  var newArr = arr.map((item) => item[key].toLowerCase());
  var arrWithoutDupe = Array.from(new Set(newArr));
  return arrWithoutDupe
}


export const getPlace = (input) => {
   
  const encodedLocation = input.trim().replace(/\s+/g, '-').toLowerCase();
  const places = `https://api.teleport.org/api/urban_areas/`;
  const requestUrl = `${places}slug:${encodedLocation}/images/`;
   
  return axios.get(requestUrl).then((res) => {
      return res.data;
    }, (err) => {
      return null
    }
    ).catch((error) => {
      throw new Error(error);
    })
}



const searchPlaces = (places, searchText) => {
 return  places.filter((item) => {
    if((item.name.toLowerCase()).indexOf(searchText) != -1){
        return item;
      }
  })
}





const sortArr = (places, sortVal) => {
  return places.sort((a, b) => (b[sortVal]).toString().localeCompare((a[sortVal]).toString()))
}




const filterBy = (places) => {
  return (filtValArr) => {
    let placesArr = [];
    filtValArr.forEach((filtVal) => {
      let filtered = places.filter((place) => {
        if(place[filtVal.key].toLowerCase() === filtVal.property.toLowerCase() || filtVal.property === `All`){
          return place
        }
      });
      placesArr = [...placesArr, ...filtered]
    });
    return placesArr;
  }
};



export const composeFilter = (places, searchText, city, category, formatedDate, sortVal) => {
  let rerender = searchPlaces(places, searchText);
  rerender = sortArr(rerender, sortVal);
  rerender = filterBy(rerender)(formatedDate);
  rerender = filterBy(rerender)(category);
  rerender = filterBy(rerender)(city);

  return rerender
}
