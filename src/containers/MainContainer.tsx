import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MuiThemeProvider } from '@material-ui/core/styles';
import RightPanel from '../components/RightPanel';
import BottomPanel from '../components/BottomPanel';
import theme from '../components/theme';

import {
  handleTransform,
  changeFocusChild,
  changeComponentFocusChild,
} from '../actions/components';
import { ComponentInt, ComponentsInt } from '../utils/InterfaceDefinitions';
import TreeDisplay from '../components/NewTreeDisplay';
import Grid from '@material-ui/core/Grid';

interface PropsInt {
  components?: ComponentsInt;
  focusComponent?: ComponentInt;
  classes?: any;
  focusChild?: any;
  reduxView?: boolean;
}

interface StateInt {
  draggable: boolean;
  toggleClass: boolean;
  scaleX: number;
  scaleY: number;
  x: number;
  y: number;
  modal: any;
  windowWidth: 0;
  windowHeight: 0;
}

const mapDispatchToProps = (dispatch: any) => ({
  handleTransformation: (
    componentId: number,
    childId: number,
    {
      x, y, width, height,
    }: { x: number; y: number; width: number; height: number },
  ) => dispatch(
    handleTransform(componentId, childId, {
      x,
      y,
      width,
      height,
    }),
  ),
  // openPanel: component => dispatch(openExpansionPanel(component)),
  changeFocusChild: ({ childId }: { childId: number }) => dispatch(changeFocusChild({ childId })),
  changeComponentFocusChild: ({ componentId, childId }: { componentId: number; childId: number }) => dispatch(changeComponentFocusChild({ componentId, childId })), // if u send no prms, function will delete focus child.
});

const mapStateToProps = (store: any) => ({
  focusComponent: store.workspace.focusComponent,
  focusChild: store.workspace.focusChild,
  components: store.workspace.components,
  reduxView: store.workspace.reduxView
});

class MainContainer extends Component<PropsInt, StateInt> {
  constructor(props) {
    super(props);
    this.state = {
      draggable: false,
      toggleClass: true,
      scaleX: 1,
      scaleY: 1,
      x: 0,
      y: 0,
      modal: '',
      windowWidth: 0,
      windowHeight: 0,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ windowWidth: window.innerWidth, windowHeight: window.innerHeight });
  }

  render() {
    console.log('reduxView in Main is', this.props.reduxView)
    const { modal } = this.state;
    const {
      components, focusComponent, focusChild, classes, reduxView
    } = this.props;
    const { main }: any = this;

    return (
      <React.Fragment>
      <div className="app-grid-middle-panel" >
                 {modal}
      
                <TreeDisplay focusChild={focusChild}
                  components={components}
                  focusComponent={focusComponent}
                  classes={classes}>
                </TreeDisplay>
      </div>
      <div className="app-grid-right-panel">
      
                <RightPanel focusComponent={focusComponent} components={components} reduxView={reduxView} /> 
       </div>
       <div className="app-grid-bottom-panel">       
      
                <BottomPanel focusComponent={focusComponent} reduxView={reduxView} /> 
      </div>
      </React.Fragment>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer);
