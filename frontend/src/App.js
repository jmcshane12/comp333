
import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    // The state object is initialized in the constructor of the component.
    // It has three properties: viewCompleted, activeItem, and todoList.
    this.state = {
      activeSong: {song_name: "", artist: ""},
      newSong: false,
      songList: [],
      ratingList: [],
      yearList: [],
      userList: []
    };
  }
  // The `componentDidMount()` method is called after the component is rendered,
  // at which point we call refreshList.
  componentDidMount() {
    this.refreshList();
  }
  // You can also define your custom functions in components as below.
  // We are using JavaScript arrow functions. There are no parameters () and 
  // the function body executes an HTTP request. 
  refreshList = () => {
    // We are using the axios library for making HTTP requests.
    // Here is a GET request to our api/todos path.
    // If it succeeds, we set the todoList to the resolved data.
    // Otherwise, we catch the error and print it to the console.
    // You can test these requests to your API using Postman.
    // We are using async calls here. Refer to the JavaScript
    // tutorial for how they work.
    axios
      .get("http://localhost:8000/api/songs/")
      .then(res => this.setState({ songList: res.data }))
      .catch(err => console.log(err));
    axios
      .get("http://localhost:8000/api/ratings/")
      .then(res => this.setState({ ratingList: res.data }))
      .catch(err => console.log(err));
    axios
      .get("http://localhost:8000/api/years/")
      .then(res => this.setState({ yearList: res.data }))
      .catch(err => console.log(err));
    axios
      .get("http://localhost:8000/api/users/")
      .then(res => this.setState({ userList: res.data }))
      .catch(err => console.log(err));
  };

  handleDelete(name){
    axios
      .delete(`http://localhost:8000/api/songs/${name}`)
      .then(res => this.refreshList());
  }

  handleNewSongSubmit(e){ //Posts new song from the new song form to database
    e.preventDefault()
    const formData = new FormData(e.target)
    var songName = formData.get("songname")
    var newArtist = formData.get("artist")
    var yearNo = parseInt(formData.get("year"))
    var newGenre = formData.get("genre")
    const newSong = {song_name: songName, artist: newArtist, genre: newGenre, year: yearNo}
    const yearList = this.state.yearList.filter(year => year.date === yearNo)
    const nameList = this.state.songList.filter(song => song.song_name === songName)

    if (nameList.length > 0){
      this.setState({newSong: false})
      return;
    }
    else {
      if (yearList.length === 0){ //If the year is not in the database yet, creates new year via post and waits before posting new song
        axios
          .post("http://localhost:8000/api/years/", {date: yearNo, top_genre: newGenre})
          .then(res => this.refreshList())
          .catch(err => console.log(err))
          .finally(() => axios
            .post("http://localhost:8000/api/songs/", newSong)
            .then(res => this.refreshList())
            .catch(err => console.log(err)));
      }
      else{ 
        axios
          .post("http://localhost:8000/api/songs/", newSong)
          .then(res => this.refreshList())
          .catch(err => console.log(err));
      }
    }
    this.setState({newSong: false})
  }

  renderSongTable(){ //Returns the html elements making up the table users view songs from
    return (
      
      this.state.songList.map(song => 
        <tr>
          <td>{song.song_name}</td>
          <td>{song.artist}</td>
          <td>{song.year}</td>
          <td>{song.genre}</td>
          <td><button onClick={() => this.setState({activeSong: {song_name: song.song_name, artist: song.artist}})}>Edit</button></td>
          <td><button onClick={() => this.handleDelete(song.song_name)}>Delete</button></td>
        </tr>)
      
    );
  }

  renderSongEdit(){ //TODO: implement the part of the page where user edits songs/ratings (currently just prints the song name)
    return(
      this.state.activeSong.song_name != "" && <h1>{this.state.activeSong.song_name}</h1>);
  }

  renderNewSong(){
    return(
      <div>
        {!this.state.newSong && <div>
          <button onClick={() => this.setState({newSong: true})}>Add a Song</button>
        </div>}
        {this.state.newSong && <div>
          <form onSubmit={e => this.handleNewSongSubmit(e)}>
            <label htmlFor="songname">Song Name:</label><br/>
            <input type="text" id="songname" name="songname"/><br/>
            <label htmlFor="songname">Artist:</label><br/>
            <input type="text" id="artist" name="artist"/><br/>
            <label htmlFor="genre">Genre:</label><br/>
            <input type="text" id="genre" name="genre"/><br/>
            <label htmlFor="year">Year:</label><br/>
            <input type="number" id="year" name="year"/><br/>
            <input type="submit"/>
          </form>
          <button onClick={() => this.setState({newSong: false})}>Cancel</button>
        </div>}
      </div>
    );
  }
  
  render() {
    return (
      <div id= "app-div">
        <div id="song-table">
          <table width= "50%">
            <thead>
              <tr>
                <th> Song Name </th>
                <th> Artist </th>
                <th> Year </th>
                <th> Genre </th>
                <th> Edit </th>
                <th> Delete </th>
              </tr>
            </thead>
            <tbody>
              {this.renderSongTable()}
            </tbody>
          </table>
        </div>
        <div id="song-edit">
          {this.renderSongEdit()}
        </div>
        <div id="new-song">
          {this.renderNewSong()}
        </div>
      </div>
    );
  }
}


function App6(){
  return (<h1>I hate react</h1>);
}

export default App;

