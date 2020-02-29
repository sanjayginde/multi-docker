import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndicies: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndicies();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  }

  async fetchIndicies() {
    const seenIndicies = await axios.get('/api/values/all');
    this.setState({ seenIndicies: seenIndicies.data });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post('/api/values', {
      index: this.state.index
    });
    this.setState({ index: '' });
  };

  renderSeenIndicies() {
    if (Array.isArray(this.state.seenIndicies)) {
      return this.state.seenIndicies.map(({ number }) => number).join(', ');
    }
    else {
      return "None, yet!";
    }
  }

  renderValues() {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key}, I calculated {this.state.values[key]}.
        </div>
      );
    }

    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter index:
            <input type="text"
              name="index"
              value={this.state.index}
              onChange={event => this.setState({ index: event.target.value })}
            />
          </label>
          <button type="submit">Submit</button>
        </form>

        <h3>Indicies I have seen: </h3>
        {this.renderSeenIndicies()}

        <h3>Calculated values: </h3>
        {this.renderValues()}
      </div>
    )
  }
}

export default Fib;
