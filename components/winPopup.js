import React, { useEffect, useState } from 'react';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import styles from '../styles/Popup.module.css';
import moreStyles from '../styles/WinPopup.module.css';

export default function WinPopup(props) {
    
    const open = props.state;
    const goldle = props.goldle;

    return(
    <Popup open={open}
        contentStyle={{
            padding: 0,
            border: 'none',
            height: '50%',
            width: '45%'
        }}
        modal nested>
        {
            close => (
                <div className={`${styles.modal} ${moreStyles.modal}`}>
                    <div className={styles.container}>
                        <button onClick={() => close()} className={styles.close}>
                            &times;
                        </button>
                    </div>
                    <div className={styles.content}>
                        <div>Nice Work!</div>
                        <div>The Gator was</div>
                        <div className={styles.gator}>{goldle.showGator().name}</div>
                    </div>
                </div>
            )
        }
    </Popup>);
}