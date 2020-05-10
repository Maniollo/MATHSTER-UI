import React from 'react'
import {Checkbox} from "./Checkbox/Checkbox";
import {checkboxes} from "./checkboxes";

export class OptionsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOptions: new Map([['ADDITION',true], ['SUBTRACTION', false]]),
            range: 10,
            correctRange: true,
            correctSelection: true
        }
    }

    handleApplyButton = () => {
        const selectedOperations = [...(this.state.selectedOptions)]
            .filter(([k, v]) => v === true)
            .map(([k, v]) => k);

        const verificationResult = this.verifyOptions(selectedOperations, this.state.range);

        if (verificationResult.correctRange && verificationResult.correctOperations) {
            this.props.applyOptions(
                {
                    range: this.state.range,
                    operations: selectedOperations

                })
        }
        this.setState({
            correctRange: verificationResult.correctRange,
            correctSelection: verificationResult.correctOperations
        })
    };

    verifyOptions = (operations, range) => {
        let correctOperations = true;
        let correctRange = true;

        if (operations.length === 0) {
            correctOperations = false
        }

        if (range <= 0) {
            correctRange = false
        }

        return {
            correctRange: correctRange,
            correctOperations: correctOperations,
        }
    }

    handleCheckboxChange = (event) => {
        const item = event.target.name;
        const isChecked = event.target.checked;
        this.setState(prevState => ({selectedOptions: prevState.selectedOptions.set(item, isChecked)}));
    }

    handleRangeChange = (event) => {
        this.setState({
            range: event.target.value,
        })
    }

    render() {
        const {selectedOptions, range, correctRange, correctSelection} = this.state

        return <div className={"App-operation-panel"}>
            {checkboxes.map(item => (
                <label key={item.key}>
                    {item.label}
                    <Checkbox name={item.name}
                              onChange={this.handleCheckboxChange}
                              checked={selectedOptions.get(item.name)}
                    />
                </label>
            ))}
            <input type="text" pattern="[0-9]*"
                   onChange={this.handleRangeChange}
                   value={range}
            />
            <button onClick={this.handleApplyButton}>Apply</button>
            {!correctRange && <p><b>Incorrect setup: Range must be higher than 0.</b></p>}
            {!correctSelection && <p><b>Incorrect setup: At least one operation must be selected.</b></p>}
        </div>
    }

}