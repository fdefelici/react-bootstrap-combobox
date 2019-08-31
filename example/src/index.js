import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import {Dropdown} from "re-boot-select"

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
            <Dropdown
              isMultiSelect={true}
              showButtonsSelectAll={true}
              data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
              maxElementPlaceholder="5"
              labels={{
                selected: "selected",
                singular: "element",
                plural: "elements",
                selectAll: "Select All"
              }}
              onSelectAndDeselect={selected => {
                this.setState({ selected: selected });
              }}
            ></Dropdown>

            <span style={this.stylePrint}>selected: {this.state.selected.map(each => each.label).join(", ")}</span>
          </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))