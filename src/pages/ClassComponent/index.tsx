import { Component } from "react";

export default class ParentClass extends Component {
  state = {
    value: 1
  }

  inputChange = (val) => {
    this.setState({
      value: val
    })
  }

  render = () => {
    return <div>
      {this.state.value}
      <SonClass result={this.state.value} inputChange={this.inputChange}></SonClass>
    </div>
  }
}

interface SonClassProps {
  result: number;
  inputChange: (val: any) => void;
}

class SonClass extends Component<SonClassProps> {
  inputChange = (e) => {
    this.props.inputChange(e.target.value)
  }
  render = () => {
    return <>
      <input className="border" type="text" value={this.props.result} onChange={this.inputChange}/>
    </>
  }
}