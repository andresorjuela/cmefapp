import axios from 'axios';

export const getALLCountryList = ({ commit, dispatch }) => {
  axios.get('https://restcountries.eu/rest/v2/all')
    .then((res) => {
      if (res.status == 200) {
        commit('SET_COUNTRY_LIST', res.data);
      } else {
        dispatch('getCountryList');
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
