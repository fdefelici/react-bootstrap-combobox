import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Dropdown} from "re-boot-select"

class App extends React.Component{
    render(){
        return (
          <React.Fragment>
            <Dropdown
              isMultiSelect={true}
              showButtonsSelectAll={true}
              labelElement="serviceId"
              data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
              maxElementPlaceholder="5"
              labels={{selected: "selected", singular:"element", plural: "elements", selectAll: "Select All"}}
            ></Dropdown>
          </React.Fragment>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'))