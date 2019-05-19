import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {
  fetchNotes,  
  fetchNoteById,
  addNewNote,
  removeNote
} from '../actions/notes';

export class NotesRedux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      filterId: ''
    }
  }

  componentDidMount() {
    this.props.dispatch(fetchNotes());
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.dispatch(addNewNote(this.state.title, this.state.body));
  }

  titleInput(e) {
    this.setState({title: e.target.value});
  }
  bodyInput(e) {
    this.setState({body: e.target.value});
  }
  filterInput(e) {
    this.setState({filterId: e.target.value});
  }
  
  logOut() {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  render() {
    console.log(this.props.notes);
    // if user isnt logged in, user is redirected to landing page 
    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }

    let notes = '';
    if (this.props.note.id === this.state.filterId) {
      notes = 
        <div>
          <button onClick={() => this.props.dispatch(removeNote(this.props.note.id))}>X</button>
          <h4>{this.props.note.title}</h4>
          <p>{this.props.note.body}</p>
        </div>
    } else {
      notes = this.props.notes.map((note, index) => 
        <div key={index}>
          <button onClick={() => this.props.dispatch(removeNote(note.id))}>X</button>
          <h4>{note.title}</h4>
          <p>{note.body}</p>
        </div>
      );
    }

    return (
      <div>
        <button type="button" onClick={() => this.logOut()}>Log Out</button>
        <form onSubmit={e => this.onSubmit(e)}>
          <h2>Notes Form</h2>
          <input type="text" placeholder="Enter note title" onChange={e => this.titleInput(e)}></input><br/><br/>
          <textarea placeholder="Enter note body" onChange={e => this.bodyInput(e)}></textarea><br/><br/>
          <button type="submit">Create New Note</button><br/><br/><br/><br/>
        </form>

        <h2>My Notes</h2>
        <input type="text" placeholder="Filter note by its ID" onChange={e => this.filterInput(e)}></input><br/><br/>
        <button type="button" onClick={() => this.props.dispatch(fetchNoteById(this.state.filterId))}>Filter Notes</button><br/><br/><br/><br/>
        {notes}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  notes: state.notes,
  note: state.note
});

export default connect(mapStateToProps)(NotesRedux);