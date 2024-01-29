import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/index.js';

import '@testing-library/jest-dom';

describe('testing start stage in Home', () => {
    test('start stage should render start button', () => {
        render(<Home />);
        const startButton = screen.getByText('START');
        expect(startButton).toBeInTheDocument();
    });

    test('clicking start button should start game', () => {
        render(<Home />);
        const startButton = screen.getByText('START');
        fireEvent.click(startButton);
        expect(startButton).not.toBeInTheDocument();
    })
});