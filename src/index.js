import _ from "lodash";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import YTSearch from "youtube-api-search";
import SearchBar from "./components/search_bar";
import VideoList from "./components/video_list";
import VideoDetail from "./components/video_detail";
import YTAPIKey from "./config/keys";
//const API_Key = "AIzaSyCS-3sSXu7oUsH-B1n731kTWa18cyJMffA";

//Create a new component that should produce some HTML

//index.js is the most parent component
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch("squid fishing");
  }

  videoSearch(term) {
    YTSearch({ key: YTAPIKey.APIKey, term: term }, videos => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
      //console.log(videos);
    });
  }

  render() {
    const videoSearch = _.debounce(term => {
      this.videoSearch(term);
    }, 300);

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo} />
        <VideoList
          //Update App/index.js state
          onVideoSelect={selectedVideo => this.setState({ selectedVideo })} //End
          videos={this.state.videos}
        />
      </div>
    );
  }
}

//Take this component's generated HTML and put it on the page (in the DOM)

ReactDOM.render(<App />, document.querySelector(".container"));
