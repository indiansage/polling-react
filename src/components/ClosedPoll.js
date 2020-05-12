import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';

class ClosedPoll extends Component {
    constructor(props) {
        super(props);
        //this.state = { counter: 0 };
        //this.handleClick = this.handleClick.bind(this);
    }
    render() {
        const { poll } = this.props;
        console.log(poll);
        return (
            <div className="box">
                <ReactEcharts
                    option={{
                        title: {
                            text: poll.question,
                            subtext: 'Topics minus APIs',
                            x: 'center'
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: '{a} <br/>{b} : {c} ({d}%)'
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                saveAsImage: { show: true }
                            }
                        },
                        series: [
                            {
                                name: 'Topic',
                                type: 'pie',
                                radius: '55%',
                                center: ['50%', '60%'],
                                data: [
                                    { value: 78, name: 'Machine Learning' },
                                    { value: 63, name: 'Fraud / Security' },
                                    { value: 30, name: 'Marketing' },
                                    { value: 29, name: 'Data / Analytics' },
                                    { value: 28, name: 'Health Tech' },
                                    { value: 17, name: 'IoT / Mfg' },
                                    { value: 14, name: 'Chatbots / VAs' }
                                ],
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
    }
}
export default ClosedPoll;
