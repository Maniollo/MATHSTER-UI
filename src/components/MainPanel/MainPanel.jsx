import React, {Component} from 'react'
import {OperationQuiz} from "./OperationQuiz/OperationQuiz";
import {SERVER_URL} from "../../constants";
import {LoadingPage} from "./LoadingPage/LoadingPage";
import {ErrorPage} from "./ErrorPage/ErrorPage";
import {OptionsPanel} from "./OptionsPanel/OptionsPanel";
import {CurrentSessionStatsPanel} from "./CurrentSessionStatsPanel/CurrentSessionStatsPanel";

class MainPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            result: '',
            operation: null,
            range: 10,
            selectedOperations: ['ADDITION'],
            isAnswerCorrect: null,
            wasAnswered: false,
            disableInput: false,
            sessionHistory: [],
            attemptCounter: 0
        }
        this.inputElement = React.createRef();
    }


    componentDidMount() {
        this.sleep(500).then(() => this.callFactors())
    }

    sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

    callFactors() {
        let url = SERVER_URL + '/operation?operationTypes=' + this.state.selectedOperations.join() + '&range=' + this.state.range;
        fetch(url, {mode: "cors", headers: {'Content-Type': 'application/json'}})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        operation: result
                    })
                    this.inputElement.current.focus();
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
            this.setState({
                disableInput: true
            })
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
            .then(
                res => this.handleAnswer(res.correct),
                error => this.setState({error})
            );
    }

    handleAnswer = (isCorrect) => {
        const id = this.state.attemptCounter + 1
        let currentAttempt = {
            id: id,
            operation: this.state.operation,
            result: this.state.result,
            correct: isCorrect,
            timeStamp: new Date()
        };

        this.setState({
            isAnswerCorrect: isCorrect,
            wasAnswered: true,
            sessionHistory: [...this.state.sessionHistory, currentAttempt],
            attemptCounter: id
        })

        this.sleep(1000).then(() => {
            this.setState({
                result: '',
                wasAnswered: false,
                disableInput: false
            })
            this.inputElement.current.focus();
            isCorrect && this.callFactors();
        })
    }

    handleApplyOptions = (options) => {
        const actualRange = this.state.range;
        const actualSelection = this.state.selectedOperations
        const newRange = options.range;
        const newSelection = options.operations;

        if (actualRange !== newRange || JSON.stringify(actualSelection) !== JSON.stringify(newSelection)) {
            this.setState({
                selectedOperations: newSelection,
                range: newRange
            }, () => {
                this.callFactors()
            })
        }
        this.inputElement.current.focus();
    }

    render() {
        const {error, isLoaded, result, operation, isAnswerCorrect, wasAnswered, disableInput, sessionHistory} = this.state;

        return (
            <div className={"App-main-panel"}>
                {error && <ErrorPage/>}
                {!error && !isLoaded && <LoadingPage/>}
                {!error && isLoaded && <OptionsPanel applyOptions={this.handleApplyOptions}/>}
                {!error && isLoaded && <OperationQuiz operation={operation}
                                                      onChange={this.handleChange}
                                                      onKeyDown={this.handleEnter}
                                                      value={result}
                                                      isAnswerCorrect={isAnswerCorrect}
                                                      wasAnswered={wasAnswered}
                                                      disableInput={disableInput}
                                                      inputRef={this.inputElement}
                />}
                {!error && isLoaded && <CurrentSessionStatsPanel sessionHistory={sessionHistory}/>}
            </div>
        )
    }
}

export default MainPanel;