import Column from 'components/Column/Column'
import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'

import { mapOrder } from 'utilities/sort'
import { initData } from 'actions/initData'
import { applyDrag } from 'utilities/dragDrop'

const BoardContent = () => {
    const [board, setBoard] = useState({})
    const [columns, setColumns] = useState([])

    useEffect(() => {
        const boardfromDB = initData.boards.find(board => board.id === 'board-1')
        if (boardfromDB) {
            setBoard(boardfromDB)

            setColumns(mapOrder(boardfromDB.columns, boardfromDB.columnOrder, 'id'))
        }
    }, [])


    if (isEmpty(board)) {
        return <div className='not-found'>Board is not found</div>
    }
    const onColumnDrop = (dropResult) => {
        console.log(dropResult)
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
                        <Column column={column} onCardDrop={onCardDrop} />
                    </Draggable>
                ))}
            </Container>
            <div className='board-actions ml-10'>
                <i className='fa fa-plus icon' />
                Add card
            </div>

        </div>

    )
}

export default BoardContent