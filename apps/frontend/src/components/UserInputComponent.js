import React from "react";

class UserInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      amountOfFunds: "",
    };
  }
  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  render() {
    return (
      <div>
        <label htmlFor="username" />
        Insert Username:
        <input
          name="username"
          type="text"
          value={this.state.username}
          onChange={this.handleInputChange}
          pattern="^[a-zA-Z ]*"
        />
        <br />
        <label htmlFor="amountOfFunds" />
        Insert amount of funds:
        <input
          name="amountOfFunds"
          type="number"
          value={this.state.amountOfFunds}
          onChange={this.handleInputChange}
        />
        <br />
        <button
          onClick={() =>{
            this.props.setUser({
              name: this.state.username,
              funds: this.state.amountOfFunds,
            })
            this.setState({username: "", amountOfFunds: 0})
          }
            
          }
        >
          Submit
        </button>
        <br />
      </div>
    );
  }
}

export default UserInputComponent;
