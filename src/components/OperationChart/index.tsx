import ReactECharts from 'echarts-for-react';
import React from 'react';
import { EChartsOption } from 'echarts';

export interface ChartData {
  name: string;
  value: number;
  [key: string]: any;
}

export interface OperationChartProps {
  /** 图表类型 */
  type: 'line' | 'bar' | 'pie' | 'area';
  /** 图表数据 */
  data: ChartData[];
  /** 图表标题 */
  title?: string;
  /** 图表副标题 */
  subtitle?: string;
  /** 图表宽度 */
  width?: string | number;
  /** 图表高度 */
  height?: string | number;
  /** X轴标签 */
  xAxisLabel?: string;
  /** Y轴标签 */
  yAxisLabel?: string;
  /** 是否显示图例 */
  showLegend?: boolean;
  /** 是否显示工具提示 */
  showTooltip?: boolean;
  /** 颜色主题 */
  colors?: string[];
  /** 自定义配置 */
  customOption?: Partial<EChartsOption>;
  /** 点击事件 */
  onChartClick?: (params: any) => void;
}

const OperationChart: React.FC<OperationChartProps> = ({
  type,
  data,
  title,
  subtitle,
  width = '100%',
  height = 400,
  xAxisLabel,
  yAxisLabel,
  showLegend = true,
  showTooltip = true,
  colors = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  customOption = {},
  onChartClick,
}) => {
  // 生成基础配置
  const getBaseOption = (): EChartsOption => {
    const baseOption: EChartsOption = {
      color: colors,
      title: {
        text: title,
        subtext: subtitle,
        left: 'center',
      },
      tooltip: showTooltip ? {
        trigger: type === 'pie' ? 'item' : 'axis',
        formatter: type === 'pie' 
          ? '{a} <br/>{b}: {c} ({d}%)'
          : '{b}: {c}',
      } : undefined,
      legend: showLegend ? {
        orient: type === 'pie' ? 'vertical' : 'horizontal',
        left: type === 'pie' ? 'left' : 'center',
        top: type === 'pie' ? 'center' : 'bottom',
      } : undefined,
      grid: type !== 'pie' ? {
        left: '3%',
        right: '4%',
        bottom: showLegend ? '15%' : '3%',
        containLabel: true,
      } : undefined,
    };

    return baseOption;
  };

  // 生成图表配置
  const getChartOption = (): EChartsOption => {
    const baseOption = getBaseOption();
    const names = data.map(item => item.name);
    const values = data.map(item => item.value);

    switch (type) {
      case 'line':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: names,
            name: xAxisLabel,
          },
          yAxis: {
            type: 'value',
            name: yAxisLabel,
          },
          series: [{
            type: 'line',
            data: values,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              width: 2,
            },
          }],
        };

      case 'area':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: names,
            name: xAxisLabel,
          },
          yAxis: {
            type: 'value',
            name: yAxisLabel,
          },
          series: [{
            type: 'line',
            data: values,
            smooth: true,
            areaStyle: {
              opacity: 0.3,
            },
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              width: 2,
            },
          }],
        };

      case 'bar':
        return {
          ...baseOption,
          xAxis: {
            type: 'category',
            data: names,
            name: xAxisLabel,
          },
          yAxis: {
            type: 'value',
            name: yAxisLabel,
          },
          series: [{
            type: 'bar',
            data: values,
            barWidth: '60%',
            itemStyle: {
              borderRadius: [4, 4, 0, 0],
            },
          }],
        };

      case 'pie':
        return {
          ...baseOption,
          series: [{
            type: 'pie',
            radius: ['40%', '70%'],
            center: ['50%', '50%'],
            data: data.map(item => ({
              name: item.name,
              value: item.value,
            })),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
            label: {
              show: true,
              formatter: '{b}: {c} ({d}%)',
            },
          }],
        };

      default:
        return baseOption;
    }
  };

  // 合并自定义配置
  const finalOption = {
    ...getChartOption(),
    ...customOption,
  };

  // 事件处理
  const onEvents = onChartClick ? {
    click: onChartClick,
  } : undefined;

  return (
    <div style={{ width, height }}>
      <ReactECharts
        option={finalOption}
        style={{ width: '100%', height: '100%' }}
        onEvents={onChartClick ? onEvents : undefined}
      />
    </div>
  );
};

export default OperationChart;