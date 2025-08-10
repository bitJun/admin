import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  Flex,
  Space,
  Button,
  Input,
  Card
} from 'antd';
import {
  queryProductList,
  queryVipInfo,
  updatePorduct,
  updateInfoByVipLevel
} from '@/services/api';
import { InfoCircleOutlined, UserOutlined } from '@ant-design/icons';

interface CardItemProps {
  id: number;
  cardType: string;
  price: number;
  createdTime: string;
  updatedTime: string;
}

const AccessPage: React.FC = () => {
  
  const [listInfo, setListInfo] = useState<any>({});
  const [info, setInfo] = useState<Array<any> | []>([]);

  useEffect(()=>{
    onLoadInfo();
    onLoadList();
  }, []);

  const onLoadList = () => {
    queryProductList({})
      .then((res) => {
        console.log(res);
        let data:any = {};
        res.data.forEach((item:any)=>{
          data[item.productId] = item;
        })
        setListInfo(data);
      })
  }

  const onLoadInfo = () => {
    queryVipInfo({})
      .then((res) => {
        setInfo(res.data);
        console.log(res);
      })
  }

  const onSave = (id:any) => {
    let data:any = {};
    data = listInfo[id];
    console.log('data', data)
    let json:any = {};
    json.productId  = data.productId;
    json.price = Number(data.productPrice);
    updatePorduct(json)
      .then(res=>{
        onLoadInfo();
        onLoadList();
      })
    // console.log('json', json)
  }

  return (
    <PageContainer
      ghost
      header={{
        title: '会员类型',
      }}
    >
      <Card>
        <div style={{width: '700px'}}>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            {
              info.map((item:any)=>{
                return (
                  <div key={item.id}>
                    <p style={{marginBottom: 0}}>{item.vipName}</p>
                    <Flex justify={'flex-start'} align={'center'}>
                      设置月卡价格：
                      &nbsp;&nbsp;&nbsp;
                      <Input
                        prefix="￥"
                        suffix="元"
                        style={{width: '400px'}}
                        value={listInfo[item.id]?.productPrice}
                        onInput={(e)=>{
                          listInfo[item.id].productPrice = e.target.value;
                          setListInfo({...listInfo});
                        }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <Button type='primary' onClick={()=>{onSave(item.id)}}>保存设置</Button>
                    </Flex>
                  </div>
                )
              })
            }
            {/* <Flex justify={'center'} align={'center'}>
              <Button type='primary'>确认价格</Button>
            </Flex> */}
          </Space>
        </div>
      </Card>
    </PageContainer>
  );
};

export default AccessPage;
