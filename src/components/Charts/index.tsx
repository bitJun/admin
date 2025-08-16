import ReactECharts from 'echarts-for-react';
import { useEffect,  useState } from 'react';

export default function () {
  const [names, setNames] = useState([]);
  const [topCounts, setTopCounts] = useState([]);
  // 配置对象
  const getTopViewOption = () => ({
    title: {
      subtext: '成员读取次数',
    },
    tooltip: {},
    legend: {
      borderWidth: 1,
      borderColor: 'rgb(229, 231, 235)',
    },
    yAxis: {
      data: names,
    },
    grid: {
      left: 110,
    },
    xAxis: {},
    series: [
      {
        type: 'bar',
        data: topCounts,
      },
    ],
  });
  function transferListDataToChart(list) {
    const xArrays = [];
    const yArrays = [];
    list.forEach((item) => {
      xArrays.push(item.query_user);
      yArrays.push(item.count);
    });
    setNames(xArrays);
    setTopCounts(yArrays);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const mock = [
          {
            query_user: 'zhangsan',
            count: 7,
          },
          {
            query_user: 'lisi',
            count: 6,
          },
          {
            query_user: 'wangwu',
            count: 9,
          },
        ];
        transferListDataToChart(mock);
      } catch (err) {
        transferListDataToChart([]);
        console.log(err);
      }
    }
    fetchData();
  }, []);
  return (
    <div style={{ width: '100%' }}>
      <ReactECharts option={getTopViewOption()} />
    </div>
  );
}

