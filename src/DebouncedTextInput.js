import React, { Component } from "react";
import debounce from "./lodash/debounce";

class DebouncedTextInput extends Component {
  constructor(props) {
    super(props);

    // Creating the debouncedOnChange to avoid performance issues
    this._debouncedOnChange = debounce(
      value => this.props.onChange(value),
      this.props.delay
    );

    this.state = {
      value: ""
    };
  }

  componentDidMount(prevProps, prevState) {
    if(this.props.newValue) {
      this.setState({value: this.props.newValue})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.selected !== prevProps.selected) {
      this.setState({ value: this.props.selected });
    }

    if(this.state.value !== prevState.value) {
      this.props.onTextType(this.state.value);
    }

    if(!prevProps.triggerReset && this.props.triggerReset) {
      this.setState({value: ""})
      this.props.afterTriggerReset()
    }

    if(prevProps.newValue !== this.props.newValue && this.props.newValue !== undefined) {
      this.setState({value: this.props.newValue})
    }
  }

  render() {
    const { onChange, delay, ...rest } = this.props;
    
    //https://medium.com/trabe/react-syntheticevent-reuse-889cd52981b6  //Solution 2: cache the needed properties
    return (
      <input
        id={"rbc-13sxxr-input-" + (this.props.id ? this.props.id : "")}
        className="rbc-13sxxr-input"
        placeholder={this.props.placeholder}
        type="search"
        onChange={({ target: { value } }) => {
          this.setState({ value: value });
          this._debouncedOnChange(value);
        }}
        
        style={{
          boxSizing: "content-box",
          width: "90%",
          background: "0px center",
          border: "0px",
          fontSize: "inherit",
          opacity: 1,
          outline: "0px",
          color: "inherit"
        }}
        value={this.state.value}
        autoComplete="off"
        disabled = {(this.props.disabled)? "disabled" : ""}
      />
    );
  }
}

export default DebouncedTextInput;
