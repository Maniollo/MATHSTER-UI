import React from 'react';

export const Checkbox = ({name, checked = false, onChange }) => (
    <input type={'checkbox'} name={name} checked={checked} onChange={onChange} />
);