import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CodePreview from '../src/components/CodePreview.tsx';
import BottomTabs from '../src/components/BottomTabs.tsx';
import { initialAppStateMock, initialAppStateMock2 } from '../__mocks__/appStateMocks.ts';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../src/reducers/index'

const store = createStore(reducers);

afterEach(cleanup);

test('<CodePreview /> is in the DOM', () => {
  const { debug, getByTestId } = render(<CodePreview 
    focusComponent={initialAppStateMock.focusComponent} 
    components={initialAppStateMock.components} 
  />);
  expect(getByTestId('code-preview')).toBeInTheDocument();
  expect(getByTestId('code-preview').tagName).toBe('DIV');
});

test('<BottomTabs/> is in the DOM', () => {
  const { debug, getByTestId } = render(<Provider store={store}><BottomTabs
    focusComponent={initialAppStateMock.focusComponent} 
    components={initialAppStateMock.components} 
  /></Provider>);
  expect(getByTestId('bottom-tabs')).toBeInTheDocument();
  expect(getByTestId('bottom-tabs').tagName).toBe('DIV');
});