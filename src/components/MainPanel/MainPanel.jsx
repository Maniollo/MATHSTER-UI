import React, {Component} from 'react'
import {OperationQuiz} from "./OperationQuiz/OperationQuiz";
import {SERVER_URL} from "../../constants";
import {LoadingPage} from "./LoadingPage/LoadingPage";
import {ErrorPage} from "./ErrorPage/ErrorPage";
import {OptionsPanel} from "./OptionsPanel/OptionsPanel";

class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            result: '',
            operation: null,
            range: 20,
            selectedOperations: ['ADDITION'],
            isAnswerCorrect: null,
            wasAnswered: false,
            checkedItems: new Map([['ADDITION',true], ['SUBTRACTION', false]]),
            tempRange: 20
        }
    }

    componentDidMount() {
        this.callFactors(this.state.selectedOperations, this.state.range);
    }

    callFactors(operations, range) {

        console.log("Call parameters: ", operations.join() + " " + range)
        let url = SERVER_URL + '/operation?operationTypes=' + operations.join() + '&range=' + range;
        fetch(url, {mode: "cors", headers: {'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then((result) => {
                    this.setState({
                        isLoaded: true,
                        operation: result
                    })
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handleChange = (e) => {
        this.setState({
            result: parseInt(e.target.value, 10)
        })
    }

    handleEnter = (event) => {
        if (event.key === 'Enter') {
            this.verifyAttempt(parseInt(event.target.value, 10))
        }
    }


    verifyAttempt = (value) => {
        const req = {
            operationFactors: this.state.operation,
            result: value,
            correct: false
        }

        let url = SERVER_URL + '/results';
        fetch(url, {
            method: 'post', headers: {'Content-Type': 'application/json',}, body: JSON.stringify(req)
        })
            .then(res => res.json())
            .then(res => {
                if (res.correct) {
                    this.callFactors(this.state.selectedOperations, this.state.range);
                    this.setState({
                            result: '',
                            isAnswerCorrect: true,
                            wasAnswered: true
                        }
                    )
                } else {
                    this.setState({
                            result: '',
                            isAnswerCorrect: false,
                            wasAnswered: true
                        }
                    )
                }
            })
    }

    handleOperationsUpdate = (event) =>{
        const item = event.target.name;
        const isChecked = event.target.checked;
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
    }

    updateRange = (e) => {
        console.log("Update range", e.target.value)
        this.setState({
            tempRange: parseInt(e.target.value, 10)
        })
    }

    applyOptions = () => {
        console.log("Apply filters")
        let options = []
        const actual = this.state.selectedOperations
        const actualRange = this.state.range

        for (const [key, value] of this.state.checkedItems.entries()) {
            if (value) {
                options.push(key)
            }
        }

        var is_same = (options.length === actual.length) && options.every(function(element, index) {
            return element === actual[index];
        });

        if (options.length === 0 || this.state.tempRange <= 0) {
            console.log("Invalid options!");
        } else if(!is_same || actualRange !== this.state.tempRange){
            this.setState({
                selectedOperations: options,
                range: this.state.tempRange
            });
            this.callFactors(options, this.state.tempRange);
        }
    }

    render() {
        const {error, isLoaded, result, operation, isAnswerCorrect, wasAnswered, checkedItems, tempRange} = this.state;

        return (
            <div className={"App-main-panel"}>
                {error && <ErrorPage/>}
                {!error && !isLoaded && <LoadingPage/>}
                {!error && isLoaded && <OptionsPanel onClick={this.handleOperationsUpdate} checked={checkedItems} apply={this.applyOptions} value ={tempRange} onChange={this.updateRange}/>}
                {!error && isLoaded && <OperationQuiz operation={operation}
                                                      onChange={this.handleChange}
                                                      onKeyDown={this.handleEnter}
                                                      value={result}
                                                      isAnswerCorrect={isAnswerCorrect}
                                                      wasAnswered={wasAnswered}/>}



            </div>
        )
    }
}

export default MainPanel;