import React from 'react';
import CodePreview from './CodePreview';
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/InterfaceDefinitions';


interface PropsInt {
  focusChild: ChildInt;
  components: ComponentsInt;
  focusComponent: ComponentInt;
  classes: any;
}


const RightPanel = ({focusComponent, components}) => {
  return (
    <CodePreview focusComponent={focusComponent} components={components} />
  );
};



export default RightPanel;
