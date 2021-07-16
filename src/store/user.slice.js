import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: {},
	isLogged: false,
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
	},
});

const { setUserData, setIsLogged } = mySlice.actions;

export { setUserData, setIsLogged };

export default mySlice.reducer;
