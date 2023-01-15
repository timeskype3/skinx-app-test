import React, { useEffect, useState } from 'react';
import { List, Typography, Space, Tag, theme } from 'antd';
import VirtualList from 'rc-virtual-list';
import { IPost } from '../types/types';
import { getPostsByTagsAPI } from '../services/services';

const { Link } = Typography;
const { useToken } = theme;

interface PostsListProps {
  tags: string,
  posts: IPost[] | [],
  onPostsListClick(post: IPost): void,
}

const ContainerHeight = 400;

const PostsList: React.FC<PostsListProps> = (props) => {
  const [data, setData] = useState<IPost[] | []>([]);
  const [page, setPage] = useState<number>(2);

  const { token } = useToken();

  useEffect(() => {
    setData(props.posts)
  }, [props.posts]);

  const onScroll = async (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      try {
        if (page > 1) {
          const res = await getPostsByTagsAPI(props.tags, 10, page);
          setData((state) => [
            ...state,
            ...res.data
          ])
        }
        setPage((state) => state + 1);
      } catch (error) {
        setPage(0);
        throw error
      }
    }
  };

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        fullHeight={false}
        itemHeight={47}
        itemKey="_id"
        onScroll={onScroll}
      >
        {(post: IPost) => (
          <List.Item key={post._id}>
            <List.Item.Meta
              title={
                <Link onClick={() => props.onPostsListClick(post)}>
                  {post.title}
                </Link>
              }
              description={
                <Space align="start" wrap>
                  {post.tags.map((tag) => (
                    <Tag key={tag + post?._id} style={{ margin: 0 }} color={token.colorInfo}>{tag}</Tag>
                  ))}
                </Space>}
            />
            <div>{post.postedBy.name}</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default PostsList;