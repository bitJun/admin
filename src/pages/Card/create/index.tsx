import { PageContainer } from '@ant-design/pro-components';
import {
  Button,
  Form,
  Input,
  Flex,
  Space,
  InputNumber,
  Card,
  Progress,
  message
} from 'antd';
import React, { useState, useEffect } from 'react';
import {
  queryCardSituation,
  queryCardGenerate
} from '@/services/api';
import type { InputNumberProps } from 'antd';


const { TextArea } = Input;

const CardPage: React.FC = () => {

  const [info, setInfo] = useState<any>({});
  const [remark, setRemark] = useState<string>('');
  const [percent, setPercent] = useState(0);
  const [endNumber, setEndNumber] = useState(0);

  const onChange = (key: string, value: number) => {
    console.log('changed', value);
    let data = {...info};
    data[key] = value;
    setInfo(data);
  };

  useEffect(()=>{
    onLoadData();
  }, []);

  const onLoadData = () => {
    queryCardSituation()
      .then(res=>{
        let total = res.haveCreate + res.haveNotCreate;
        let p = res.haveCreate / total * 100;
        setPercent(p);
        setInfo(res);
        setEndNumber(Number(res.nextCard) + 1)
      })
  }

  const onSure = () => {
    let params = {
      startNumber: Number(info.nextCard),
      endNumber: Number(endNumber),
      remark: remark
    }
    queryCardGenerate(params)
      .then(res=>{
        console.log(res)
        if (res.success) {
          message.success('修改成功');
          onLoadData();
        }
      })
  }

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
          <Progress percent={percent} showInfo={false} />
          <Flex justify={'space-between'} align={'center'}>
            <p>{info.min}</p>
            <p>{info.max}</p>
          </Flex>
          <Flex justify={'flex-start'} align={'center'} gap={10}>
            <div>已发行 {info?.haveCreate}</div>
            <div>未发行 {info?.haveNotCreate}</div>
          </Flex>
          <Flex justify={'flex-start'} align={'center'} gap={10}>
            起止卡号
            &nbsp;&nbsp;&nbsp;
            <InputNumber
              disabled
              value={info.nextCard}
              style={{width: '150px'}}
            />
            &nbsp;&nbsp;&nbsp;
            -
            &nbsp;&nbsp;&nbsp;
            <InputNumber
              min={Number(info.nextCard) + 1}
              max={Number(info.max)}
              value={endNumber}
              onInput={(e:any)=>{setEndNumber(e)}}
              style={{width: '150px'}}
              controls={false}
            />
            &nbsp;&nbsp;&nbsp;
            共
            &nbsp;&nbsp;&nbsp;
            <Input
              value={Number(endNumber) - Number(info.nextCard) - 1}
              readOnly
              style={{width: '150px'}}
            />
            &nbsp;&nbsp;&nbsp;
            张
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;
            未发行卡段: 
            <Flex justify={'space-between'} align={'center'}>
              {info.nextCard}-{info.endCard}
            </Flex>
          </Flex>
          备注说明:
          <TextArea
            rows={4}
            placeholder="请输入内容"
            maxLength={-1}
            style={{ width: '50%' }}
            value={remark}
            onInput={(e:any)=>{
              setRemark(e.target.value);
            }}
          />
          <Button type='primary' onClick={()=>{onSure()}}>确认发行</Button>
        </Space>
      </Card>
    </PageContainer>
  );
};

export default CardPage;
