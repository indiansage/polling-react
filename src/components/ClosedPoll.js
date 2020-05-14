import React from 'react';
import ReactEcharts from 'echarts-for-react';

const ClosedPoll = ({ poll }) => {
    //poll object -> {qid,question,options:{{[option]:votes},{[option]:votes},...}}
    console.log('poll', poll);

    const pieChartData = [];

    Object.keys(poll.options).forEach((key) => {
        pieChartData.push({ name: key, value: poll.options[key] });
    });

    // poll.options.forEach((option, index) => {
    //     const name = Object.keys(option)[0];
    //     const value = option[name];
    //     pieChartData.push({ name, value });
    // });
    const sampleChartData = [
        { value: 7, name: 'Machine Learning' },
        { value: 63, name: 'Fraud / Security' },
        { value: 30, name: 'Marketing' },
        { value: 29, name: 'Data / Analytics' },
        { value: 28, name: 'Health Tech' },
        { value: 17, name: 'IoT / Mfg' },
        { value: 14, name: 'Chatbots / VAs' }
    ];

    console.log('sampleChartData', sampleChartData);
    console.log('pieChartData', pieChartData);
    return (
        <div className="box">
            <ReactEcharts
                option={{
                    title: {
                        text: poll.question,
                        //subtext: '',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            saveAsImage: { show: true }
                        }
                    },
                    series: [
                        {
                            name: poll.question,
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: pieChartData,
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
        </div>
    );
};

export default ClosedPoll;
