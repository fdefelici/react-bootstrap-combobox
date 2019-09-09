import React, { Component } from "react";
import LostFocusHandler from "./LostFocusHandler";

import "./Select.css";

class Select extends Component {

  placeholderDefault = ""
  maxItemsAsCaption = 0
  onChange = () => {}

  labels = {
    "cap.select.empty": "Select an item",
    "cap.select.singular": "1 item selected",
    "cap.select.plural": "{size} items selected",
    "btn.select.all": "All",
    "btn.unselect.all": "Clear",
  }

  isMultiSelect = false
  showButtons = false
  showSearch = false
  
  /* html ids */
  id = undefined
  idRbs = undefined
  idMenuButton = undefined
  idSelectAll = undefined
  idDeselectAll = undefined
  idList = undefined

  
  constructor(props) {
    super(props)
    
    if(this.props.labels) {
      if(this.props.labels["cap.select.empty"]) this.labels["cap.select.empty"] = this.props.labels["cap.select.empty"]
      if(this.props.labels["cap.select.plural"]) {
        this.labels["cap.select.plural"] = this.props.labels["cap.select.plural"]
        this.labels["cap.select.singular"] = this.props.labels["cap.select.singular"]? this.props.labels["cap.select.singular"] : this.props.labels["cap.select.plural"]
      } else {
        this.labels["cap.select.singular"] = this.props.labels["cap.select.singular"]? this.props.labels["cap.select.singular"] : this.labels["cap.select.singular"]
      }
      
      if(this.props.labels["btn.select.all"]) this.labels["btn.select.all"] = this.props.labels["btn.select.all"]
      if(this.props.labels["btn.unselect.all"]) this.labels["btn.unselect.all"] = this.props.labels["btn.unselect.all"]
    }

    if(this.props.id) {
      this.id = this.props.id
      this.idRbs = "rbs-" + this.id
      this.idMenuButton = "rbs-menu-button-" + this.id
      this.idSelectAll = "rbs-menu-button-selectall-button-" + this.id
      this.idDeselectAll = "rbs-menu-button-deselectall-button-" + this.id
      this.idList = "rbs-menu-button-dropdown-list-" + this.id
    }
    if(this.props.onChange && typeof this.props.onChange === 'function') {
      this.onChange = this.props.onChange
    }

    this.placeholderDefault = this.labels["cap.select.empty"]
    this.maxItemsAsCaption = this.props.maxItemsAsCaption? this.props.maxItemsAsCaption: 0
    this.isMultiSelect = this.props.isMultiSelect? this.props.isMultiSelect: false
    this.showSearch = this.props.showSearch? this.props.showSearch: false
    this.showButtons = this.props.showButtons? this.props.showButtons: false

    this.state = {
      placeholder: "",
      isOpen: false,
      dataFiltered : this.props.data? this.props.data.map((each,index) => { return {label: each, index: index} }): [],
      selected: [],
      data : this.props.data? this.props.data.map((each,index) => { return {label: each, index: index} }): []
    }


  }
  componentDidUpdate(prevProps, prevState) {
    if(JSON.stringify(this.props.data.map((each,index) => { return {label: each, index: index} })) !== JSON.stringify(this.state.data)) {
      this.setState({
        data : this.props.data.map((each,index) => { return {label: each, index: index} }),
        dataFiltered : this.props.data.map((each,index) => { return {label: each, index: index} }),
        selected: []
      })

      this.runCallback([])
    }
  }

  runCallback(selection) {
    if(this.props.onChange) {
      this.props.onChange(selection)
    }
  }

  closeOrOpen = () => {
    this.setState({isOpen:!this.state.isOpen})
  };

  getLabelSelected = (sizeSelected) => {
    let result = this.labels["cap.select.singular"]
    if(sizeSelected > 1 ) {
      result = this.labels["cap.select.plural"]
    }

    result = result.replace("{sel}", sizeSelected)
    return result.replace("{size}", this.state.data.length)
  };

  searchElementInArray = (array, element) => {
    let findElement = function(each) {
      return element.label === each.label && element.index === each.index;
    }

    return array.find(findElement)
  };

  selectElement = (element) => {

    if(this.isMultiSelect){
      let newSelected = [...this.state.selected]

      if(this.searchElementInArray(newSelected, element) !== undefined) {
        newSelected = newSelected.filter( each =>{ return each.label !== element.label && each.index !== element.index })
      } else {
        newSelected.push(element)
      }

      let newPlaceholder = newSelected.length > this.maxItemsAsCaption? this.getLabelSelected(newSelected.length): newSelected.map(each => each.label).join(", ")

      this.setState({selected: newSelected, placeholder: newPlaceholder})

      this.runCallback(newSelected)

    } else {
      this.setState({selected: [element], placeholder: element.label})

      this.runCallback([element])
    }
  };

  selectAllElements = () => {
    let compare = (toCompare) => {
      return function(current){
        return toCompare.filter(function(other){
          return other.label == current.label && other.index == current.index
        }).length == 0;
      }
    }

    var onlyInDataFiltered = this.state.dataFiltered.filter(compare(this.state.selected))

    let newSelected = this.state.selected.concat(onlyInDataFiltered)

    let newPlaceholder = newSelected.length > this.maxItemsAsCaption? this.getLabelSelected(newSelected.length): newSelected.map(each => each.label).join(", ")
    this.setState({selected: newSelected, placeholder: newPlaceholder})

    this.runCallback(newSelected)
  }

  deselectAllElements = () => {
    this.setState({selected: [], placeholder: this.placeholderDefault})
    this.runCallback([])
  }

  filterData = event => {
    this.setState(
      {
        dataFiltered : this.state.data.filter(
        (each) => each.label.toLowerCase().startsWith(event.target.value.toLowerCase()))
      }
    )

  };



  render = () => {
    return (
      <LostFocusHandler onClickOutside={()=>this.setState({isOpen:false})}>
        <div id={this.idRbs} className="input-box">
          <button
            id={this.idMenuButton}
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
            <div className={"bs-searchbox " + (this.showSearch ? "": "hide")}>
              <input
                type="text"
                className="form-control"
                onChange={this.filterData}
              />
            </div>

            <div className={"bs-actionsbox " + (this.isMultiSelect && this.showButtons ? "": "hide")}>
              <div className="btn-group btn-block">
                <button id={this.idSelectAll} onClick={this.selectAllElements}
                  type="button"
                  className="actions-btn bs-select-all btn btn-default select-all-button"
                >
                  {this.labels["btn.select.all"]}
                </button>
                <button id={this.idDeselectAll} onClick={this.deselectAllElements}
                  type="button"
                  className="actions-btn bs-deselect-all btn btn-default deselect-all-button"
                >
                  {this.labels["btn.unselect.all"]}
                </button>
              </div>
            </div>

            
            <ul id={this.idList} className="dropdown-menu inner">
              {this.state.dataFiltered.map(each => {
                return (
                  <li className="noselect" key={each.label + each.index}>
                    <a
                      onClick={() => {
                        if(!this.isMultiSelect) this.closeOrOpen();
                        this.selectElement(each);
                      }}
                    >
                      {each.label}
                      <span
                        className={
                          this.searchElementInArray(this.state.selected, each) !== undefined
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
      </LostFocusHandler>
    );
  };
}
  
export default Select;