import { useEffect } from 'react';

import styles from './style.module.scss';

import PropTypes from 'prop-types';

import { Layout } from 'antd';

import Header from 'components/header';

import { makeGetRequest } from 'utils/api';

import { useDispatch } from 'react-redux';
import { setRoles } from 'store/roles.slice';

const { Content } = Layout;

const LayoutComponent = ({ children }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		(async () => {
			const { data, error } = await makeGetRequest('/role');
			console.log(data);
			if (!error) {
				dispatch(setRoles(data.results));
			}
		})();
	}, []);

	return (
		<Layout className={styles.container}>
			<Header />
			<Content className={styles.container__content}>{children}</Content>
		</Layout>
	);
};

LayoutComponent.propTypes = {
	children: PropTypes.any,
};

export default LayoutComponent;
