import React from "react";
import ReactDOM from "react-dom";
import { cleanup, fireEvent, render, create } from "@testing-library/react";
import Combobox from "../index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Dropdown tests", () => {
  /* https://github.com/airbnb/enzyme/issues/1525 */
  document.body.innerHTML = '<div id="destattach"></div>';
  const options = {
    attachTo: document.querySelector("#destattach")
  };

  Object.defineProperties(window.document.documentElement, {
    clientWidth: {
      value: 300,
      writable: false
    }
  });

  it("Should click outside the component, closing menu", () => {
    const map = {};

    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const component = mount(
      <div id="container">
        <button id="outside">click outside</button>
        <Combobox
          data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
          id="123"
        ></Combobox>
      </div>,
      options
    );

    //closed
    expect(component.find(".input-box").html()).toEqual(
      '<div id="rbc-123" class="input-box"><button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu "><div class="bs-searchbox hide"><input type="text" class="form-control"></div><div class="bs-actionsbox hide"><div class="btn-group btn-block"><button id="rbc-menu-button-selectall-button-123" type="button" class="actions-btn bs-select-all btn btn-default select-all-button">All</button><button id="rbc-menu-button-deselectall-button-123" type="button" class="actions-btn bs-deselect-all btn btn-default deselect-all-button">Clear</button></div></div><ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul></div></div>'
    );
    component.find("#rbc-menu-button-123").simulate("click");
    //open
    expect(component.find(".input-box").html()).toEqual(
      '<div id="rbc-123" class="input-box"><button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><div class="bs-searchbox hide"><input type="text" class="form-control"></div><div class="bs-actionsbox hide"><div class="btn-group btn-block"><button id="rbc-menu-button-selectall-button-123" type="button" class="actions-btn bs-select-all btn btn-default select-all-button">All</button><button id="rbc-menu-button-deselectall-button-123" type="button" class="actions-btn bs-deselect-all btn btn-default deselect-all-button">Clear</button></div></div><ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul></div></div>'
    );
    //click outside
    map.mousedown({
      target: ReactDOM.findDOMNode(component.instance())
    });
    //closed
    expect(component.find(".input-box").html()).toEqual(
      '<div id="rbc-123" class="input-box"><button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu "><div class="bs-searchbox hide"><input type="text" class="form-control"></div><div class="bs-actionsbox hide"><div class="btn-group btn-block"><button id="rbc-menu-button-selectall-button-123" type="button" class="actions-btn bs-select-all btn btn-default select-all-button">All</button><button id="rbc-menu-button-deselectall-button-123" type="button" class="actions-btn bs-deselect-all btn btn-default deselect-all-button">Clear</button></div></div><ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul></div></div>'
    );
  });

  it("Should not call action on click inside the component", () => {
    const map = {};

    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const props = {
      actions: {
        something: jest.fn()
      }
    };

    const wrapper = mount(<Combobox {...props} />);

    map.mousedown({
      target: ReactDOM.findDOMNode(wrapper.instance())
    });

    expect(props.actions.something).not.toHaveBeenCalled();
  });

  it("Filter list and select", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        showButtons={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="5"
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">AA</div></span> <span class="caret"></span></button>'
    );

    let eventObj = { target: { value: "BB" } };
    component.find("input").simulate("change", eventObj);
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li></ul>'
    );

    component.find("#rbc-menu-button-selectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class="glyphicon glyphicon-ok"></span></a></li></ul>'
    );

    eventObj = { target: { value: "" } };
    component.find("input").simulate("change", eventObj);
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Click select/deselect all", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        showButtons={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="5"
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    component.find("#rbc-menu-button-selectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class="glyphicon glyphicon-ok"></span></a></li></ul>'
    );

    component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Click select/deselect all with different labels", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        showButtons={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="5"
        labels={{
          "cap.select.empty": "Select a car",
          "cap.select.singular": "One car selected",
          "cap.select.plural": "{sel} of {size} cars selected",
          "btn.select.all": "Pick All",
          "btn.unselect.all": "Release All"
        }}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span> <span class="caret"></span></button>'
    );

    component.find("#rbc-menu-button-selectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">9 of 9 cars selected</div></span> <span class="caret"></span></button>'
    );

    component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span> <span class="caret"></span></button>'
    );
  });

  it("Click select item and deselect all with different labels - no singular", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        showButtons={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="0"
        labels={{
          "cap.select.empty": "Select a car",
          "cap.select.plural": "{sel} of {size} cars selected",
          "btn.select.all": "Pick All",
          "btn.unselect.all": "Release All"
        }}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span> <span class="caret"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">1 of 9 cars selected</div></span> <span class="caret"></span></button>'
    );

    component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span> <span class="caret"></span></button>'
    );
  });

  it("Click select/deselect all with same labels", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        showButtons={true}
        data={["AA", "AA", "AA", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="0"
        labels={{
          "cap.select.empty": "Select a car",
          "cap.select.plural": "{sel} of {size} cars selected",
          "btn.select.all": "Pick All",
          "btn.unselect.all": "Release All"
        }}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span> <span class="caret"></span></button>'
    );

    component.find("#rbc-menu-button-selectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">9 of 9 cars selected</div></span> <span class="caret"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class="glyphicon glyphicon-ok"></span></a></li></ul>'
    );

    component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span> <span class="caret"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Select first, filter, select filtered and remove filter", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        data={["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">1 item selected</div></span> <span class="caret"></span></button>'
    );

    let eventObj = { target: { value: "B" } };
    component.find("input").simulate("change", eventObj);
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li></ul>'
    );
    shallow(component.find("a").get(0)).simulate("click");

    eventObj = { target: { value: "" } };
    component.find("input").simulate("change", eventObj);
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Select first and second item", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        data={["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">1 item selected</div></span> <span class="caret"></span></button>'
    );

    shallow(component.find("a").get(1)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">2 items selected</div></span> <span class="caret"></span></button>'
    );
  });

  it("Select first and second item - same label", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        data={["AA", "AA", "AA", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">1 item selected</div></span> <span class="caret"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    shallow(component.find("a").get(1)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">2 items selected</div></span> <span class="caret"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Select first and deselect item - multiselect", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        data={["AA", "AA", "AA", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">1 item selected</div></span> <span class="caret"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Select first and deselect item - singleselect", () => {
    const component = shallow(
      <Combobox
        data={["AA", "AA", "AA", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">AA</div></span> <span class="caret"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">AA</div></span> <span class="caret"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Data change", () => {
    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"];
    let data2 = ["HH", "GG"];

    const component = mount(<Combobox data={data} id="123"></Combobox>);

    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
    component.setProps({ data: data2 });
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>HH<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("onChange run", () => {
    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"];

    let isTested = false;
    let onChange = () => {
      isTested = true;
    };

    const component = mount(
      <Combobox data={data} onChange={onChange}></Combobox>,
      options
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(isTested).toEqual(true);
  });

  it("Click select/deselect all with different labels - no singular and no plural", () => {
    const component = mount(
      <Combobox
        isMultiSelect={true}
        showButtons={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="0"
        labels={{
          "cap.select.empty": "Select a car",
          "btn.select.all": "Pick All",
          "btn.unselect.all": "Release All"
        }}
        id="123"
      ></Combobox>,
      options
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span>&nbsp;<span class="caret"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">1 item selected</div></span>&nbsp;<span class="caret"></span></button>'
    );

    component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select a car</div></span>&nbsp;<span class="caret"></span></button>'
    );
  });

  it("Filter list", () => {
    const component = mount(
      <Combobox
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>,
      options
    );

    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    let eventObj = { target: { value: "AA" } };
    component.find("input").simulate("change", eventObj);
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li></ul>'
    );

    eventObj = { target: { value: "A" } };
    component.find("input").simulate("change", eventObj);
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li></ul>'
    );
  });

  it("Singular/plural labels", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        showButtons={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="5"
        id="123"
      ></Combobox>,
      options
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );

    component.find("#rbc-menu-button-selectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">9 items selected</div></span> <span class="caret"></span></button>'
    );

    component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );
  });

  it("Select first element", () => {
    const component = shallow(
      <Combobox
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );
    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">AA</div></span> <span class="caret"></span></button>'
    );
  });

  it("Select three elements, maxCaptionItems = 2", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="2"
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );
    shallow(component.find("a").get(0)).simulate("click");
    shallow(component.find("a").get(1)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">AA, AB</div></span> <span class="caret"></span></button>'
    );
    shallow(component.find("a").get(2)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">3 items selected</div></span> <span class="caret"></span></button>'
    );
  });

  it("Single select", () => {
    const component = shallow(
      <Combobox
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );
    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">AA</div></span> <span class="caret"></span></button>'
    );
    shallow(component.find("a").get(1)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">AB</div></span> <span class="caret"></span></button>'
    );
  });

  it("Select/deselect all labels", () => {
    const { getByText } = render(
      <Combobox
        showButtons={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        labels={{
          "btn.select.all": "Pick All",
          "btn.unselect.all": "Release All"
        }}
        id="123"
      ></Combobox>
    );

    expect(getByText(/Pick All/i)).toBeTruthy();
    expect(getByText(/Release All/i)).toBeTruthy();
  });

  it("No html ids", () => {
    const component = shallow(<Combobox data={["AA"]} />);

    expect(component.find(".input-box").html()).toEqual(
      '<div class="input-box"><button type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-undefined"><div class="caption-text-area" id="caption-text-area-undefined">Select an item</div></span> <span class="caret"></span></button><div class="dropdown-menu "><div class="bs-searchbox hide"><input type="text" class="form-control"/></div><div class="bs-actionsbox hide"><div class="btn-group btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default select-all-button">All</button><button type="button" class="actions-btn bs-deselect-all btn btn-default deselect-all-button">Clear</button></div></div><ul class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li></ul></div></div>'
    );
  });

  it("Hide search bar", () => {
    const component = shallow(<Combobox data={["AA"]} />);

    expect(component.find(".input-box").html()).toEqual(
      '<div class="input-box"><button type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-undefined"><div class="caption-text-area" id="caption-text-area-undefined">Select an item</div></span> <span class="caret"></span></button><div class="dropdown-menu "><div class="bs-searchbox hide"><input type="text" class="form-control"/></div><div class="bs-actionsbox hide"><div class="btn-group btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default select-all-button">All</button><button type="button" class="actions-btn bs-deselect-all btn btn-default deselect-all-button">Clear</button></div></div><ul class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li></ul></div></div>'
    );
  });

  it("Test items shown in scrollbar, [2 items = 52px, 4 items = 104px]", () => {
    let component = shallow(
      <Combobox
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxDropdownItems="2"
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:52px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    component = shallow(
      <Combobox
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxDropdownItems="4"
        id="123"
      ></Combobox>
    );

    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:104px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Test objects of the menu - creation from string array", () => {
    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"];

    let objectSelected = {};
    let onChange = selected => {
      objectSelected = selected;
    };

    const component = mount(
      <Combobox data={data} onChange={onChange}></Combobox>,
      options
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(JSON.stringify(objectSelected)).toEqual(
      '[{"value":"AA","index":0}]'
    );
  });

  it("Test objects of the menu - creation from object array", () => {
    let data = [
      { label: "AA", value: "first" },
      { label: "AB", value: "second" }
    ];

    let objectSelected = {};
    let onChange = selected => {
      objectSelected = selected;
    };

    const component = mount(
      <Combobox
        isMultiSelect={true}
        data={data}
        onChange={onChange}
      ></Combobox>,
      options
    );

    shallow(component.find("a").get(0)).simulate("click");
    shallow(component.find("a").get(1)).simulate("click");
    expect(JSON.stringify(objectSelected)).toEqual(
      '[{"value":"first","index":0},{"value":"second","index":1}]'
    );
  });

  it("Test objects of the menu - creation from object array with icons", () => {
    let data = [
      {
        label: "AA",
        value: "first",
        icon: <span className={"glyphicon glyphicon-plus"}></span>
      },
      { label: "AB", value: "second" }
    ];

    const component = mount(
      <Combobox isMultiSelect={true} data={data} id="123"></Combobox>
    );

    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class="rbc-padding-right10"><span class="rbc-icon"><span class="glyphicon glyphicon-plus"></span></span>AA<span class=""></span></a></li><li class="noselect"><a class="rbc-padding-right30"><span class="rbc-icon"></span>AB<span class=""></span></a></li></ul>'
    );
  });

  it("Test maxCaptionItems auto", () => {
    let data = ["Apple", "Banana", "Citrus", "Strawberry", "Watermelon"];

    const component = mount(
      <Combobox
        maxCaptionItems="auto"
        isMultiSelect={true}
        data={data}
        id="123"
      ></Combobox>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 150);
    component.instance().getCaptionTextSize = jest.fn(() => 200);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span>&nbsp;<span class="caret"></span></button>'
    );
    shallow(component.find("a").get(0)).simulate("click");
    shallow(component.find("a").get(1)).simulate("click");
    shallow(component.find("a").get(2)).simulate("click");
    shallow(component.find("a").get(3)).simulate("click");
    shallow(component.find("a").get(4)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">5 items selected</div></span>&nbsp;<span class=\"caret\"></span></button>'
    );
  });
});
