import { Empty } from 'antd';

export default function Header() {
	return (
		<Empty
			image='https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg'
			imageStyle={{
				height: 60,
			}}
			description={<span>No Projects</span>}
		/>
	);
}
