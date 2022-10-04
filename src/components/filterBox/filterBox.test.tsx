import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import {FilterBoxComponent} from './filterBox';


const sleep = () => {
	new Promise(resolve => setTimeout(resolve, 5000))
}

test('Renders FilterBox default', async () => {

	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation(query => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // deprecated
			removeListener: jest.fn(), // deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});

	const initialState = {
		list: [],
		totalCount: 0,
		loading: false
	};
	const mockStore = configureStore();
	let store = mockStore(initialState);


	const serverName = '';
	const status: string[] = [];
	const cpuUtilization: number[] = [];
	const sortBy = null;
	const order = null;

	render(
		<Provider store={store}>
			<Router><FilterBoxComponent initialValues={{serverName, status, cpuUtilization, sortBy, order}}/></Router>
		</Provider>
	);

	await sleep();
	const linkElement = screen.getByText(/Sort By/i);
	expect(linkElement).toBeInTheDocument();
});


test('Renders FilterBox with values', async () => {

	Object.defineProperty(window, 'matchMedia', {
		writable: true,
		value: jest.fn().mockImplementation(query => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(), // deprecated
			removeListener: jest.fn(), // deprecated
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});

	const initialState = {
		list: [],
		totalCount: 0,
		loading: false
	};
	const mockStore = configureStore();
	let store = mockStore(initialState);


	const serverName = 'Sample Server';
	const status = ['online'];
	const cpuUtilization = [11.2, 44.80];
	const sortBy = null;
	const order = null;

	render(
		<Provider store={store}>
			<Router><FilterBoxComponent initialValues={{serverName, status, cpuUtilization, sortBy, order}}/></Router>
		</Provider>
	);

	await sleep();
	const linkElement = screen.getByText(/Sort By/i);
	expect(linkElement).toBeInTheDocument();
});