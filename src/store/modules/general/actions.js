import axios from 'axios';
import Api from '@/plugins/API';
import router from '@/router'

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

/** date related API calles for client side */
export const getAvailabeDates = ({ commit, dispatch }) => new Promise((resolve, reject) => {
  Api().get('/Api/getAvailabeDates').then((res) => {
    if (res.data.status == 200) {
      const dateList = res.data.list
      if (dateList.length > 0) {
        let activeDates = []
        dateList.forEach((date) => {
          if(date.appointmentCount < 18){
            date.disabled = false
          }else{
            date.disabled = true
          }
          activeDates.push({
            value: date.date,
            label: date.date,
            disabled: date.disabled
          })
        })
        commit('SET_AVALABLE_LIST', activeDates)
        resolve(activeDates);
      }
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
/** date related API calles for client side */
export const getTiming = ({ commit, dispatch } , data) => new Promise((resolve, reject) => {
  Api().post('/Api/timing' , data).then((res) => {
    if (res.data.status == 200) {
      commit('SET_AVALABLE_TIMING' , res.data.timing)
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
//make Appointment
export const makeAppointment = ({ commit, dispatch } , data) => new Promise((resolve, reject) => {
  Api().post('/Api/appointment/makeAppointment' , data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data)
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});