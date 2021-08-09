import React from 'react'
import './Card.scss'

const Task = (props) => {
    const { card } = props

    return (
        <div className='card-item'>
            {card.cover && <img
                src={card.cover}
                className='card-img'
                alt=' this is img'
                onMouseDown={e => e.preventDefault()}
            />}
            {card.title}
        </div>
    )
}

export default Task