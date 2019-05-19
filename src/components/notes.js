import React from 'react';
import {API_URL} from '../config';
import {Redirect} from 'react-router-dom';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      title: '',
      body: '',
      noteById: '',
      filterId: ''
    }
  }

  componentDidMount() {
    this.getNotes();
    this.input.focus();
  }

  getNotes() {
    return (
      fetch(`${API_URL}/note`, {
        headers: {
          'Authorization': localStorage.getItem('token')
        },
        method: 'GET'
      })
      .then(res => res.json())
      .then(notes => this.setState({notes: [...notes].reverse()}))
      .catch(err => console.log(err))
    );
  }

  getNoteById(id) {  
    return (
      fetch(`${API_URL}/note/${id}`, {
        headers: {
          'Authorization': localStorage.getItem('token') 
        },
        method: 'GET'
      })
      .then(res => res.json())
      .then(note => this.setState({noteById: note}))
      .catch(err => console.log(err))
    );
  }

  onSubmit(e) {
    e.preventDefault();
    return (
      fetch(`${API_URL}/note`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')  
        },
        body: JSON.stringify({
          "title": this.state.title,
          "body": this.state.body
        }),
        method: 'POST'
      })
      .then(res => res.json())
      .then(note => {
        this.setState({notes: [note, ...this.state.notes]})
        this.setState({title: ''});
        this.setState({body: ''});
      })
      .catch(err => console.log(err))
    );
  }

  deleteNote(id) {
    this.setState({notes: this.state.notes.filter(note => note.id !== id)});
    return (
      fetch(`${API_URL}/note/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token') 
        },
        method: 'DELETE'
      })
      .catch(err => console.log(err))
    );
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
    console.log(this.state.notes);
    // if user isnt logged in, user is redirected to landing page 
    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }
    
    let notes = '';
    if (this.state.noteById.id === this.state.filterId) {
      notes = 
        <div>
          <button onClick={() => this.deleteNote(this.state.noteById.id)}>X</button>
          <h4>{this.state.noteById.title}</h4>
          <p>{this.state.noteById.body}</p>
        </div>
      } else {
      notes = this.state.notes.map((note, index) => 
        <div key={index}>
          <button onClick={() => this.deleteNote(note.id)}>X</button>
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
          <input type="text" placeholder="Enter note title" onChange={e => this.titleInput(e)} value={this.state.title} ref={input => this.input = input}></input><br/><br/>
          <textarea placeholder="Enter note body" onChange={e => this.bodyInput(e)} value={this.state.body}></textarea><br/><br/>
          <button type="submit">Create New Note</button><br/><br/><br/><br/>
        </form>

        <h2>My Notes</h2>
        <input type="text" placeholder="Filter note by its ID" onChange={e => this.filterInput(e)}></input><br/><br/>
        <button type="button" onClick={() => this.getNoteById(this.state.filterId)}>Filter Notes</button><br/><br/><br/><br/>
        {notes}
      </div>
    )
  }
}