import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import './FoldersDisplay.css';
import NotefulContext from '../NotefulContext';
import ErrorBoundary from '../ErrorBoundary';

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
                <ErrorBoundary>
                	<ul>{this.folderList()}</ul>
                </ErrorBoundary>
                <Link to='/addFolder'>
                    <button type='button' >Add Folder</button>
                </Link>
            </div>
        )
    }
}
export default FoldersDisplay;

