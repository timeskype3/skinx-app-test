import {
	Avatar, Card, Typography, Space, Tag,
	theme, ConfigProvider
} from 'antd';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { IPost } from '../types/types';

const { Text, Title, Paragraph } = Typography;
const { useToken } = theme;

interface PostCardProps {
	post: IPost,
	onPostCardClick(post: IPost): void,
}

function PostCard({ post, onPostCardClick }: PostCardProps) {

	const { token } = useToken();
	dayjs.extend(localizedFormat);

	const handleCardClick = () => {
		onPostCardClick(post);
	}

	return (
		<ConfigProvider
			theme={{
				components: {
					Typography: {
						fontSizeHeading5: 14,
						fontWeightStrong: 200,
					},
				},
			}}
		>
			<Card
				onClick={handleCardClick}
				key={post._id}
				hoverable
				bordered
				style={{
					width: '210px',
					minHeight: '170px',
					overflow: 'hidden',
				}}
				bodyStyle={{
					padding: '0.5rem',
				}}
			>
				<Space
					direction="vertical"
					size="small"
				>
					<Paragraph
						ellipsis={{ rows: 2 }}
						style={{ margin: '0' }}
					>
						<Title
							level={4}
							style={{ margin: '0' }}
						>{post.title}
						</Title>
					</Paragraph>
					<Space align="center">
						<Avatar
							size="small"
							style={{
								verticalAlign: 'middle',
							}}
						>
							{post.postedBy.name.charAt(0)}
						</Avatar>
						<Title
							level={5}
							ellipsis={{ tooltip: true }}
							style={{
								width: '100%',
								margin: '0',
							}}
						>
							{post.postedBy.name}
						</Title >
					</Space>
					<Space align="start" wrap>
						{post.tags.map((tag) => (
							<Tag key={tag + post._id} style={{ margin: 0 }} color={token.colorInfo}>{tag}</Tag>
						))}
					</Space>
					<Space>
						<Text disabled style={{ cursor: 'pointer' }}>
							Posted at {dayjs(post.postedAt).format('DD/MM/YY LT')}
						</Text>
					</Space>
				</Space>
			</Card >
		</ConfigProvider >
	)
}

export default PostCard;