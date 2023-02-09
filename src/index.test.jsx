import { getByLabelText, getByTestId, getByText, render } from "@testing-library/react";
import React from "react";
import SkiResort from './index';

test('renders form properly', () => {
    // const {getByLabelText} = render(<SkiResort/>)

    const nameLabel = getByText(/Name/i)

    const locLabel = getByText(/Location/i)

    const runsLabel = getByText(/Runs/i)

    expect(nameLabel).toBeInTheDocument()
    expect(locLabel).toBeInTheDocument()
    expect(runsLabel).toBeInTheDocument()

    const input = getByLabelText(/Runs/)
    expect(input).toHaveAttribute('type','number');
})

// test('btn', () =>{

// })