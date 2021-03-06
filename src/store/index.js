import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import UserReducer from './user.slice';
import RolesReducer from './roles.slice';
import ProjectsReducer from './projects.slice';
import EmployeesReducer from './employees.slice';

const rootReducer = combineReducers({
	user: UserReducer,
	roles: RolesReducer,
	projects: ProjectsReducer,
	employees: EmployeesReducer,
});

const persistConfig = {
	key: 'root',
	storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: false,
		immutableCheck: false,
	}),
});

export default store;
