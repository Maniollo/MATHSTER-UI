import React from "react";
import {operationSign} from "../../../../utils/utils";

export const Operation = ({operation}) => <div>
    <span style={{"fontSize": 60}}>{operation.factorA} {operationSign(operation.operationType)} {operation.factorB} =</span>
</div>