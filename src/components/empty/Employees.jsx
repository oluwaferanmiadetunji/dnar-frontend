import { Empty } from 'antd';

export default function Projects() {
	return (
		<Empty
			image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
			imageStyle={{
				height: 60,
			}}
			description={<span>No Employees</span>}
		/>
	);
}
