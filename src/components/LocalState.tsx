import React, { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withStyles, withTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import {
  setState,
  deleteState,
} from '../actions/components';
import DataTable from './DataTable';
import { StoreInterface } from '../utils/InterfaceDefinitions';

const numbersAsStrings = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const reservedWords = [
    'break',
    'case',
    'catch',
    'class',
    'const',
    'continue',
    'debugger',
    'default',
    'delete',
    'do',
    'else',
    'export',
    'extends',
    'finally',
    'for',
    'function',
    'if',
    'import',
    'in',
    'instanceof',
    'new',
    'return',
    'super',
    'switch',
    'this',
    'throw',
    'try',
    'typeof',
    'var',
    'void',
    'while',
    'with',
    'yield',
    'enum',
];

const convertToOptions = choices => [
    <option value="" key="" />,
    choices.map(choice => (
      <option value={choice} key={choice} style={{ color: '#000' }}>
        {choice}
      </option>
    )),
];

const LocalState: React.FC = (props: any): JSX.Element => {
    const { focusComponent, classes } = props;

    const dispatch = useDispatch();
    const storeConfig = useSelector((store: StoreInterface) => store.workspace.storeConfig);
    const [enteredName, setEnteredName] = useState('');
    const [enteredType, setEnteredType] = useState('');
    const [enteredValue, setEnteredValue] = useState('');

    const handleChange = cb => e => cb(e.target.value);
    
    const transformIntoVariableName = (string: string): string => string
        .replace(/[^ _$A-Za-z0-9]/g, '')
        .replace(/\s+(\w)/g, (match, $1) => $1.toUpperCase())
        .replace(/\s/g, '');
    
    const handleLocalStateSubmit = (e) => {
        e.preventDefault();
        if (numbersAsStrings.includes(enteredName[0])) {
          window.alert(`Cannot begin a prop name with a number.`);
          return;
        }
        if (reservedWords.includes(transformIntoVariableName(enteredName))) {
          window.alert(`"${enteredName}" is a reserved word. Please choose another.`);
          return;
        }

        focusComponent.componentState.map(
          state => {if(enteredName === state.name) {
          window.alert(`A prop with the name "${enteredName}" already exists.`);
          return;
          }
          })

        if(enteredType === 'boolean'){
          if(enteredValue !== 'true' && enteredValue !== 'false') {
          window.alert('A boolean type must have a boolean initial value');
          return;
          }
        } else if (enteredType == 'object'){
          if(enteredValue[0] !== '{' || enteredValue[enteredValue.length-1] !== '}' || !enteredValue.includes(':') || typeof JSON.parse(enteredValue) !== 'object'){
            window.alert('An object type\'s initial value must be enclosed in an object and must be a valid key-value pair');
            return;
          } 
        } else if(enteredType == 'array'){
          if(enteredValue[0] !== '[' || enteredValue[enteredValue.length-1] !== ']' || !Array.isArray(JSON.parse(enteredValue))){
            window.alert('An array type\'s initial value must be enclosed in an array');
            return;
          }
        } else if(enteredType === 'number'){
          if(!Number(enteredValue) && Number(enteredValue) !== 0){
            window.alert('A number type\'s initial value must be a number');
            return;
          }
        } else if (enteredType === 'string'){
          if(Number(enteredValue) || Number(enteredValue) == 0 || enteredValue[0] == '['|| enteredValue[enteredValue.length-1] == ']' || enteredValue[0] == '{' || enteredValue[enteredValue.length-1] == '}' || enteredValue == 'true' || enteredValue == 'false'){
            window.alert('A string type\'s initial value must be a string');
            return;
          }
        } else if (enteredType == 'any' && enteredValue[0] == '{' || enteredType == 'any' && enteredValue[enteredValue.length-1] == '}'){
          if(enteredValue[0] !== '{' || enteredValue[enteredValue.length-1] !== '}' || !enteredValue.includes(':') || typeof JSON.parse(enteredValue) !== 'object'){
            window.alert('An object type\'s initial value must be enclosed in an object and must be a valid key-value pair');
            return;
          } 
        } else if (enteredType == 'any' && enteredValue[0] == '[' || enteredType == 'any' && enteredValue[enteredValue.length-1] == ']'){
          if(enteredValue[0] !== '[' || enteredValue[enteredValue.length-1] !== ']' || !Array.isArray(JSON.parse(enteredValue))){
            window.alert('An array type\'s initial value must be enclosed in an array');
            return;
          }
        } 
        
        return dispatch(
          setState({
            name: transformIntoVariableName(enteredName),
            type: enteredType,
            initialValue: enteredValue,
          }),
        );
    };

    const editHandler = (row) => {
        const name = row.match(/Name: \w+/)[0].slice(6);
        const type = row.match(/Type: \w+/)[0].slice(6);
        const initialValue = row.match(/Initial Value: \w+/)[0].slice(15);
        dispatch(deleteState(name));
        setEnteredName(name);
        setEnteredType(type);
        setEnteredValue(initialValue);
    };

    return (
        <Fragment>
         
            <form
                  className="LocalState-form"
                  onSubmit={(e) => {
                      handleLocalStateSubmit(e);
                      setEnteredName('');
                      setEnteredType('');
                      setEnteredValue('');
                  }}>

            <div className="LocalState">

            <div className="LocalState-submit">
            <Button
                  aria-label="Add"
                  type="submit"
                  variant="contained"
                  size="large">
                  ADD STATE
            </Button>
            </div>


            <div className="LocalState-name">
            <FormControl>
            <InputLabel 
                  className={classes.input} htmlFor="localstate-name">
                  Name:
            </InputLabel>
            <Input
                  className={classes.input}
                  id="localstate-name"
                  onChange={handleChange(setEnteredName)}
                  value={enteredName} />
            </FormControl>
            </div>
       

            <div className="LocalState-value">
            <FormControl required>
            <InputLabel className={classes.input} htmlFor="localstate-value">
                  Value:
            </InputLabel>
            <Input
                  className={classes.input}
                  id="localstate-value"
                  onChange={handleChange(setEnteredValue)}
                  value={enteredValue} />
            </FormControl>
            </div>


            <div className="LocalState-type">
              <FormControl>
                <InputLabel className={classes.input} htmlFor="localstate-type">
                  Type:
                </InputLabel>
                <Select
                  native
                  className={classes.input}
                  id="localstate-type"
                  placeholder="Type"
                  onChange={handleChange(setEnteredType)}
                  value={enteredType}
                  required>
                  {convertToOptions([
                    'number',
                    'string',
                    'boolean',
                    'object',
                    'array',
                    'any',
                    ...Object.keys(storeConfig.interfaces),
                  ])}
                </Select>
              </FormControl>
            </div>


            <div className="LocalState-data">
            <DataTable
                  rowHeader={['local state selections']}
                  rowData={focusComponent.componentState.map(
                    state => `Name: ${state.name}      Type: ${state.type}      Initial Value: ${state.initialValue}`,
                  )}
                  deletePropHandler={name => dispatch(deleteState(name.match(/Name: \w+/)[0].slice(6)))}
                  editHandler={row => editHandler(row)} />
            </div>

            </div>
            </form>
            </Fragment>
    );
}

const styles = theme => ({

  input: {
    color: '#222',
  },

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

export default withStyles(styles)(LocalState);