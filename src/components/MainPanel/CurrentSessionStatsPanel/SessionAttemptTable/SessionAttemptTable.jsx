import React from "react";
import TableContainer from '@material-ui/core/TableContainer';
import {Table} from "@material-ui/core";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {operationSign} from "../../../../utils/utils";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';

export class SessionAttemptTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        }
    }

    handleChangePage = (event, newPage) => {
        this.setState({
            page: newPage
        })
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({
            page: 0,
            rowsPerPage: parseInt(event.target.value, 10)
        })
    };

    render() {
        let {records} = this.props;
        const {page, rowsPerPage} = this.state
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, records.length - page * rowsPerPage);

        return <TableContainer>
            <Table aria-label="dense pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>No</TableCell>
                        <TableCell>Operation</TableCell>
                        <TableCell>Is Correct</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                            ? records.sort((a, b) => b.id - a.id).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : records.sort((a, b) => b.id - a.id)
                    ).map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.operation.factorA} {operationSign(row.operation.operationType)} {row.operation.factorB} = {row.result}</TableCell>
                            <TableCell>{row.correct
                                ? <CheckCircleOutlineIcon style={{color: 'MediumSeaGreen'}}/>
                                : <CancelOutlinedIcon style={{color: 'Tomato'}}/>}</TableCell>
                        </TableRow>
                    ))}

                    {/*{emptyRows > 0 && (*/}
                    {/*    <TableRow style={{ height: 53 * emptyRows }}>*/}
                    {/*        <TableCell colSpan={6} />*/}
                    {/*    </TableRow>*/}
                    {/*)}*/}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                            colSpan={3}
                            count={records.length}
                            rowsPerPage={this.state.rowsPerPage}
                            page={this.state.page}
                            SelectProps={{
                                inputProps: {'aria-label': 'rows per page'},
                                native: true,
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            // ActionsComponent={TablePaginationActions}
                        />
                    </TableRow>
                </TableFooter>
            </Table>
        </TableContainer>;
    }
}

function TablePaginationActions(props) {
    const {count, page, rowsPerPage, onChangePage} = props;

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {true ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {true ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {true ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {true ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </div>
    );
}
