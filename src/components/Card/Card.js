import React from 'react';
import './Card.scss';

const Task = (props) => {
    const { card } = props;

    return (
        <li className='card-item'>
            {card.cover && <img src={card.cover} className='card-img' alt=' this is img' />}
            {card.title}
        </li>
    );
}

export default Task;
