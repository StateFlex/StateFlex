import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import { updateHtmlAttr } from '../actions/components';
import { HTMLelements } from '../utils/htmlElements.util';
import { ComponentInt, ChildInt } from '../utils/InterfaceDefinitions';

interface PropsInt {
  updateHtmlAttr?: any;
  focusComponent?: ComponentInt;
  classes?: any;
  deleteProp?: any;
  addProp?: any;
  focusChild?: ChildInt;
}

interface StateInt {}

const styles = (theme: any): any => ({
  root: {
    display: 'flex',
    height: '30px',
    justifyContent: 'flex-start',
    alignContent: 'flex-end',
    background: '#fff',
    color: '222',
    padding: '22px',
  },
  cssLabel: {
    color: '222',
  },
  cssFocused: {
    color: '#222',
  },
  input: {
    color: 'white',
    opacity: '1.0',
 
  },
});

const mapDispatchToProps = (dispatch: any) => ({
  updateHtmlAttr: ({ attr, value }: { attr: string; value: string }) => dispatch(updateHtmlAttr({ attr, value })),
});

const mapStateToProps = (store: any) => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
});

class HtmlAttr extends Component<PropsInt, StateInt> {
  constructor(props) {
    super(props);
    this.state = HTMLelements[this.props.focusChild.htmlElement].attributes.reduce((acc, attr) => {
      acc[attr] = '';
      return acc;
    }, {});
  }

  handleSave = (attr: string) => {
    this.props.updateHtmlAttr({ attr, value: this.state[attr] });
    this.setState({
      [attr]: '',
    });
  };

  handleChange = (event: any) => {
    this.setState({
      [event.target.id]: event.target.value.trim(),
    });
  };

  render() {
    const { classes, focusChild, focusComponent } = this.props;
    const focusChildType = focusChild.htmlElement;

    const HtmlForm = HTMLelements[focusChildType].attributes.map((attr: string, i: number) => (
      <Fragment>
          <div className={'bottom-panel-html-attributes-submit'}>
          <Button
                aria-label="Save"
       
                type="submit"
                // disabled={!this.state.propKey || !this.state.propType}
                onClick={() => this.handleSave(attr)}
                variant="contained"
                size="large">                                     
                ADD ATTRIBUTE
          </Button>
          </div>

          <div className={'bottom-panel-html-attributes-input'}>
          <TextField
            InputLabelProps={{
              classes: {
                root: classes.cssLabel,
                focused: classes.cssFocused,
              },
            }}
            InputProps={{
              classes: {
                root: classes.cssFocused,
                focused: classes.cssFocused,
                notchedOutline: classes.notchedOutline,
              },
            }}
            label={attr}
            id={attr}
            onChange={this.handleChange}
            value={this.state[attr]}
          />
          </div>

          <div className={'bottom-panel-html-attributes-assigned'}>
          <Paper className={classes.root}>
              {focusChild.HTMLInfo[attr] ? focusChild.HTMLInfo[attr] : ' no attribute assigned'}
          </Paper>
          </div>
          </Fragment>
    ));

    return (
      <div className={'bottom-panel-html-attributes'}>

        {HtmlForm}

      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(HtmlAttr));
