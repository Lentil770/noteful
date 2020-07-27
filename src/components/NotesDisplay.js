import React from 'react';
import { Link } from 'react-router-dom';
import NoteTitle from './NoteTitle';
import NotefulContext from '../NotefulContext';
import ErrorBoundary from '../ErrorBoundary';
import './NotesDisplay.css';

export default class NotesDisplay extends React.Component {
    static contextType = NotefulContext;
    
    noteBoxes() {
        console.log('notesdisplay: this.context', this.context);
        const { folderID } = this.props.match.params;

        const notes = this.props.match.params.folderID
            ? this.context.filterNotes(folderID)
            : this.context.notes

        console.log('notes', notes);
        
        const noteslist = [];  
        for (let i=0;i<notes.length;i++) {
            noteslist.push(
                <li key={notes[i].id} >
                  <NoteTitle 
                      name={notes[i].name} 
                      modified={notes[i].modified} 
                      folderId={notes[i].folderId}
                      noteID = {notes[i].id}
                      onDelete={console.log('onDelete')}
                  />  
                </li>
            )
            
        }
        return noteslist;
    }
    render() {
        
        return (
            <div className='notesDisplayDiv'>
                <Link to='/addNote'>
                    <button className='addNoteLink' >
                        Add Note
                    </button>
                </Link>
                <ul className='noteTitleList'>
                    <ErrorBoundary>
                    	{this.noteBoxes()}
                    </ErrorBoundary>
                </ul>
            </div>
        )
    }
}
