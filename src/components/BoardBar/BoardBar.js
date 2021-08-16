import React from 'react'
import './BoardBar.scss'
import { initData } from 'actions/initData'
import Contact from 'components/Contact/Contact'

const BoardBar = () => {
    const contactList = initData.contact

    return (
        <nav className='navbar bar'>
            {
                contactList.map(contact => <Contact key={contact.id} contact={contact} />)
            }
        </nav>
    )
}

export default BoardBar