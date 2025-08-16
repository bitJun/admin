import React from 'react';
import OperationChart, { ChartData } from './index';

// 示例数据
const lineData: ChartData[] = [
  { name: '1月', value: 120 },
  { name: '2月', value: 132 },
  { name: '3月', value: 101 },
  { name: '4月', value: 134 },
  { name: '5月', value: 90 },
  { name: '6月', value: 230 },
  { name: '7月', value: 210 },
];

const barData: ChartData[] = [
  { name: '访问量', value: 2340 },
  { name: '注册量', value: 1398 },
  { name: '订单量', value: 9821 },
  { name: '销售额', value: 1943 },
  { name: '活跃用户', value: 2323 },
];

const pieData: ChartData[] = [
  { name: '直接访问', value: 335 },
  { name: '邮件营销', value: 310 },
  { name: '联盟广告', value: 234 },
  { name: '视频广告', value: 135 },
  { name: '搜索引擎', value: 1548 },
];

const OperationChartDemo: React.FC = () => {
  const handleChartClick = (params: any) => {
    console.log('图表点击事件:', params);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>运营图表组件示例</h2>
      
      {/* 折线图示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>折线图 - 月度趋势</h3>
        <OperationChart
          type="line"
          data={lineData}
          title="月度数据趋势"
          subtitle="2024年数据统计"
          height={300}
          xAxisLabel="月份"
          yAxisLabel="数量"
          onChartClick={handleChartClick}
        />
      </div>

      {/* 面积图示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>面积图 - 月度趋势</h3>
        <OperationChart
          type="area"
          data={lineData}
          title="月度数据面积图"
          height={300}
          colors={['#91cc75']}
        />
      </div>

      {/* 柱状图示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>柱状图 - 运营指标</h3>
        <OperationChart
          type="bar"
          data={barData}
          title="运营关键指标"
          subtitle="本月数据概览"
          height={300}
          xAxisLabel="指标类型"
          yAxisLabel="数值"
          colors={['#5470c6']}
        />
      </div>

      {/* 饼图示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>饼图 - 流量来源</h3>
        <OperationChart
          type="pie"
          data={pieData}
          title="流量来源分析"
          subtitle="用户访问渠道统计"
          height={400}
          onChartClick={handleChartClick}
        />
      </div>

      {/* 自定义配置示例 */}
      <div style={{ marginBottom: '40px' }}>
        <h3>自定义配置示例</h3>
        <OperationChart
          type="bar"
          data={barData}
          title="自定义样式图表"
          height={300}
          showLegend={false}
          customOption={{
            backgroundColor: '#f5f5f5',
            grid: {
              left: '10%',
              right: '10%',
              top: '20%',
              bottom: '10%',
            },
            series: [{
              type: 'bar',
              data: barData.map(item => item.value),
              itemStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                  ],
                },
                borderRadius: [8, 8, 0, 0],
              },
            }],
          }}
        />
      </div>
    </div>
  );
};

export default OperationChartDemo;