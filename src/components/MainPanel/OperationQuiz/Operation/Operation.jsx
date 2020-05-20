import React from "react";
import {operationSign} from "../../../../utils/utils";

export const Operation = ({operation}) => <div>
    <p>{operation.factorA} {operationSign(operation.operationType)} {operation.factorB} =</p>
</div>