import React from 'react';
import {
  Col, Space, Empty, Spin, Button, Result
} from 'antd';
import PostCard from './PostCard';
import { IPost } from '../types/types';

import InfiniteScroll from "react-infinite-scroller";


interface PostsContainerProps {
  postsData: any,
  onPostCardClick(post: IPost): void,
  onPostsLoadMore(page: number): void,
}

const PostsContainer: React.FC<PostsContainerProps> = ({
  postsData,
  onPostCardClick,
  onPostsLoadMore,
}) => {
  return (
    <Col style={{
      width: '1100px',
      margin: '2rem 1rem',
    }}>
      {postsData.isLoading ? (
        <Space direction="vertical" align='center' style={{ width: '100%' }}>
          < Spin size="large" />
        </Space>
      ) : postsData.isError ? (
        <Result
          status="warning"
          title="There are some problems"
          extra={
            <Button type="primary" key="console" onClick={() => window.location.reload()}>
              Refresh website
            </Button>
          }
        />
      ) : (
        postsData.data && postsData.data.pages[0].results.length !== 0 ?
          <InfiniteScroll
            hasMore={postsData.hasNextPage}
            loadMore={onPostsLoadMore}
            loader={
              <Space direction="vertical" align='center' style={{ width: '100%', margin: '1rem' }}>
                < Spin size="large" />
              </Space>
            }
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}
              align="start"
            >
              <Space
                size={[10, 10]}
                wrap
              >
                {postsData.data.pages.map((page: any) =>
                  page.results.map((post: IPost) =>
                    <PostCard
                      key={post._id}
                      post={post}
                      onPostCardClick={onPostCardClick}
                    />
                  ))}
              </Space>
            </Space>
          </InfiniteScroll>
          :
          <Empty description="No post were found" />
      )}
    </Col>
  )
}

export default PostsContainer