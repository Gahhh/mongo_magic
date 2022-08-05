import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';

const BarChart = () => {
    const option = {
        title: {
            text: 'Ratings',
            subtext: '',
            x: 'center',
            top: '10%'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            top:'20%',
            data: ['0-60', '60-70', '70-80', '80-90', '90-100']
        },
        avoidLabelOverlap: false,
        series: [
            {
                name: 'Sustainability Ratings',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['50%', '60%'],
                data: [
                    { value: 0, name: '0-60' },
                    { value: 4, name: '60-70' },
                    { value: 2, name: '70-80' },
                    { value: 3, name: '80-90' },
                    { value: 3, name: '90-100' }
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
            }
        ]
    };

    const [count, setCount] = useState(0);

    function onChartReady(echarts) {
        console.log('echarts is ready', echarts);
    }

    function onChartClick(param, echarts) {
        console.log(param, echarts);
        setCount(count + 1);
    };

    function onChartLegendselectchanged(param, echarts) {
        console.log(param, echarts);
    };

    return (
        <>
            <ReactECharts
                option={option}
                style={{ height: '500px', width: '400px' }}
                onChartReady={onChartReady}
                // onEvents={{
                //     'click': onChartClick,
                //     'legendselectchanged': onChartLegendselectchanged
                // }}
            />

        </>
    );
};

export default BarChart