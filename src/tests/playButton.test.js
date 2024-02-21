import React from "react";

import PlayButton from "components/PlayButton/PlayButton.js";

import '@testing-library/jest-dom'
import { describe, test, expect, jest } from '@jest/globals';

import { fireEvent, render } from '@testing-library/react';

describe('testing PlayButton', () => {

    test('PlayButton should function without id', () => {
        let mockFunc = jest.fn();
        render(
            <div id='test-ele'>
                <PlayButton text={"Hello"} onClick={mockFunc}/>
            </div>
        );
        const guessElement = document.getElementById('test-ele').children[0];
        expect(guessElement).toBeInTheDocument();
        fireEvent.click(guessElement);
        expect(mockFunc).toHaveBeenCalled();
    });
});