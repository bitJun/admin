import React, { useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import {
  Flex,
  Space,
  Button,
  Input,
  InputNumber,
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
  
  const [listInfo, setListInfo] = useState<any>([]);
  const list = useRef<any>([]);

  useEffect(()=>{
    onLoadList();
  }, []);

  const onLoadList = () => {
    queryProductList({})
      .then((res) => {
        list.current = res.data;
        setListInfo(res.data);
      })
  }

  const onSave = (id:any, productPrice: any) => {

    let json:any = {};
    json.productId  = id;
    json.price = Number(productPrice);
    updatePorduct(json)
      .then(res=>{
        onLoadList();
      })
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
              list.current.map((item:any)=>{
                return (
                  <div key={item.productPrice}>
                    <p style={{marginBottom: 0}}>{item.productName}</p>
                    <Flex justify={'flex-start'} align={'center'}>
                      设置{item.productName}价格：
                      &nbsp;&nbsp;&nbsp;
                      <InputNumber
                        min={0}
                        prefix="￥"
                        suffix="元"
                        style={{width: '400px'}}
                        value={item?.productPrice}
                        onChange={(e:any)=>{
                          let data = [...list.current];
                          data = data.map((json:any)=>{
                            if (json.productId == item.productId) {
                              json.productPrice = e;
                            }
                            return json;
                          });
                          list.current = data;
                          console.log('data', data)
                          // setListInfo(data);
                        }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <Button type='primary' onClick={()=>{onSave(item.productId, item.productPrice)}}>保存设置</Button>
                    </Flex>
                  </div>
                )
              })
            }
          </Space>
        </div>
      </Card>
    </PageContainer>
  );
};

export default AccessPage;
