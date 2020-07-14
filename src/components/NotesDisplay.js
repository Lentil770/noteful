import React from 'react';
import NoteTitle from './NoteTitle';
import NotefulContext from '../NotefulContext';

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
                      //hope is unneccesary 
                      //changeNote={this.context.changeNote}
                  />  
                </li>
            )
            
        }
        return noteslist;
    }
    render() {
        
        return (
            <div>
                <ul className='noteTitleList'>
                    {this.noteBoxes()}
                </ul>
                <button className='addNoteLink' onClick={() => console.log('add note button clicked')}>
                    Add Note
                </button>
            </div>
        )
    }
}
