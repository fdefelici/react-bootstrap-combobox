import React, { Component } from "react";

import DropdownCss from "./Dropdown.css";

class Dropdown extends Component {

  data = []
  placeholderDefault = ""
  labelElement = ""
  maxElementPlaceholder = 0
  labels = {
    action: "Select",
    select: "selected",
    singular: "item",
    plural: "items",
    selectAll: "Select All",
    deselectAll: "Deselect All"
  }
  isMultiSelect = false
  showButtonsSelectAll = false

  
  constructor(props) {
    super(props)
    
    if(this.props.labels) {
      if(this.props.labels.action) this.labels.action = this.props.labels.action
      if(this.props.labels.select) this.labels.select = this.props.labels.select
      if(this.props.labels.singular) this.labels.singular = this.props.labels.singular
      if(this.props.labels.plural) this.labels.plural = this.props.labels.plural
      if(this.props.labels.selectAll) this.labels.selectAll = this.props.labels.selectAll
      if(this.props.labels.deselectAll) this.labels.deselectAll = this.props.labels.deselectAll
    }

    this.data = this.props.data? [...this.props.data].map((each,index) => { return {label: each, index: index} }): []
    this.placeholderDefault = `${this.labels.action} ${this.labels.singular}`
    this.maxElementPlaceholder = this.props.maxElementPlaceholder? this.props.maxElementPlaceholder: 0
    this.isMultiSelect = this.props.isMultiSelect? this.props.isMultiSelect: false
    this.showButtonsSelectAll = this.props.showButtonsSelectAll? this.props.showButtonsSelectAll: false

    this.state = {
      placeholder: "",
      isOpen: false,
      dataFiltered : [...this.data],
      selected: []
    }

  }

  closeOrOpen = () => {
    this.setState({isOpen:!this.state.isOpen})
  };

  selectElement = (element) => {
    
    if(this.isMultiSelect){
      let newSelected = [...this.state.selected]

      if(newSelected.includes(element)) {
        newSelected = newSelected.filter( each =>{ return each !== element })
      } else {
        newSelected.push(element)
      }

      let newPlaceholder = newSelected.length > this.maxElementPlaceholder? `${newSelected.length} ${this.labels.plural} ${this.labels.select}`: newSelected.map(each => each.label).join(", ")

      this.setState({selected: newSelected, placeholder: newPlaceholder})

    } else {
      this.setState({selected: [element], placeholder: element.label})
    }
  };

  selectAllElements = () => {
    let newPlaceholder = this.data.length > this.maxElementPlaceholder? `${this.data.length} ${this.labels.plural} ${this.labels.select}`: this.data.map(each => each.label).join(", ")
    this.setState({selected: [...this.data], placeholder: newPlaceholder})
  }

  deselectAllElements = () => {
    this.setState({selected: [], placeholder: this.placeholderDefault})
  }

  filterData = event => {
    this.setState(
      {
        dataFiltered : [...this.data].filter(
        (each) => each.label.toLowerCase().startsWith(event.target.value.toLowerCase()))
      }
    )
  };



  render = () => {
    return (
      <React.Fragment>
        <div className="input-box">
          <button
            id="restboot-menu-button"
            onClick={this.closeOrOpen}
            type="button"
            className="btn btn-default dropdown-toggle show-special-title button-dropdown"
          >
            <span className="pull-left filter-option"></span>
            <span className="pull-left special-title">
              {this.state.placeholder
                ? this.state.placeholder
                : this.placeholderDefault}
            </span>
            &nbsp;
            <span className="caret"></span>
          </button>
          <div className={"dropdown-menu " + (this.state.isOpen ? "open" : "")}>
            <div className="bs-searchbox">
              <input
                type="text"
                className="form-control"
                onChange={this.filterData}
              />
            </div>

            <div className={"bs-actionsbox " + (this.isMultiSelect && this.showButtonsSelectAll ? "": "hide")}>
              <div className="btn-group btn-block">
                <button id="restboot-selectall-button" onClick={this.selectAllElements}
                  type="button"
                  className="actions-btn bs-select-all btn btn-default select-all-button"
                >
                  {this.labels.selectAll}
                </button>
                <button id="restboot-deselectall-button" onClick={this.deselectAllElements}
                  type="button"
                  className="actions-btn bs-deselect-all btn btn-default deselect-all-button"
                >
                  {this.labels.deselectAll}
                </button>
              </div>
            </div>

            
            <ul id="restboot-dropdown-list" className="dropdown-menu inner">
              {this.state.dataFiltered.map(each => {
                return (
                  <li key={each.label + each.index}>
                    <a
                      onClick={() => {
                        if(!this.isMultiSelect) this.closeOrOpen();
                        this.selectElement(each);
                      }}
                    >
                      {each.label}
                      <span
                        className={
                          this.state.selected.indexOf(each) >= 0
                            ? "glyphicon glyphicon-ok"
                            : ""
                        }
                      ></span>
                    </a>
                  </li>
                );
              })}
            </ul>
            

          </div>
        </div>
      </React.Fragment>
    );
  };
}
  
export default Dropdown;