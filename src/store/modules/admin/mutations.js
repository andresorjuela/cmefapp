
export const SET_LOGIN_STATUS = (state, status) => {
  state.isLoggedIn = status;
};

export const SET_CURRENT_ADMIN = (state, data) => {
  state.admin = data;
};

export const SET_ADMIN_TOKEN = (state, tok) => {
  state.adminToken = tok;
};

export const SET_ADMIN_LIST = (state, list) => {
  state.adminList = list;
};
export const SET_DATE_LIST = (state, list) => {
  state.dateList = list;
};

export const SET_REQUEST_LIST = (state, list) => {
  state.requestList = list;
};
export const SET_APPOINTMENT_LIST = (state, list) => {
  state.appointmentList = list;
};

export const SET_DB_STATES = (state, stats) => {
  state.DBStats = stats;
};
export const SET_DATE_INFO = (state, info) => {
  state.dateInfo = info;
};
export const SET_DATE_TIMING = (state, timing) => {
  state.dateTiming = timing;
};

export const SET_EVENT_LIST = (state, list) => {
  state.eventList = list;
};

export const SET_SYS_VAR = (state, list) => {
  state.variables = list;
};
export const SET_SHOW_VIDEO = (state, value) => {
  state.showVideo = value;
};



