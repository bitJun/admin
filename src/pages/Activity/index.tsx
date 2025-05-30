import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input
} from 'antd';

const AccessPage: React.FC = () => {
  return (
    <PageContainer
      ghost
      header={{
        title: '新建活动',
      }}
    >
      <Form style={{width: '1000px'}}>
        <Form.Item
          required
          label="请输入名称"
          name="activityName"
        >
          <Input />
        </Form.Item>
        <Form.Item
          required
          label="封面图片"
          name="activityName"
        >
          <img
            src=""
            alt="封面图片"
          />
        </Form.Item>
        <Form.Item
          label="封面描述"
          name="activityDesc"
        >
          <Input.TextArea
            placeholder="请输入内容"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary">提交</Button>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default AccessPage;
