import React, { Component, Fragment } from 'react';
import { useSelector, useDispatch, connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import { addProp, deleteProp } from '../actions/components.ts';
import ReactDataTable from './ReactDataTable.tsx';
import { StoreInterface } from '../utils/InterfaceDefinitions';
import Grid from '@material-ui/core/Grid';



const RequiredSwitch = withStyles({
  switchBase: {
    color: '#ddd',
    '&$checked': {
      color: '#61d8f9',
    },
    '&$checked + $track': {
      backgroundColor: '#61d8f9',
    },
  },
  checked: {},
  track: {},
})(Switch);



const RequiredSwitchPaper = withStyles({
    root: {
      paddingLeft: '10px',
      paddingRight: '10px',
      paddingTop: '10px',
    }
})(Paper);


const styles = theme => ({
  input: {
    color: '#222',
  },

  
  colorPrimary: {
      color: '#0f0',
  },

  root: {
    color: '#222'

  },

  icon: {
    fontSize: '20px',
    color: '#0f0',
    opacity: '0.7',
    transition: 'all .2s ease',

    '&:hover': {
      color: 'blue',
    },
  },
  
  cssFocused: {},

  avatar: {
    color: '#eee',
    fontSize: '10px',
  },
});

const mapDispatchToProps = (dispatch: any) => ({
  addProp: ({
    key,
    value,
    required,
    type,
  }: {
  key: string;
  value: string;
  required: boolean;
  type: string;
  }) => dispatch(
    addProp({
      key,
      value,
      required,
      type,
    }),
  ),
  deleteProp: (propId: number) => dispatch(deleteProp(propId)),
});

const mapStateToProps = (store: any) => ({
  focusComponent: store.workspace.focusComponent,
  storeConfig: store.workspace.storeConfig
});

const availablePropTypes = {
  string: 'STR',
  number: 'NUM',
  object: 'OBJ',
  array: 'ARR',
  boolean: 'BOOL',
  function: 'FUNC',
  node: 'NODE',
  element: 'ELEM',
  any: 'ANY',
  tuple: 'TUP',
  enum: 'ENUM',
};

// const typeOptions = [
//   <option value="" key="" />,
//   ...Object.keys(availablePropTypes).map(type => (
//     <option value={type} key={type} style={{ color: '#000' }}>
//       {type}
//     </option>
//   )),
// ];

const convertToOptions = choices => [
  <option value="" key="" />,
  choices.map(choice => (
    <option value={choice} key={choice} style={{ color: '#eee' }}>
      {choice}
    </option>
  )),
];


class Props extends Component {
  state = {
    propKey: '',
    propValue: '',
    propRequired: false,
    propType: '',
  };


  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value.trim(),
    });
  };

  togglePropRequired = () => {
    this.setState({
      propRequired: !this.state.propRequired,
    });
  };

  reactHandler = (row, callback) => {
    const name = row._Key
    const type = row.Type
    const initialValue = row.Value
    const isRequired = row.Required
    this.setState({
    propKey: name,
    propValue: initialValue,
    propRequired: isRequired,
    propType: type,
    });
    return callback(row.id);
    
    // dispatch(deleteState(name));
    // setEnteredName(name);
    // setEnteredType(type);
    // setEnteredValue(initialValue);
    };

  handleAddProp = (event) => {
    event.preventDefault();

    const {
      propKey, propValue, propRequired, propType,
    } = this.state;

    // check if prop exists with same key. CANNOT have duplicates
    const savedPropKeys = this.props.focusComponent.props.map(p => p.key);
    if (savedPropKeys.includes(propKey)) {
      window.alert(`A prop with the name: "${propKey}" already exists.`);
      return;
    }

    // check if prop starts with digits. Digits at string start breaks indexedDB
    if (/^\d/.test(propKey)) {
      window.alert('Props are not allowed to begin with digits');
      return;
    }

    if(propType === 'boolean'){
      if(propValue !== 'true' && propValue !== 'false') {
      window.alert('A boolean type must have a boolean initial value');
      return;
      }
    } else if (propType == 'object'){
      if(propValue[0] !== '{' || propValue[propValue.length-1] !== '}'){
        window.alert('An object type\'s initial value must be enclosed in an object');
        return;
      } 
    } else if(propType == 'array'){
      if(propValue[0] !== '[' || propValue[propValue.length-1] !== ']'){
        window.alert('An array type\'s initial value must be enclosed in an array');
        return;
      }
    } else if(propType === 'number'){
      if(!Number(propValue) && Number(propValue) !== 0){
        window.alert('A number type\'s initial value must be a number');
        return;
      }
    } else if (propType === 'string'){
      if(Number(propValue) || Number(propValue) == 0 || propValue[0] == '['|| propValue[propValue.length-1] == ']' || propValue[0] == '{' || propValue[propValue.length-1] == '}' || propValue == 'true' || propValue == 'false'){
        window.alert('A string type\'s initial value must be a string');
        return;
      }
    }

    this.props.addProp({
      key: propKey,
      value: propValue,
      required: propRequired,
      type: propType,
    });

    this.setState({
      propKey: '',
      propValue: '',
      propRequired: false,
      propType: '',
    });
  };

  render() {

  
      
 
    const {
      focusComponent, classes, deleteProp, addProp,
    } = this.props;

    const rowHeader = ['_Key', 'Value', 'Type', 'Required'];
    // prepare the saved Props in a nice way, so you can sent them to TableData
    const propsRows = focusComponent.props.map(prop => ({
      _Key: prop.key,
      Value: prop.value,
      Type: prop.type,
      Required: prop.required,
      id: prop.id,
    }));

    return (
      <Fragment>
          <form 
                onSubmit={this.handleAddProp}
                >

          <div 
                className="bottom-panel-props">



          <div 
                className="bottom-panel-props-submit">
          <Button
                aria-label="Add"
       
                type="submit"
                // disabled={!this.state.propKey || !this.state.propType}
                variant="contained"
                size="large">                                     
                ADD PROP
          </Button>
          </div>



          <div 
                className="bottom-panel-props-key">
          <TextField
                id="propKey"
                label="Key"
                autoFocus
                onChange={this.handleChange}
                value={this.state.propKey}
                required
                InputProps={{
                      className: classes.input,
                            }}
                InputLabelProps={{
                      className: classes.input,
                }}/>
          </div>




          <div 
                className="bottom-panel-props-value">
          <TextField
                id="propValue"
                label="Value"
                onChange={this.handleChange}
                InputProps={{
                  className: classes.input,
                }}
                InputLabelProps={{
                  className: classes.input,
                }}
                value={this.state.propValue} 
                />
          </div>



          <div 
                className="bottom-panel-props-type">
        <FormControl required>
        <InputLabel 
                className={classes.input} 
                htmlFor="propType">
                Type
        </InputLabel>
        <Select
                native
                className={classes.input}
                id="propType"
                placeholder="title"
                onChange={this.handleChange}
                value={this.state.propType}
                required >
                {convertToOptions([
                  'string',
                  'number',
                  'object',
                  'array',
                  'boolean',
                  'function',
                  'node',
                  'element',
                  'any',
                  'tuple',
                  'emum',
                  ...Object.keys(this.props.storeConfig.interfaces),
                  ])}
        </Select>
        </FormControl>
        </div>


        <div 
                className="bottom-panel-props-required">
                <Grid container 
                      spacing={0}
                      justify="flex-start"
                      alignItems="flex-end"
                      direction='row'>
                        <RequiredSwitchPaper>
                <Grid item={true} xs={6}>
                <InputLabel 
                        className={classes.input} htmlFor="propRequired"
                        >
                        Required?
                </InputLabel>
                </Grid>
                <Grid item={true} xs={6}>
                <RequiredSwitch
                      checked={this.state.propRequired}
                      onChange={this.togglePropRequired}
                      value="propRequired"
                      id="propRequired"
                  />
                </Grid>
                </RequiredSwitchPaper>
                </Grid>
        </div>


        <div 
                className="bottom-panel-props-data">
        <ReactDataTable
                rowHeader={rowHeader}
                rowData={propsRows}
                deletePropHandler={deleteProp}
                reactHandler={this.reactHandler}/>
        </div>


        </div>          
        </form>             
        </Fragment>      
      );
    }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Props));
