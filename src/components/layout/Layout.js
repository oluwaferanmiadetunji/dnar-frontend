import { lazy, useEffect } from 'react';

import styles from './style.module.scss';

import { makeGetRequest } from 'utils/api';

import PropTypes from 'prop-types';

import { Layout } from 'antd';

import Header from 'components/header';

import { useDispatch, useSelector } from 'react-redux';
import { setUserData, setUserProjects, setUserRole } from 'store/user.slice';

const { Content } = Layout;

const LayoutComponent = ({ children, title }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	useEffect(() => {
		(async () => {
			const { data, error } = await makeGetRequest(`/employee/${user.data.id}`);

			if (!error) {
				dispatch(setUserData(data.data));
				dispatch(setUserProjects(data.projects));
				dispatch(setUserRole(data.role));
			}
		})();
	}, []);

	return (
		<Layout className={styles.container}>
			<Header title={title} />
			<Content className={styles.container__content}>{children}</Content>
		</Layout>
	);
};

LayoutComponent.propTypes = {
	children: PropTypes.any,
	title: PropTypes.string,
};

export default LayoutComponent;
