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

/*
const styles = (theme: any) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    margin: '10px',
    fontSize: '24px',
    borderRadius: '10px',
    backgroundColor: '#111',
    // overflowX: "auto"
  },
  table: {
    minWidth: 500,
    marginRight: '100px',
    fontSize: '20px',
    borderRadius: '10px',
    backgroundColor: '#eee',
  },
});

*/

const styles = (theme: any) => ({
  root: {
    width: '100%',
    marginTop: '0px'
  },
  table: {
    backgroundColor: '#eee'
  },
});

/** **************************
 * cannot have a row header or a key in the data  called "key"
 * ,ust have unique id
 * ****************************** */

function reactDataTable(props: any) {
  const {
    classes, rowData, rowHeader, deletePropHandler, reactHandler,
  } = props;

  const renderHeader = rowHeader.map((col: any, idx: number) => (
    <TableCell key={`head_+${idx}`}>{col}</TableCell>
  ));

  function renderRowCells(row: any) {
    if (!row) return;
    return rowHeader.map((header: string, idx: number) => (
      <TableCell align={'center'} key={`${uuid.v4()}`}>
        {row[header].toString()}
      </TableCell>
    ));
  }
  // style={{height: 30}}

//   const editHandler = (row) => {
//     const name = row.match(/Name: \w+/)[0].slice(6);
//     const type = row.match(/Type: \w+/)[0].slice(6);
//     const initialValue = row.match(/Initial Value: \w+/)[0].slice(15);
//     dispatch(deleteState(name));
//     setEnteredName(name);
//     setEnteredType(type);
//     setEnteredValue(initialValue);
//   };

  const renderRows = rowData.map((row: any) => (
    <TableRow key={`${uuid.v4()}`}>
      {renderRowCells(row)}
        <TableCell align={'center'} padding={'none'}>
        <IconButton color="default" onClick={() => deletePropHandler(row.id)}>
          <DeleteIcon />
        </IconButton>
        <IconButton color="default" onClick={() => reactHandler(row, deletePropHandler)}>
          <CreateIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ));

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} selectable={'true'}>
        <TableBody>{renderRows}</TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(reactDataTable);
