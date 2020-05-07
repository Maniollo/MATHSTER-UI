import React from 'react'
import {operationSign} from "../../../utils/utils";

export const OperationQuiz = (props) => {
    return <div>
        <p>{props.operation.factorA} {operationSign(props.operation.operationType)} {props.operation.factorB} = </p><input type="text" pattern="[0-9]*"
                                                                          onChange={props.onChange}
                                                                          onKeyDown={props.onKeyDown}
                                                                          value={props.value}
    />
        {props.wasAnswered && <p>{props.isAnswerCorrect ? 'Gratulacje, poprawna odpowiedź' : 'Błędna odpowiedź. Spróbuj raz jeszcze'}</p>}
    </div>;
}