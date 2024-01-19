import React, { useState } from 'react';

import styles from '../styles/GuessBar.module.css';

export default function GuessBar(props) {
    const goldle = props.goldle;
    const onGuess = props.onGuess;

    const [value, setValue] = useState('');

    const handleSubmit = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            console.log("Guessed:", value);
            const newGuessState = goldle.guessName(value);
            if (newGuessState.guessState) {
                if (newGuessState.gameState) {
                    console.log(newGuessState.gameState);
                }
                onGuess(newGuessState);
            } else if (newGuessState.error) {
                console.log(newGuessState.error);
            }
        }
    }

    return(
        <div className={styles.container}>
            <input className={styles.guessBar} id='guessBar' type="text" onChange={(e) => setValue(e.target.value)} onKeyDown={handleSubmit} autoFocus></input>
        </div>
    );
}