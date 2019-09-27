import React from "react";
import { cleanup } from "@testing-library/react";
import Combobox from "../index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Selection Events tests", () => {
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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

  it("Select first element", () => {
    const component = shallow(
      <Combobox
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span> <span class="caret"></span></button>'
    );
    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">AA</div></span> <span class="caret"></span></button>'
    );
  });

  it("Single select", () => {
    const component = shallow(
      <Combobox
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

  it("Select three elements, maxCaptionItems = 2", () => {
    const component = shallow(
      <Combobox
        isMultiSelect={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="2"
        id="123"
      ></Combobox>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

  it("onChange run", () => {
    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"];

    let isTested = false;
    let onChange = () => {
      isTested = true;
    };

    const component = mount(
      <Combobox data={data} onChange={onChange}></Combobox>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    shallow(component.find("a").get(0)).simulate("click");
    expect(isTested).toEqual(true);
  });
});
