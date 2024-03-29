import React, { Component } from "react";
import LostFocusHandler from "./LostFocusHandler";

import "./Select.css";
import { imgLoading } from "./loading.js";

import Utils from "./Utils";

class Select extends Component {
  placeholderDefault = "";
  maxCaptionItems = 0;
  maxDropdownItems = 6;
  onChange = () => {};

  areThereIcons = false;

  labels = {
    "cap.select.empty": "Select an item",
    "cap.select.singular": "1 item selected",
    "cap.select.plural": "{sel} items selected",
    "btn.select.all": "All",
    "btn.unselect.all": "Clear",
    "lst.empty": "No items"
  };

  isMultiSelect = false;
  showButtons = false;
  showSearch = false;

  /* html ids */
  id = undefined;
  idRbc = undefined;
  idMenuButton = undefined;
  idSelectAll = undefined;
  idDeselectAll = undefined;
  idList = undefined;

  utils = Utils()

  constructor(props) {
    super(props);

    if (this.props.labels) {
      if (this.props.labels["cap.select.empty"])
        this.labels["cap.select.empty"] = this.props.labels["cap.select.empty"];
      if (this.props.labels["cap.select.plural"]) {
        this.labels["cap.select.plural"] = this.props.labels[
          "cap.select.plural"
        ];
        this.labels["cap.select.singular"] = this.props.labels[
          "cap.select.singular"
        ]
          ? this.props.labels["cap.select.singular"]
          : this.props.labels["cap.select.plural"];
      } else {
        this.labels["cap.select.singular"] = this.props.labels[
          "cap.select.singular"
        ]
          ? this.props.labels["cap.select.singular"]
          : this.labels["cap.select.singular"];
      }

      if (this.props.labels["btn.select.all"])
        this.labels["btn.select.all"] = this.props.labels["btn.select.all"];
      if (this.props.labels["btn.unselect.all"])
        this.labels["btn.unselect.all"] = this.props.labels["btn.unselect.all"];

      if (this.props.labels["lst.empty"])
        this.labels["lst.empty"] = this.props.labels["lst.empty"];
    }

    if (this.props.id) {
      this.id = this.props.id;
      this.idRbc = "rbc-" + this.id;
      this.idMenuButton = "rbc-menu-button-" + this.id;
      this.idSelectAll = "rbc-menu-button-selectall-button-" + this.id;
      this.idDeselectAll = "rbc-menu-button-deselectall-button-" + this.id;
      this.idList = "rbc-menu-button-dropdown-list-" + this.id;
    }
    if (this.props.onChange && typeof this.props.onChange === "function") {
      this.onChange = this.props.onChange;
    }

    this.placeholderDefault = this.labels["cap.select.empty"];
    if (this.props.maxCaptionItems !== "auto") {
      this.maxCaptionItems = this.props.maxCaptionItems
        ? this.props.maxCaptionItems
        : 0;
    } else {
      this.maxCaptionItems = 1000;
    }
    this.isMultiSelect = this.props.isMultiSelect
      ? this.props.isMultiSelect
      : false;
    this.showSearch = this.props.showSearch ? this.props.showSearch : false;
    this.showButtons = this.props.showButtons ? this.props.showButtons : false;

    this.maxDropdownItems = this.props.maxDropdownItems
      ? (3 + 20 + 3) * this.props.maxDropdownItems + "px"
      : (3 + 20 + 3) * 6 + "px";

    let initialModelData = this.prepareDataFromProps();
    let initialSelection = this.prepareSelectionFromProps(initialModelData);

    let newPlaceholder =
      initialSelection.length > this.maxCaptionItems
        ? this.getLabelSelected(initialSelection.length, initialModelData)
        : initialSelection.map(each => each.label).join(", ");

    this.state = {
      placeholder: newPlaceholder,
      isOpen: false,
      dataFiltered: initialModelData,
      selected: initialSelection,
      data: initialModelData
    };
  }

  static TrigEvent = {
    clear: () => {
      return "clear_" + Math.random().toString();
    },
    reset: () => {
      return "reset_" + Math.random().toString();
    }
  };

  prepareSelectionFromProps = data => {
    let selection = [];
    if (this.props.data && typeof this.props.data[0] == "object") {
      data.forEach(each => {
        if (this.props.data[each.index].selected) selection.push(each);
      });
    }
    return selection;
  };

  prepareDataFromProps = () => {
    if (this.props.data && this.props.data.length > 0) {
      if (typeof this.props.data[0] == "string") {
        return this.props.data.map((each, index) => {
          return { label: each, value: each, index: index, selected: false };
        });
      } else if (typeof this.props.data[0] == "object") {
        return this.props.data.map((each, index) => {
          this.areThereIcons = each.icon ? true : this.areThereIcons;

          return {
            label: each.label,
            value: each.value,
            icon: each.icon,
            index: index,
            selected: each.selected ? each.selected : false
          };
        });
      }
    } else {
      return [];
    }
  };

  initData() {
    let dataFromProps = this.prepareDataFromProps();
    let newSelected = this.prepareSelectionFromProps(dataFromProps);
    let newPlaceholder = this.getNewPlaceholder(newSelected);

    this.setState({
      data: dataFromProps,
      dataFiltered: dataFromProps,
      selected: newSelected,
      placeholder: newPlaceholder
    });

    this.runCallback(newSelected);
  }



  componentDidUpdate(prevProps, prevState) {
    
    if (this.props.trigEvent && this.props.trigEvent !== prevProps.trigEvent) {
      if (this.props.trigEvent.toLowerCase().startsWith("clear"))
        this.deselectAllElements();
      if (this.props.trigEvent.toLowerCase().startsWith("reset"))
        this.initData();
    }

    if (this.props.isLoading && !prevProps.isLoading) {
      this.deselectAllElements();
    }

    const captionTextContainerSize = this.getCaptionTextContainerSize();
    const captionTextSize = this.getCaptionTextSize();

    if (
      this.props.maxCaptionItems === "auto" &&
      prevState.selected.length != this.state.selected.length &&
      captionTextSize >= captionTextContainerSize
    ) {
      this.setState({
        placeholder: this.getLabelSelected(
          this.state.selected.length,
          this.state.data
        )
      });
    }

    if (
      !this.utils.isEqual(this.prepareDataFromProps(), this.state.data)
    ) {
      this.initData()
    }
  }

  runCallback(selection) {
    if (this.props.onChange) {
      this.props.onChange(selection);
    }
  }

  closeOrOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  getLabelSelected = (sizeSelected, data) => {
    let result = this.labels["cap.select.singular"];
    if (sizeSelected > 1) {
      result = this.labels["cap.select.plural"];
    }

    result = result.replace("{sel}", sizeSelected);
    return result.replace("{size}", data.length);
  };

  searchElementInArray = (array, element) => {
    let findElement = function(each) {
      return element.value === each.value && element.index === each.index;
    };

    return array.find(findElement);
  };

  getCaptionTextContainerSize = () => {
    return document.getElementById("caption-text-area-container-" + this.idRbc)
      .clientWidth;
  };

  getCaptionTextSize = () => {
    return document.getElementById("caption-text-area-" + this.idRbc)
      .clientWidth;
  };

  getNewPlaceholder = newSelected => {
    const captionTextContainerSize = this.getCaptionTextContainerSize();
    const captionTextSize = this.getCaptionTextSize();

    let newPlaceholder = "";
    if (
      this.props.maxCaptionItems === "auto" &&
      captionTextSize >= captionTextContainerSize
    ) {
      newPlaceholder = this.getLabelSelected(
        newSelected.length,
        this.state.data
      );
    } else {
      newPlaceholder =
        newSelected.length > this.maxCaptionItems
          ? this.getLabelSelected(newSelected.length, this.state.data)
          : newSelected.map(each => each.label).join(", ");
    }

    return newPlaceholder;
  };

  selectElement = element => {
    if (this.isMultiSelect) {
      let newSelected = [...this.state.selected];

      if (this.searchElementInArray(newSelected, element) !== undefined) {
        newSelected = newSelected.filter(each => {
          return each.index !== element.index;
        });
      } else {
        newSelected.push(element);
      }

      this.setState({
        selected: newSelected,
        placeholder: this.getNewPlaceholder(newSelected)
      });

      this.runCallback(
        newSelected.map(each => {
          return { value: each.value, index: each.index };
        })
      );
    } else {
      this.setState({ selected: [element], placeholder: element.label });

      this.runCallback([{ value: element.value, index: element.index }]);
    }
  };

  selectAllElements = () => {
    let compare = toCompare => {
      return function(current) {
        return (
          toCompare.filter(function(other) {
            return other.index == current.index;
          }).length == 0
        );
      };
    };

    var onlyInDataFiltered = this.state.dataFiltered.filter(
      compare(this.state.selected)
    );

    let newSelected = this.state.selected.concat(onlyInDataFiltered);

    this.setState({
      selected: newSelected,
      placeholder: this.getNewPlaceholder(newSelected)
    });

    this.runCallback(newSelected);
  };

  deselectAllElements = () => {
    this.setState({ selected: [], placeholder: this.placeholderDefault });
    this.runCallback([]);
  };

  filterData = event => {
    this.setState({
      dataFiltered: this.state.data.filter(each =>
        each.label.toLowerCase().startsWith(event.target.value.toLowerCase())
      )
    });
  };

  render = () => {
    let menu = (
      <div className={"rbc-padding-left20"}>{this.labels["lst.empty"]}</div>
    );

    let caretOrLoadingImg = <span className="caret"></span>;
    if (this.props.isLoading) {
      caretOrLoadingImg = (
        <img style={{ width: "10px", height: "10px" }} src={imgLoading} />
      );
    }

    if (this.props.data && this.props.data.length > 0) {
      menu = (
        <ul
          id={this.idList}
          className="dropdown-menu inner"
          style={{
            maxHeight: this.maxDropdownItems
          }}
        >
          {" "}
          {/* left (3) + item (20) + rigth (3) */}
          {this.state.dataFiltered.map(each => {
            return (
              <li
                className="noselect"
                key={this.idRbc + "_" + each.value + "_" + each.index}
              >
                <a
                  className={
                    each.icon
                      ? "rbc-padding-left10"
                      : this.areThereIcons
                      ? "rbc-padding-left30"
                      : ""
                  }
                  onClick={() => {
                    if (!this.isMultiSelect) this.closeOrOpen();
                    this.selectElement(each);
                  }}
                >
                  <span className={"rbc-icon"}>
                    {each.icon ? each.icon : ""}
                  </span>
                  {each.label}
                  <span
                    className={
                      this.searchElementInArray(this.state.selected, each) !==
                      undefined
                        ? "glyphicon glyphicon-ok"
                        : ""
                    }
                  ></span>
                </a>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <LostFocusHandler onClickOutside={() => this.setState({ isOpen: false })}>
        <div id={this.idRbc} className="input-box" style={{ width: (this.props.width ? this.props.width : "100%") }}>
          <button
            
            id={this.idMenuButton}
            onClick={this.closeOrOpen}
            type="button"
            className="btn btn-default dropdown-toggle show-special-title button-dropdown"
            disabled={this.props.disabled || this.props.isLoading}
          >
            <span className="pull-left filter-option"></span>
            <span
              className="pull-left special-title"
              id={"caption-text-area-container-" + this.idRbc}
            >
              <div
                className="caption-text-area"
                id={"caption-text-area-" + this.idRbc}
              >
                {this.props.icon &&
                  this.props.icon
                }
                {this.state.placeholder
                  ? this.state.placeholder
                  : this.placeholderDefault}
              </div>
            </span>
            &nbsp;
            {caretOrLoadingImg}
          </button>
          <div
            style={{ width: this.props.dropdownWidth ? this.props.dropdownWidth : "100%" }}
            className={
              "dropdown-menu " +
              (this.state.isOpen &&
              ((this.props.disabled !== undefined && !this.props.disabled) ||
                this.props.disabled === undefined)
                ? "open"
                : "")  + (this.props.dropdownAlign=="right" ? " pull-right" : "")
            }
          >
            <div className={"bs-searchbox " + (this.showSearch ? "" : "hide")}>
              {this.props.searchIcon && (
                <div className="input-group">
                  <span className="input-group-addon" style={{backgroundColor:"inherit"}}>
                    <div className="search-img-div pull-left">
                      {this.props.searchIcon}
                    </div>
                  </span>
                </div>
              )}
              {this.props.searchIcon === undefined && (
              <input
                type="text"
                className="form-control"
                onChange={this.filterData}
              />
              )}
            </div>

            <div
              className={
                "bs-actionsbox " +
                (this.isMultiSelect && this.showButtons ? "" : "hide")
              }
            >
              <div className="btn-group btn-block">
                <button
                  id={this.idSelectAll}
                  onClick={this.selectAllElements}
                  type="button"
                  className="actions-btn bs-select-all btn btn-default select-all-button fixed-heigth text-centered-button"
                >
                  {this.labels["btn.select.all"]}
                </button>
                <button
                  id={this.idDeselectAll}
                  onClick={this.deselectAllElements}
                  type="button"
                  className="actions-btn bs-deselect-all btn btn-default deselect-all-button fixed-heigth text-centered-button"
                >
                  {this.labels["btn.unselect.all"]}
                </button>
              </div>
            </div>

            {menu}
          </div>
        </div>
      </LostFocusHandler>
    );
  };
}

export default Select;