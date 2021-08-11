import Card from 'components/Card/Card'
import React, { useCallback, useEffect, useState } from 'react'
import './Column.scss'
import { Dropdown, Form } from 'react-bootstrap'

import { Container, Draggable } from 'react-smooth-dnd'

import { mapOrder } from 'utilities/sort'
import { MODAL_ACTION_CONFIRM } from 'utilities/const'
import { selectAlltext, saveContentEnterPress } from 'utilities/contentEditable'


// Component
import ConfirmModal from 'components/Common/ConfirmModal'

const Column = (props) => {
    const { column, onCardDrop, onUpdateColumn } = props

    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    // state
    const [displayConfirmModal, setDisplayConfirmModal] = useState(false)
    const [columnTitle, setColumnTitle] = useState('')

    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])
    const handleTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

    // action

    const toggleConfirmModal = () => setDisplayConfirmModal(!displayConfirmModal)

    const onConfirmModal = (type) => {

        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn)
        }
        toggleConfirmModal()
    }

    const handleTitleBlur = () => {
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumn(newColumn)
    }

    return (

        <div className='column'>
            <header className='column-drag column-drag-handle'>
                <div className='column-title'>
                    <Form.Control
                        size="sm"
                        type="text"
                        className='column-input text-inputable'
                        value={columnTitle}
                        spellCheck='false'
                        onClick={selectAlltext}
                        onChange={handleTitleChange}
                        onBlur={handleTitleBlur}
                        onKeyDown={saveContentEnterPress}
                        onMouseDown={e => e.preventDefault()}
                    />
                </div>
                <div className='column-dropdown'>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" className='column-toggle'>
                            <i className='fa fa-ellipsis-v' />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item >Add card</Dropdown.Item>
                            <Dropdown.Item onClick={toggleConfirmModal}>Delete card</Dropdown.Item>
                            <Dropdown.Item >...</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
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
            <ConfirmModal
                show={displayConfirmModal}
                onAction={onConfirmModal}
                title='Remove column'
                content={`Do you want to remove column: 
                ${column.title}? 
                All item in column will be remove...`}
            />
        </div>
    )
}

export default Column