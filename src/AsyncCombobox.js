import React, { Component } from "react";
import LostFocusHandler from "./LostFocusHandler";

import { imgLoading } from "./loading.js";
import { imgClear } from "./clear.js";
import DebouncedTextInput from "./DebouncedTextInput";
import "./Combobox.css";

import "./AsyncCombobox.css";

class AsyncCombobox extends Component {
  maxDropdownItems = 6;

  areThereIcons = false;

  labels = {
    "cap.placeholder": "Search...",
    "lst.empty": "No items"
  };

  /* html ids */
  id = undefined;
  idRbc = undefined;
  idList = undefined;

  constructor(props) {
    super(props);

    if (this.props.id) {
      this.id = this.props.id;
      this.idRbc = "rbc-" + this.id;
      this.idList = "rbc-menu-button-dropdown-list-" + this.id;
    }

    this.maxDropdownItems = this.props.maxDropdownItems
      ? (3 + 20 + 3) * this.props.maxDropdownItems + "px"
      : (3 + 20 + 3) * 6 + "px";

    this.state = {
      isOpen: false,
      selected: {},
      data: [],
      isLoading: false,
      valueSelected: undefined,
      text: "",
      triggerReset: false
    };
  }

  prepareData = data => {
    if (data && data.length > 0) {
      if (typeof data[0] == "string") {
        return data.map((each, index) => {
          return { label: each, value: each, index: index };
        });
      } else if (typeof data[0] == "object") {
        return data.map((each, index) => {
          this.areThereIcons = each.icon ? true : this.areThereIcons;

          return {
            label: each.label,
            value: each.value,
            icon: each.icon,
            index: index
          };
        });
      }
    } else {
      return [];
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      JSON.stringify(
        prevState.data.map(each => {
          return { label: each.label, value: each.value, index: each.index };
        })
      ) !==
      JSON.stringify(
        this.state.data.map(each => {
          return { label: each.label, value: each.value, index: each.index };
        })
      )
    ) {
      this.runCallback({});
    }
  }

  runCallback(selection) {
    if (this.props.onSelection) {
      this.props.onSelection(selection);
    }
  }

  closeOrOpen = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  selectElement = element => {
    this.setState({ selected: element, valueSelected: element.label });

    this.runCallback({ value: element.value, index: element.index });
  };

  render = () => {
    let menu = (
      <div className={"rbc-padding-left20"}>
        {this.props.labels && this.props.labels["lst.empty"]
          ? this.props.labels["lst.empty"]
          : this.labels["lst.empty"]}
      </div>
    );

    let loadingImg = "";
    let clearImg = "";

    if (this.state.text.length > 0) {
      clearImg = (
        <div className="pull-right">
          <a
            className="clear"
            onClick={() => this.setState({ triggerReset: true })}
          >
            <img style={{ width: "15px", height: "15px" }} src={imgClear} />
          </a>
        </div>
      );
    }

    if (this.state.isLoading) {
      loadingImg = (
        <img style={{ width: "15px", height: "15px" }} src={imgLoading} />
      );
      clearImg = "";
    }

    if (this.state.data && this.state.data.length > 0) {
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
          {this.state.data.map(each => {
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
                    this.closeOrOpen();
                    this.selectElement(each);
                  }}
                >
                  <span className={"rbc-icon"}>
                    {each.icon ? each.icon : ""}
                  </span>
                  {each.label}
                </a>
              </li>
            );
          })}
        </ul>
      );
    }

    return (
      <LostFocusHandler onClickOutside={() => this.setState({ isOpen: false })}>
        <div className="input-box">
          <div
            className="input-container"
            style={{ width: this.props.width ? this.props.width : 200 }}
          >
            <div className="rbc-2b097c-container ">
              <div className="rbc-13srbr-control ">
                <div className="rbc-1hwfws3">
                  <div className="rbc-b8ldur-Input">
                    <DebouncedTextInput
                      id={this.props.id}
                      type="text"
                      placeholder={
                        this.props.labels &&
                        this.props.labels["cap.placeholder"]
                          ? this.props.labels["cap.placeholder"]
                          : this.labels["cap.placeholder"]
                      }
                      selected={this.state.valueSelected}
                      delay={this.props.delay ? this.props.delay * 1000 : 0}
                      onTextType={text => this.setState({ text: text })}
                      triggerReset={this.state.triggerReset}
                      afterTriggerReset={() =>
                        this.setState({ triggerReset: false })
                      }
                      onChange={text => {
                        if (
                          this.props.onChangeAfterCharNum === undefined ||
                          text.length >= this.props.onChangeAfterCharNum
                        ) {
                          this.setState({ isLoading: true });

                          this.props.async(text, data => {
                            this.setState({
                              isOpen: true,
                              data: this.prepareData(data),
                              isLoading: false
                            });
                          });
                        }
                      }}
                    />
                    {loadingImg}
                    {clearImg}
                  </div>
                </div>
              </div>
            </div>

            <div
              className={"dropdown-menu " + (this.state.isOpen ? "open" : "")}
            >
              {menu}
            </div>
          </div>
        </div>
      </LostFocusHandler>
    );
  };
}

export default AsyncCombobox;
