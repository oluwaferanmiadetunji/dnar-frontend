import styles from './style.module.scss';

import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

import { ROUTES, DEFAULT_IMAGE } from 'utils/constants';

import { useDispatch } from 'react-redux';
import { setIsLogged, setUserData } from 'store/user.slice';

import { message, Layout, Menu, Dropdown } from 'antd';
import { CaretDownOutlined, LogoutOutlined, DashboardOutlined, UserOutlined, UsergroupAddOutlined, ProjectOutlined } from '@ant-design/icons';

const Header = ({ title }) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const logout = () => {
		message.success('Logout successful');

		setTimeout(() => {
			dispatch(setIsLogged(false));
			dispatch(setUserData({}));
			window.localStorage.clear();
			history.push(ROUTES.HOME);
		}, 500);
	};

	const menu = (
		<Menu className={styles.container__dropdown__menu}>
			<Menu.Item onClick={() => history.push(ROUTES.DASHBOARD)} className={styles.container__dropdown__menu__item}>
				<DashboardOutlined />
				<span>Dashboard</span>
			</Menu.Item>

			<Menu.Item onClick={() => history.push(ROUTES.EMPLOYEES)} className={styles.container__dropdown__menu__item}>
				<UsergroupAddOutlined />
				<span>Employees</span>
			</Menu.Item>

			<Menu.Item onClick={() => history.push(ROUTES.PROJECTS)} className={styles.container__dropdown__menu__item}>
				<ProjectOutlined />
				<span>Projects</span>
			</Menu.Item>

			<Menu.Item onClick={() => history.push(ROUTES.ROLES)} className={styles.container__dropdown__menu__item}>
				<UserOutlined />
				<span>Roles</span>
			</Menu.Item>

			<Menu.Item onClick={logout} className={styles.container__dropdown__menu__item}>
				<LogoutOutlined />
				<span>Logout</span>
			</Menu.Item>
		</Menu>
	);

	return (
		<Layout.Header className={styles.container}>
			<p className={styles.container__location}>{title}</p>

			<Dropdown overlay={menu} trigger={['click']}>
				<span className={styles.container__dropdown}>
					<div className={styles.container__dropdown__user}>
						<img src={DEFAULT_IMAGE} alt='user' />
					</div>

					<div className={styles.container__dropdown__down}>
						<CaretDownOutlined className={styles.container__dropdown__down__icon} />
					</div>
				</span>
			</Dropdown>
		</Layout.Header>
	);
};

Header.propTypes = {
	title: PropTypes.string,
};

export default Header;
