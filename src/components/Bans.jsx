import React from 'react';

const Bans = ({list=[], onClick}) => {

    return (
        <div className="Bans">
            <h3>Ban List</h3>
            <p>Click on any category to unban</p>
            {list.map((item, index) => (
                <button key={index} onClick={() => onClick("")}>{item}</button>
            ))}
        </div>
    );
};

export default Bans;