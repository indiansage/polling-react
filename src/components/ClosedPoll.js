import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as actions from '../actions/pollActions';

class ClosedPoll extends Component {
    constructor(props) {
        super(props);
        //this.state = { counter: 0 };
        //this.handleClick = this.handleClick.bind(this);
    }

    // componentDidMount() {
    //     this.props.getVotes(this.props.poll.id);
    //     //console.log(actions.pollActions.getVotes());
    // }

    render() {
        const { poll } = this.props;
        //poll object -> {qid,question,options:[{option,votes},{option,votes},...]}
        const pieChartData = poll.options.map((option) => {
            return {
                name: option.option,
                value: option.votes
            };
        });
        return (
            <div className="box">
                {}
                <ReactEcharts
                    option={{
                        title: {
                            text: poll.question,
                            //subtext: 'Topics minus APIs',
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
    }
}

const mapDispatchToProps = (dispatch) => {
    return { getVotes: (args) => dispatch(actions.pollActions.getVotes(args)) };
};
//bindActionCreators({ ...actions }, dispatch);
const mapStateToProps = (state) => {
    return {
        //a:state.a -> use as this.props.a
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(ClosedPoll);
