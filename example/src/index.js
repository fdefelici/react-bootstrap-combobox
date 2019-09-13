import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import Combobox from "@fdefelici/react-bootstrap-combobox"

class App extends React.Component{

    state = {
      selected: []
    }

    stylePrint = {
      paddingTop: "250px",
      float: "left"
    }

    render(){
        return (
          <React.Fragment>
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
                this.setState({ selected: selected });
              }}
            ></Combobox>

            <span style={this.stylePrint}>
              selected =>
              {this.state.selected
                .map(each => "[label: " + each.label + ", value: " + each.value + "]")
                .join(", ")}
            </span>
          </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))