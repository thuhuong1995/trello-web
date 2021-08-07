import Column from 'components/Column/Column';
import React, { useEffect, useState } from 'react';
import './BoardContent.scss';
import { isEmpty } from 'lodash';

import { mapOrder } from 'utilities/sort'
    ;
import { initData } from 'actions/initData';

const BoardContent = () => {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        const boardfromDB = initData.boards.find(board => board.id === 'board-1');
        if (boardfromDB) {
            setBoard(boardfromDB);

            setColumns(mapOrder(boardfromDB.columns, boardfromDB.columnOrder, 'id'));
        }
    }, []);

    if (isEmpty(board)) {
        return <div className='not-found'>Board is not found</div>
    }

    return (
        <div className='board-content'>
            {columns.map((column, index) =>
                <Column key={index} column={column} />
            )}

        </div>


    );
}

export default BoardContent;
