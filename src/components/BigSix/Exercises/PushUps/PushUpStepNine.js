import React from 'react';

const PushUpStepNine = () => {
    return (
        <>
            <div className="push-ups__header">
                <h3>Krok 9</h3>
                <h2>Pompki z dźwignią</h2>
            </div>
            <div className="push-ups__images">
                <div className="push-ups__image"/>
                <div className="push-ups__image"/>
            </div>
            <div className="push-ups__goals-container">
                <h3 className="push-ups__goals-title">Cele treningowe:</h3>
                <ul className="push-ups__goals-list">
                    <li>Próg początkowy: 2 serie po 5 powtórzeń</li>
                    <li>Próg średniozaawansowany: 2 serie po 10 powtórzeń</li>
                    <li>Próg przejścia: 2 serie po 20 powtórzeń</li>
                </ul>
            </div>
        </>
    );
};

export default PushUpStepNine;