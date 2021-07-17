import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: {},
	isLogged: false,
	projects: [],
	role: '',
};

const mySlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserData: (state, action) => {
			state.data = action.payload;
			return state;
		},
		setIsLogged: (state, action) => {
			state.isLogged = action.payload;
			return state;
		},
		setUserProjects: (state, action) => {
			state.projects = action.payload;
			return state;
		},
		setUserRole: (state, action) => {
			state.role = action.payload;
			return state;
		},
	},
});

const { setUserData, setIsLogged, setUserProjects, setUserRole } = mySlice.actions;

export { setUserData, setIsLogged, setUserProjects, setUserRole };

export default mySlice.reducer;
