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
    it('Loads Alerts Component(may not be visible in UI)', () => {
        const { getByTestId } = render(<App />);
        expect(getByTestId('Alerts')).toBeInTheDocument();
    });
});
