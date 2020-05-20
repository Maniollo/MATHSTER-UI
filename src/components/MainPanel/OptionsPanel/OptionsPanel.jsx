import React from 'react'
import {checkboxes} from "./checkboxes";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import {Container} from "react-bootstrap";
import Button from '@material-ui/core/Button';
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";

const marks = [
    {
        value: 10,
        label: 10
    },
    {
        value: 20,
        //     label: 20
    },
    {
        value: 30,
        //     label: 30
    },
    {
        value: 40,
        // label: 40
    },
    {
        value: 50,
        label: 50
    },
    {
        value: 60,
        //     label: 60
    },
    {
        value: 70,
        //     label: 70
    },
    {
        value: 80,
        //     label: 80
    },
    {
        value: 90,
        //     label: 90
    },
    {
        value: 100,
        label: 100
    },
]

const initialState = {
    selectedOptions: new Map([['ADDITION', true], ['SUBTRACTION', false]]),
    range: 10,
    correctSelection: true
};

export class OptionsPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {...initialState}
    }

    handleApplyButton = () => {
        const selectedOperations = [...(this.state.selectedOptions)]
            .filter(([k, v]) => v === true)
            .map(([k, v]) => k);

        const verificationResult = this.verifyOptions(selectedOperations);

        if (verificationResult.correctOperations) {
            this.props.applyOptions(
                {
                    range: this.state.range,
                    operations: selectedOperations

                })
        }
        this.setState({
            correctSelection: verificationResult.correctOperations
        })
    };

    verifyOptions = (operations) => {
        return {
            correctOperations: operations.length !== 0,
        }
    }

    handleCheckboxChange = (event) => {
        const {name, checked} = event.target
        this.setState(prevState => ({selectedOptions: prevState.selectedOptions.set(name, checked)}));
    }

    handleSetDefaultsButton = () => {
        this.setState({...initialState, selectedOptions: new Map([['ADDITION', true], ['SUBTRACTION', false]])})
    }

    handleRangeChange = (event, value) => {
        this.setState({
            range: value
        })
    }

    render() {
        const {selectedOptions, range, correctSelection} = this.state

        return <div>
            <Accordion>
                <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Settings
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Container fluid>
                                <Row>
                                    <Col>
                                        <FormControl component="fieldset">
                                            <Typography id="discrete-slider" gutterBottom>
                                                Select operations
                                            </Typography>
                                            <FormGroup>
                                                {checkboxes.map(item => (
                                                    <FormControlLabel key={item.name}
                                                                      label={item.name}
                                                                      control={<Checkbox checked={selectedOptions.get(item.name)}
                                                                                         onChange={this.handleCheckboxChange}
                                                                                         name={item.name}/>}
                                                    />))}

                                            </FormGroup>
                                        </FormControl>
                                    </Col>
                                    <Col>
                                        <Typography id="discrete-slider" gutterBottom>
                                            Range
                                        </Typography>
                                        <Slider
                                            value={range}
                                            aria-labelledby="discrete-slider"
                                            valueLabelDisplay="auto"
                                            step={10}
                                            marks={marks}
                                            min={10}
                                            max={100}
                                            onChange={this.handleRangeChange}
                                        />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col/>
                                    <Col>
                                        <Button variant={"contained"} onClick={this.handleSetDefaultsButton}>Set defaults</Button>
                                        <Button variant={"contained"} color="primary" onClick={this.handleApplyButton}>Apply</Button>
                                    </Col>
                                </Row>
                                <Row>
                                    {!correctSelection && <Alert variant={'warning'}>
                                        Incorrect setup: At least one operation must be selected.
                                    </Alert>}
                                </Row>
                            </Container>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>



        ;
    }
}