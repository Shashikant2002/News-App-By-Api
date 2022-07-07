import './App.css';
import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import OurNews from './Components/OurNews';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'




export default class App extends Component {

  apikey = process.env.REACT_APP_NEWS_API;

  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress: progress});
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar
            color='rgb(255,0,0)'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(10)}
          />
          <Routes>
            <Route exact path="/" element={<OurNews setProgress={this.setProgress} key="general" pagesize={6} title="" country="in" category="general"apikey={this.apikey} />} />
            <Route exact path="/business" element={<OurNews setProgress={this.setProgress} key="business" pagesize={6} title="" country="in" category="business"apikey={this.apikey} />} />
            <Route exact path="/entertainment" element={<OurNews setProgress={this.setProgress} key="entertainment" pagesize={6} title="" country="in" category="entertainment"apikey={this.apikey} />} />
            <Route exact path="/general" element={<OurNews setProgress={this.setProgress} key="general" pagesize={6} title="" country="in" category="general"apikey={this.apikey} />} />
            <Route exact path="/helth" element={<OurNews setProgress={this.setProgress} key="helth" pagesize={6} title="" country="in" category="health"apikey={this.apikey} />} />
            <Route exact path="/science" element={<OurNews setProgress={this.setProgress} key="science" pagesize={6} title="" country="in" category="science"apikey={this.apikey} />} />
            <Route exact path="/technology" element={<OurNews setProgress={this.setProgress} key="technology" pagesize={6} title="" country="in" category="technology"apikey={this.apikey} />} />
            <Route exact path="/sports" element={<OurNews setProgress={this.setProgress} key="sports" pagesize={6} title="" country="in" category="sports"apikey={this.apikey} />} />
          </Routes>
        </Router>
      </>
    )
  }
}
