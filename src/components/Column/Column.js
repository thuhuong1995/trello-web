import Card from 'components/Card/Card';
import React from 'react';
import './Column.scss';

import { mapOrder } from 'utilities/sort';


const Column = (props) => {
    const { column } = props;

    const cards = mapOrder(column.cards, column.cardOrder, 'id');

    return (
        <div className='column'>
            <header>{column.title}</header>
            <ul className='card-list'>

                {
                    cards.map((card, index) => <Card key={index} card={card} />)
                }
                {/* <li className='card-item'>Add title</li> */}
            </ul>
            <footer>
            </footer>
        </div>
    );
}

export default Column;
