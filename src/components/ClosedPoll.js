import React from 'react';
import PieChart from './PieChart';

const ClosedPoll = ({ poll }) => {
    const pieChartData = [];

    Object.keys(poll.options).forEach((key) => {
        console.log(key, poll.options[key]);

        pieChartData.push({ name: key, value: poll.options[key] });
    });
    return (
        <div className="box">
            <PieChart title={poll.question} data={pieChartData} />
        </div>
    );
};

export default ClosedPoll;
