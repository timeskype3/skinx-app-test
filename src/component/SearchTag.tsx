import React, { useState } from 'react';
import { Select, Space, Tag, theme, Spin, Empty } from 'antd';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
import PostsList from './PostsList';
import { IPost } from '../types/types';

const { useToken } = theme;

interface SearchTagProps {
  posts: IPost[] | [],
  isLoading: boolean,
  onSearchTag(tags: string, limit: number, page: number): void,
  onClearSearchTag(): void,
  onSearchPostsClick(post: IPost): void,
}

const SearchTag: React.FC<SearchTagProps> = (props) => {
  const [tags, setTags] = useState<string>('');
  const { token } = useToken();

  const limit = 5;
  const handleChange = (values: string[]) => {
    const tagsString = values.join(',');
    if (tagsString) {
      setTags(tagsString);
      props.onSearchTag(tagsString, limit, 1);
    } else {
      handleClearSelect();
    }
  };

  const handleClearSelect = () => {
    props.onClearSearchTag();
  }

  const handlePostsListClick = (post: IPost) => {
    props.onSearchPostsClick(post);
  }

  const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={token.colorInfo}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: 3 }}
      >
        {label}
      </Tag>
    );
  };

  const dropdownRender = (menu: any) => {
    return (
      <>
        {menu}
        {props.isLoading ?
          <Space direction="vertical" align='center' style={{ width: '100%', margin: '1rem' }}>
            < Spin size="small" />
          </Space>
          : props.posts.length > 0 ?
            <PostsList
              tags={tags}
              posts={props.posts}
              onPostsListClick={handlePostsListClick}
            /> :
            <Empty style={{ margin: '10px 0' }} description="Post not found" />
        }
      </>
    )
  }

  return (
    <Select
      onClear={handleClearSelect}
      mode="tags"
      style={{ width: '20rem' }}
      placeholder="Search post by tags"
      onChange={handleChange}
      allowClear
      tagRender={tagRender}
      loading={props.isLoading}
      dropdownRender={dropdownRender}
      showSearch={true}
      notFoundContent={<></>}
    />
  )
};

export default SearchTag;