import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Chart } from '@antv/g2';
import {
  queryOperations,
  queryOperationsMonth,
  queryOperationsYear,
  queryOperationsMonthRegisters,
  queryOperationsYearRegisters,
  queryOperationsMonthVips,
  queryOperationsYearVips,
  queryOperationsMonthIncome,
  queryOperationsYearIncome,
} from '@/services/api';
import {
  Flex,
  Col,
  Row,
  Card,
  Space,
  Button
} from 'antd';
import ChartLine from '@/components/Chart';
import ChartLines from '@/components/Charts';
import OperationChart, { ChartData } from '@/components/OperationChart';
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
  const [type, setType] = useState<string>('month');
  const [incomeType, setIncomeType] = useState<string>('month');
  const [rigisterType, setRigisterType] = useState<string>('month');
  const [operationsInfo, setOperationsInfo] = useState<any>({});
  const [operationsList, setOperationsList] = useState<any>([]);
  const [rigisterList, setRigisterList] = useState<any>([]);
  const [vipsList, setVipsList] = useState<any>([]);
  const [types, setTypes] = useState('register');
  const [incomeList, setIncomeList] = useState<any>([]);

  useEffect(()=>{
    onLoadOperations();
  }, []);

  useEffect(()=>{
    if (type == 'month') {
      onLoadOperationsMonth();
    } else {
      onLoadOperationsYear();
    }
  }, [type]);

  useEffect(()=>{
    if (types == 'register') {
      if (rigisterType == 'month') {
        onLoadOperationsMonthRegisters();
      } else {
        onLoadOperationsYearRegisters();
      }
    } else {
      if (rigisterType == 'month') {
        onLoadOperationsMonthVips();
      } else {
        onLoadOperationsYearVips();
      }
    }
  }, [types ,rigisterType]);

  useEffect(()=>{
    if (incomeType == 'month') {
      onLoadOperationsMonthIncome();
    } else {
      onLoadOperationsYearIncome();
    }
  }, [incomeType]);

  const onLoadOperations = () => {
    queryOperations()
      .then((res) => {
        setOperationsInfo(res);
      });
  }

  const onLoadOperationsMonth = () => {
    queryOperationsMonth()
      .then((res) => {
        if (res) {
          res = res.map((item:any)=>{
            item.name = item.date;
            item.value = item.compareValue;
            return item;
          })
          setOperationsList(res);
        }
      });
  }

  const onLoadOperationsYear = () => {
    queryOperationsYear()
      .then((res) => {
        if (res) {
          res = res.map((item:any)=>{
            item.name = item.date;
            item.value = item.compareValue;
            return item;
          })
          setOperationsList(res);
        }
      });
  }

  const onLoadOperationsMonthRegisters = () => {
    queryOperationsMonthRegisters()
      .then((res) => {
        if(res) {
          res = res.map((item:any)=>{
            item.name = item.date;
            item.value = item.compareValue;
            return item;
          })
          setRigisterList(res);
        }
      });
  }

  const onLoadOperationsYearRegisters = () => {
    queryOperationsYearRegisters()
      .then((res) => {
        if(res) {
          res = res.map((item:any)=>{
            item.name = item.date;
            item.value = item.compareValue;
            return item;
          })
          setRigisterList(res);
        }
      });
  }

  const onLoadOperationsMonthVips = () => {
    queryOperationsMonthVips()
      .then((res) => {
        if(res) {
          res = res.map((item:any)=>{
            item.name = item.date;
            item.value = item.compareValue;
            return item;
          })
          setVipsList(res);
        }
      });
  }

  const onLoadOperationsYearVips = () => {
    queryOperationsYearVips()
      .then((res) => {
        if(res) {
          res = res.map((item:any)=>{
            item.name = item.date;
            item.value = item.compareValue;
            return item;
          })
          setVipsList(res);
        }
      });
  }

  const onLoadOperationsMonthIncome = () => {
    queryOperationsMonthIncome()
      .then((res) => {
        if (res) {
          console.log('res', res);
          res = res.map((item:any)=>{
            item.name = item.date;
            item.value = item.compareValue;
            return item;
          })
          setIncomeList(res);
        }
      });
  }

  const onLoadOperationsYearIncome = () => {
    queryOperationsYearIncome()
      .then((res) => {
        if (res) {
          setIncomeList(res);
        }
      });
  }

  const handleChartClick = (params: any) => {
    console.log('图表点击事件:', params);
  };

  return (
    <PageContainer ghost>
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <Row gutter={16}>
          <Col className="gutter-row" span={12}>
            <Card>
              <Flex
                align='center'
                gap={'12px'}
              >
                <label className={styles.label}>运营</label>
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
                    <span>{operationsInfo?.lastDayActiveUsers}</span>
                  </Flex>
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>本月</label>
                    <span>{operationsInfo?.thisMonthActiveUsers}</span>
                  </Flex>
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>本年</label>
                    <span>{operationsInfo?.thisYearActiveUsers}</span>
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
              <OperationChart
                type="line"
                data={operationsList}
                title=""
                subtitle=""
                height={300}
                xAxisLabel="日期"
                yAxisLabel="访问数"
                onChartClick={handleChartClick}
              />
            </Card>
          </Col>
          <Col className="gutter-row" span={12}>
            <Card>
              <Flex
                align='center'
                gap={'12px'}
              >
                <label className={`${styles.label} ${types == 'register' ? `${styles.active}` : ''}`} onClick={()=>{setTypes('register')}}>注册用户</label>
                <label className={`${styles.label} ${types == 'vips' ? `${styles.active}` : ''}`} onClick={()=>{setTypes('vips')}}>VIP用户</label>
              </Flex>
              <h4 className={styles.title}>
                {types == 'register' ? '注册量' : 'VIP量'}
              </h4>
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
                    <span>{types == 'register' ? operationsInfo?.lastDayNewUsers : operationsInfo?.lastDayNewVips}</span>
                  </Flex>
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>本月</label>
                    <span>{types == 'register' ? operationsInfo?.thisMonthNewUsers : operationsInfo?.thisMonthNewVips}</span>
                  </Flex>
                  <Flex
                    vertical={true}
                    gap={'12px'}
                  >
                    <label className={styles.label}>本年</label>
                    <span>{types == 'register' ? operationsInfo?.thisYearNewUsers : operationsInfo?.thisYearNewVips}</span>
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
              <OperationChart
                type="line"
                data={types == 'register' ? rigisterList : vipsList}
                title=""
                subtitle=""
                height={300}
                xAxisLabel="日期"
                yAxisLabel="访问数"
                onChartClick={handleChartClick}
              />
            </Card>
          </Col>
        </Row>
        <Card>
          <Flex
            align='center'
            gap={'12px'}
          >
            <label className={styles.label}>财务</label>
          </Flex>
          <h4 className={styles.title}>营收</h4>
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
                <label className={styles.label}>收入总计</label>
                <span>{operationsInfo?.totalIncome}</span>
              </Flex>
              <Flex
                vertical={true}
                gap={'12px'}
              >
                <label className={styles.label}>普通VIP</label>
                <span>{incomeType == 'month' ? operationsInfo?.thisMonthNormalVipIncome : operationsInfo?.thisYearNormalVipIncome}</span>
              </Flex>
              <Flex
                vertical={true}
                gap={'12px'}
              >
                <label className={styles.label}>超级VIP</label>
                <span>{incomeType == 'month' ? operationsInfo?.thisMonthSuperVipIncome : operationsInfo?.thisYearSuperVipIncome}</span>
              </Flex>
            </Flex>
            <Flex
              align='center'
              gap={'24px'}
            >
              <Button
                type={incomeType == 'month' ? 'primary' : 'default'}
                onClick={()=>{setIncomeType('month')}}
              >
                本月
              </Button>
              <Button
                type={incomeType == 'year' ? 'primary' : 'default'}
                onClick={()=>{setIncomeType('year')}}
              >
                本年
              </Button>
            </Flex>
          </Flex>
          <OperationChart
            type="line"
            data={incomeList}
            title=""
            subtitle=""
            height={300}
            xAxisLabel="日期"
            yAxisLabel="钱"
            onChartClick={handleChartClick}
          />
        </Card>
      </Space>
    </PageContainer>
  );
};

export default HomePage;
