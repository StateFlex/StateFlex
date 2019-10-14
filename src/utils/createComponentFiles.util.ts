import { formatter } from './formatter.util';
import componentRender from './componentRender.util';
import ReactComponentRender from './ReactCodeRender.util';



const createComponentFiles = (
  components: any,
  path: string,
  appName: string,
  exportAppBool: boolean,
  zip: any,
  reduxView: boolean
) => {
  let renderFunc = reduxView ? componentRender : ReactComponentRender;
  
  components.forEach((component: any) => {
    zip.file(
      `src/components/${component.title}.tsx`,
      formatter(renderFunc(component, components)),
    );
  });
  return path;
};

export default createComponentFiles;
