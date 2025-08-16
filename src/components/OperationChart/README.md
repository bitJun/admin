# OperationChart 运营图表组件

基于 ECharts 封装的运营数据可视化组件，支持多种图表类型，适用于运营数据展示场景。

## 特性

- 🎨 支持多种图表类型：折线图、柱状图、饼图、面积图
- 📊 内置运营场景常用配置
- 🎯 支持点击事件处理
- 🎪 支持自定义样式和配置
- 📱 响应式设计
- 🔧 TypeScript 支持

## 安装依赖

```bash
npm install echarts-for-react echarts
```

## 基础用法

```tsx
import OperationChart from '@/components/OperationChart';

const data = [
  { name: '1月', value: 120 },
  { name: '2月', value: 132 },
  { name: '3月', value: 101 },
];

<OperationChart
  type="line"
  data={data}
  title="月度趋势"
  height={300}
/>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 图表类型 | `'line' \| 'bar' \| 'pie' \| 'area'` | - | ✅ |
| data | 图表数据 | `ChartData[]` | - | ✅ |
| title | 图表标题 | `string` | - | ❌ |
| subtitle | 图表副标题 | `string` | - | ❌ |
| width | 图表宽度 | `string \| number` | `'100%'` | ❌ |
| height | 图表高度 | `string \| number` | `400` | ❌ |
| xAxisLabel | X轴标签 | `string` | - | ❌ |
| yAxisLabel | Y轴标签 | `string` | - | ❌ |
| showLegend | 是否显示图例 | `boolean` | `true` | ❌ |
| showTooltip | 是否显示工具提示 | `boolean` | `true` | ❌ |
| colors | 颜色主题 | `string[]` | 默认色板 | ❌ |
| customOption | 自定义ECharts配置 | `Partial<EChartsOption>` | `{}` | ❌ |
| onChartClick | 点击事件回调 | `(params: any) => void` | - | ❌ |

### ChartData

```tsx
interface ChartData {
  name: string;    // 数据项名称
  value: number;   // 数据项值
  [key: string]: any; // 其他自定义属性
}
```

## 图表类型

### 折线图 (line)

适用于展示数据随时间变化的趋势。

```tsx
<OperationChart
  type="line"
  data={data}
  title="用户增长趋势"
  xAxisLabel="时间"
  yAxisLabel="用户数"
/>
```

### 面积图 (area)

在折线图基础上填充面积，更直观地展示数据量级。

```tsx
<OperationChart
  type="area"
  data={data}
  title="收入趋势"
  colors={['#91cc75']}
/>
```

### 柱状图 (bar)

适用于展示不同类别数据的对比。

```tsx
<OperationChart
  type="bar"
  data={data}
  title="各渠道转化率"
  xAxisLabel="渠道"
  yAxisLabel="转化率(%)"
/>
```

### 饼图 (pie)

适用于展示数据的占比关系。

```tsx
<OperationChart
  type="pie"
  data={data}
  title="流量来源分布"
  height={400}
/>
```

## 高级用法

### 自定义样式

```tsx
<OperationChart
  type="bar"
  data={data}
  customOption={{
    backgroundColor: '#f5f5f5',
    series: [{
      itemStyle: {
        color: {
          type: 'linear',
          colorStops: [
            { offset: 0, color: '#83bff6' },
            { offset: 1, color: '#188df0' }
          ],
        },
      },
    }],
  }}
/>
```

### 事件处理

```tsx
const handleChartClick = (params: any) => {
  console.log('点击的数据:', params);
  // 处理点击事件，如跳转详情页
};

<OperationChart
  type="pie"
  data={data}
  onChartClick={handleChartClick}
/>
```

### 响应式配置

```tsx
<OperationChart
  type="line"
  data={data}
  width="100%"
  height={window.innerWidth < 768 ? 250 : 400}
/>
```

## 常见场景

### 运营大盘

```tsx
const operationData = [
  { name: 'PV', value: 12340 },
  { name: 'UV', value: 8932 },
  { name: '转化率', value: 23.5 },
  { name: '客单价', value: 156.8 },
];

<OperationChart
  type="bar"
  data={operationData}
  title="运营核心指标"
  subtitle="今日数据概览"
/>
```

### 趋势分析

```tsx
const trendData = [
  { name: '周一', value: 820 },
  { name: '周二', value: 932 },
  { name: '周三', value: 901 },
  { name: '周四', value: 934 },
  { name: '周五', value: 1290 },
  { name: '周六', value: 1330 },
  { name: '周日', value: 1320 },
];

<OperationChart
  type="area"
  data={trendData}
  title="本周活跃用户趋势"
  colors={['#5470c6']}
/>
```

## 注意事项

1. 确保数据格式正确，`name` 和 `value` 字段必须存在
2. 饼图建议数据项不超过 8 个，以保证可读性
3. 自定义配置会覆盖默认配置，请谨慎使用
4. 大数据量场景建议进行数据分页或聚合处理

## 更新日志

### v1.0.0
- 初始版本发布
- 支持折线图、柱状图、饼图、面积图
- 支持基础配置和自定义样式
- 支持点击事件处理