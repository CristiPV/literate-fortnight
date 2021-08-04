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
        className="bg-red-300 hover:bg-pink-400 rounded pt-2 pb-2 pl-3 pr-3 w-max"
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
