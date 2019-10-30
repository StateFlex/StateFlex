import React, { useState } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import TypeSelect from './TypeSelect';
import validateInput from '../utils/validateInput.util';
import ErrorMessage from './ErrorMessage';

const Store = (props: any) => {
  const {
    reducer, reducers, interfaces, setReducer,
  } = props;
  const [validation, setValidation] = useState(validateInput(''));
  const [propertyName, setPropertyName] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [propertyIsArray, setPropertyIsArray] = useState(false);
  const [propertyInitialValue, setPropertyInitialValue] = useState('');
  const [isVisible, setVisibility] = useState(false);

  const handleChange = (event: Event, setter: any) => {
    const target: HTMLInputElement = event.target;
    setter(target.type === 'checkbox' ? target.checked : target.value);
    if (target.type === 'text') {
      const result = validateInput(target.value);
      setValidation(result);
    }
  };

  const addProperty = () => {
    if (validation.isValid && propertyType && propertyInitialValue) {
      const updatedReducer = reducers[reducer];
      updatedReducer.store[validation.input] = {
        type: propertyType,
        array: propertyIsArray,
        initialValue: propertyInitialValue,
      };
      setReducer({ [reducer]: updatedReducer });
      setPropertyName('');
      setPropertyType('');
      setPropertyIsArray(false);
      setPropertyInitialValue('');
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  };

  const deleteProperty = (property: string) => {
    const updatedReducer = reducers[reducer];
    delete updatedReducer.store[property];
    setReducer({ [reducer]: updatedReducer });
  };

  return (
    <React.Fragment>
    <form className="new-store-item">
    <div  id="store" 
          style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gridTemplateRows: '30px',
                  gridGap: '5px'    
                  }}>

        <div  style={{
                      gridColumn: '1 / span 5',
                      backgroundColor: '#def8ff',   
                      }}>
            STORE
        </div>

        <div  style={{ gridColumn: '1 / span 1', backgroundColor: '#eee'}}>NAME</div>
        <div  style={{ gridColumn: '2 / span 1', backgroundColor: '#eee'}}>TYPE</div>
        <div  style={{ gridColumn: '3 / span 1', backgroundColor: '#eee'}}>ARRAY</div>
        <div  style={{ gridColumn: '4 / span 1', backgroundColor: '#eee'}}>INITIAL</div>
        <div  style={{ gridColumn: '5 / span 1', backgroundColor: '#eee'}}>ACTION</div>


        {reducers[reducer].store &&
          Object.keys(reducers[reducer].store).map(store => (
            <React.Fragment>
        <div  style={{ gridColumn: '1 / span 1'}} key={`store${store}`}>{store}</div>
        <div  style={{ gridColumn: '2 / span 1'}}>{reducers[reducer].store[store].type}</div>   
        <div  style={{ gridColumn: '3 / span 1'}}>{reducers[reducer].store[store].array ? '✓' : '×'}</div>   
        <div  style={{ gridColumn: '4 / span 1'}}>{reducers[reducer].store[store].initialValue}</div>
        <div  style={{ gridColumn: '5 / span 1'}}>
                    <IconButton
                      aria-label={`delete store item "${store}"`}
                      onClick={() => deleteProperty(store)}>
                      <Icon>delete</Icon>
                    </IconButton>
        </div>
        </React.Fragment>
              ))}
 

        <ErrorMessage validation={validation} visible={isVisible} />
       
        <div  style={{ gridColumn: '1 / span 1'}}>
            <TextField
              label="name"
              value={propertyName}
              onChange={() => {
                handleChange(event, setPropertyName);
              }}
              required />
        </div>
        <div  style={{ gridColumn: '2 / span 1'}}>
            <TypeSelect
              selectName="store-property-type"
              outer={reducer}
              interfaces={interfaces}
              value={propertyType}
              handleChange={(event: Event) => {
                handleChange(event, setPropertyType);
              }} />
        </div>
        <div  style={{ gridColumn: '3 / span 1'}}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={propertyIsArray}
                  onChange={() => {
                    handleChange(event, setPropertyIsArray);
                  }}
                />
              }
              label="array" />
        </div>
        <div  style={{ gridColumn: '4 / span 1'}}>
        <TextField
          label="initial value"
          value={propertyInitialValue}
          onChange={() => {
            setPropertyInitialValue(event.target.value);
          }}
          className="code"
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              addProperty();
              event.preventDefault();
            }
          }}
          required
        />
        </div>
        <div  style={{ gridColumn: '5 / span 1'}}>        
        <IconButton
          aria-label="add property to store"
          onClick={addProperty}
          className={validation.isValid && propertyType && propertyInitialValue ? '' : 'disabled'}>
          <Icon>add</Icon>
        </IconButton>
        </div>

     
    </div>
    </form>
    </React.Fragment>
  );
};

export default Store;
