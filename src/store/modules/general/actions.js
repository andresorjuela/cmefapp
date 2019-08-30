import axios from 'axios';

export const getALLCountryList = ({commit , dispatch}) => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then(function (res) {
          if(res.status == 200){
            commit('SET_COUNTRY_LIST' , res.data)
          }else{
            dispatch('getCountryList')
          }
      })
      .catch(function (error) {
        console.log(error);
      });
}