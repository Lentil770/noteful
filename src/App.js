import React from 'react';
import './App.css';
import Header from './components/Header';
import NotesDisplay from './components/NotesDisplay';
import FoldersDisplay from './components/FoldersDisplay';
import Note from './components/Note';
import Folder from './components/Folder';
import WrongAddress from './components/WrongAddress';
import { Route, Switch } from 'react-router-dom';
import NotefulContext from './NotefulContext';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setFetchedFolders = this.setFetchedFolders.bind(this);
    this.setFetchedNotes = this.setFetchedNotes.bind(this);
    this.state = {
      folders: null,
      notes: null,
      currentFolder: null,
      deleteNote: null,
      noteProps: null,
      //folderTrue: null,
      filterNotes: null,
      loaded: false
    } 
  }

  setFetchedFolders(data) {
    console.log('setFetchedFolders, data:', data)
    this.setState({
      folders: data
    })
  }

  setFetchedNotes(data) {
    console.log('setFetchedNotes is happening', data);
    this.setState({
      notes: data
    })
  }

  fetchFolders = () => {
    fetch('http://localhost:9090/folders', {
      'content-type': 'application/json'
    }).then(response => {
      if (!response.ok) {
          throw new Error()
      }
      console.log('fetchFolders successful');
      return response.json();
    }
    ).then(res => this.setFetchedFolders(res))
    .catch(err => console.log('error', err))
  }
  fetchNotes = () => {
    fetch('http://localhost:9090/notes', {
      'content-type': 'application/json'
    }).then(response => {
      if (!response.ok) {
          throw new Error()
      }
      console.log('fetchNotes successful');
      return response.json();
    }
    ).then(res => this.setFetchedNotes(res))
    .catch(err => console.log('error',err))
  }
/*
  componentDidMount() {
    console.log('componentdidmount');
    Promise.all([this.fetchFolders, this.fetchNotes])
      .then(() => this.appContext)
      .catch(err => console.log('error', err))
    
  } */
  componentDidMount() {
    console.log('componentdidmount');
    Promise.all([this.fetchFolders(), this.fetchNotes()]).then(() => {
        this.setState({
          loaded: true
        })
        console.log(this.state)
      })    
  }

  deleteNote = (noteID) => {
    const noteToDelete = this.state.notes.find(note => note.id === noteID)
    const stateNotes = this.state.notes;
    const filteredNotes = stateNotes.filter(stateNote => noteToDelete !== stateNote)
    this.setState({
      notes: filteredNotes
    })
  }


  /*these shd both be unneccessary wiht router and context
  changeCurrentFolder = newFolder => {
    this.setState({
      currentFolder: newFolder
    })
  }

  changeCurrentNote = newNote => {
    const currentFolder = this.state.store.folders.find(folder => folder.id = newNote.folderId);
    const currentNote = this.state.store.notes.find(note => note.name === newNote.name);
    this.setState({
      currentFolder,
      currentNote
    });
    console.log(this.state.currentFolder)
  } */

  //what is this? is it unnecessary?
  /*folderTrue = () => {
    if (this.state.currentFolder) {
      return this.state.currentFolder;
    } else {
      return null
    }
  }*/

  noteProps = () => {
    if(this.state.currentFolder) {
      return(this.state.store.notes).filter(note => note.folderId === this.state.currentFolder.id)
    } 
  }

  //shd be able ti put this in the component itself
  filterNotes = (foldername='Important') => {
    //console.log('filterNotes: foldername is', foldername);
    //console.log('this.state.folders:', this.state.folders);
    const fol = this.state.folders.find(f => f.name === foldername);
    //console.log(fol);
    const notes = this.state.notes.filter(note => note.folderId === fol.id)
    //console.log('filternotes, notes is', notes );
    return notes;
  }


  render() {
    const appContext = {
      notes: this.state.notes,
      folders: this.state.folders,
      deleteNote: this.deleteNote,
      noteProps: this.noteProps,
      //folderTrue: this.folderTrue(),
      filterNotes: this.filterNotes,
    } 

    return(
      <div className='AppComponent'>
        <header>
          <Header />
        </header>
        { this.state.notes && this.state.folders 
          &&
          <NotefulContext.Provider value={appContext}>
            <aside>
              <Route exact path='/' component={FoldersDisplay} />
              <Route path='/folder/:folderID' component={FoldersDisplay} />
              <Route path='/note/:noteID' component={Folder} />
            </aside>
            <main>
              <Switch>
                <Route exact path='/' component={NotesDisplay} />
                <Route path='/folder/:folderID' component={NotesDisplay} />
                <Route path='/note/:noteID' component={Note} />
                <Route component={WrongAddress} />
              </Switch>
            </main>
          </ NotefulContext.Provider>
        }
      </div>
    )
  }
}

export default App;
