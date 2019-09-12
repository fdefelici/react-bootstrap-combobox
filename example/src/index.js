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
              data={["Apple", "Banana", "Citrus", "Grapefruit", "Lime", "Mandarin", "Mango", "Melon", "Watermelon"]}
              maxCaptionItems="5"
              showSearch={true}
              labels = {{
                "sel.empty": "Select an item",
                "sel.singular": "One item selected",
                "sel.plural": "{sel} of {size} items selected",
                "btn.select.all": "Pick All",
                "btn.unselect.all": "Release All",
              }}
              onChange={selected => {
                this.setState({ selected: selected });
              }}
            ></Combobox>

            <span style={this.stylePrint}>selected: {this.state.selected.map(each => each.label).join(", ")}</span>

          </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))