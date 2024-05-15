import React from 'react';
import './feed.css'
import TemporaryDrawer from '../Drawer/drawer';

function FeedIndex() {
  return (
    <div className='feedContainer'>
      <div className='feedStart'>
        <TemporaryDrawer></TemporaryDrawer>
      </div>
      <div className='feedTop'>
        <p>O que está pensando?</p>
      </div>
    </div>
  );
}

export default FeedIndex;
