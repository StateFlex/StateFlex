import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import * as actions from '../actions/components';
import { ReducersInterface, InputValidation } from '../utils/InterfaceDefinitions';
import Reducer from './Reducer';
import validateInput from '../utils/validateInput.util';
import ErrorMessage from './ErrorMessage';
import Button from '@material-ui/core/Button';

const mapDispatchToProps = (dispatch: any) => ({
  setReducer: (reducer: ReducersInterface) => dispatch(actions.setReducer(reducer)),
  deleteReducer: (reducer: string) => dispatch(actions.deleteReducer(reducer)),
});

const mapStateToProps = (store: any) => ({
  interfaces: store.workspace.storeConfig.interfaces,
  reducers: store.workspace.storeConfig.reducers,
});

interface PropsInterface {
  setReducer: any;
  deleteReducer: any;
  interfaces: any;
  reducers: any;
}

interface StateInterface {
  nameInput: string;
  validation: InputValidation;
  isVisible: boolean;
}

class Reducers extends Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      nameInput: '',
      validation: validateInput(''),
      isVisible: false,
    };
  }

  handleChange = (event: Event) => {
    if (event.target.value.length < 18) {
      const target: HTMLInputElement = event.target;
      const result: InputValidation = validateInput(target.value);
      this.setState({ nameInput: target.value, validation: result });
    }
  };

  createReducer = () => {
    if (this.state.validation.isValid) {
      const reducerName = this.state.validation.input;
      this.props.setReducer({ [reducerName]: { store: {}, actions: {} } });
      this.setState({ nameInput: '' });
      this.setState({ isVisible: false });
    } else {
      this.setState({ isVisible: true });
    }
  };

  render() {
    return (
  <section>
  <form id="new-reducer">
  <div className="Reducers">
    
        
    <div className="Reducers-submit">
              <Button
                aria-label="Add Reducer"
                onClick={this.createReducer}
                type="submit"
                variant="contained"
                size="large">
                ADD REDUCER
              </Button>
    </div>

    <div className="Reducers-input">
              <TextField
                label="new reducer"
                value={this.state.nameInput}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    this.createReducer();
                    event.preventDefault();
                  }
                }}
                required
              />
    </div>
    
   
    <div className="Reducers-values">
          {this.props.reducers
            && Object.keys(this.props.reducers).map(reducer => (
              <Reducer
                reducer={reducer}
                reducers={this.props.reducers}
                interfaces={this.props.interfaces}
                setReducer={this.props.setReducer}
                deleteReducer={this.props.deleteReducer}
                key={`reducer${reducer}`}
              />
            ))}
    </div>
        <ErrorMessage validation={this.state.validation} visible={this.state.isVisible} />
  
</div>
</form>
</section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reducers);
