import React, { Component } from "react";
import List from "./components/List";
import Board from "./components/Board";
import "./App.css";
import axios from "axios";
import NewListContainer from "./components/NewListContainer";
import { token, api_key } from "./config";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      redirect: false,
    };
  }

  getBoards = async () => {
    const response = await axios.get(
      `https://api.trello.com/1/members/swarnimmukati/boards?key=${api_key}&token=${token}`
    );

    this.setState({
      data: response.data,
      redirect: false,
    });
  };

  componentDidMount() {
    this.getBoards();
  }

  handleClick = async (id) => {
    const res = await axios.get(
      `https://api.trello.com/1/boards/${id}/lists?key=${api_key}&token=${token}`
    );

    this.setState({
      data: res.data,
      redirect: true,
      id: id,
    });
  };

  addList = async (data) => {
    const id = this.state.data[0].idBoard;
    const lth = this.state.data.length + 1;
    await axios.post(
      `https://api.trello.com/1/lists?key=${api_key}&token=${token}&name=${data}&oneOf=${[
        lth,
        "bottom",
      ]}&idBoard=${id}`
    );
    this.handleClick(id);
  };

  render() {
    const data = this.state.data;
    return (
      <div className="App">
        <div className="header">
          <div className="home" onClick={this.getBoards}>
            Home
          </div>
          <div className="title">Trello</div>
        </div>

        <div>
          {this.state.redirect ? (
            <div className="app-content">
              {Object.keys(data).map((index) => {
                return <List data={data[index]} key={data[index].id} />;
              })}
              <NewListContainer addList={this.addList} />
            </div>
          ) : (
            <div className="app-content">
              {Object.keys(data).map((index) => {
                return (
                  <Board
                    key={data[index].id}
                    data={data}
                    index={index}
                    handleClick={this.handleClick}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
