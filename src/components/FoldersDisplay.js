import React from 'react'
import { NavLink } from 'react-router-dom';
import './FoldersDisplay.css';
import NotefulContext from '../NotefulContext';

class FoldersDisplay extends React.Component {
    static contextType = NotefulContext;

    folderList() {
        const { folders } = this.context;
        console.log('foldersdisplay folderlist', this.context)
        let foldersArray = [];
        folders.forEach(folder => {
            foldersArray.push(
                <li key={folder.id}>
                    <NavLink
                        className='folderButton'
                        to={'/folder/' + folder.name} 
                        value={folder.name}
                    >
                            {folder.name}
                    </NavLink>
                </li>
            ) 
        })
        return foldersArray;
    }
    render() {
        return (
            <div className='foldersdisplay'>Folders:
                <ul>{this.folderList()}</ul>
                <button onClick={() => console.log('add folder clicked')}>Add Folder</button>
            </div>
        )
    }
}
export default FoldersDisplay;