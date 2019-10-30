import Api from '@/plugins/API';
import router from '@/router'
export const adminLogin = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/admin/login', data).then((res) => {
    if (res.data.status == 200) {
      commit('SET_ADMIN_TOKEN', res.data.token)
      commit('SET_CURRENT_ADMIN', res.data.admin)
      commit('SET_LOGIN_STATUS', true)
      router.push('/admin')
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const getDBStats = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().get('/Api/getStates', data).then((res) => {
    if (res.data.status == 200) {
      commit('SET_DB_STATES', res.data.stats)
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const getAllAdmins = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().get('/Api/admin/list', data).then((res) => {
    if (res.data.status == 200) {
      const adminList = res.data.list
      if (adminList.length > 0) {
        adminList.forEach((admin) => {
          (admin.isActive) ? admin.status = 'Active' : admin.status = 'Restricted'
        })
      }
      commit('SET_ADMIN_LIST', res.data.list)
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const AddNewAdmin = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/admin/register', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
      dispatch('getAllAdmins')
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});


export const deleteAdmin = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/admin/delete', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
      dispatch('getAllAdmins')
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const getAllAppointmentList = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().get('/Api/appointment/list', data).then((res) => {
    if (res.data.status == 200) {
      let requestList = res.data.list
      commit('SET_APPOINTMENT_LIST', requestList)
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const getAllrequestList = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().get('/Api/request/list', data).then((res) => {
    if (res.data.status == 200) {
      let requestList = res.data.list
      requestList.forEach(function (request) {
        if (request.isPhone) {
          request.reqType = 'Phone'
          request.contact = request.phone
        } else {
          request.reqType = 'Email'
          request.contact = request.email
        }
        var date = new Date(request.createdOn);
        // date part from the timestamp
        var day = date.getUTCDate();
        // date part from the timestamp
        var month = date.getUTCMonth() + 1; //months from 1-12
        // date part from the timestamp
        var year = date.getUTCFullYear();
        var newdate = year + "/" + month + "/" + day;
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        request.reqTime = `${newdate} ${formattedTime}`
      })
      commit('SET_REQUEST_LIST', requestList)
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const updateRequestStatus = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/request/update', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
      dispatch('getAllrequestList')
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
/** date related API calles */
export const getAllDates = ({ commit, dispatch }) => new Promise((resolve, reject) => {
  Api().get('/Api/getAllDates').then((res) => {
    if (res.data.status == 200) {
      const dateList = res.data.list
      if (dateList.length > 0) {
        dateList.forEach((date) => {
          (date.isActive) ? date.status = 'Active' : date.status = 'Disabled'
          date.reqTime = 0
          var appointments = [];
          //iterate through object keys
          Object.keys(date.timing).forEach(function (key) {
            //get the value of name
            var val = date.timing[key]["booking"];
            console.log(date.timing , date.timing[key] , date.timing[key].booking , val)
            appointments.push(val);
          });
          //get total bookings
          date.bookingCount = appointments.reduce((a, b) => a + b, 0)
        })

      }
      commit('SET_DATE_LIST', dateList)
      resolve(dateList);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
export const addNewDate = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/addNewDate', data).then((res) => {
    if (res.data.status == 200) {
      dispatch('getAllDates')
      resolve(res.data.date);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const deleteDate = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/deleteDate', data).then((res) => {
    if (res.data.status == 200) {
      dispatch('getAllDates')
      resolve(res.data.date);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const getActiveDates = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().get('/Api/getActiveDates', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data.list);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const getSingleDate = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/singleDate', data).then((res) => {
    if (res.data.status == 200) {
      // dispatch('getAllDates')
      let date = res.data.date
      var appointments = [];
          //iterate through object keys
          Object.keys(date.timing).forEach(function (key) {
            //get the value of name
            var val = date.timing[key]["booking"];
            appointments.push(val);
          });
          //get total bookings
          date.totalAppointmentSlots = appointments.length * 2
          date.bookedSlots = appointments.reduce((a, b) => a + b, 0)
          date.remainingSlots = date.totalAppointmentSlots - date.bookedSlots
          
      commit('SET_DATE_INFO', [{
        totalAppointmentSlots: date.totalAppointmentSlots,
        bookedSlots: date.bookedSlots,
        remainingSlots: date.remainingSlots,
        date: date.date
      }])
      date.timing.forEach(function(time){
        if(time.booking == 0){
          time.color = 'green'
        }else if(time.booking == 1){
          time.color = 'blue'
        }else{
          time.color = 'red'
        }
      })
      commit('SET_DATE_TIMING', date.timing)
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const updateDate = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/updateDate', data).then((res) => {
    if (res.data.status == 200) {
      dispatch('getAllDates')
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const filterAppointments = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/appointment/bytime', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
/** Event related API calles */
export const getALLEvents = ({ commit, dispatch }) => new Promise((resolve, reject) => {
  Api().get('/Api/event/list').then((res) => {
    if (res.data.status == 200) {
      let events = res.data.list
      commit('SET_EVENT_LIST' , events)
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const getALLVars = ({ commit, dispatch }) => new Promise((resolve, reject) => {
  Api().get('/Api/sysVar').then((res) => {
    if (res.data.status == 200) {
      let vars = res.data.data
      commit('SET_SYS_VAR' , vars)
      resolve(vars)
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const getVarByName = ({ commit, dispatch } ,data) => new Promise((resolve, reject) => {
  Api().post('/Api/sysVar/byName' , data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data.variable);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
export const updateVariable = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/sysVar/update', data).then((res) => {
    if (res.data.status == 200) {
      dispatch('getALLVars')
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
export const addNewEvent = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/event/addEvent', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const updateEventData = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/event/update', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
      dispatch('getALLEvents')
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
export const deleteEvent = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/event/delete', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

export const deleteRequest = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/Api/request/delete', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});

