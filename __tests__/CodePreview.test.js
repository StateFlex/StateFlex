import React from 'react';
// import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
// import 'regenerator-runtime/runtime';

import CodePreview from '../src/components/CodePreview';
import App from '../src/components/App';
import AppContainer from '../src/containers/AppContainer';
import { initialAppStateMock, initialAppStateMock2 } from '../__mocks__/appStateMocks';

configure({ adapter: new Adapter() });

it('renders', () => {
    const { asFragment } = render(<CodePreview 
                        focusComponent={initialAppStateMock.focusComponent} 
                        components={initialAppStateMock.components} />);
    expect(asFragment()).toMatchSnapshot();
    // const { getByTestId } = render(<CodePreview />);
    // expect(getByTestId('code-preview')).toBeInTheDocument();
})

// describe('React unit tests', () => {
//     // describe('CodePreview', () => {
//     //     let wrapper;
//     //     const props = {
//     //         focusComponent: initialAppStateMock.focusComponent,
//     //         components: initialAppStateMock.components,
//     //     };

//     //     beforeAll(() => {
//     //         wrapper = shallow(<CodePreview {...props} />);
//     //     });

//     //     it('Renders a <div> tag', () => {
//     //         expect(wrapper.type()).toEqual('div');
//     //         // expect(wrapper.text()).toEqual('Mega: Markets');
//     //         // expect(wrapper.find('strong').text()).toMatch('Mega');
//     //     });
//     // });

//     describe('App', () => {
//         let wrapper;
//         // const props = {
//         //     focusComponent: initialAppStateMock.focusComponent,
//         //     components: initialAppStateMock.components,
//         // };

//         beforeAll(() => {
//             wrapper = shallow(<App />);
//         });

//         it('Renders AppContainer', () => {
//             // expect(wrapper.type()).toEqual('div');
//             expect(wrapper.find(AppContainer).exists()).toBe(true)
//             // expect(wrapper.text()).toEqual('Mega: Markets');
//             // expect(wrapper.find('strong').text()).toMatch('Mega');
//         });
//     });
// });