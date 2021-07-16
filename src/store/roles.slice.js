import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const mySlice = createSlice({
	name: 'roles',
	initialState,
	reducers: {
		setRoles: (state, action) => {
			state = action.payload;
			return state;
		},
	},
});

const { setRoles } = mySlice.actions;

export { setRoles };

export default mySlice.reducer;
