import React, { useState } from 'react';
import Store from './Store';
import Actions from './Actions';
import StoreItemHeader from './StoreItemHeader';

const Reducer = (props: any) => {

  const {
    reducer,
    reducers,
    interfaces,
    setReducer,
    deleteReducer,
  } = props;

  return (
    <React.Fragment>
    <div key={'reducer' + reducer} style={{ backgroundColor: '#eee'}}>  
      <StoreItemHeader storeItem={reducer} deleter={deleteReducer} />
    </div>
    <div>
      <Store
        reducer={reducer}
        reducers={reducers}
        interfaces={interfaces}
        setReducer={setReducer} />
    </div>
    <div>
      <Actions
        reducer={reducer}
        reducers={reducers}
        interfaces={interfaces}
        setReducer={setReducer} />
    </div>
    </React.Fragment> 
  );

};

export default Reducer;