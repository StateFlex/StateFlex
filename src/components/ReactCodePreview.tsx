import React, { Component } from 'react';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx';
import { ghcolors as style } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { formatter } from '../utils/formatter.util';
import componentRender from '../utils/componentRender.util';
import ReactComponentRender from '../utils/ReactCodeRender.util'
import { ComponentInt, ComponentsInt } from '../utils/InterfaceDefinitions';

SyntaxHighlighter.registerLanguage('jsx', jsx);
type Props = {
  focusComponent: ComponentInt;
  components: ComponentsInt;
};

class ReactCodePreview extends Component<Props> {
  render(): JSX.Element {
    const focusComponent: ComponentInt = this.props.focusComponent;
    const components: ComponentsInt = this.props.components;
    return (
      <div style={{height: '100%',  marginTop: '20px'}}>
        <SyntaxHighlighter
          style={style}
          language="javascript"
          customStyle={{
            background: 'transparent',
            overflow: 'auto',
            fontSize: '16px',
            backgroundColor: '#fff',
            border: 'none',
            
            borderRadius: 0,
            margin: '0px 0px 0px 0px',
            height: '100%',
          }}>
          {formatter(ReactComponentRender(focusComponent, components))}
        </SyntaxHighlighter>
      </div>
    );
  }
}

export default ReactCodePreview;
