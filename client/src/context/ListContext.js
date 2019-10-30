import createDataContext from './createDataContext';
import axios from 'axios';

const listReducer = (state, action) => {
  switch (action.type) {
    case 'get_lists':
      return { ...state, lists: action.payload };
    case 'add_list':
      return { ...state, lists: [...state.lists, action.payload] };
    case 'delete_list':
      return { ...state, lists: state.lists.filter(list => list._id !== action.payload) };
    case 'edit_list':
      return {
        ...state, lists: state.lists.map(list => {
          return list._id === action.payload._id ? action.payload : list;
        })
      }
    case 'add_error':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

const getLists = dispatch => {
  return async () => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const requestConfig = {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }
        const response = await axios.get('/api/lists/', requestConfig);

        dispatch({ type: 'get_lists', payload: response.data });
      } catch (err) {
        console.log(err)
        dispatch({ type: 'add_error', payload: err.response.data })
      }
    }
  };
};

const addList = dispatch => {
  return async (name, callback) => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const requestConfig = {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }
        const response = await axios.post('/api/lists/add', { name }, requestConfig);

        dispatch({ type: 'add_list', payload: response.data });
        if (callback) {
          callback(response.data._id);
        }
      } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data })
      }
    }
  };
};

const deleteList = dispatch => {
  return async (_id) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const requestConfig = {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }

        await axios.delete(`/api/lists/delete/${_id}`, requestConfig);
        dispatch({ type: 'delete_list', payload: _id });
      } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data })
      }
    }
  }
}

const editList = dispatch => {
  return async (_id, name, callback) => {
    const token = localStorage.getItem('token');

    if (token) {
      try {
        const requestConfig = {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
          }
        }
        const response = await axios.put('/api/lists/edit', { _id, name }, requestConfig);
        dispatch({ type: 'edit_list', payload: response.data });
        if (callback) {
          callback();
        }
      } catch (err) {
        dispatch({ type: 'add_error', payload: err.response.data })
      }
    }
  }
}

const shareList = dispatch => async ({ emailAddress, url, userName }, callback) => {
  try {
    await axios.post('/api/lists/share', { emailAddress, url, userName });
    if (callback) {
      callback();
    }
  } catch (err) {
    dispatch({ type: 'add_error', payload: err.response.data });
  }
}

export const { Context, Provider } = createDataContext(
  listReducer,
  { addList, deleteList, editList, getLists, shareList },
  {
    lists: [],
    errorMessage: null
  }
);