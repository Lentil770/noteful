import React from 'react'


const NotefulContext = React.createContext({
    folders: [{id: 'defaultid', name: 'defaultname'}],
    notes: [],
    deleteNote: () => {console.log('default deletenote')},
    noteProps: [],
    folderTrue: null,
    filterNotes: null,
})

export default NotefulContext;