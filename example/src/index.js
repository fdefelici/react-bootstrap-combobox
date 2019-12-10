import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Select, Autocomplete } from "@fdefelici/react-bootstrap-combobox";
import Tabs from "./Tabs";

/* Bootstrap glyphicons not shown properly in live demo built with https://codesandbox.io, but it works locally */

class App extends React.Component {
  state = {
    selectedCombobox1: [],
    selectedCombobox2: [],
    selectedCombobox3: [],
    selectedCombobox4: [],
    selectedCombobox5: [],
    selectedCombobox6: [],
    selectedCombobox7: undefined,
    selectedCombobox8: undefined,
    selectedCombobox9: undefined,
    trigResetCombobox1: false,
    isLoading: false,

    dataExample: [
      "Apple",
      "Banana",
      "Citrus",
      "Grapefruit",
      "Lime",
      "Mandarin",
      "Mango",
      "Melon",
      "Watermelon"
    ]
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
    textAlign: "right"
  };

  styleRow = {
    paddingBottom: "300px"
  };

  render() {
    return (
      <React.Fragment>
        <Tabs>
          Select
          <span>

            <p style={{paddingTop: "25px"}}>These are examples of <b>Select</b> component</p>

            <table>
              <tbody>
                <tr style={this.styleRow}>
                  <td style={this.styleTitle}>
                    <h2>Label array</h2>
                  </td>
                  <td style={this.styleCombobox}>
                    <Select
                      id="123"
                      isMultiSelect={true}
                      showButtons={true}
                      maxDropdownItems={4}
                      trigReset={this.state.trigResetCombobox1}
                      onTrigReset={() => {
                        this.setState({ trigResetCombobox1: false });
                      }}
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
                    ></Select>

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
                    <Select
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
                    ></Select>
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
                    <Select
                      id="789"
                      isMultiSelect={true}
                      showButtons={true}
                      maxDropdownItems={4}
                      data={[
                        {
                          label: "Apple",
                          value: "apple",
                          icon: (
                            <img alt="" src={require("./images/apple.png")} />
                          )
                        },
                        {
                          label: "Banana",
                          value: "banana",
                          icon: (
                            <img alt="" src={require("./images/banana.png")} />
                          )
                        },
                        { label: "Citrus", value: "citrus" },
                        {
                          label: "Grapes",
                          value: "grapes",
                          icon: (
                            <img alt="" src={require("./images/grapes.png")} />
                          )
                        },
                        { label: "Lime", value: "lime" },
                        { label: "Mandarin", value: "mandarin" },
                        { label: "Mango", value: "mango" },
                        { label: "Melon", value: "melon" },
                        {
                          label: "Orange",
                          value: "orange",
                          icon: (
                            <img alt="" src={require("./images/orange.png")} />
                          )
                        },
                        {
                          label: "Watermelon",
                          value: "watermelon",
                          icon: (
                            <img
                              alt=""
                              src={require("./images/watermelon.png")}
                            />
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
                    ></Select>
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
                    <Select
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
                    ></Select>
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

                <tr style={this.styleRow}>
                  <td style={this.styleTitle}>
                    <h2>Empty menu</h2>
                  </td>
                  <td style={this.styleCombobox}>
                    <Select
                      id="123456"
                      isMultiSelect={true}
                      showButtons={false}
                      showSearch={false}
                      maxDropdownItems={4}
                      data={[]}
                      maxCaptionItems="5"
                      labels={{
                        "sel.empty": "Select an item",
                        "sel.singular": "One item selected",
                        "sel.plural": "{sel} of {size} items selected",
                        "btn.select.all": "Pick All",
                        "btn.unselect.all": "Release All",
                        "lst.empty": "No items"
                      }}
                      onChange={selected => {
                        this.setState({ selectedCombobox4: selected });
                      }}
                    ></Select>
                  </td>
                </tr>

                <tr style={this.styleRow}>
                  <td style={this.styleTitle}>
                    <h2>Test Loading</h2>
                  </td>
                  <td style={this.styleCombobox}>
                    <Select
                      id="1234567"
                      isMultiSelect={true}
                      showButtons={true}
                      maxDropdownItems={4}
                      isLoading={this.state.isLoading}
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
                        this.setState({ selectedCombobox5: selected });
                      }}
                    ></Select>

                    <button
                      style={{ marginTop: "5px" }}
                      onClick={() => {
                        this.setState({ isLoading: true });
                        setTimeout(() => {
                          this.setState({ isLoading: false });
                        }, 3000);
                      }}
                    >
                      LOADING
                    </button>
                  </td>
                  <td style={this.stylePrint}>
                    <span>
                      <b>selected:</b>
                      <br />
                      <ul>
                        {this.state.selectedCombobox5.map(each => (
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
                    <h2>Change Data</h2>
                  </td>
                  <td style={this.styleCombobox}>
                    <Select
                      id="12349"
                      isMultiSelect={true}
                      showButtons={true}
                      maxDropdownItems={4}
                      trigReset={this.state.trigResetCombobox1}
                      onTrigReset={() => {
                        this.setState({ trigResetCombobox1: false });
                      }}
                      data={this.state.dataExample}
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
                        this.setState({ selectedCombobox6: selected });
                      }}
                    ></Select>

                    <button
                      style={{ marginTop: "5px" }}
                      onClick={() => {
                        this.setState({
                          dataExample: [
                            {
                              label: "Grapefruit",
                              value: "Grapefruit",
                              selected: true
                            },
                            {
                              label: "Mandarin",
                              value: "Mandarin",
                              selected: false
                            },
                            { label: "Melon", value: "Melon", selected: true }
                          ]
                        });
                      }}
                    >
                      NEW DATA
                    </button>
                  </td>

                  <td style={this.stylePrint}>
                    <span>
                      <b>selected:</b>
                      <br />
                      <ul>
                        {this.state.selectedCombobox6.map(each => (
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
          </span>
          Autocomplete
          <span>

          <p style={{paddingTop: "25px"}}>These are examples of <b>Autocomplete</b> component</p>

            <table>
              <tbody>
                <tr style={this.styleRow}>
                  <td style={this.styleTitle}>
                    <p><h2>Label array</h2></p>
                    <p><h5>it will search among <b>[Grapefruit, Mandarin, Melon, Watermelon]</b> finding input text as substring, starting after 3 chars</h5></p>
                  </td>
                  <td style={this.styleCombobox}>
                    <Autocomplete
                      id="1234978"
                      labels={{
                        "cap.placeholder": "Search...",
                        "lst.empty": "Empty"
                      }}
                      maxDropdownItems={5}
                      searchFun={(text, callback) => {
                        setTimeout(() => {
                          callback([
                            "Grapefruit",
                            "Mandarin",
                            "Melon",
                            "Watermelon"
                          ].filter(each => {return each.toLowerCase().includes(text)}) );
                        }, 3000);
                      }}
                      onChangeAfterCharNum={3}
                      onSelection={selected => {
                        this.setState({ selectedCombobox7: selected });
                      }}
                      delay={1}
                    />
                  </td>

                  <td style={this.stylePrint}>
                    <span>
                      <b>selected:</b>
                      <br />
                      <ul>
                        {this.state.selectedCombobox7 !== undefined &&
                        this.state.selectedCombobox7.value !== undefined ? (
                          <li>
                            {" "}
                            {"[value: " +
                              this.state.selectedCombobox7.value +
                              ", index: " +
                              this.state.selectedCombobox7.index +
                              "]"}
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </span>
                  </td>
                </tr>


                <tr style={this.styleRow}>
                  <td style={this.styleTitle}>
                    <p><h2>Label/value array</h2></p>
                    <p><h5>it will search among <b>[Grapefruit, Mandarin, Melon, Watermelon]</b> finding input text as substring, starting after 3 chars</h5></p>
                  </td>
                  <td style={this.styleCombobox}>
                    <Autocomplete
                      id="12349789"
                      labels={{
                        "cap.placeholder": "Search...",
                        "lst.empty": "Empty"
                      }}
                      maxDropdownItems={5}
                      searchFun={(text, callback) => {
                        setTimeout(() => {
                          callback([
                            { label: "Grapefruit", value: "grapefruit" },
                            { label: "Mandarin", value: "mandarin" },
                            { label: "Melon", value: "melon" },
                            { label: "Watermelon", value: "watermelon" }
                          ].filter(each => {return each.value.toLowerCase().includes(text)}));
                        }, 3000);
                      }}
                      onChangeAfterCharNum={3}
                      onSelection={selected => {
                        this.setState({ selectedCombobox8: selected });
                      }}
                      delay={1}
                    />
                  </td>

                  <td style={this.stylePrint}>
                    <span>
                      <b>selected:</b>
                      <br />
                      <ul>
                        {this.state.selectedCombobox8 !== undefined &&
                        this.state.selectedCombobox8.value !== undefined ? (
                          <li>
                            {" "}
                            {"[value: " +
                              this.state.selectedCombobox8.value +
                              ", index: " +
                              this.state.selectedCombobox8.index +
                              "]"}
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </span>
                  </td>
                </tr>

                <tr style={this.styleRow}>
                  <td style={this.styleTitle}>
                    <p><h2>Label/value array with icons</h2></p>
                    <p><h5>it will search among <b>[Apple, Banana, Citrus, Grapes, Lime, Mandarin, Mango, Melon, Orange, Watermelon]</b> finding input text as substring, starting after 3 chars</h5></p>
                  </td>
                  <td style={this.styleCombobox}>
                    <Autocomplete
                      id="1234978910"
                      labels={{
                        "cap.placeholder": "Search...",
                        "lst.empty": "Empty"
                      }}
                      maxDropdownItems={5}
                      searchFun={(text, callback) => {
                        setTimeout(() => {
                          
                          
                          callback([
                            {
                              label: "Apple",
                              value: "apple",
                              icon: (
                                <img alt="" src={require("./images/apple.png")} />
                              )
                            },
                            {
                              label: "Banana",
                              value: "banana",
                              icon: (
                                <img alt="" src={require("./images/banana.png")} />
                              )
                            },
                            { label: "Citrus", value: "citrus" },
                            {
                              label: "Grapes",
                              value: "grapes",
                              icon: (
                                <img alt="" src={require("./images/grapes.png")} />
                              )
                            },
                            { label: "Lime", value: "lime" },
                            { label: "Mandarin", value: "mandarin" },
                            { label: "Mango", value: "mango" },
                            { label: "Melon", value: "melon" },
                            {
                              label: "Orange",
                              value: "orange",
                              icon: (
                                <img alt="" src={require("./images/orange.png")} />
                              )
                            },
                            {
                              label: "Watermelon",
                              value: "watermelon",
                              icon: (
                                <img
                                  alt=""
                                  src={require("./images/watermelon.png")}
                                />
                              )
                            }
                          ].filter(each => {return each.value.toLowerCase().includes(text)}) );
                        }, 3000);
                      }}
                      onChangeAfterCharNum={3}
                      onSelection={selected => {
                        this.setState({ selectedCombobox9: selected });
                      }}
                      delay={1}
                    />
                  </td>

                  <td style={this.stylePrint}>
                    <span>
                      <b>selected:</b>
                      <br />
                      <ul>
                        {this.state.selectedCombobox9 !== undefined &&
                        this.state.selectedCombobox9.value !== undefined ? (
                          <li>
                            {" "}
                            {"[value: " +
                              this.state.selectedCombobox9.value +
                              ", index: " +
                              this.state.selectedCombobox9.index +
                              "]"}
                          </li>
                        ) : (
                          ""
                        )}
                      </ul>
                    </span>
                  </td>
                </tr>


                <tr style={this.styleRow}>
                  <td style={this.styleTitle}>
                    <p><h2>Empty</h2></p>
                    <p><h5>Always it returns an empty result</h5></p>
                  </td>
                  <td style={this.styleCombobox}>
                    <Autocomplete
                      id="123497891011"
                      labels={{
                        "cap.placeholder": "Search..."
                      }}
                      maxDropdownItems={5}
                      searchFun={(text, callback) => {
                        setTimeout(() => {
                          callback([]);
                        }, 3000);
                      }}
                      onChangeAfterCharNum={3}
                      onSelection={selected => {
                        this.setState({ selectedCombobox9: selected });
                      }}
                      delay={1}
                     
                    />
                  </td>

              
                </tr>
              </tbody>
            </table>
          </span>
        </Tabs>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
