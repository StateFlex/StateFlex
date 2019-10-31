import React from 'react';
import CodePreview from './CodePreview';
import ReactCodePreview from './ReactCodePreview';
import { ComponentInt, ComponentsInt, ChildInt } from '../utils/InterfaceDefinitions';


interface PropsInt {
  focusChild: ChildInt;
  components: ComponentsInt;
  focusComponent: ComponentInt;
  classes: any;
}


const RightPanel = ({focusComponent, components, reduxView}) => {
  return (
    <div>
      {reduxView && <CodePreview focusComponent={focusComponent} components={components} />}
      {!reduxView && <ReactCodePreview focusComponent={focusComponent} components={components} />}
    </div>
  );
};



export default RightPanel;
