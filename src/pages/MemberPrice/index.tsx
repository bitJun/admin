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
  
  const [listInfo, setListInfo] = useState<any>([]);

  useEffect(()=>{
    onLoadList();
  }, []);

  const onLoadList = () => {
    queryProductList({})
      .then((res) => {
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
    console.log('json', json)
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
              listInfo.map((item:any)=>{
                return (
                  <div key={item.productPrice}>
                    <p style={{marginBottom: 0}}>{item.productName}</p>
                    <Flex justify={'flex-start'} align={'center'}>
                      设置{item.productName}价格：
                      &nbsp;&nbsp;&nbsp;
                      <Input
                        prefix="￥"
                        suffix="元"
                        style={{width: '400px'}}
                        value={item?.productPrice}
                        onChange={(e:any)=>{
                          let data = [...listInfo];
                          data = data.map((json:any)=>{
                            if (json.productId == item.productId) {
                              json.productPrice = e.target.value;
                            }
                            return json;
                          });
                          setListInfo(data);
                        }}
                      />
                      &nbsp;&nbsp;&nbsp;
                      <Button type='primary' onClick={()=>{onSave(item.productId, item.productPrice)}}>保存设置</Button>
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
