import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const StoreItemHeader = (props: any) => {
  const { storeItem, deleter } = props;
  const [dialogIsVisible, setDialogVisibility] = useState(false);

  const toggleVisibility = () => {
    setDialogVisibility(!dialogIsVisible);
  };

  return (
    <React.Fragment>
      <div className="confirm-delete" style={{ display: dialogIsVisible ? 'flex' : 'none' }}>
        <div>
          <Button variant="contained" onClick={() => deleter(storeItem)} className="delete">
            Delete&nbsp;“{storeItem}”
          </Button>
          <Button variant="contained" onClick={() => toggleVisibility()}>
            Cancel
          </Button>
        </div>
      </div>



          <div  style={{display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#eee',}}>

          <div>
                <IconButton
                    aria-label={`delete "${storeItem}"`}
                    onClick={() => toggleVisibility()}
                    className="delete-store-item">
                <Icon>
                    delete
                </Icon>
                </IconButton>
          </div>

          <div  style={{fontSize: '20px',
                        height: '100%',
                        color: '333',
                        height: '30px',
                        alignItems: 'end',
                        height: '100%',
                        color: '#333'}}>
                Interface name: <b>{storeItem}</b>
          </div>


      </div>

    </React.Fragment>
  );
};

export default StoreItemHeader;
