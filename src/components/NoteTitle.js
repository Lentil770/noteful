import React from 'react';
import { Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
import PropTypes from 'prop-types';

export default class NoteTitle extends React.Component {
    static contextType = NotefulContext;

    deleteNote = () => {
        const { noteID } = this.props;
        const address = 'http://localhost:9090/notes/' + noteID;
        console.log(this.props.name, address);
        
        fetch(address, {
            method: 'DELETE',
        }).then(response => {
            if (!response.ok) {
                throw new Error()
            }
            return response.json;
        }
        ).then(res => {
            this.context.deleteNote(noteID)
        })
        .catch(err => console.log(err))
    }
    render() {
        return (
            <div className='titleName'>
                    <Link 
                        to={'/note/' + encodeURIComponent(this.props.name)}
                    >{this.props.name}</Link>
                <p>date modified: {this.props.modified}</p>
                <Link to='/'>
                    <button className='deleteButton' 
                        onClick={this.deleteNote}>
                        Delete Note
                    </button>
                </Link>
            </div>
        )
    }
}

NoteTitle.propTypes = {
    name: PropTypes.string,
    onDelete: PropTypes.func
}

NoteTitle.defaultProps = {
    name: 'dummynotename',
    modified: 'dummydate:0.2.1999',
    folderId: 'defaultID',
}

