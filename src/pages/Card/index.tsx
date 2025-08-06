import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  Flex,
  Space,
  InputNumber,
  Card
} from 'antd';
import type { InputNumberProps } from 'antd';


const { TextArea } = Input;

const CardPage: React.FC = () => {

  const onChange: InputNumberProps['onChange'] = (value) => {
    console.log('changed', value);
  };

  return (
    <PageContainer
      ghost
      header={{
        title: '发行卡',
      }}
    >
      <Card>
        <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
          <div></div>
          <Flex justify={'space-between'} align={'center'}>
            <p>1000</p>
            <p>2000</p>
          </Flex>
          <Flex justify={'flex-start'} align={'center'} gap={10}>
            <div>已发行 120</div>
            <div>未发行 120</div>
          </Flex>
          <Flex justify={'flex-start'} align={'center'} gap={10}>
            起止卡号
            &nbsp;&nbsp;&nbsp;
            <InputNumber
              min={1}
              max={10}
              defaultValue={3}
              onChange={onChange}
            />
            &nbsp;&nbsp;&nbsp;
            -
            &nbsp;&nbsp;&nbsp;
            <InputNumber
              min={1}
              max={10}
              defaultValue={3}
              onChange={onChange}
            />
            &nbsp;&nbsp;&nbsp;
            共
            &nbsp;&nbsp;&nbsp;
            <InputNumber
              min={1}
              max={10}
              defaultValue={3}
              onChange={onChange}
            />
            &nbsp;&nbsp;&nbsp;
            张
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            未发行卡段: 
            <Flex justify={'space-between'} align={'center'}>
              1000-20000
              <span>2000张</span>
            </Flex>
          </Flex>
          备注说明:
          <TextArea
            rows={4}
            placeholder="请输入内容"
            maxLength={6}
            style={{ width: '50%' }}
          />
          <Button type='primary'>确认发行</Button>
        </Space>
      </Card>
    </PageContainer>
  );
};

export default CardPage;
