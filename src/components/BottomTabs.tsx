import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Tooltip from '@material-ui/core/Tooltip';
import HtmlAttr from './HtmlAttr';
import CodePreview from './CodePreview';
import Props from './Props';
import ReactCodePreview from './ReactCodePreview'
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/InterfaceDefinitions';
import ComponentReduxSetup from './ComponentReduxSetup';
import LocalState from './LocalState';

interface PropsInt {
  focusChild: ChildInt;
  components: ComponentsInt;
  focusComponent: ComponentInt;
  classes: any;
  reduxView: boolean;
}

// interface TreeInt {
//   name: string;
//   attributes: { [key: string]: { value: string } };
//   children: TreeInt[];
// }

const styles = (theme: any): any => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#333333',
    height: '100%',
    color: '#fff',
    // boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  },
  tabsRoot: {
    borderBottom: '0.5px solid #424242',
  },
  tabsIndicator: {
    backgroundColor: '#1de9b6',
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing.unit * 4,

    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      color: '#1de9b6',
      opacity: 1,
    },
    '&$tabSelected': {
      color: '#33eb91',
      fontWeight: theme.typography.fontWeightMedium,
    },
    '&:focus': {
      color: '#4aedc4',
    },
  },
  tabSelected: {},
  typography: {
    padding: theme.spacing.unit * 3,
  },
  padding: {
    padding: `0 ${theme.spacing.unit * 2}px`,
  },
});

class BottomTabs extends Component<PropsInt> {
  state = {
    value: 0,
  };

  handleChange = (event: any, value: number) => {
    this.setState({ value });
  };

  generateComponentTree(componentId: number, components: ComponentsInt) {
    const component = components.find(comp => comp.id === componentId);
    const tree = { name: component.title, attributes: {}, children: [] };

    component.childrenArray.forEach((child) => {
      if (child.childType === 'COMP') {
        tree.children.push(this.generateComponentTree(child.childComponentId, components));
      } else {
        tree.children.push({
          name: child.componentName,
          attributes: {},
          children: [],
        });
      }
    });
    return tree;
  }

  render() {
    const {
      classes, components, focusComponent, focusChild, reduxView
    } = this.props;
    const { value } = this.state;

    // display count on the tab. user can see without clicking into tab
    const propCount = focusComponent.props.length;
    const componentStateCount = focusComponent.componentState.length;
    const htmlAttribCount = focusComponent.childrenArray.filter(child => child.childType === 'HTML')
      .length;

    return (
      <div className={classes.root}>
        <Tabs
          value={value}
          onChange={this.handleChange}
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}>
          {reduxView ?
          <Tooltip
          title="give selected component connections to the redux store/actions"
          aria-label="give selected component connections to the redux store/actions"
          placement="top">
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={`Redux Connections ${propCount ? `(${propCount})` : ''} `}
              />
          </Tooltip>
          :
          <Tooltip
          title="Component Props"
          aria-label="Component Props"
          placement="top">
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={`Component Props ${propCount ? `(${propCount})` : ''} `}
              />
          </Tooltip>
          }
          <Tooltip
            title="give selected component local state"
            aria-label="give selected component local state"
            placement="top">
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={`Local State ${componentStateCount ? `(${componentStateCount})` : ''} `}
              />
          </Tooltip>
          <Tooltip
            title="edit attributes of currently selected HTML element"
            aria-label="edit attributes of currently selected HTML element"
            placement="top">
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={`HTML Element Attributes ${htmlAttribCount ? `(${htmlAttribCount})` : ''} `}
              />
          </Tooltip>
          {/* <Tooltip
            title="react code preview"
            aria-label="react code preview"
            placement="top">
            <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label={'react code preview'}
            />
          </Tooltip> */}
          {reduxView ?          
          <Tab
            disableRipple
            classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
            label="Code Preview"
          />
          :
          <Tooltip
            title="react code preview"
            aria-label="react code preview"
            placement="top">
            <Tab
              disableRipple
              classes={{ root: classes.tabRoot, selected: classes.tabSelected }}
              label={'React Code Preview'}
            />
          </Tooltip>
          }
        </Tabs>
        <div id="code-preview-outer">
          {/* {(reduxView && value === 0) ? 
          <CodePreview focusComponent={focusComponent} components={components} />  
          :
          <ReactCodePreview focusComponent={focusComponent} components={components} />
          } */}
          {reduxView && value === 3 && <CodePreview focusComponent={focusComponent} components={components} />}
          {!reduxView && value === 3 && <ReactCodePreview focusComponent={focusComponent} components={components} />}
          {reduxView && value === 0 && <ComponentReduxSetup focusComponent={focusComponent} />}
          {!reduxView && value === 0 && <Props />}
          {reduxView && value === 2 && focusChild.childType === 'HTML' && <HtmlAttr />}
          {!reduxView && value === 2 && focusChild.childType === 'HTML' && <HtmlAttr />}
          {value === 2 && focusChild.childType !== 'HTML' && (
            <p>select an HTML element to view attributes</p>
          )}
          {/* {!reduxView && value === 2 && focusChild.childType !== 'HTML' && (
            <p>select an HTML element to view attributes</p>
          )} */}
          {value === 1 && <LocalState focusComponent={focusComponent} />}
          {/* {value === 0 && <CodePreview focusComponent={focusComponent} components={components} />} */}
          {/* {value === 1 && <ComponentReduxSetup focusComponent={focusComponent} />}
          {value === 2 && focusChild.childType === 'HTML' && <HtmlAttr />}
          {value === 2 && focusChild.childType !== 'HTML' && (
            <p>select an HTML element to view attributes</p>
          )} */}
          {/* {value === 3 && <ReactCodePreview focusComponent={focusComponent} components={components} />} */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(BottomTabs);
