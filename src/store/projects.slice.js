import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const mySlice = createSlice({
	name: 'projects',
	initialState,
	reducers: {
		setProjects: (state, action) => {
			state = action.payload;
			return state;
		},
	},
});

const { setProjects } = mySlice.actions;

export { setProjects };

export default mySlice.reducer;
