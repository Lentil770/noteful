import React from 'react'
import NoteTitle from './NoteTitle'
import { withRouter } from 'react-router-dom'
import NotefulContext from '../NotefulContext'

class Note extends React.Component {
    static contextType=NotefulContext;
    onDelete = () => {
        console.log('hellooo');
        
        this.props.history.push('/');
    }
    render() {
        
        const noteId = this.props.match.params.noteID;
        const noteForProps = this.context.notes.find(note => note.name === noteId);
        console.log(noteForProps);
        return (
                <div className='note'>
                    <NoteTitle name={noteForProps.name}
                        modified={noteForProps.modified}
                        noteID={noteForProps.id}
                        onDelete={this.onDelete()}
                    />
                    <p>{noteForProps.content}</p>

                </div>
            )} 
}

Note.defaultProps = {
    noteProps: {
        "id": "dummy cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        "name": "dummy Dogs",
        "modified": "dummy 2019-01-03T00:00:00.000Z",
        "folderId": "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
        "content": "dummy Corporis accusamus placeat quas non voluptas. Harum fugit molestias qui. Velit ex animi reiciendis quasi. Suscipit totam delectus ut voluptas aut qui rerum. Non veniam eius molestiae rerum quam.\n \rUnde qui aperiam praesentium alias. Aut temporibus id quidem recusandae voluptatem ut eum. Consequatur asperiores et in quisquam corporis maxime dolorem soluta. Et officiis id est quia sunt qui iste reiciendis saepe. Ut aut doloribus minus non nisi vel corporis. Veritatis mollitia et molestias voluptas neque aspernatur reprehenderit.\n \rMaxime aut reprehenderit mollitia quia eos sit fugiat exercitationem. Minima dolore soluta. Quidem fuga ut sit voluptas nihil sunt aliquam dignissimos. Ex autem nemo quisquam voluptas consequuntur et necessitatibus minima velit. Consequatur quia quis tempora minima. Aut qui dolor et dignissimos ut repellat quas ad."
      }
}

export default withRouter(Note);