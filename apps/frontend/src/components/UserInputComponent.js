import React from "react";

class UserInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      amountOfFunds: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleSubmit = (event) => {
    let username = this.state.username;
    let amountOfFunds = this.state.amountOfFunds;
    if (username && amountOfFunds) {
      this.props.setUser({
        name: this.state.username,
        funds: this.state.amountOfFunds,
      });
    } else {
      alert("Username or funds cannot be empty");
    }
    event.preventDefault();
    this.setState({ username: "", amountOfFunds: "" });
  };

  handleInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };
  handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      this.handleSubmit();
    }
  };
  render() {
    return (
      <div>
        <div className="w-full pt-6 md:p-8 text-center md:text-left space-y-2">
          <header className="text-red-300 w-max text-sm sm:text-5xl m-auto font-extrabold text-center uppercase">
            <h1>Welcome to The Jackpot Wheel ! !</h1>
          </header>
        </div>
        <form>
          <div className="flex flex-col items-center m-2">
            <div className="m-2 w-min ">
              <label
                htmlFor="username"
                className="text-green-300 font-extrabold"
              >
                Insert Username:
              </label>
              <input
                maxLength="10"
                name="username"
                type="text"
                value={this.state.username}
                onChange={this.handleInputChange}
                pattern="[a-zA-Z'-'\s]*"
              />
            </div>
            <div className="m-2 w-min">
              <label
                htmlFor="amountOfFunds"
                className="text-green-300 font-extrabold"
              >
                Insert Funds:
              </label>
              <input
                className=""
                name="amountOfFunds"
                type="number"
                value={this.state.amountOfFunds}
                onChange={this.handleInputChange}
                onKeyPress={this.handleKeyPress}
              />
            </div>
            <div className="m-2">
              <button
                type="submit"
                onClick={this.handleSubmit}
                ref={(node) => (this.btn = node)}
                className="bg-red-300 hover:bg-pink-400 rounded-r pt-1 pb-1 pl-3 pr-3 w-max overflow-hidden m-2"
              >
                Enter Lobby
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default UserInputComponent;
