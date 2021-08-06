import Task from 'components/Task/Task';
import React from 'react';
import './Column.scss';

const Column = () => {
    return (
        <div className='column'>
            <header>Header</header>
            <ul className='task-list'>
                <Task />
                <li className='task-item'>Add title</li>
                <li className='task-item'>Add title</li>
                <li className='task-item'>Add title</li>
            </ul>
            <footer>
            </footer>
        </div>
    );
}

export default Column;
