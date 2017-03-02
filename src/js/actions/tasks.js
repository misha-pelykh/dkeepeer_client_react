import axios             from 'axios';
import Actions           from '../constants/actions';
import cookie            from '../utils/cookie';
import getHeaders        from '../utils/getHeaders.js';
import prepareJson       from '../utils/prepareJson';
import redirectBackAfter from '../utils/redirectBackAfter';

const {
  FETCH_TASKS_FULFILLED,
  FETCH_TASKS_REJECTED,

  FETCH_TASK_FULFILLED,
  FETCH_TASK_REJECTED,

  UPDATE_TASK_FULFILLED,
  UPDATE_TASK_REJECTED
} = Actions;

const baseUrl = 'http://localhost:3001';

export function fetchTasks() {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const res = await axios.get(`${baseUrl}/api/tasks`, { headers });
      
      if (res.status == 200) {
        const { tasks } = res.data;
        dispatch({type: FETCH_TASKS_FULFILLED, payload: tasks})
      }
    } catch (error) {
      dispatch({ type: FETCH_TASKS_REJECTED, error });
    }
  };
}

export function fetchTask(id) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      const headers = getHeaders(token);
      const res = await axios.get(`${baseUrl}/api/tasks/${id}`, { headers });

      if (res.status == 200) {
        const { data } = res;
        dispatch({type: FETCH_TASK_FULFILLED, payload: data})
      }
      
    } catch (error) {
      dispatch({ type: FETCH_TASK_REJECTED, error });
    }
  };
}

export function updateTask(id, task) {
  return async (dispatch, getState) => {
    try {
      const { auth: { token } } = getState();

      if (!token) { return; }

      let body = prepareJson({task: task});
      let headers = getHeaders(token);

      headers['Content-Type'] = 'application/json';

      const res = await axios.put(`${baseUrl}/api/tasks/${id}`, body, { headers: headers });
      const { data } = res;

      dispatch({ type: UPDATE_TASK_FULFILLED, data });
    } catch (error) {
      dispatch({ type: UPDATE_TASK_REJECTED, error });
    }
  }
}
