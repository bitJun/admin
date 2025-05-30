import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import {
  queryNewUserState,
  queryMiniprogramState,
  queryBasicInfo,
  queryNotices
} from '@/services/api';
import Logo from '@/assets/logo.png';
import Arrow from '@/assets/arrow.png';
import {
  Flex,
  Col,
  Row,
  Card,
  Space,
  Button
} from 'antd';
import dayjs from 'dayjs'
import ChartLine from '@/components/Chart';
import styles from './index.less';

interface basicInfoProps {
  accountCount: string | number;
  activatedProvinces: Array<string>;
  defaultProvince: string;
  usedCount: string;
}

interface statesListProps {
  date: string;
  visits: number;
  yoy: number;
  growthRate: number;
}

interface statesInfoProps {
  month: number;
  year: number;
  yesterday: number;
  list: Array<statesListProps>;
}

interface NoticeItemProps {
  id: number;
  type: string;
  title: string;
  publishTime: string;
  content: string;
}

const HomePage: React.FC = () => {
  const { name } = useModel('global');
  const [basicInfo, setBasicInfo] = useState<basicInfoProps>();
  const [statesInfo, setStatesInfo] = useState<statesInfoProps>();
  const [rigisterInfo, setRigisterInfo] = useState<statesInfoProps>();
  const [type, setType] = useState<string>('month');
  const [rigisterType, setRigisterType] = useState<string>('month');
  const [noticeList, setNoticeList] = useState<Array<NoticeItemProps> | []>([]);

  useEffect(()=>{
    onLoadBasicInfo();
    onLoadNotce();
  }, []);

  useEffect(()=>{
    onLoadStatesInfo();
  }, [type]);

  useEffect(()=>{
    onLoadNewUserState();
  }, [rigisterType]);

  const onLoadNewUserState = () => {
    let params = {
      startDate: '',
      endDate: ''
    }
    if (rigisterType == 'month') {
      params.startDate = dayjs().startOf('month').format('YYYY-MM-DD');
      params.endDate = dayjs().endOf('month').format('YYYY-MM-DD');
    } else {
      params.startDate = dayjs().startOf('year').format('YYYY-MM-DD');
      params.endDate = dayjs().endOf('year').format('YYYY-MM-DD');
    }
    queryNewUserState(params)
     .then((res) => {
        let {
          data
        } = res;
        setRigisterInfo(data);
        // setStatesInfo(data);
        // console.log('data', data);
      });
  }

  const onLoadBasicInfo = () => {
    queryBasicInfo()
      .then((res) => {
        let {
          data
        } = res;
        setBasicInfo(data);
      });
  }

  const onLoadStatesInfo = () => {
    let params = {
      startDate: '',
      endDate: ''
    }
    if (type == 'month') {
      params.startDate = dayjs().startOf('month').format('YYYY-MM-DD');
      params.endDate = dayjs().endOf('month').format('YYYY-MM-DD');
    } else {
      params.startDate = dayjs().startOf('year').format('YYYY-MM-DD');
      params.endDate = dayjs().endOf('year').format('YYYY-MM-DD');
    }
    queryMiniprogramState(params)
      .then((res) => {
        let {
          data
        } = res;
        setStatesInfo(data);
      });
  }

  const onLoadNotce = () => {
    queryNotices({
      page: 1,
      size: 10
    }).then((res) => {
      let {
        data
      } = res;
      // setStatesInfo(data);
      console.log('data1', data);
      setNoticeList(data);
    });
  }

  return (
    <PageContainer ghost>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Card>
          <Row gutter={16}>
            <Col className="gutter-row" span={6}>
              <Flex align='center' gap={'16px'}>
                <img
                  src={Logo}
                  className={styles.logo}
                />
                高考后台
              </Flex>
            </Col>
            <Col className="gutter-row" span={6}>
              <Flex
                vertical={true}
                gap={'16px'}
              >
                <Flex
                  align='center'
                  gap={'12px'}
                >
                  <label className={styles.label}>开通省份：</label>{basicInfo?.activatedProvinces.length}
                </Flex>
                <Flex
                  align='center'
                  gap={'12px'}
                >
                  <label className={styles.label}>默认省份：</label>{basicInfo?.defaultProvince}
                </Flex>
              </Flex>
            </Col>
            <Col className="gutter-row" span={6}>
              <Flex
                vertical={true}
                gap={'16px'}
              >
                <Flex
                  align='center'
                  gap={'12px'}
                >
                  <label className={styles.label}>账号数：</label>{basicInfo?.accountCount}
                </Flex>
                <Flex
                  align='center'
                  gap={'12px'}
                >
                  <label className={styles.label}>已使用：</label>{basicInfo?.usedCount}
                </Flex>
              </Flex>
            </Col>
            <Col className="gutter-row" span={6}>
              <Flex
                vertical={true}
                gap={'16px'}
              >
                <Flex
                  align='center'
                  gap={'12px'}
                >
                  <label className={styles.label}>机构余额（元）：</label>
                </Flex>
                <Flex
                  align='center'
                  gap={'12px'}
                >
                  <label className={styles.recharge}>充值</label>
                </Flex>
              </Flex>
            </Col>
          </Row>
        </Card>
        <Card>
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <Flex
                align='center'
                gap={'12px'}
              >
                {/* <label className={styles.label}>运营</label> */}
                <label className={styles.label}>财务</label>
                {/* <label className={styles.label}>业务</label> */}
                {/* <label className={styles.label}>工单</label> */}
              </Flex>
              <h4 className={styles.title}>访问量</h4>
              <Flex
                justify='space-between'
                align='center'
              >
                <Flex
                  align='center'
                  gap={'60px'}
                >
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>昨日</label>
                    <span>{statesInfo?.yesterday}</span>
                  </Flex>
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>本月</label>
                    <span>{statesInfo?.month}</span>
                  </Flex>
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>本年</label>
                    <span>{statesInfo?.year}</span>
                  </Flex>
                </Flex>
                <Flex
                  align='center'
                  gap={'24px'}
                >
                  <Button
                    type={type == 'month' ? 'primary' : 'default'}
                    onClick={()=>{setType('month')}}
                  >
                    本月
                  </Button>
                  <Button
                    type={type == 'year' ? 'primary' : 'default'}
                    onClick={()=>{setType('year')}}
                  >
                    本年
                  </Button>
                </Flex>
              </Flex>
              {/* <ChartLine 
                id={'visit-chart'}
                data={statesInfo?.list || []}
              /> */}
              <ChartLine 
                id={'visit-chart'}
                data={[
                  {
                    date: '2023-04-01',
                    visits: 100,
                    yoy: 100,
                  },
                  {
                    date: '2023-04-02',
                    visits: 300,
                    yoy: 100,
                  },
                  {
                    date: '2023-04-03',
                    visits: 200,
                    yoy: 100,
                  },
                ]}
              />
            </Col>
            <Col className="gutter-row" span={12}>
              <Flex
                align='center'
                gap={'12px'}
              >
                <label className={styles.label}>注册用户</label>
                {/* <label className={styles.label}>运营</label> */}
                {/* <label className={styles.label}>业务</label> */}
                {/* <label className={styles.label}>工单</label> */}
              </Flex>
              <h4 className={styles.title}>注册量</h4>
              <Flex
                justify='space-between'
                align='center'
              >
                <Flex
                  align='center'
                  gap={'60px'}
                >
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>昨日</label>
                    <span>{rigisterInfo?.yesterday}</span>
                  </Flex>
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>本月</label>
                    <span>{rigisterInfo?.month}</span>
                  </Flex>
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>本年</label>
                    <span>{rigisterInfo?.year}</span>
                  </Flex>
                </Flex>
                <Flex
                  align='center'
                  gap={'24px'}
                >
                  <Button
                    type={rigisterType == 'month' ? 'primary' : 'default'}
                    onClick={()=>{setRigisterType('month')}}
                  >
                    本月
                  </Button>
                  <Button
                    type={rigisterType == 'year' ? 'primary' : 'default'}
                    onClick={()=>{setRigisterType('year')}}
                  >
                    本年
                  </Button>
                </Flex>
              </Flex>
              <ChartLine
                id={'rigister-chart'}
                data={rigisterInfo?.list || []}
              />
            </Col>
          </Row>
        </Card>
        <Card>
          <Flex
            align='center'
            justify='space-between'
            style={{
              marginBottom: '16px'
            }}
          >
            <h4 className={styles.subtitle}>系统公告</h4>
            <Flex
              align='center'
              gap={'8px'}
              style={{
                color: '#4081FF',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer'
              }}
            >
              查看全部
              <img
                src={Arrow}
                className={styles.arrow}
              />
            </Flex>
          </Flex>
          <Row gutter={16}>
            {
              noticeList && noticeList.map(item =>
                <Col 
                  span={8}
                  key={item.id}
                  style={{
                    background: '#F9FBFE'
                  }}
                >
                  <Flex
                    align='center'
                    justify='space-between'
                    style={{
                      marginBottom: '16px'
                    }}
                  >
                    <label className={styles.label}>{item?.type}</label>
                    <span>{item?.publishTime}</span>
                  </Flex>
                  <Flex
                    align='center'
                    justify='space-between'
                  >
                    <Flex
                      flex={1}
                    >
                      {item?.title}
                    </Flex>
                    <Flex
                      align='center'
                    >
                      <Button
                        type='primary'
                      >
                        编辑
                      </Button>
                      <Button
                        type='danger'
                      >
                        删除
                      </Button>
                    </Flex>
                  </Flex>
                </Col>
              )
            }
          </Row>
        </Card>
      </Space>
    </PageContainer>
  );
};

export default HomePage;
