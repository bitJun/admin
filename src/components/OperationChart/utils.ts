import { ChartData } from './index';
import { EChartsOption } from 'echarts';

/**
 * 数据处理工具函数
 */

/**
 * 将API返回的数据转换为图表数据格式
 * @param data 原始数据
 * @param nameKey 名称字段key
 * @param valueKey 值字段key
 * @returns 转换后的图表数据
 */
export const transformToChartData = (
  data: any[],
  nameKey: string = 'name',
  valueKey: string = 'value'
): ChartData[] => {
  return data.map(item => ({
    name: item[nameKey],
    value: item[valueKey],
    ...item, // 保留其他字段
  }));
};

/**
 * 数据排序
 * @param data 图表数据
 * @param order 排序方式
 * @returns 排序后的数据
 */
export const sortChartData = (
  data: ChartData[],
  order: 'asc' | 'desc' = 'desc'
): ChartData[] => {
  return [...data].sort((a, b) => {
    return order === 'desc' ? b.value - a.value : a.value - b.value;
  });
};

/**
 * 数据过滤 - 只保留前N项
 * @param data 图表数据
 * @param count 保留数量
 * @returns 过滤后的数据
 */
export const topNData = (data: ChartData[], count: number): ChartData[] => {
  return data.slice(0, count);
};

/**
 * 数据聚合 - 将小数值项合并为"其他"
 * @param data 图表数据
 * @param threshold 阈值（小于此值的项会被合并）
 * @param otherLabel "其他"项的标签
 * @returns 聚合后的数据
 */
export const aggregateSmallValues = (
  data: ChartData[],
  threshold: number,
  otherLabel: string = '其他'
): ChartData[] => {
  const result: ChartData[] = [];
  let otherValue = 0;

  data.forEach(item => {
    if (item.value >= threshold) {
      result.push(item);
    } else {
      otherValue += item.value;
    }
  });

  if (otherValue > 0) {
    result.push({ name: otherLabel, value: otherValue });
  }

  return result;
};

/**
 * 计算百分比
 * @param data 图表数据
 * @returns 包含百分比的数据
 */
export const calculatePercentage = (data: ChartData[]): (ChartData & { percentage: number })[] => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return data.map(item => ({
    ...item,
    percentage: Number(((item.value / total) * 100).toFixed(2)),
  }));
};

/**
 * 格式化数值
 * @param value 数值
 * @param type 格式化类型
 * @returns 格式化后的字符串
 */
export const formatValue = (
  value: number,
  type: 'number' | 'percentage' | 'currency' | 'compact' = 'number'
): string => {
  switch (type) {
    case 'percentage':
      return `${value}%`;
    case 'currency':
      return `¥${value.toLocaleString()}`;
    case 'compact':
      if (value >= 10000) {
        return `${(value / 10000).toFixed(1)}万`;
      }
      if (value >= 1000) {
        return `${(value / 1000).toFixed(1)}k`;
      }
      return value.toString();
    default:
      return value.toLocaleString();
  }
};

/**
 * 预设主题配置
 */
export const themes = {
  // 默认主题
  default: {
    colors: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  },
  // 商务主题
  business: {
    colors: ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22'],
  },
  // 清新主题
  fresh: {
    colors: ['#26deca', '#fedc56', '#ff9f7f', '#fb7293', '#e7bcf3', '#9c88ff', '#fbb1aa', '#7ec2f3', '#c6e48b'],
  },
  // 深色主题
  dark: {
    colors: ['#dd6b66', '#759aa0', '#e69d87', '#8dc1a9', '#ea7e53', '#eedd78', '#73a373', '#73b9bc', '#7289ab'],
    backgroundColor: '#1e1e1e',
    textStyle: {
      color: '#ffffff',
    },
  },
};

/**
 * 获取主题配置
 * @param themeName 主题名称
 * @returns 主题配置
 */
export const getTheme = (themeName: keyof typeof themes): Partial<EChartsOption> => {
  return themes[themeName] || themes.default;
};

/**
 * 生成时间序列数据
 * @param startDate 开始日期
 * @param days 天数
 * @param valueGenerator 值生成函数
 * @returns 时间序列数据
 */
export const generateTimeSeriesData = (
  startDate: Date,
  days: number,
  valueGenerator: (index: number) => number
): ChartData[] => {
  const data: ChartData[] = [];
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    data.push({
      name: date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }),
      value: valueGenerator(i),
    });
  }
  
  return data;
};

/**
 * 生成模拟数据
 * @param count 数据项数量
 * @param namePrefix 名称前缀
 * @param valueRange 值范围
 * @returns 模拟数据
 */
export const generateMockData = (
  count: number,
  namePrefix: string = '项目',
  valueRange: [number, number] = [0, 100]
): ChartData[] => {
  const data: ChartData[] = [];
  const [min, max] = valueRange;
  
  for (let i = 1; i <= count; i++) {
    data.push({
      name: `${namePrefix}${i}`,
      value: Math.floor(Math.random() * (max - min + 1)) + min,
    });
  }
  
  return data;
};

/**
 * 响应式配置生成器
 * @param breakpoints 断点配置
 * @returns 响应式配置
 */
export const createResponsiveOption = (breakpoints: {
  mobile?: Partial<EChartsOption>;
  tablet?: Partial<EChartsOption>;
  desktop?: Partial<EChartsOption>;
}): Partial<EChartsOption> => {
  const width = window.innerWidth;
  
  if (width < 768 && breakpoints.mobile) {
    return breakpoints.mobile;
  }
  
  if (width < 1024 && breakpoints.tablet) {
    return breakpoints.tablet;
  }
  
  return breakpoints.desktop || {};
};