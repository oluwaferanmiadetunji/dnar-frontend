import axios from 'axios';
import { API_URL } from './constants';

export const makePostRequest = async ({ path, payload }) => {
	try {
		const { status, data } = await axios.post(API_URL + path, payload);
		return { status, data, error: false };
	} catch (error) {
		const { status, data } = error.response;
		return { status, data, error: true };
	}
};

export const makeGetRequest = async (path) => {
	try {
		const { status, data } = await axios.get(API_URL + path);
		return { status, data, error: false };
	} catch (error) {
		const { status, data } = error.response;
		return { status, data, error: true };
	}
};

export const makePatchRequest = async ({ path, payload }) => {
	try {
		const { data, status } = await axios.patch(API_URL + path, payload);
		return { status, data, error: false };
	} catch (error) {
		const { status, data } = error.response;
		return { status, data, error: true };
	}
};

export const makeDeleteRequest = async (path) => {
	try {
		const { data, status } = await axios.delete(API_URL + path);
		return { status, data, error: false };
	} catch (error) {
		const { status, data } = error.response;
		return { status, data, error: true };
	}
};
