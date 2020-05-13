import React from 'react';
import { render } from '@testing-library/react';

import App from './App';

//it.only -> isolate test
//it.skip -> skip test

describe('<App/>', () => {
    it('Renders without crashing', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('App')).toBeInTheDocument();
    });
    it('Shows Navigation Bar', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('NavBar')).toBeInTheDocument();
    });
    it('Shows Alerts', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('Alerts')).toBeInTheDocument();
    });
});
