import "./App.css";

import React, { Component } from "react";
import Counter from "./counter";
import moment from 'moment';

class App extends Component {
  constructor() {
    super();
  }
  render() {
    //var eventTime = moment('2023-09-12 17:00:00', 'YYYY-MM-DD hh:mm:ss');
    var eventTime = moment().add(20, 'seconds');

    return (
      <div className="elements-wrap">
        <div className="container-fluid">
          <div className="overlay-elements">
            <div className="sg-countdown">
              <Counter eventTime={eventTime} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
