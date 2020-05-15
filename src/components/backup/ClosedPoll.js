import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import { connect } from 'react-redux';
//import { bindActionCreators } from 'redux';

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
    componentDidMount() {
        const { poll } = this.props;
        //poll object -> {qid,question,options:{{[option]:votes},{[option]:votes},...}}
        //console.log('poll', poll);

        const pieChartData = [];
        poll.options.forEach((option, index) => {
            const name = Object.keys(option)[0];
            const value = option[name];
            pieChartData.push({ name, value });
        });
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
    }
    render() {}
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
