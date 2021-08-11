import Column from 'components/Column/Column'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import './BoardContent.scss'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'
import { Container as BContainer, Row, Col, Form, Button } from 'react-bootstrap'

import { mapOrder } from 'utilities/sort'
import { initData } from 'actions/initData'
import { applyDrag } from 'utilities/dragDrop'

const BoardContent = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])
    const [openColForm, setOpenColForm] = useState(false)
    const newColumnInputRef = useRef(null)
    const [newColumnTitle, setNewColumnTitle] = useState('')

    const onInputChange = useCallback((e) => setNewColumnTitle(e.target.value), [])

    useEffect(() => {
        const boardfromDB = initData.boards.find(board => board.id === 'board-1')
        if (boardfromDB) {
            setBoard(boardfromDB)

            setColumns(mapOrder(boardfromDB.columns, boardfromDB.columnOrder, 'id'))
        }
    }, [])

    useEffect(() => {
        if (newColumnInputRef && newColumnInputRef.current) {
            newColumnInputRef.current.focus()
            newColumnInputRef.current.select()
        }
    }, [openColForm])


    if (isEmpty(board)) {
        return <div className='not-found'>Board is not found</div>
    }
    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(column => column.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
    }
    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

            let newColumns = [...columns]

            let currentColumn = newColumns.find(column => column.id === columnId)

            currentColumn.cards = applyDrag(currentColumn.cards, dropResult)

            currentColumn.cardOrder = currentColumn.cards.map(card => card.id)

            setColumns(newColumns)
        }

    }
    const toggleNewColForm = () => {
        setOpenColForm(!openColForm)
    }

    const onAddColumn = () => {
        if (!newColumnTitle) {
            newColumnInputRef.current.focus()
            return
        }

        const newColumnToAdd = {
            id: Math.random().toString(36).substr(2, 5),
            boardId: board.id,
            title: newColumnTitle.trim(),
            cardOrder: [],
            cards: []
        }
        let newColumns = [...columns]

        newColumns.push(newColumnToAdd)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(column => column.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
        setOpenColForm(false)
        setNewColumnTitle('')

    }

    const onUpdateColumn = (newColumnUpdate) => {
        const idColumnUpdate = newColumnUpdate.id

        let newColumns = [...columns]

        const indexColumnUpdate = newColumns.findIndex(item => item.id === idColumnUpdate)

        if (newColumnUpdate._destroy) {
            newColumns.splice(indexColumnUpdate, 1)
        } else {
            newColumns.splice(indexColumnUpdate, 1, newColumnUpdate)
        }

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(column => column.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
    }

    return (
        <div className='board-content'>
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column} onCardDrop={onCardDrop} onUpdateColumn={onUpdateColumn} />
                    </Draggable>
                ))}
            </Container>
            <BContainer className='b-container'>
                {/* button show form */}
                {
                    !openColForm && <Row className='w-250'>
                        <Col className='board-actions ml-10' onClick={toggleNewColForm}>
                            <i className='fa fa-plus icon' />
                            Add card
                        </Col>
                    </Row>
                }
                {/* form input new column */}
                {
                    openColForm ? <Row>
                        <Col className='board-form ml-10'>
                            <Form.Control
                                size="sm"
                                type="text"
                                placeholder="Enter column title"
                                className='board-input'
                                ref={newColumnInputRef}
                                value={newColumnTitle}
                                onChange={onInputChange}
                                onKeyDown={e => (e.keyCode === 13) && onAddColumn()}
                                onKeyUp={e => (e.keyCode === 27) && toggleNewColForm()}
                            />

                            <Button
                                className='board-btn board-btn--success'
                                variant="success"
                                size="sm"
                                onClick={onAddColumn}
                            >
                                Add column
                            </Button>
                            <Button
                                variant="danger"
                                size='sm'
                                className='board-btn board-btn--cancel ml-10'
                                onClick={toggleNewColForm}
                            >
                                Cancel
                            </Button>
                        </Col>
                    </Row> : ''
                }

            </BContainer>

        </div>

    )
}

export default BoardContent