import React from "react";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      data: "",
    };
  }

  render() {
    return (
      <>
        <div
          style={{ background: "#00AECC" }}
          className="board"
          onClick={() =>
            this.props.handleClick(this.props.data[this.props.index].id)
          }
        >
          <h2>{this.props.data[this.props.index].name}</h2>
        </div>
      </>
    );
  }
}
