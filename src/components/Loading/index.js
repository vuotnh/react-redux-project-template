import React from 'react';
// import CircularProgress from '@mui/material/CircularProgress';
import styles from './index.module.css';

// const LoadingGiF = require('../../assets/images/Loading/Eclipse.svg');

function Loading() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        left: 0,
        top: 0,
        backgroundColor: 'rgba(242, 242, 242, 0.3)',
        zIndex: 10000,
      }}>
      {/* <CircularProgress
        style={{ position: 'absolute', left: 'calc(50% - 1rem)', top: 'calc(50% - 1rem)' }}
      /> */}
      <div style={{ position: 'absolute', left: 'calc(50% - 1rem)', top: 'calc(50% - 1rem)' }}>
        {/* <img style={{ width: '100px' }} src={LoadingGiF.default} alt="loading" /> */}
        <div className={styles.loadingio_spinner_eclipse_urd3yi4xx0d}>
          <div className={styles.ldio_w5sesydu2yk}>
            <div />
          </div>
        </div>
      </div>
    </div>
  );
}

Loading.propTypes = {};

export default Loading;
