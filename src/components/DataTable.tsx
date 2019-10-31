import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import IconButton from '@material-ui/core/IconButton';
import uuid from 'uuid';

const styles = (theme: any) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    margin: '10px',
    fontSize: '20px',
    borderRadius: '10px',
    backgroundColor: 'white',
  },
  table: {
    minWidth: 500,
    marginRight: '100px',
    fontSize: '20px',
    borderRadius: '10px',
    backgroundColor: 'white',
  },
});

function dataTable(props: any) {
  const {
    classes, rowData, rowHeader, deletePropHandler, editHandler,
  } = props;

  const renderHeader = rowHeader.map((col: any, idx: number) => (
    <TableCell key={`head_+${idx}`}>{col}</TableCell>
  ));

  function renderRowCells(row: any) {
    if (!row) return;
    return rowHeader.map((header: string, idx: number) => (
      <TableCell align={'center'} key={`${uuid.v4()}`}>
        {row.toString()}
      </TableCell>
    ));
  }
  const renderRows = rowData.map((row: any) => (
    <TableRow key={`${uuid.v4()}`}>
      {renderRowCells(row)}
      <TableCell align={'center'} padding={'none'}>
        <IconButton color="default" onClick={() => deletePropHandler(row)}>
          <DeleteIcon />
        </IconButton>
        <IconButton color="default" onClick={() => editHandler(row)}>
          <CreateIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  return (
    <Paper className={`${classes.root}, data-table`}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>{renderHeader}</TableRow>
        </TableHead>
        <TableBody>{renderRows}</TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(dataTable);
