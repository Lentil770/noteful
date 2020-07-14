import React from 'react'
import { withRouter } from 'react-router-dom';
import NotefulContext from '../NotefulContext';

//how to fix it so works even on page reload while data fetching? have default i suppose
class Folder extends React.Component {    
    static contextType = NotefulContext;
    
    render() {
        const { noteID } = this.props.match.params;
        console.log(this.context.notes);
        
        const foundFolder = () => {
            if(this.context.notes.length !== 0) {
                const foundNote = this.context.notes.find(note => note.name === noteID);    
                const foundFold = this.context.folders.find(folder => folder.id === foundNote.folderId);
                return foundFold;
            } else {
                return {
                    name: 'loading'
                }
            }
        }   
        console.log(foundFolder);
        
        
        return (
            <div className='Folder'>
                <h3>{foundFolder}</h3>
                <button onClick={() => this.props.history.goBack()}>Back</button>
            </div> 
        )
    }
}

export default withRouter(Folder);