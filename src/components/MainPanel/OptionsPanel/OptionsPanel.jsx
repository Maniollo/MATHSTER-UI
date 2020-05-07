import React from 'react'
import {Checkbox} from "./Checkbox/Checkbox";
import {checkboxes} from "./checkboxes";

export const OptionsPanel = (props) => {
    return <div className={"App-operation-panel"}>
        {checkboxes.map(item => (
            <label key={item.key}>
                {item.label}
                <Checkbox name={item.name} onChange={props.onClick} checked={props.checked.get(item.name)}/>
            </label>
        ))}
        <input type="text" pattern="[0-9]*"
               onChange={props.onChange}
               value={props.value}
        />
        <button onClick={props.apply}>Apply</button>
    </div>
}