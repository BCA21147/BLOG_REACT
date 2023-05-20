import React from 'react'
import './GoToTop.css';
import { FaHandPointUp } from 'react-icons/fa';

const GotoTop = () => {
    return (
        <div>
            <a href="#" className="go-top icon_user" title='go-top'><FaHandPointUp className='icon'/></a>
        </div>
    )
}

export default GotoTop