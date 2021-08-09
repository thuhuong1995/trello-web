import Column from 'components/Column/Column'
import React, { useEffect, useState } from 'react'
import './BoardContent.scss'
import { isEmpty } from 'lodash'
import { Container, Draggable } from 'react-smooth-dnd'

import { mapOrder } from 'utilities/sort'
import { initData } from 'actions/initData'

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
                        <Column column={column} />
                    </Draggable>
                ))}
            </Container>

        </div>

    )
}

export default BoardContent