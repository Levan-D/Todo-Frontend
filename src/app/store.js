/** @format */

import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../components/Scheduler/Todo/todoSlice";
import taskProgressReducer from "../components/Scheduler/taskProgressSlice";
import indexingReducer from "../components/Scheduler/indexingSlice";
import subMenuReducer from "../components/Scheduler/popUpMenu/popupMenuSlice";
import userReducer from "../components/Login/authSlice";
import signUpReducer from "../components/Login/signUpSlice";
import forgotReducer from "../components/Login/forgotPassSlice";
import getListReduer from "../components/Scheduler/apiScheduler/getListSlice";
import createListReduer from "../components/Scheduler/apiScheduler/createListSlice";
import getTodoReducer from "../components/Scheduler/apiScheduler/getTodoSlice";
import createTodoReduer from "../components/Scheduler/apiScheduler/createTodoSlice";
import deleteListReducer from "../components/Scheduler/apiScheduler/deleteListSlice";
import renameListReducer from "../components/Scheduler/apiScheduler/renameListSlice";

export const store = configureStore({
  reducer: {
    todo: todoReducer,
    taskProgress: taskProgressReducer,
    indexing: indexingReducer,
    subMenu: subMenuReducer,
    auth: userReducer,
    signUp: signUpReducer,
    forgot: forgotReducer,
    getList: getListReduer,
    createList: createListReduer,
    deleteList: deleteListReducer,
    getTodo: getTodoReducer,
    createTodo: createTodoReduer,
    renameList: renameListReducer,
  },
});
