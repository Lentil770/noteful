import React from 'react';
import './AddNote.css';
import { withRouter, Link } from 'react-router-dom';
import NotefulContext from '../NotefulContext';
//name modified folder content
class AddNote extends React.Component {
    static contextType = NotefulContext;

    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
        this.folderInput = React.createRef();
        this.contentInput = React.createRef();
        this.state = {
            afolders: []
        }
      }
    onNoteSubmit(event) {
        event.preventDefault();
        const name = this.nameInput.current.value ;
        const folder = this.folderInput.current.value;
        const folderId = this.context.folders.find(f => f.name === folder).id
        const content = this.contentInput.current.value;
        const modified = Date.now();
        console.log('onNotesubmit', Date.now().toString(), name, folder, content, folderId );
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, folderId, content, modified: modified }) 
            }
        fetch('http://localhost:9090/notes', options).then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                console.log('new Note POSTed', response);
            }).then( () => {
                this.props.history.push('/');
                window.location.reload();
            }).catch(err => console.log(err))
    }
    render() {
        return (
            <div className='AddNote form'>
                <Link to='/'><button>back</button></Link>                
                <form className='AddNote' onSubmit={e => this.onNoteSubmit(e)}>
                    <label htmlFor='noteName' name="name" >name your note: </label>
                    <input type="text" id='noteName' ref={this.nameInput}></input><br/>
                    <label htmlFor='noteContent'>contents of note: </label><br/>
                    <textarea id='noteContent' ref={this.contentInput}></textarea><br/>
                    <label htmlFor='folderChoice'>choose a folder</label>
                    <select id='folderChoice' name='folderChoice' ref={this.folderInput}>
                        { this.context.folders.map(fold => <option value={fold.name} > {fold.name}</option>)
                        }
                    </select>
                    <button type='submit' >Add Note</button>
                </form>
            </div>
        )
    }
}
export default withRouter(AddNote);