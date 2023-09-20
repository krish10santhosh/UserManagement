import { combineReducers } from "@reduxjs/toolkit";
import dashboardreducer from "../slices/dashbaordSlice";
import homeReducer from "../slices/homeSlice";

const rootReducer = combineReducers({
  dashboardreducer: dashboardreducer,
  homeReducer: homeReducer
});

export default rootReducer;
