import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Combobox from "@fdefelici/react-bootstrap-combobox";

/* Bootstrap glyphicons not shown properly in live demo built with https://codesandbox.io, but it works locally */

class App extends React.Component {
  state = {
    selectedCombobox1: [],
    selectedCombobox2: [],
    selectedCombobox3: [],
    selectedCombobox4: [],
    trigResetCombobox1: false
  };

  stylePrint = {
    float: "left",
    marginTop: "20px",
    marginBottom: "10px",
    marginLeft: "50px"
  };

  styleCombobox = {
    float: "left",
    width: "200px",
    marginTop: "20px",
    marginBottom: "10px"
  };

  styleTitle = {
    width: "450px",
    paddingBottom: "200px",
    paddingRight: "20px",
    textAlign:"right"
  };

  styleRow = {
    paddingBottom: "300px"
  };

  render() {
    return (
      <React.Fragment>
        <table>
          <tbody>
            <tr style={this.styleRow}>
              <td style={this.styleTitle}>
                <h2>Label array</h2>
              </td>
              <td style={this.styleCombobox}>
                <Combobox
                  id="123"
                  isMultiSelect={true}
                  showButtons={true}
                  maxDropdownItems={4}
                  trigReset={this.state.trigResetCombobox1}
                  onTrigReset={() => {
                    this.setState({ trigResetCombobox1: false })}}
                  data={[
                    "Apple",
                    "Banana",
                    "Citrus",
                    "Grapefruit",
                    "Lime",
                    "Mandarin",
                    "Mango",
                    "Melon",
                    "Watermelon"
                  ]}
                  maxCaptionItems="auto"
                  showSearch={true}
                  labels={{
                    "sel.empty": "Select an item",
                    "sel.singular": "One item selected",
                    "sel.plural": "{sel} of {size} items selected",
                    "btn.select.all": "Pick All",
                    "btn.unselect.all": "Release All"
                  }}
                  onChange={selected => {
                    this.setState({ selectedCombobox1: selected });
                  }}
                ></Combobox>

                <button
                  style={{ marginTop: "5px" }}
                  onClick={() => {
                    this.setState({ trigResetCombobox1: true });
                  }}
                >
                  RESET
                </button>
              </td>
              <td style={this.stylePrint}>
                <span>
                  <b>selected:</b>
                  <br />
                  <ul>
                    {this.state.selectedCombobox1.map(each => (
                      <li>
                        {" "}
                        {"[value: " +
                          each.value +
                          ", index: " +
                          each.index +
                          "]"}
                      </li>
                    ))}
                  </ul>
                </span>
              </td>
            </tr>
            <tr style={this.styleRow}>
              <td style={this.styleTitle}>
                <h2>Label/value array</h2>
              </td>
              <td style={this.styleCombobox}>
                <Combobox
                  id="456"
                  isMultiSelect={true}
                  showButtons={true}
                  maxDropdownItems={4}
                  data={[
                    { label: "Apple", value: "apple" },
                    { label: "Banana", value: "banana" },
                    { label: "Citrus", value: "citrus" },
                    { label: "Grapefruit", value: "grapefruit" },
                    { label: "Lime", value: "lime" },
                    { label: "Mandarin", value: "mandarin" },
                    { label: "Mango", value: "mango" },
                    { label: "Melon", value: "melon" },
                    { label: "Watermelon", value: "watermelon" }
                  ]}
                  maxCaptionItems="0"
                  showSearch={true}
                  labels={{
                    "sel.empty": "Select an item",
                    "sel.singular": "One item selected",
                    "sel.plural": "{sel} of {size} items selected",
                    "btn.select.all": "Pick All",
                    "btn.unselect.all": "Release All"
                  }}
                  onChange={selected => {
                    this.setState({ selectedCombobox2: selected });
                  }}
                ></Combobox>
              </td>
              <td style={this.stylePrint}>
                <span>
                  <b>selected:</b> <br />
                  <ul>
                    {this.state.selectedCombobox2.map(each => (
                      <li>
                        {"[value: " +
                          each.value +
                          ", index: " +
                          each.index +
                          "]"}{" "}
                      </li>
                    ))}
                  </ul>
                </span>
              </td>
            </tr>
            <tr style={this.styleRow}>
              <td style={this.styleTitle}>
                <h2>Label/value array with icons</h2>
              </td>
              <td style={this.styleCombobox}>
                {/*Icons from Free Vector Art by Vecteezy (https://vecteezy.com)*/}
                <Combobox
                  id="789"
                  isMultiSelect={true}
                  showButtons={true}
                  maxDropdownItems={4}
                  data={[
                    {
                      label: "Apple",
                      value: "apple",
                      icon: <img alt="" src={require("./images/apple.png")} />
                    },
                    {
                      label: "Banana",
                      value: "banana",
                      icon: <img alt="" src={require("./images/banana.png")} />
                    },
                    { label: "Citrus", value: "citrus" },
                    {
                      label: "Grapes",
                      value: "grapes",
                      icon: <img alt="" src={require("./images/grapes.png")} />
                    },
                    { label: "Lime", value: "lime" },
                    { label: "Mandarin", value: "mandarin" },
                    { label: "Mango", value: "mango" },
                    { label: "Melon", value: "melon" },
                    {
                      label: "Orange",
                      value: "orange",
                      icon: <img alt="" src={require("./images/orange.png")} />
                    },
                    {
                      label: "Watermelon",
                      value: "watermelon",
                      icon: (
                        <img alt="" src={require("./images/watermelon.png")} />
                      )
                    }
                  ]}
                  maxCaptionItems="5"
                  showSearch={true}
                  labels={{
                    "sel.empty": "Select an item",
                    "sel.singular": "One item selected",
                    "sel.plural": "{sel} of {size} items selected",
                    "btn.select.all": "Pick All",
                    "btn.unselect.all": "Release All"
                  }}
                  onChange={selected => {
                    this.setState({ selectedCombobox3: selected });
                  }}
                ></Combobox>
              </td>
              <td style={this.stylePrint}>
                <span>
                  <b>selected:</b> <br />
                  <ul>
                    {this.state.selectedCombobox3.map(each => (
                      <li>
                        {"[value: " +
                          each.value +
                          ", index: " +
                          each.index +
                          "]"}{" "}
                      </li>
                    ))}
                  </ul>
                </span>
              </td>
            </tr>

            <tr style={this.styleRow}>
              <td style={this.styleTitle}>
                <h2>Label/value array with default selection</h2>
              </td>
              <td style={this.styleCombobox}>
                <Combobox
                  id="12345"
                  isMultiSelect={true}
                  showButtons={false}
                  showSearch={false}
                  maxDropdownItems={4}
                  data={[
                    { label: "Apple", value: "apple", selected: true },
                    { label: "Banana", value: "banana" },
                    { label: "Citrus", value: "citrus", selected: true }
                  ]}
                  maxCaptionItems="5"
                  labels={{
                    "sel.empty": "Select an item",
                    "sel.singular": "One item selected",
                    "sel.plural": "{sel} of {size} items selected",
                    "btn.select.all": "Pick All",
                    "btn.unselect.all": "Release All"
                  }}
                  onChange={selected => {
                    this.setState({ selectedCombobox4: selected });
                  }}
                ></Combobox>
              </td>

              <td style={this.stylePrint}>
                <span>
                  <b>selected:</b>
                  <br />
                  <ul>
                    {this.state.selectedCombobox4.map(each => (
                      <li>
                        {" "}
                        {"[value: " +
                          each.value +
                          ", index: " +
                          each.index +
                          "]"}
                      </li>
                    ))}
                  </ul>
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
