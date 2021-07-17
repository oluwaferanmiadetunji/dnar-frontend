import { useState } from 'react';

import styles from './style.module.scss';

import Layout from 'components/layout';
import { Button as Loader } from 'components/loader';
import AddRole from './components/AddRole';
import NoRoles from 'components/empty/Roles';

import { message } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import { setRoles } from 'store/roles.slice';

import { makeDeleteRequest } from 'utils/api';

export default function Roles() {
	const [loading, setLoading] = useState(false);
	const [ID, setID] = useState('');

	const dispatch = useDispatch();
	const roles = useSelector((state) => state.roles);

	const deleteRole = async (id) => {
		setLoading(true);
		setID(id);
		const { data, error } = await makeDeleteRequest(`/role/${id}`);

		if (!error) {
			message.success('Role deleted successfully');
			const newRoless = roles.filter((roles) => roles.id !== id);
			dispatch(setRoles(newRoless));
		} else {
			message.error(data.message);
		}

		setLoading(false);
	};

	return (
		<Layout title='Roles'>
			<div className={styles.container}>
				<div className={styles.container__card}>
					<div className={styles.container__card__header}>
						<p className={styles.container__card__header__text}>Roles ({roles.length})</p>

						<AddRole />
					</div>

					<div className={styles.container__card__roles}>
						{roles.length > 0 ? (
							roles.map(({ title, description, id }, index) => (
								<div key={index} className={styles.container__card__roles__item}>
									<p className={styles.container__card__roles__item__text}>
										Title: <span>{title}</span>
									</p>

									<p className={styles.container__card__roles__item__text}>
										Description: <span>{description}</span>
									</p>

									<button className={styles.container__card__roles__item__button} onClick={() => deleteRole(id)}>
										{loading && ID === id ? (
											<Loader />
										) : (
											<>
												<span>Remove</span>
												<DeleteOutlined className={styles.container__card__roles__item__button__icon} />
											</>
										)}
									</button>
								</div>
							))
						) : (
							<NoRoles />
						)}
					</div>
				</div>
			</div>
		</Layout>
	);
}
