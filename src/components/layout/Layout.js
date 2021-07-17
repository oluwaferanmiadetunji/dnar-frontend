import styles from './style.module.scss';

import PropTypes from 'prop-types';

import { Layout } from 'antd';

import Header from 'components/header';

const { Content } = Layout;

const LayoutComponent = ({ children, title }) => {
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
