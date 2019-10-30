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

const Actions = (props: any) => {
  const {
    reducer, reducers, interfaces, setReducer,
  } = props;
  const [propertyName, setPropertyName] = useState('');
  const [propertyIsAsync, setPropertyIsAsync] = useState(false);
  const [parameterName, setParameterName] = useState('');
  const [parameterType, setParameterType] = useState('');
  const [parameterIsArray, setParameterIsArray] = useState(false);
  const [payloadType, setPayloadType] = useState('');
  const [payloadIsArray, setPayloadIsArray] = useState(false);

  const [nameValidation, setNameValidation] = useState(validateInput(''));
  const [nameIsVisible, setNameVisibility] = useState(false);
  const [parameterNameValidation, setParameterNameValidation] = useState(validateInput(''));
  const [parameterNameIsVisible, setParameterNameVisiblility] = useState(false);

  const handleChange = (event: Event, setter: any, setValidation: any = '') => {
    const target: any = event.target;
    setter(target.type === 'checkbox' ? target.checked : target.value);
    if (setValidation !== '') {
      const result = validateInput(target.value);
      setValidation(result);
    }
  };

  const addProperty = () => {
    if (nameValidation.isValid && parameterNameValidation.isValid && parameterType && payloadType) {
      const updatedReducer = reducers[reducer];
      updatedReducer.actions[nameValidation.input] = {
        parameter: {
          name: parameterNameValidation.input,
          type: parameterType,
          array: parameterIsArray,
        },
        payload: {
          type: payloadType,
          array: payloadIsArray,
        },
        async: propertyIsAsync,
      };
      setReducer({ [reducer]: updatedReducer });
      setPropertyName('');
      setPropertyIsAsync(false);
      setParameterName('');
      setParameterType('');
      setParameterIsArray(false);
      setPayloadType('');
      setPayloadIsArray(false);

      setNameVisibility(false);
      setParameterNameVisiblility(false);
    } else {
      setNameVisibility(true);
      setParameterNameVisiblility(true);
    }
  };

  const deleteProperty = (property: string) => {
    const updatedReducer = reducers[reducer];
    delete updatedReducer.actions[property];
    setReducer({ [reducer]: updatedReducer });
  };

  return (
    <React.Fragment>
    <form className="new-action-item">
<div           style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(8, 1fr)',
                  gridTemplateRows: '30px',
                  gridGap: '5px'    
                  }}>


<div   style={{ gridColumn: '1 / span 8',
                backgroundColor: '#def8ff', 
                }}>ACTIONS</div>

    <div    style={{ gridColumn: '1 / span 1', backgroundColor: '#eee', height: '40px'}}>NAME</div>
    <div    style={{ gridColumn: '2 / span 1', backgroundColor: '#eee', height: '40px'}}>ASYNC</div>
    <div     style={{ gridColumn: '3 / span 1', backgroundColor: '#eee', height: '40px'}}>PARAMETER</div>
    <div    style={{ gridColumn: '4 / span 1', backgroundColor: '#eee', height: '40px'}}>PARAMETER TYPE</div>
    <div    style={{ gridColumn: '5 / span 1', backgroundColor: '#eee', height: '40px'}}>PARAMETER ARRAY</div>
    <div    style={{ gridColumn: '6 / span 1', backgroundColor: '#eee', height: '40px'}}>PAYLOAD TYPE</div>
    <div    style={{ gridColumn: '7 / span 1', backgroundColor: '#eee', height: '40px'}}>PAYLOAD ARRAY</div>
    <div    style={{ gridColumn: '8 / span 1', backgroundColor: '#eee', height: '40px'}}>ACTION</div>

    
    {reducers[reducer].actions && 
      Object.keys(reducers[reducer].actions).map(action => (
        <React.Fragment>

    <div  style={{ gridColumn: '1 / span 1'}} key={`action${action}`}>{action}</div>
    <div  style={{ gridColumn: '2 / span 1'}}>{reducers[reducer].actions[action].async ? '✓' : '×'}</div>
    <div  style={{ gridColumn: '3 / span 1'}}>{reducers[reducer].actions[action].parameter.name}</div>
    <div  style={{ gridColumn: '4 / span 1'}}>{reducers[reducer].actions[action].parameter.type}</div>
    <div   style={{ gridColumn: '5 / span 1'}}>{reducers[reducer].actions[action].parameter.array ? '✓' : '×'}</div>
    <div  style={{ gridColumn: '6 / span 1'}}>{reducers[reducer].actions[action].payload.type}</div>
    <div  style={{ gridColumn: '7 / span 1'}}>{reducers[reducer].actions[action].payload.array ? '✓' : '×'}</div>
    <div  style={{ gridColumn: '8 / span 1'}}>
                      <IconButton
                        aria-label={`delete action "${action}"`}
                        onClick={() => deleteProperty(action)}>
                        <Icon>delete</Icon>
                      </IconButton>
    </div>
    </React.Fragment>
              ))}


            <ErrorMessage validation={nameValidation} visible={nameIsVisible} />

      <div  style={{ gridColumn: '1 / span 1'}}>
                <TextField
                  label="name"
                  value={propertyName}
                  onChange={() => {
                    handleChange(event, setPropertyName, setNameValidation);
                  }}
                  required
                />
      </div>


      <div  style={{ gridColumn: '2 / span 1'}}>
          <FormControlLabel
            control={
              <Checkbox
                checked={propertyIsAsync}
                onChange={() => {
                  handleChange(event, setPropertyIsAsync);
                }}
              />
            }
            label="array" />
      </div>

        <ErrorMessage validation={parameterNameValidation} visible={parameterNameIsVisible} />

      <div  style={{ gridColumn: '3 / span 1'}}>
                <TextField
                  label="name"
                  value={parameterName}
                  onChange={() => {
                    handleChange(event, setParameterName, setParameterNameValidation);
                  }}
                  required
                />
      </div>


      <div  style={{ gridColumn: '4 / span 1'}}>

                <TypeSelect
                  selectName="parameter-type"
                  outer={reducer}
                  interfaces={interfaces}
                  value={parameterType}
                  handleChange={(event: Event) => {
                    handleChange(event, setParameterType);
                  }}
                  required
                />
      </div>

      <div  style={{ gridColumn: '5 / span 1'}}>   

                <FormControlLabel
                  control={
                    <Checkbox
                      checked={parameterIsArray}
                      onChange={() => {
                        handleChange(event, setParameterIsArray);
                      }}
                    />
                  }
                  label="array"
                />
      </div>

      <ErrorMessage validation={nameValidation} visible={false} />


      <div  style={{ gridColumn: '6 / span 1'}}>
    
                <TypeSelect
                  selectName="payload-type"
                  outer={reducer}
                  interfaces={interfaces}
                  value={payloadType}
                  handleChange={(event: Event) => {
                    handleChange(event, setPayloadType);
                  }}
                />
      </div>


      <div  style={{ gridColumn: '7 / span 1'}}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={payloadIsArray}
                      onChange={() => {
                        handleChange(event, setPayloadIsArray);
                      }}
                    />
                  }
                  label="array"
                />
      </div>

      <div  style={{ gridColumn: '8 / span 1'}}>
              <IconButton
                aria-label="add action"
                onClick={addProperty}
                className={
                  nameValidation.isValid
                  && parameterNameValidation.isValid
                  && parameterType
                  && payloadType
                    ? ''
                    : 'disabled'
                }>
                <Icon>add</Icon>
              </IconButton>
      </div>
</div>
    </form>
    </React.Fragment>
  );
};

export default Actions;
