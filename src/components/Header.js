import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {

    render() {
        return (
            <div className='header'>
                <Link to='/' onClick={e => this.props.changeSelectedFolder} ><h1>Noteful</h1></Link>
            </div>
        )
    }
}