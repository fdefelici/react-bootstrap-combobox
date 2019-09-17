import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Combobox from "@fdefelici/react-bootstrap-combobox"

/* Bootstrap glyphicons not shown properly in live demo built with https://codesandbox.io, but it works locally */

class App extends React.Component{

    state = {
      selectedCombobox1: [],
      selectedCombobox2: []
    }

    stylePrint = {
      paddingTop: "250px",
      float: "left"
    }

    styleCombobox1 = {
      float:"left",
      width: "500px"
    }

    styleCombobox2 = {
      marginLeft : "200px",
      float:"left",
      width: "500px"
    }

    render(){
        return (
          <React.Fragment>
            <div style={this.styleCombobox1}>
              <h2>Label array</h2>
              <Combobox
                isMultiSelect={true}
                showButtons={true}
                maxDropdownItems={4}
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
                  this.setState({ selectedCombobox1: selected });
                }}
              ></Combobox>

              <span style={this.stylePrint}>
                <b>selected:</b><br/>
                <ul>
                {this.state.selectedCombobox1
                  .map(
                    each =>
                      <li> {"[value: " + each.value + ", index: " + each.index + "]" }</li>
                  )
                  }
                  </ul>
              </span>
            </div>

            <div style={this.styleCombobox2}>
              <h2>Label/value array</h2>
              <Combobox
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
                  this.setState({ selectedCombobox2: selected });
                }}
              ></Combobox>

              <span style={this.stylePrint}>
                <b>selected:</b> <br/>
                <ul>
                {this.state.selectedCombobox2
                  .map(
                    each =>
                      <li>{"[value: " + each.value + ", index: " + each.index + "]"} </li>
                  )
                  }
                  </ul>
              </span>
            </div>
          </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))