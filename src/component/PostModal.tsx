import React from 'react';
import { Modal, Button, Skeleton, Space, Tag, theme, Typography } from 'antd';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { IPost } from '../types/types';

const { useToken } = theme;
const { Text } = Typography;

interface PostModalProps {
  open: boolean,
  loading?: boolean,
  onSetOpen(value: boolean): void,
  post: IPost | null,
}

const PostModal: React.FC<PostModalProps> = (props) => {
  const { token } = useToken();
  dayjs.extend(localizedFormat);

  const handleCancel = () => {
    props.onSetOpen(false);
  };
  return (
    <Modal
      open={props.open}
      title={props.post?.title}
      onCancel={handleCancel}
      maskClosable={false}
      footer={[
        <Button key="close" type="primary" onClick={handleCancel}>
          Close
        </Button>
      ]}
    >
      {!props.loading && props.post?.content ?
        <Space align="start" wrap>
          <Space direction='vertical'>
            <Text disabled style={{ cursor: 'context-menu' }}>
              Posted at {dayjs(props.post.postedAt).format('DD/MM/YY LT')}
            </Text>
            <Space wrap>
              {props.post.tags.map((tag) => (
                <Tag key={tag + props.post?._id} style={{ margin: 0 }} color={token.colorInfo}>{tag}</Tag>
              ))}
            </Space>
          </Space>
          <div dangerouslySetInnerHTML={{ __html: props.post?.content || '' }} />
        </Space>
        :
        <Skeleton active />
      }
    </Modal>
  )
}

export default PostModal;