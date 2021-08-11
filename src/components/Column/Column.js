import Card from 'components/Card/Card'
import React, { useEffect, useRef, useState } from 'react'
import './Column.scss'
import { Dropdown, Form, Button } from 'react-bootstrap'
import { cloneDeep } from 'lodash'

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
    const [showAddCardForm, setShowAddCardForm] = useState(false)
    const newCardInputRef = useRef(null)
    const [newCardTitle, setNewCardTitle] = useState('')

    const onNewCardTitleChange = (e) => setNewCardTitle(e.target.value)

    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])
    const handleTitleChange = (e) => setColumnTitle(e.target.value)

    useEffect(() => {
        if (newCardInputRef && newCardInputRef.current) {
            newCardInputRef.current.focus()
            newCardInputRef.current.select()
        }

    }, [showAddCardForm])

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
    const onToggleAddCardForm = () => {
        setShowAddCardForm(!showAddCardForm)
    }
    const onAddCard = () => {
        if (!newCardTitle) {
            newCardInputRef.current.focus()
            return
        }
        const newCardToAdd = {
            id: Math.random().toString(36).substr(2, 5),
            boardId: column.boardId,
            title: newCardTitle.trim(),
            columnId: column.id,
            cover: ''
        }

        let newColumn = cloneDeep(column)
        newColumn.cards.push(newCardToAdd)
        newColumn.cardOrder.push(newCardToAdd.id)

        onUpdateColumn(newColumn)
        setNewCardTitle('')
        setShowAddCardForm(false)
    }

    return (

        <div className='column'>
            <header className='column-drag column-drag-handle'>
                {/* title */}
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
                {/* dropdown action */}
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
            {/* list item */}
            <div className='card-list'>
                {/* item in drag tag */}
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
                {/* form add card */}
                {showAddCardForm && <div className='add-new-card'>
                    <Form.Control
                        size="sm"
                        as="textarea"
                        rows='3'
                        placeholder="Enter a title for this card"
                        className='card-input'
                        ref={newCardInputRef}
                        value={newCardTitle}
                        onChange={onNewCardTitleChange}
                        onKeyDown={e => (e.keyCode === 13) && onAddCard()}
                        onKeyUp={e => (e.keyCode === 27) && onToggleAddCardForm()}
                    />

                    <Button
                        className='board-btn card-btn--success'
                        variant="success"
                        size="sm"
                        onClick={onAddCard}
                    >
                        Add card
                    </Button>
                    <Button
                        variant="danger"
                        size='sm'
                        className='board-btn card-btn--cancel ml-10'
                        onClick={onToggleAddCardForm}
                    >
                        Cancel
                    </Button>
                </div>}
            </div>
            {/* button show add card form */}
            {!showAddCardForm && <footer>
                <div className='footer-actions' onClick={onToggleAddCardForm}>
                    <i className='fa fa-plus icon' />
                    Add new card
                </div>
            </footer>}
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