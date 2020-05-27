import React from "react";
import renderer from 'react-test-renderer';
import {SessionStats} from "./SessionStats";

test('renders correctly', () => {
    const panel = renderer.create(<SessionStats noOfAll={24} noOfCorrect={6} noOfIncorrect={18}/>).toJSON();
    expect(panel).toMatchSnapshot();
})