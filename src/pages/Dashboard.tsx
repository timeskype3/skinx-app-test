import React, { useEffect, useState } from 'react';
import {
  theme,
  Layout, Row, Col, Image, Space, Divider, BackTop, Typography
} from 'antd';
import type { MenuProps } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { getAllPostsAPI, getPostByIdAPI, getPostsByTagsAPI } from '../services/services';
import SearchTag from '../component/SearchTag';
import Dropdown from '../component/Dropdown';
import PostModal from '../component/PostModal';
import PostsContainer from '../component/PostsContainer';
import { IPost } from '../types/types';

import { useInfiniteQuery } from "react-query";

import { useAppDispatch, useAppSelector } from '../store/hook/useTypedSelector';
import { getProfile, updateUser } from '../store/slices/userSlice';
import { logout } from '../store/slices/authSlice';

const { Header, Content } = Layout;
const { Title } = Typography;

const { useToken } = theme;

const Dashboard: React.FC = () => {
  const [postModal, setPostModal] = useState<IPost | null>(null);
  const [openPostModal, setOpenPostModal] = useState<boolean>(false);
  const [isPostModalLoading, setIsPostModalLoading] = useState<boolean>(false);
  const [isPostsTagsLoading, setIsPostsTagsLoading] = useState<boolean>(false);
  const [postsTags, setPostsTags] = useState<IPost[] | []>([]);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const auth = useAppSelector((state) => state.auth)
  const { token } = useToken();

  useEffect(() => {
    if (!auth.data) {
      dispatch(getProfile())
    }
    if (auth.isAuthenticate && auth.data) {
      dispatch(updateUser(auth.data));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticate])


  const fetchAllPosts = async ({ pageParam = 1 }) => {
    const resAllPost = await getAllPostsAPI(20, pageParam);
    const results: IPost[] = resAllPost.data;
    const hasNextPage: boolean = results.length > 0 ? true : false;
    return { results, nextPage: pageParam + 1, hasNextPage }
  }

  const fetchPostsByTags = async (tags: string, limit: number, page: number) => {
    try {
      setIsPostsTagsLoading(true);
      const resPostsByTags = await getPostsByTagsAPI(tags, limit, page);
      setPostsTags(resPostsByTags.data);
      setIsPostsTagsLoading(false);
      return resPostsByTags.data
    } catch (error: unknown) {
      setPostsTags([]);
      setIsPostsTagsLoading(false);
      return error
    }
  }

  const handlePostCardClick = async (post: IPost) => {
    setOpenPostModal(true);
    setPostModal(post);
    setIsPostModalLoading(true);
    const { data } = await getPostByIdAPI(post._id);
    setIsPostModalLoading(false);
    setPostModal(data);
  }

  const handleSearchTag = async (tags: string, limit: number, page: number) => {
    await fetchPostsByTags(tags, limit, page);
  }


  const menuDropdownList: MenuProps['items'] = [
    {
      label: 'Log out',
      key: '1',
      icon: <LogoutOutlined />,
      onClick: () => { dispatch(logout()) },
      style: { color: '#af4154' }
    },
  ];

  const allPostsData = useInfiniteQuery("allPosts", fetchAllPosts, {
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage) return lastPage.nextPage;
      return undefined;
    }
  });

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header style={{ backgroundColor: token.colorPrimary }}>
        <Row style={{ height: '100%' }} align="middle">
          <Col flex="none" className='Skilllane-nav-logo'>
            <Image
              src="https://skinx.app/wp-content/themes/skinx/img/skinx-logo-white.svg"
              alt="Logo"
              width="150px"
              preview={false}
              style={{
                verticalAlign: 'middle',
              }}
            />
          </Col>
          <Col flex="auto">
            <Row justify={'end'} style={{ padding: "0 1%" }}>
              <SearchTag
                isLoading={isPostsTagsLoading}
                posts={postsTags}
                onSearchTag={handleSearchTag}
                onClearSearchTag={() => setPostsTags([])}
                onSearchPostsClick={handlePostCardClick}
              />
            </Row>
          </Col>
          <Col flex="none">
            <Space split={<Divider type="vertical" />}>
              <Title level={5} style={{ margin: '0', color: token.colorBgContainer }}>
                Welcome
              </Title>
              <Dropdown
                title={user.data?.name || 'No name'}
                menu={{ items: menuDropdownList }}
              />
            </Space>
          </Col>
        </Row>
      </Header>
      <Content>
        <Row justify="center">
          <PostsContainer
            postsData={allPostsData}
            onPostCardClick={handlePostCardClick}
            onPostsLoadMore={(page: number) => allPostsData.fetchNextPage({ pageParam: page + 1 })}
          />
        </Row>
        <PostModal
          open={openPostModal}
          loading={isPostModalLoading}
          onSetOpen={(value: boolean) => { setOpenPostModal(value) }}
          post={postModal}
        />
        <BackTop />
      </Content>
    </Layout >
  )
}

export default Dashboard;