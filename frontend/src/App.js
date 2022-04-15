
import logo from './logo.svg';
import './App.css';
import React from 'react';
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    // The state object is initialized in the constructor of the component.
    // It has nine properties: activeSong, newSong, editSong, newRating, editRating, songList, ratingList, yearList, and
    this.state = {
      activeSong: {song_name: "", artist: "", genre: "", year: ""},
      newSong: false,
      editSong: false,
      newRating: false,
      editRating: false,
      deleteRating: false,
      songList: [],
      ratingList: [],
      yearList: [],
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
      .get("http://localhost:8000/api/songs/", { headers: { 'Authorization' : 'Token ' + this.props.token } })
      .then(res => this.setState({ songList: res.data }))
      .catch(err => console.log(err));
    axios
      .get("http://localhost:8000/api/ratings/", { headers: { 'Authorization' : 'Token ' + this.props.token } })
      .then(res => this.setState({ ratingList: res.data }))
      .catch(err => console.log(err));
    axios
      .get("http://localhost:8000/api/years/", { headers: { 'Authorization' : 'Token ' + this.props.token } })
      .then(res => this.setState({ yearList: res.data }))
      .catch(err => console.log(err));
  };

  handleDelete(name, year){ //Deletes song from database; deletes year from database if only one song with said year exists
    const songWithYearList = this.state.songList.filter(song => song.year === year)
    axios
      .delete(`http://localhost:8000/api/songs/${name}/`, { headers: { 'Authorization' : 'Token ' + this.props.token } })
      .then(res => this.refreshList());
    if (songWithYearList.length === 1){
      axios
      .delete(`http://localhost:8000/api/years/${year}/`, { headers: { 'Authorization' : 'Token ' + this.props.token } })
      .then(res => this.refreshList());
    }
  }

  handleDeleteRating(e){
    e.preventDefault()
    var currentUser = this.props.user
    var songName = this.state.activeSong.song_name
    const userRatingList = this.state.ratingList.filter(rating => rating.user === currentUser && rating.song === songName)
    const nameList = this.state.songList.filter(song => song.song_name === songName)

    if (userRatingList.length === 0 || nameList.length === 0){
      this.setState({deleteRating: false})
      alert("No rating for this user found to delete.")
      return;
    }
    else
    {
      var userRatingValues = Object.values(userRatingList)
      var currentID = userRatingValues[0]['id']

      axios
        .delete(`http://localhost:8000/api/ratings/${currentID}/`, { headers: { 'Authorization' : 'Token ' + this.props.token } })
        .then(res => this.refreshList());

      this.setState({deleteRating: false})
    }
    
  }

  handleSongEdit(e){
    e.preventDefault()
    const formData = new FormData(e.target)
    var inputArtist = formData.get("artist")
    var inputYear = parseInt(formData.get("year"))
    var inputGenre = formData.get("genre")
    var currentArtist = this.state.activeSong.artist
    var currentYear = this.state.activeSong.year
    var currentGenre = this.state.activeSong.genre
    var finalArtist = ""
    var finalYear = ""
    var finalGenre = ""
    const inputYearList = this.state.yearList.filter(year => year.date === inputYear)
    const currentYearList = this.state.yearList.filter(year => year.date === currentYear)
    
    if ((inputArtist === currentArtist || inputArtist.length === 0) && (inputYear === currentYear || inputYear.length === 0) && (inputGenre === currentGenre || inputGenre.length === 0)){
      this.setState({editSong: false})
      alert("Please make sure that you edit at least one field.")
      return;
    }
    else{
      if(inputArtist !== currentArtist && inputArtist.length !== 0){
        finalArtist = inputArtist
      }
      else{
        finalArtist = currentArtist
      }
      if(inputYear !== currentYear && inputYear.length !== 0){
        finalYear = inputYear
      }
      else{
        finalYear = currentYear
      }
      if(inputGenre !== currentGenre && inputGenre.length !== 0){
        finalGenre = inputGenre
      }
      else{
        finalGenre = currentGenre
      }
      const finalSong = {
        song_name: this.state.activeSong.song_name,
        artist: finalArtist,
        genre: finalGenre,
        year: finalYear
      }
      
      if (inputYearList.length === 0){ //If the year is not in the database yet, creates new year via post and waits before posting new song
        axios
          .post(`http://localhost:8000/api/years/`, {date: finalYear, top_genre: finalGenre}, { headers: { 'Authorization' : 'Token ' + this.props.token } })
          .then(res => this.refreshList())
          .catch(err => console.log(err))
          .finally(() =>
            axios
            .put(`http://localhost:8000/api/songs/${this.state.activeSong.song_name}/`, finalSong, { headers: { 'Authorization' : 'Token ' + this.props.token } })
            .then(res => this.refreshList())
            .catch(err => console.log(err)));
      }
      if (currentYearList.length === 1 && finalSong.year !== currentYear){
        axios
          .put(`http://localhost:8000/api/songs/${this.state.activeSong.song_name}/`, finalSong, { headers: { 'Authorization' : 'Token ' + this.props.token } })
          .then(res => this.refreshList())
          .catch(err => console.log(err))
          .finally(() => 
            axios
            .delete(`http://localhost:8000/api/years/${currentYear}/`, { headers: { 'Authorization' : 'Token ' + this.props.token } })
            .then(res => this.refreshList())
            .catch(err => console.log(err)));
      }
      else{
        axios
          .put(`http://localhost:8000/api/songs/${this.state.activeSong.song_name}/`, finalSong, { headers: { 'Authorization' : 'Token ' + this.props.token } })
          .then(res => this.refreshList())
          .catch(err => console.log(err))
      }
      this.setState({editSong: false})
    }
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
      alert("This song already exists, but you may use 'Edit Song' to edit it.")
      return;
    }
    else{
      if (yearList.length === 0){ //If the year is not in the database yet, creates new year via post and waits before posting new song
        axios
          .post("http://localhost:8000/api/years/", {date: yearNo, top_genre: newGenre}, { headers: { 'Authorization' : 'Token ' + this.props.token } })
          .then(res => this.refreshList())
          .catch(err => console.log(err))
          .finally(() => axios
            .post("http://localhost:8000/api/songs/", newSong, { headers: { 'Authorization' : 'Token ' + this.props.token } })
            .then(res => this.refreshList())
            .catch(err => console.log(err)));
      }
      else{ 
        axios
          .post("http://localhost:8000/api/songs/", newSong, { headers: { 'Authorization' : 'Token ' + this.props.token } })
          .then(res => this.refreshList())
          .catch(err => console.log(err));
      }
    }
    this.setState({newSong: false})
  }

  handleNewRating(e){ //Posts new song from the new song form to database
    e.preventDefault()
    const formData = new FormData(e.target)
    var currentUser = this.props.user
    var songName = this.state.activeSong.song_name
    var newRatingScore = parseInt(formData.get("rating"))
    const newRating = {user: currentUser, song: songName, rating: newRatingScore}
    const userRatingList = this.state.ratingList.filter(rating => rating.user === currentUser && rating.song === songName) 
    const nameList = this.state.songList.filter(song => song.song_name === songName)

    if (userRatingList.length > 0 || nameList.length === 0 ){
      this.setState({newRating: false})
      alert("Rating already exists for this user, but you may use 'Edit Rating' to change it.")
      return;
    }
    else{ 
      axios
        .post("http://localhost:8000/api/ratings/", newRating, { headers: { 'Authorization' : 'Token ' + this.props.token } })
        .then(res => this.refreshList())
        .catch(err => console.log(err));
    }
    this.setState({newRating: false})
  }

  handleEditRating(e){ //Posts new song from the new song form to database
    e.preventDefault()
    const formData = new FormData(e.target)
    var currentUser = this.props.user
    var songName = this.state.activeSong.song_name
    var newRatingScore = parseInt(formData.get("rating"))
    const newRating = {user: currentUser, song: songName, rating: newRatingScore}
    const userRatingList = this.state.ratingList.filter(rating => rating.user === currentUser && rating.song === songName) 
    const nameList = this.state.songList.filter(song => song.song_name === songName)

    if (userRatingList.length === 0 || nameList.length === 0){
      this.setState({editRating: false})
      alert("No rating exists yet for this user.")
      return;
    }
    else{ 
      var userRatingValues = Object.values(userRatingList)
      var currentID = userRatingValues[0]['id']

      console.log(currentID)
      
      axios
        .put(`http://localhost:8000/api/ratings/${currentID}/`, newRating, { headers: { 'Authorization' : 'Token ' + this.props.token } })
        .then(res => this.refreshList())
        .catch(err => console.log(err));
    }
    this.setState({editRating: false})
  }

  getAverageRating(songName){
    const songRatingList = this.state.ratingList.filter(rating => rating.song === songName) 
    const sumSongRatings = songRatingList.reduce((sum, currentRating) => sum = sum + currentRating.rating, 0)

    return((sumSongRatings/songRatingList.length).toFixed(2) + " (" + songRatingList.length + ")")
  }

  renderSongTable(){ //Returns the html elements making up the table users view songs from
    return (
      
      this.state.songList.map(song => 
        <tr>
          <td>{song.song_name}</td>
          <td>{song.artist}</td>
          <td>{song.year}</td>
          <td>{song.genre}</td>
          <td><button onClick={() => this.setState({activeSong: {song_name: song.song_name, artist: song.artist, year: song.year, genre: song.genre}, editSong: true, newSong: false, newRating: false, editRating: false, deleteRating: false,})}>Edit Song</button></td>
          <td><button onClick={() => this.handleDelete(song.song_name, song.year)}>Delete Song</button></td>
          <td><button onClick={() => this.setState({activeSong: {song_name: song.song_name, artist: song.artist, year: song.year, genre: song.genre}, newRating: true, newSong: false, editSong: false, editRating: false, deleteRating: false,})}>New Rating</button></td>
          <td><button onClick={() => this.setState({activeSong: {song_name: song.song_name, artist: song.artist, year: song.year, genre: song.genre}, editRating: true, newSong: false, editSong: false, newRating: false, deleteRating: false,})}>Edit Rating</button></td>
          <td><button onClick={() => this.setState({activeSong: {song_name: song.song_name, artist: song.artist, year: song.year, genre: song.genre}, deleteRating: true, newSong: false, editSong: false, newRating: false, editRating: false,})}>Delete Rating</button></td>
          <td>{this.getAverageRating(song.song_name)}</td>
        </tr>)
      
    );
  }

  renderSongEdit(){ //TODO: implement the part of the page where user edits songs/ratings (currently just prints the song name)
    return(
      <>{this.state.editSong && <h5>Selected Song: {this.state.activeSong.song_name}</h5>}
        {this.state.editSong && <div>
          <form onSubmit={e => this.handleSongEdit(e)}>
            <label htmlFor="artist">Artist:</label><br /> {/* Is  htmlFor="songname" correct here? */}
            <input type="text" id="artist" name="artist" defaultValue={this.state.activeSong.artist} required/><br />
            <label htmlFor="genre">Genre:</label><br />
            <input type="text" id="genre" name="genre" defaultValue={this.state.activeSong.genre} required/><br />
            <label htmlFor="year">Year:</label><br />
            <input type="number" id="year" name="year" defaultValue={this.state.activeSong.year} required/><br />
            <input type="submit" />
          </form>
          <button onClick={() => this.setState({ editSong: false })}>Cancel</button>
        </div>}
      </>);
  }

  renderNewSong(){
    return(
      <div>
        {!(this.state.newSong || this.state.editRating || this.state.editSong || this.state.newRating) && <div>
          <button onClick={() => this.setState({newSong: true})}>Add a Song</button>
        </div>}
        {!(!this.state.newSong || this.state.editRating || this.state.editSong || this.state.newRating)&& <div>
          <form onSubmit={e => this.handleNewSongSubmit(e)}>
            <label htmlFor="songname">Song Name:</label><br/>
            <input type="text" id="songname" name="songname" required/><br/>
            <label htmlFor="songname">Artist:</label><br/>
            <input type="text" id="artist" name="artist" required/><br/>
            <label htmlFor="genre">Genre:</label><br/>
            <input type="text" id="genre" name="genre" required/><br/>
            <label htmlFor="year">Year:</label><br/>
            <input type="number" id="year" name="year" required/><br/>
            <input type="submit"/>
          </form>
          <button onClick={() => this.setState({newSong: false})}>Cancel</button>
        </div>}
      </div>
    );
  }

  renderNewRating(){
    return(
      <>{this.state.newRating && <h5>Selected Song: {this.state.activeSong.song_name}</h5>}
        {this.state.newRating && <div>
          <form onSubmit={e => this.handleNewRating(e)}>
            <label htmlFor="rating">Rating (Must be a number 1-5):</label><br />
            <input type="number" id="rating" name="rating" min="1" max="5" required/><br />
            <input type="submit" />
          </form>
          <button onClick={() => this.setState({ newRating: false })}>Cancel</button>
        </div>}
      </>);
  }

  renderDeleteRating(){
    return(
      <>{this.state.deleteRating && <h5>Selected Song: {this.state.activeSong.song_name}</h5>}
        {this.state.deleteRating && <div>
          <form onSubmit={e => this.handleDeleteRating(e)}>
            <input type="submit" />
          </form>
          <button onClick={() => this.setState({ deleteRating: false })}>Cancel</button>
        </div>}
      </>);
  }

  renderEditRating(){
    return(
      <>{this.state.editRating && <h5>Selected Song: {this.state.activeSong.song_name}</h5>}
        {this.state.editRating && <div>
          <form onSubmit={e => this.handleEditRating(e)}>
            <label htmlFor="rating">Rating (Must be a number 1-5):</label><br />
            <input type="number" id="rating" name="rating" min="1" max="5" required/><br />
            <input type="submit" />
          </form>
          <button onClick={() => this.setState({ editRating: false })}>Cancel</button>
        </div>}
      </>);
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
                <th> New Rating </th>
                <th> Edit Rating </th>
                <th> Delete Rating </th>
                <th> Average Rating </th>
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
        <div id="new-rating">
          {this.renderNewRating()}
        </div>
        <div id="edit-rating">
          {this.renderEditRating()}
        </div>
        <div id="delete-rating">
          {this.renderDeleteRating()}
        </div>
      </div>
    );
  }
}


function App6(){
  return (<h1>I hate react</h1>);
}

export default App;

