import Card from 'components/Card/Card'
import React from 'react'
import './Column.scss'

import { Container, Draggable } from 'react-smooth-dnd'

import { mapOrder } from 'utilities/sort'


const Column = (props) => {
    const { column, onCardDrop } = props

    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    return (
        <div className='column'>
            <header className='column-drag column-drag-handle'>{column.title}</header>
            <div className='card-list'>

                <Container
                    groupName="task-item"
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass='card-ghost'
                    dropClass='card-ghost-drop'

                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {
                        cards.map((card, index) => <Draggable key={index}><Card card={card} column={column} /></Draggable>)
                    }
                </Container>
            </div>
            <footer>
                <div className='footer-actions'>
                    <i className='fa fa-plus icon' />
                    Add column
                </div>
            </footer>
        </div>
    )
}

export default Column