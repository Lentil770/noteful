import React from 'react';
import './AddFolder.css';
import { withRouter, Link } from 'react-router-dom'

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.nameInput = React.createRef();
      }
    onFolderSubmit(event) {
        event.preventDefault();
        const folderValue = this.nameInput.current.value ;
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({"name": folderValue}) 
            }
    fetch('http://localhost:9090/folders', options).then(response => {
                if (!response.ok) {
                    throw new Error();
                }
                console.log('new folder POSTed', response);
            }).then( () => {
                this.props.history.push('/');
                window.location.reload();
            }).catch(err => console.log(err))
    }
    render() {
        return (
            <div className='addFolder form'>
                <Link to='/'><button>back</button></Link>
                <form className='addFolder' onSubmit={e => this.onFolderSubmit(e)}>
                    <label htmlFor='folder-name'>Select a folder name: </label><br/>
                    <input id='folderName'  ref={this.nameInput}></input><br/>
                    <button type='submit' >Add Folder</button>
                </form>
            </div>
        )
    }
}
export default withRouter(AddFolder);