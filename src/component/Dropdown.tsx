/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Dropdown, Space, Typography, theme } from 'antd';
import type { DropdownProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const { Title, Link } = Typography;
const { useToken } = theme;

interface DropdownCustomProps extends DropdownProps {
	title?: string,

}



const DropdownCustom: React.FC<DropdownCustomProps> = (props) => {
	const { token } = useToken();
	return (
		<Dropdown
			menu={props.menu}
			trigger={['click']}
			overlayStyle={{ width: '7rem' }}
		>
			<Link>
				<Space>
					<Title level={5} style={{ margin: '0', color: token.colorBgContainer }}>
						{props.title || ''}
					</Title>
					<DownOutlined />
				</Space>
			</Link>
		</Dropdown>
	);
};

export default DropdownCustom;