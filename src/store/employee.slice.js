import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const mySlice = createSlice({
	name: 'employees',
	initialState,
	reducers: {
		setEmployees: (state, action) => {
			state = action.payload;
			return state;
		},
	},
});

const { setEmployees } = mySlice.actions;

export { setEmployees };

export default mySlice.reducer;
