import React from 'react'

class UserInputComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      amountOfFunds: ''
    };

    //this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  isValid = (input) =>{
    //TODO validation

  }
  handleInputChange = ({target}) => {
    this.setState({[target.name]: target.value});
    
  };
  
  handleSubmit(event) {
    
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="username"/>
          Insert Username:
          <input
            name="username"
            type="text"
            value={this.state.username}
            onChange={this.handleInputChange} />        
        <br />
        <label htmlFor="amountOfFunds" />
          Insert amount of funds:
          <input
            name="amountOfFunds"
            type="number"
            value={this.state.amountOfFunds}
            onChange={this.handleInputChange} />        
        <br />
        <button type="submit">Submit</button>

        <br />
      </form>
    );
  }
}



export default UserInputComponent;