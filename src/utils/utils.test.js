import {operationSign} from "./utils";
import each from 'jest-each';

each`
    type                | sign
    ${'ADDITION'}       | ${'+'}
    ${'SUBTRACTION'}    | ${'-'}
    ${'DUMMY'}          | ${'?'}
    ${undefined}        | ${'?'}
    ${null}             | ${'?'}
`.test('return $sign when operation type is $type', ({type, sign}) => {
    expect(operationSign(type)).toBe(sign)
})