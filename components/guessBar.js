import React, { useState } from 'react';

import styles from '../styles/GuessBar.module.css';

export default function GuessBar(props) {
    const goldle = props.goldle;
    const onGuess = props.onGuess;
    const onError = props.onError;

    const [value, setValue] = useState(props.value || '');

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newGuessState = goldle.guessName(value);
            if (newGuessState.guessState) {
                onGuess(newGuessState);
            } else if (newGuessState.error) {
                onError(newGuessState);
            }
        }
    }

    return(
        <div className={styles.container}>
            <input className={styles.guessBar} id='guessBar' type="text" defaultValue={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleSubmit} autoFocus></input>
        </div>
    );
}