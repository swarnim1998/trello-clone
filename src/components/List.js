import React, { Component } from "react";
import { Paper } from "@material-ui/core";
import Title from "./Title";
import Card from "./Card.js";
import Input from "./InputContainer";
import Axios from "axios";
import { token, api_key } from "../config";

export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
    };
  }

  getCards = async () => {
    const cardId = this.props.data.id;
    const res = await Axios.get(
      `https://api.trello.com/1/lists/${cardId}/cards?key=${api_key}&token=${token}`
    );

    this.setState({
      data: res.data,
    });
  };

  deleteCard = async (id, data) => {
    await Axios.delete(
      `https://api.trello.com/1/cards/${id}?key=${api_key}&token=${token}`
    );
    this.getCards();
  };

  addCard = async (data) => {
    const id = this.props.data.id;
    await Axios.post(
      `https://api.trello.com/1/cards?name=${data}&key=${api_key}&token=${token}&idList=${id}`
    );
    this.getCards();
  };

  componentDidMount() {
    this.getCards();
  }

  render() {
    return (
      <div>
        <Paper className="root">
          <Title data={this.props.data} />
          {Object.keys(this.state.data).map((item) => {
            return (
              <Card
                data={this.state.data[item]}
                deleteCard={this.deleteCard}
                key={this.state.data[item].id}
              />
            );
          })}
        </Paper>
      </div>
    );
  }
}
