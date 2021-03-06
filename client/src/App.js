import React, { Component } from 'react';
import './App.css';
import Navigation from './common/header.component';
import Main from './common/main.component';
import Footer from './common/footer.component';

class App extends Component {
  render() {
    return (
      <div>
        <Navigation />
        <div className="container">
          <Main />
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
