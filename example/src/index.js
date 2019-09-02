import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import RBS from "re-boot-select"

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
            <RBS.Select
              isMultiSelect={true}
              showButtonsSelectAll={true}
              data={["Apple", "Banana", "Citrus", "Grapefruit", "Lime", "Mandarin", "Mango", "Melon", "Watermelon"]}
              maxElementPlaceholder="5"
              labels = {{
                "sel.empty": "Select an item",
                "sel.singular": "One item selected",
                "sel.plural": "{sel} of {size} items selected",
                "btn.select.all": "Pick All",
                "btn.unselect.all": "Release All",
              }}
              onSelectAndDeselect={selected => {
                this.setState({ selected: selected });
              }}
            ></RBS.Select>

            <span style={this.stylePrint}>selected: {this.state.selected.map(each => each.label).join(", ")}</span>
          </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))