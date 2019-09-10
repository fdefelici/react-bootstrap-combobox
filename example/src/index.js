import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import RBS from "@fdefelici/re-boot-select"

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
              showButtons={true}
              visibleScrollingItems={4}
              data={["Apple", "Banana", "Citrus", "Grapefruit", "Lime", "Mandarin", "Mango", "Melon", "Watermelon"]}
              maxItemsAsCaption="5"
              showSearch="true"
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
            ></RBS.Select>

            <span style={this.stylePrint}>selected: {this.state.selected.map(each => each.label).join(", ")}</span>

          </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))