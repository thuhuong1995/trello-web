import React from 'react'
import './contact.scss'

const Contact = (props) => {

    const { contact } = props
    return (
        <li className='contact'>
            <a className='contact__link' href={contact.src}>
                <span className='span1'></span>
                <span className='span2'></span>
                <span className='span3'></span>
                <span className='span4'></span>
                <img className='contact__img' src={contact.img} alt={contact.title} />
            </a>
        </li>
    );
}

export default Contact
