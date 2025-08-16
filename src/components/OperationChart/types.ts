import { EChartsOption } from 'echarts';

/**
 * 图表数据项接口
 */
export interface ChartData {
  /** 数据项名称 */
  name: string;
  /** 数据项值 */
  value: number;
  /** 其他自定义属性 */
  [key: string]: any;
}

/**
 * 图表类型
 */
export type ChartType = 'line' | 'bar' | 'pie' | 'area';

/**
 * 主题类型
 */
export type ThemeType = 'default' | 'business' | 'fresh' | 'dark';

/**
 * 数值格式化类型
 */
export type ValueFormatType = 'number' | 'percentage' | 'currency' | 'compact';

/**
 * 排序方式
 */
export type SortOrder = 'asc' | 'desc';

/**
 * 运营图表组件属性接口
 */
export interface OperationChartProps {
  /** 图表类型 */
  type: ChartType;
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
  /** 主题名称 */
  theme?: ThemeType;
  /** 自定义配置 */
  customOption?: Partial<EChartsOption>;
  /** 点击事件 */
  onChartClick?: (params: any) => void;
  /** 鼠标悬停事件 */
  onChartHover?: (params: any) => void;
  /** 图表渲染完成事件 */
  onChartReady?: (chart: any) => void;
}

/**
 * 数据转换配置接口
 */
export interface DataTransformConfig {
  /** 名称字段key */
  nameKey?: string;
  /** 值字段key */
  valueKey?: string;
  /** 排序方式 */
  sortOrder?: SortOrder;
  /** 只保留前N项 */
  topN?: number;
  /** 聚合阈值 */
  aggregateThreshold?: number;
  /** "其他"项标签 */
  otherLabel?: string;
}

/**
 * 响应式断点配置接口
 */
export interface ResponsiveBreakpoints {
  /** 移动端配置 (<768px) */
  mobile?: Partial<EChartsOption>;
  /** 平板端配置 (768px-1024px) */
  tablet?: Partial<EChartsOption>;
  /** 桌面端配置 (>1024px) */
  desktop?: Partial<EChartsOption>;
}

/**
 * 图表事件参数接口
 */
export interface ChartEventParams {
  /** 组件类型 */
  componentType: string;
  /** 系列类型 */
  seriesType?: string;
  /** 系列索引 */
  seriesIndex?: number;
  /** 系列名称 */
  seriesName?: string;
  /** 数据名称 */
  name?: string;
  /** 数据索引 */
  dataIndex?: number;
  /** 数据值 */
  data?: any;
  /** 数据类型 */
  dataType?: string;
  /** 值 */
  value?: number | number[];
  /** 颜色 */
  color?: string;
}

/**
 * 时间序列数据生成配置接口
 */
export interface TimeSeriesConfig {
  /** 开始日期 */
  startDate: Date;
  /** 天数 */
  days: number;
  /** 值生成函数 */
  valueGenerator: (index: number) => number;
  /** 日期格式化函数 */
  dateFormatter?: (date: Date) => string;
}

/**
 * 模拟数据生成配置接口
 */
export interface MockDataConfig {
  /** 数据项数量 */
  count: number;
  /** 名称前缀 */
  namePrefix?: string;
  /** 值范围 */
  valueRange?: [number, number];
  /** 名称生成函数 */
  nameGenerator?: (index: number) => string;
}

/**
 * 图表配置预设接口
 */
export interface ChartPreset {
  /** 预设名称 */
  name: string;
  /** 预设描述 */
  description: string;
  /** 图表类型 */
  type: ChartType;
  /** 默认配置 */
  defaultOption: Partial<EChartsOption>;
  /** 适用场景 */
  scenarios: string[];
}

/**
 * 数据统计信息接口
 */
export interface DataStatistics {
  /** 总数 */
  total: number;
  /** 平均值 */
  average: number;
  /** 最大值 */
  max: number;
  /** 最小值 */
  min: number;
  /** 中位数 */
  median: number;
  /** 标准差 */
  standardDeviation: number;
}

/**
 * 图表导出配置接口
 */
export interface ExportConfig {
  /** 导出格式 */
  format: 'png' | 'jpg' | 'svg' | 'pdf';
  /** 图片质量 (0-1) */
  quality?: number;
  /** 背景色 */
  backgroundColor?: string;
  /** 像素比 */
  pixelRatio?: number;
  /** 文件名 */
  filename?: string;
}

/**
 * 动画配置接口
 */
export interface AnimationConfig {
  /** 是否开启动画 */
  enabled: boolean;
  /** 动画时长 */
  duration?: number;
  /** 动画缓动函数 */
  easing?: string;
  /** 动画延迟 */
  delay?: number;
  /** 分阶段动画延迟 */
  animationDelayUpdate?: number;
}