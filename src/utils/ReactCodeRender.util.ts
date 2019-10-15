import {
    ComponentInt,
    ComponentsInt,
    ChildInt,
    ChildrenInt,
    PropInt,
    ComponentStateInterface
  } from './InterfaceDefinitions';
  import cloneDeep from './cloneDeep';

  
  const ReactComponentRender = (component: ComponentInt, components: ComponentsInt) => {
    const {
      childrenArray,
      title,
      props,
      componentState
    }: {
    childrenArray: ChildrenInt;
    title: string;
    props: PropInt[];
    componentState: ComponentStateInterface[];
    } = component;
  
    function typeSwitcher(type: string) {
      switch (type) {
        case 'string':
          return 'string';
        case 'number':
          return 'number';
        case 'object':
          return 'object';
        case 'array':
          return 'any[]';
        case 'bool':
          return 'boolean';
        case 'function':
          return '() => any';
        case 'node':
          return 'string';
        case 'element':
          return 'string';
        case 'tuple':
          return '[any]';
        case 'enum':
          return '{}';
        case 'any':
          return 'any';
        case type:
          return `${type}`
        default:
          return 'any';
      }
    }
  
    function propDrillTextGenerator(child: ChildInt) {
      if (child.childType === 'COMP') {
        return components
          .find((c: any) => c.id === child.childComponentId)
          .props.map((prop: PropInt) => `${prop.key}={${prop.value}}`)
          .join(' ');
      }
      if (child.childType === 'HTML') {
        const keys: string[] = Object.keys(child.HTMLInfo);
        return keys.map(key => `${key}={${htmlAttrSanitizer(child.HTMLInfo[key])}}`).join(' ');
      }
      return '';
    }
  
    function htmlAttrSanitizer(element: string) {
      // TODO: debug localForage unhappiness to renable image imports
      // this shouldn't be needed, but some characters make localForage unhappy
      return `${element}`;
        // .replace(/[a-z]+/gi, word => word[0].toUpperCase() + word.slice(1))
        // .replace(/[-_\s0-9\W]+/gi, '');
    }

    function questionMark(required){
      let output = '';
      if(!required) output = '?';
      return output;
    }
  
    function componentNameGenerator(child: ChildInt) {
      if (child.childType === 'HTML') {
        switch (child.componentName) {
          case 'image':
            return 'img';
          case 'form':
            return 'form';
          case 'button':
            return 'button';
          case 'link':
            return 'a href=""';
          case 'list':
            return 'ul';
          case 'paragraph':
            return 'p';
          default:
            return 'div';
        }
      } else {
        return child.componentName;
      }
    }

    const reservedTypeScriptTypes = [
      'string',
      'boolean',
      'number',
      'any',
      'string[]',
      'boolean[]',
      'number[]',
      'any[]',
    ];
  
    const listOfInterfaces = props.reduce((interfaces, current) => {
      if (!reservedTypeScriptTypes.includes(current.type) && !interfaces.includes(current.type)) {
        interfaces.push(current.type);
      }
      return interfaces;
    }, []);

    const interfacesToImport = listOfInterfaces.length
    ? `import {${listOfInterfaces.join(', ')}} from '../Interfaces'`
    : '';
  
    return `
      import React from 'react';
      ${interfacesToImport}
      ${childrenArray
      .filter(child => child.childType !== 'HTML')
      .map(child => `import ${child.componentName} from './${child.componentName}.tsx'`)
      .reduce((acc: Array<string>, child) => {
        if (!acc.includes(child)) {
          acc.push(child);
          return acc;
        }
        return acc;
      }, [])
      .join('\n')}
      
      type Props = {
        ${props.map(prop => `${prop.key + questionMark(prop.required)}: ${typeSwitcher(prop.type)}`).join('\n')}
      }
  
      const ${title} = (props: Props) => {
        const {${props.map(el => el.key).join(',\n')}} = props
        
        return (
          <div>
          ${cloneDeep(childrenArray)
      .sort((a: ChildInt, b: ChildInt) => a.childSort - b.childSort)
      .map(
        (child: ChildInt) => `<${componentNameGenerator(child)} ${propDrillTextGenerator(child)}/>`,
      )
      .join('\n')}
          </div>
        );
      }
      export default ${title};
    `;
  };
  
  export default ReactComponentRender;
  