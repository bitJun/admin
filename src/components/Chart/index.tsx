import React, { useEffect, useRef } from 'react';
import { Chart } from '@antv/g2';

interface ChartLineProps {
  id: string;
  data: Array<any>;
}

const ChartLine = (props:ChartLineProps) => {

  useEffect(()=>{
    const chart = new Chart({
      container: props.id,
      autoFit: true,
      height: 270,
    });
    
    chart
      .data(props.data)
      .encode('x', 'date')
      .encode('y', 'value')
      .encode('series', () => '访问量')
      // .encode('color', 'city')
      .scale('x', {
        range: [0, 1],
      })
      .scale('y', {
        domain: [0, 10],
        nice: true,
      })
      .axis('y', { labelFormatter: (d:any) => d + '人数' });
    chart.line().encode('shape', 'smooth');
    chart.point().encode('shape', 'point');
    chart.render();
    return () => {
      chart.destroy();
    };
  }, [props.data]);

  return (
    <div id={props.id}>

    </div>
  )
}

export default React.memo(ChartLine);