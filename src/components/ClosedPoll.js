import React from 'react';
import PieChart from './PieChart';

const ClosedPoll = ({ poll }) => {
    const pieChartData = [];

    Object.keys(poll.options).forEach((key) => {
        pieChartData.push({ name: key, value: poll.options[key] });
    });
    return (
        <div className="box" data-testid="PieChart">
            <PieChart title={poll.question} data={pieChartData} />
        </div>
    );
};

export default ClosedPoll;
