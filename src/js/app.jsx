import React from 'react';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      balance: '',
      rate: '',
      term: 15,
      monthlyPayment: '',
    }
    this.update = this.update.bind(this);
    this.calculate = this.calculate.bind(this);
  }

  update(eventObject){
   // console.log(eventObject.target.name, eventObject.target.value)
   this.setState({[eventObject.target.name]: Number(eventObject.target.value)})
  }

  // **New Function**
calculate (balance, rate, term){
   balance = parseFloat(this.state.balance);
   rate = parseFloat(this.state.rate) / 100 / 12;
   term = parseFloat(this.state.term) * 12;

  const x = Math.pow(1 + rate, term);
  let monthlyPayment = (balance * x * rate) / (x - 1);

  this.setState({
    monthlyPayment: monthlyPayment.toFixed(2)
  });
}
//   let payment = (balance * (rate/100) / (1 - Math.pow(1/(1 + rate/100), term))).toFixed(2);
//   document.getElementById('output').innerHTML = `${payment} is your payment.`
// };
  render(){
    return (
      <div className='container'>
        <h3>Mortgage Calculator</h3>
        <input name = 'balance' type = 'number' placeholder = 'Type Balance Here' defaultValue = {this.state.balance} onChange = {this.update}/>
        <input name = 'rate' type = 'number' placeholder = 'Type Interest Rate Here' step = '0.01' defaultValue = {this.state.rate} onChange = {this.update}/>
        <select name = 'term' defaultValue = {this.state.term} onChange = {this.update}>
          <option value = '15'>15</option>
          <option value = '30'>30</option> 
        </select>
        <button type = 'button' className = "btn btn-success" name = 'submit' onClick = {() => this.calculate(this.state.rate, this.state.term, this.state.balance)}>submit </button>
        <div className = 'output' id = 'output'>{this.state.monthlyPayment}</div>
      </div>
    );
  
}
};