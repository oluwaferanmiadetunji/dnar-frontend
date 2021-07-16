import styles from './style.module.scss';

import PropTypes from 'prop-types';

import { Layout } from 'antd';

import Header from 'components/header';

const { Content } = Layout;

const LayoutComponent = ({ children }) => {
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
