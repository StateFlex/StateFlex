import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TypeSelect from './TypeSelect';
import validateInput from '../utils/validateInput.util';
import ErrorMessage from './ErrorMessage';
import StoreItemHeader from './StoreItemHeader';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';



const Interface = (props: any) => {
  const {
    thisInterface, interfaces, setInterface, deleteInterface,
  } = props;

  const [newPropertyName, setNewPropertyName] = useState('');
  const [newPropertyType, setNewPropertyType] = useState('');
  const [newPropertyIsArray, setNewPropertyIsArray] = useState(false);
  const [newPropertyValidation, setNewPropertyValidation] = useState(validateInput(''));
  const [isVisible, setVisibility] = useState(false);
  const [isRequired, setIsRequired] = useState(false);

  const toggleInterfacePropRequired = () => {
    setIsRequired(!isRequired)
  }

  const handleChange = (event: Event, setter: any) => {
      const target: HTMLInputElement = event.target;
      setter(target.value);
      const result = validateInput(target.value);
      setNewPropertyValidation(result);
  };

  const addProperty = () => {
    if (newPropertyValidation.isValid && newPropertyType) {
      const updatedInterface = interfaces[thisInterface];
      updatedInterface[newPropertyValidation.input] = newPropertyIsArray ? [newPropertyType + '[]', isRequired] : [newPropertyType, isRequired];
      setInterface({ [thisInterface]: updatedInterface });
      setNewPropertyName('');
      setNewPropertyType('');
      setNewPropertyIsArray(false);
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  };

  const deleteProperty = (property) => {
    const updatedInterface = interfaces[thisInterface];
    delete updatedInterface[property];
    setInterface({ [thisInterface]: updatedInterface });
  };






  return (
  <React.Fragment>
    <form>
  <div className="Interface-container" key={`interface${thisInterface}`}> 

    <div className="Interface-StoreItemHeader">  
    <StoreItemHeader storeItem={thisInterface} deleter={deleteInterface} />
    </div>

    <div  className="Interface-StoreItemProperty-name" 
          style={{backgroundColor: '#777', color: '#fff'}}>NAME</div>
    <div  className="Interface-StoreItemProperty-type" 
          style={{backgroundColor: '#777', color: '#fff'}}>TYPE</div>
    <div  className="Interface-StoreItemProperty-required" 
          style={{backgroundColor: '#777', color: '#fff'}}>REQUIRED</div>
    <div  className="Interface-StoreItemProperty-delete" 
          style={{backgroundColor: '#777', color: '#fff'}}>ACTION</div>

    

    
          {interfaces[thisInterface] &&
              Object.keys(interfaces[thisInterface]).map(property => (

<React.Fragment>
    <div  className="Interface-StoreItemProperty-name"
          id={property} 
          key={property}>{property}</div>
    <div className="Interface-StoreItemProperty-type">{interfaces[thisInterface][property][0]}</div>
    <div className="Interface-StoreItemProperty-required">{interfaces[thisInterface][property][1].toString()}</div>
    <div className="Interface-StoreItemProperty-delete">
      <IconButton
        aria-label={`delete property "${property}"`}
        onClick={() => deleteProperty(property)}>
        <Icon>delete</Icon>
      </IconButton>
    </div>
</React.Fragment>        
            


            ))}

      <ErrorMessage validation={newPropertyValidation} visible={isVisible} />



<React.Fragment>
<div  className="Interface-StoreItemProperty-name"> 
        <TextField
          id="interface-property-name"
          label="property name"
          value={newPropertyName}
          onChange={() => {
            handleChange(event, setNewPropertyName);
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') event.preventDefault();
          }}
          required
        />
  </div>
  <div  className="Interface-StoreItemProperty-type"> 
        <TypeSelect
          selectName="interface-property-type"
          outer={thisInterface}
          interfaces={interfaces}
          value={newPropertyType}
          handleChange={(event: Event) => {
            setNewPropertyType(event.target.value);
          }}
        />
 

        <FormControlLabel
          value="top"
          control={
            <Checkbox
              color="primary"
              value={newPropertyIsArray.toString()}
              checked={newPropertyIsArray}
              onChange={() => {
                setNewPropertyIsArray(isArray => !isArray);
              }}
            />
          }
          label="array?"
          labelPlacement="top"
        />
 </div>
 <div  className="Interface-StoreItemProperty-required"> 
        <Grid item xs={6}>
          <div className='is-required'>
            <InputLabel className='is-required-input' htmlFor="propRequired">
              required?
            </InputLabel>
            <Switch
              checked={isRequired}
              onChange={toggleInterfacePropRequired}
              value="propRequired"
              color="primary"
              id="propRequired"
            />
          </div>
        </Grid>
</div>
<div  className="Interface-StoreItemProperty-delete"> 
        <IconButton
          aria-label="add property"
          onClick={addProperty}
          className={newPropertyValidation.isValid && newPropertyType ? '' : 'disabled'}>
          <Icon>add</Icon>
        </IconButton>
</div>
</React.Fragment>
    

</div>
</form>
</React.Fragment>
  );
};

export default Interface;
