import React, { Component } from 'react';
import axios from 'axios';

export default class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: ''
  };

  componentDidMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  async fetchValues() {
    const values = await axios.get('/api/values/current').catch(console.error);
    if (values) {
      this.setState({ values: values.data });
    }
  }

  async fetchIndexes() {
    const seenIndexes = await axios.get('/api/values/all').catch(console.error);
    if (seenIndexes) {
      this.setState({ seenIndexes: seenIndexes.data });
    }
  }

  handleSubmit = async event => {
    event.preventDefault();
    await axios
      .post('/api/values', { index: this.state.index })
      .catch(console.error);
    this.setState({ index: '' });
  };

  renderSeenIndexes() {
    return this.state.seenIndexes.map(({ number }) => number);
  }

  renderValues() {
    return Object.keys(this.state.values).map(k => {
      return (
        <div key={k}>
          For index {k} I calculated {this.state.values[k]}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            type="text"
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        <h3>Indexes I have seen</h3>
        {this.renderSeenIndexes()}

        <h3>Calculated values</h3>
        {this.renderValues()}
      </div>
    );
  }
}
