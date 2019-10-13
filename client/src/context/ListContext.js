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
          return list.id === action.payload._id ? action.payload : list;
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
        dispatch({ type: 'add_error', payload: err })
      }
    }
  };
};

const addList = dispatch => {
  return async (name) => {
    const response = await axios.post('/api/lists/add', { name });

    dispatch({ type: 'add_list', payload: response.data });
  };
};

const deleteList = dispatch => {
  return async (id) => {
    await axios.delete(`/Lists/${id}`);
    dispatch({ type: 'delete_list', payload: id })
  }
}

const editList = dispatch => {
  return async (id, title, content) => {
    await axios.put(`/lists/${id}`, { title, content });
  }
}

export const { Context, Provider } = createDataContext(
  listReducer,
  { addList, deleteList, editList, getLists },
  {
    lists: [],
    errorMessage: null
  }
);