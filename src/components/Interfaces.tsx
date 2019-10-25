import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Tooltip from '@material-ui/core/Tooltip';
import * as actions from '../actions/components';
import { InterfacesInterface, InputValidation } from '../utils/InterfaceDefinitions';
import Interface from './Interface';
import validateInput from '../utils/validateInput.util';
import ErrorMessage from './ErrorMessage';
import Button from '@material-ui/core/Button';

const mapDispatchToProps = (dispatch: any) => ({
  setInterface: (myInterface: InterfacesInterface) => dispatch(actions.setInterface(myInterface)),
  deleteInterface: (interfaceName: string) => dispatch(actions.deleteInterface(interfaceName)),
});

const mapStateToProps = (store: any) => ({
  interfaces: store.workspace.storeConfig.interfaces,
});

interface PropsInterface {
  setInterface?: any;
  deleteInterface?: any;
  interfaces?: any;
  classes?: any;
  validateInput?: any;
}

interface StateInterface {
  newInterfaceValidation: InputValidation;
  newInterfaceNameInput: string;
  isVisible: boolean;
}

class Interfaces extends Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      newInterfaceValidation: { isValid: false, input: '', error: '' },
      newInterfaceNameInput: '',
      isVisible: false,
    };
  }

  createInterface = () => {
    if (this.state.newInterfaceValidation.isValid === true) {
      const interfaceName = this.state.newInterfaceValidation.input;
      this.props.setInterface({ [interfaceName]: {} });
      this.setState({ newInterfaceNameInput: '' });
      this.setState({ isVisible: false });
    } else {
      this.setState({ isVisible: true });
    }
  };

  handleChange = (event: Event) => {
    if (event.target.value.length < 18) {
      const target: HTMLInputElement = event.target;
      const result: InputValidation = validateInput(target.value);
      this.setState({ newInterfaceNameInput: target.value, newInterfaceValidation: result });
    }
  };

  render() {
    return (
      <section>
         
         <div className="Interfaces">
         
          <div className="Interfaces-submit"> 
          <Button
                aria-label="Add Interface"
                onClick={this.createInterface}
                type="submit"
                variant="contained"
                size="large">
                ADD INTERFACE
          </Button>
          </div>
      
          <div className="Interfaces-input">
          <TextField
                label="new interface"
                value={this.state.newInterfaceNameInput}
                onChange={this.handleChange}
                onKeyPress={(event) => {
                        if (event.key === 'Enter') {
                        this.createInterface();
                        event.preventDefault();
                        }}}
                required />
          </div>
         


          <div className="Interfaces-values">
          {this.props.interfaces
            && Object.keys(this.props.interfaces).map(thisInterface => (
              <Interface
                thisInterface={thisInterface}
                interfaces={this.props.interfaces}
                setInterface={this.props.setInterface}
                deleteInterface={this.props.deleteInterface}
                key={`interface${thisInterface}`}
              />
            ))}
         </div>

       </div>
     
      </section>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Interfaces);
