import React from 'react';
import ReactEcharts from 'echarts-for-react';

export default function PieChart({ title, data }) {
    return (
        <ReactEcharts
            option={{
                title: {
                    text: title,
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: title,
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 0,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0)'
                            }
                        }
                    }
                ]
            }}
        />
    );
}
