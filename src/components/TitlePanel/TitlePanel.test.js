import React from "react";
import renderer from 'react-test-renderer';
import {TitlePanel} from "./TitlePanel";

test('renders correctly', () => {
    const panel = renderer.create(<TitlePanel/>).toJSON();
    expect(panel).toMatchSnapshot();
})