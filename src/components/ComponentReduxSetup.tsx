import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, withTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import {
  addSelector,
  deleteSelector,
  addActionToComponent,
  deleteActionFromComponent,
  setState,
  deleteState,
} from '../actions/components';
import DataTable from './DataTable';
import { StoreInterface } from '../utils/InterfaceDefinitions';

const convertToOptions = choices => [
  <option value="" key="" />,
  choices.map(choice => (
    <option value={choice} key={choice} style={{ color: '#000' }}>
      {choice}
    </option>
  )),
];

const ComponentReduxSetup: React.FC = (props: any): JSX.Element => {
  const [chosenAction, setChosenAction] = useState('');
  const [chosenSelector, setChosenSelector] = useState('');
  const storeConfig = useSelector((store: StoreInterface) => store.workspace.storeConfig);
  const { focusComponent, classes } = props;
  const dispatch = useDispatch();
  let selectorOptions = [];
  let actionOptions = [];
  Object.keys(storeConfig.reducers).forEach((reducerName) => {
    Object.keys(storeConfig.reducers[reducerName].store).forEach((storePieceName) => {
      selectorOptions.push(`${reducerName}.${storePieceName}`);
    });
    Object.keys(storeConfig.reducers[reducerName].actions).forEach((actionName) => {
      actionOptions.push(`${reducerName}.${actionName}`);
    });
  });

  selectorOptions = convertToOptions(selectorOptions);
  actionOptions = convertToOptions(actionOptions);

  const handleChange = cb => e => cb(e.target.value);

  const handleStoreSubmit = (cb, value) => {
    const callback = cb;
    return (e) => {
      e.preventDefault();
      return dispatch(callback(value));
    };
  };

  const submitValueUsingAction = (title, value, onChange, onSubmit, choices) => (
    <Grid item={true} xs={3}>
      <form className="props-input" onSubmit={handleStoreSubmit(onSubmit, value)}>
        <Grid container spacing={8}>
          <Grid item={true} xs={12}>
            <FormControl required>
              <InputLabel className={classes.light} htmlFor="propType">
                {`select ${title}`}
              </InputLabel>
              <Select
                native
                className={classes.light}
                id="propType"
                placeholder="title"
                onChange={handleChange(onChange)}
                value={value}
                required>
                {choices}
              </Select>
            </FormControl>
          </Grid>
          <Grid item={true} xs={12}>
            <Button color="primary" aria-label="Add" type="submit" variant="contained" size="large">
              {'submit'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );

  return (
    <div className={'htmlattr'}>
      {' '}
      {Object.keys(focusComponent).length < 1 ? (
        <div style={{ marginTop: '20px', width: '90%' }}>
          select a component to view its state & actions
        </div>
      ) : (
        <div className="props-container" style={{ marginTop: '20px' }}>
          <div className="redux-connection-container">
            <h3 style={{ flex: 1, color: '#e0e0e0' }}>add redux connections</h3>
            <Grid item={true} xs={12}>
              <div className="redux-selections">
                {submitValueUsingAction(
                  'redux state',
                  chosenSelector,
                  setChosenSelector,
                  addSelector,
                  selectorOptions,
                )}
                <DataTable
                  rowHeader={['store selections']}
                  rowData={focusComponent.selectors}
                  deletePropHandler={name => dispatch(deleteSelector(name))}
                />
              </div>
            </Grid>
            <Grid item={true} xs={12}>
              <div className="redux-selections">
                {submitValueUsingAction(
                  'redux action',
                  chosenAction,
                  setChosenAction,
                  addActionToComponent,
                  actionOptions,
                )}
                <DataTable
                  rowHeader={['action selections']}
                  rowData={focusComponent.actions}
                  deletePropHandler={name => dispatch(deleteActionFromComponent(name))}
                />
              </div>
            </Grid>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  chip: {
    color: '#eee',
    backgroundColor: '#333333',
  },
  column: {
    display: 'inline-flex',
    alignItems: 'baseline',
  },
  icon: {
    fontSize: '20px',
    color: '#eee',
    opacity: '0.7',
    transition: 'all .2s ease',

    '&:hover': {
      color: 'red',
    },
  },
  cssLabel: {
    color: 'white',

    '&$cssFocused': {
      color: 'green',
    },
  },
  cssFocused: {},
  input: {
    color: '#eee',
    marginBottom: '30px',
    width: '50%',
    textAlign: 'center',
  },
  light: {
    color: '#eee',
    fontSize: '14px',
    padding: '12px',
  },
  avatar: {
    color: '#eee',
    fontSize: '11px',
  },
});

export default withStyles(styles)(ComponentReduxSetup);
