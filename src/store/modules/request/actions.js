import Api from '@/plugins/API';

export const addNewRequestPhone = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/request/add/phone', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
export const addNewRequestEmail = ({ commit, dispatch }, data) => new Promise((resolve, reject) => {
  Api().post('/request/add/email', data).then((res) => {
    if (res.data.status == 200) {
      resolve(res.data);
    } else {
      reject(res.data);
    }
  }).catch((err) => {
    reject(err);
  });
});
