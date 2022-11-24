import { useReducer, createContext } from 'react';
import { user } from './reducers/user';
import { collection } from './reducers/collection';
import { fileDetails } from './reducers/file-details';

// initial state
const initialState = {
  user: {},
  collection: {},
  filePath: '',
  fileSize: 0,
  sourceFileHeaders: [],
  initialRows: [],
  saasTemplateSchema: {},
  isTemplateEditing: false,
  templateColumnToEdit: {},
};

// create context
const Context = createContext({});

// combine reducer function
const combineReducers =
  (...reducers) =>
  (state, action) => {
    for (let i = 0; i < reducers.length; i++)
      state = reducers[i](state, action);
    return state;
  };

// context provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(
    combineReducers(user, collection, fileDetails),
    initialState
  ); // pass more reducers combineReducers(user, blogs, products)
  const value = { state, dispatch };

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export { Context, Provider };
