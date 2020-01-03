import React from "react";
import { cleanup } from "@testing-library/react";
import {Select} from "../index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Autocomplete} from "../index";

Enzyme.configure({ adapter: new Adapter() });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

jest.mock('../lodash/debounce', () => jest.fn(fn => fn));
jest.useFakeTimers()

describe("Selection Events tests", () => {
  it("Filter list and select", () => {
    const component = shallow(
      <Select
        isMultiSelect={true}
        showButtons={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="5"
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">AA</div></span> <span class=\"caret\"></span></button>'
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
      <Select
        isMultiSelect={true}
        showButtons={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="5"
        id="123"
      ></Select>
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
      <Select
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
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select a car</div></span> <span class=\"caret\"></span></button>'
    );

    component.find("#rbc-menu-button-selectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">9 of 9 cars selected</div></span> <span class=\"caret\"></span></button>'
    );

    component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select a car</div></span> <span class=\"caret\"></span></button>'
    );
  });

  it("Click select item and deselect all with different labels - no singular", () => {
    const component = shallow(
      <Select
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
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select a car</div></span> <span class=\"caret\"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">1 of 9 cars selected</div></span> <span class=\"caret\"></span></button>'
    );

    component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select a car</div></span> <span class=\"caret\"></span></button>'
    );
  });

  it("Click select/deselect all with same labels", () => {
    const component = shallow(
      <Select
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
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select a car</div></span> <span class=\"caret\"></span></button>'
    );

    component.find("#rbc-menu-button-selectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">9 of 9 cars selected</div></span> <span class=\"caret\"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class="glyphicon glyphicon-ok"></span></a></li></ul>'
    );

    component.find("#rbc-menu-button-deselectall-button-123").simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select a car</div></span> <span class=\"caret\"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Select first, filter, select filtered and remove filter", () => {
    const component = shallow(
      <Select
        isMultiSelect={true}
        data={["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span> <span class=\"caret\"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">1 item selected</div></span> <span class=\"caret\"></span></button>'
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
      <Select
        isMultiSelect={true}
        data={["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span> <span class=\"caret\"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">1 item selected</div></span> <span class=\"caret\"></span></button>'
    );

    shallow(component.find("a").get(1)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">2 items selected</div></span> <span class=\"caret\"></span></button>'
    );
  });

  it("Select first and second item - same label", () => {
    const component = shallow(
      <Select
        isMultiSelect={true}
        data={["AA", "AA", "AA", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span> <span class=\"caret\"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">1 item selected</div></span> <span class=\"caret\"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    shallow(component.find("a").get(1)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">2 items selected</div></span> <span class=\"caret\"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Select first and deselect item - multiselect", () => {
    const component = shallow(
      <Select
        isMultiSelect={true}
        data={["AA", "AA", "AA", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span> <span class=\"caret\"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">1 item selected</div></span> <span class=\"caret\"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span> <span class=\"caret\"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Select first and deselect item - singleselect", () => {
    const component = shallow(
      <Select
        data={["AA", "AA", "AA", "CC", "DD", "EE", "FF", "GG"]}
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span> <span class=\"caret\"></span></button>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">AA</div></span> <span class=\"caret\"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );

    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">AA</div></span> <span class=\"caret\"></span></button>'
    );
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class="glyphicon glyphicon-ok"></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Select first element", () => {
    const component = shallow(
      <Select
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span> <span class=\"caret\"></span></button>'
    );
    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">AA</div></span> <span class=\"caret\"></span></button>'
    );
  });

  it("Single select", () => {
    const component = shallow(
      <Select
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span> <span class=\"caret\"></span></button>'
    );
    shallow(component.find("a").get(0)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">AA</div></span> <span class=\"caret\"></span></button>'
    );
    shallow(component.find("a").get(1)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">AB</div></span> <span class=\"caret\"></span></button>'
    );
  });

  it("Select three elements, maxCaptionItems = 2", () => {
    const component = shallow(
      <Select
        isMultiSelect={true}
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        maxCaptionItems="2"
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span> <span class=\"caret\"></span></button>'
    );
    shallow(component.find("a").get(0)).simulate("click");
    shallow(component.find("a").get(1)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">AA, AB</div></span> <span class=\"caret\"></span></button>'
    );
    shallow(component.find("a").get(2)).simulate("click");
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">3 items selected</div></span> <span class=\"caret\"></span></button>'
    );
  });

  it("Clear selection from parent - with TrigEvent", () => {
    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"];


    const component = mount(
      <Select
        data={data}
        id="123"
      ></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    shallow(component.find("a").get(0)).simulate("click");

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">AA</div></span>&nbsp;<span class=\"caret\"></span></button>'
    );

    let trigClear = Select.TrigEvent.clear();
    component.setProps({ trigEvent: trigClear });
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span>&nbsp;<span class=\"caret\"></span></button>'
    );

    expect(trigClear.startsWith("clear")).toEqual(true);
  });

  it("onChange run", () => {
    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"];

    let isTested = false;
    let onChange = () => {
      isTested = true;
    };

    const component = mount(
      <Select data={data} onChange={onChange}></Select>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    shallow(component.find("a").get(0)).simulate("click");
    expect(isTested).toEqual(true);
  });

  it("Reset field - with TrigEvent", () => {
    const component = mount(
      <Autocomplete
        id="12349789trig"
        labels={{ "cap.placeholder": "Search!", "lst.empty": "Empty" }}
        maxDropdownItems={5}
        searchFun={(text, callback) => {
          callback([
            { label: "Grapefruit", value: "Grapefruit" },
            { label: "Mandarin", value: "Mandarin" }
          ]);
        }}
        onChangeAfterCharNum={1}
        onSelection={() => {}}
        delay={2}
        onClear={()=>{}}
      />
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    let eventObj = { target: { value: "AA" } };
    component.find("input").simulate("change", eventObj);
    component.update();
    
    jest.runAllTimers()

    shallow(component.find(".rbc-selection").get(0)).simulate("click");

    expect(component.find(".input-box").html()).toEqual(
      '<div class=\"input-box\" style=\"width: 100%;\"><div class=\"input-container\" style=\"width: 100%;\"><div class=\"rbc-1hwfws3\"><div class=\"rbc-b8ldur-Input\"><div style=\"margin-left: 8px; margin-right: 8px;\"><input id=\"rbc-13sxxr-input-12349789trig\" class=\"rbc-13sxxr-input\" placeholder=\"Search!\" type=\"search\" style=\"box-sizing: content-box; background: center; border: 0px; font-size: inherit; opacity: 1; outline: 0px;\" autocomplete=\"off\" value=\"Grapefruit\"><div class=\"pull-right\"><a class=\"clear\"><img class=\"wrapper-img\" src=\"data:image/png;base64,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\"></a></div></div></div></div><div class=\"dropdown-menu \" style=\"width: 100%;\"><ul id=\"rbc-menu-button-dropdown-list-12349789trig\" class=\"dropdown-menu inner\" style=\"max-height: 130px;\"> <li><a class=\"rbc-selection\"><span class=\"rbc-icon\"></span>Grapefruit</a></li><li><a class=\"rbc-selection\"><span class=\"rbc-icon\"></span>Mandarin</a></li></ul></div></div></div>'
    );

    let trigReset = Autocomplete.TrigEvent.clear();
    component.setProps({ trigEvent: trigReset });

    expect(component.find(".input-box").html()).toEqual(
      '<div class=\"input-box\" style=\"width: 100%;\"><div class=\"input-container\" style=\"width: 100%;\"><div class=\"rbc-1hwfws3\"><div class=\"rbc-b8ldur-Input\"><div style=\"margin-left: 8px; margin-right: 8px;\"><input id=\"rbc-13sxxr-input-12349789trig\" class=\"rbc-13sxxr-input\" placeholder=\"Search!\" type=\"search\" style=\"box-sizing: content-box; background: center; border: 0px; font-size: inherit; opacity: 1; outline: 0px;\" autocomplete=\"off\" value=\"\"></div></div></div><div class=\"dropdown-menu \" style=\"width: 100%;\"><ul id=\"rbc-menu-button-dropdown-list-12349789trig\" class=\"dropdown-menu inner\" style=\"max-height: 130px;\"> <li><a class=\"rbc-selection\"><span class=\"rbc-icon\"></span>Grapefruit</a></li><li><a class=\"rbc-selection\"><span class=\"rbc-icon\"></span>Mandarin</a></li></ul></div></div></div>'
    );
    

    expect(trigReset.startsWith("clear")).toEqual(true);
  });


  it("Click select item - AsyncSelect", () => {

     /* https://github.com/airbnb/enzyme/issues/1525 */
     document.body.innerHTML = '<div id="destattach"></div>';
     const options = {
       attachTo: document.querySelector("#destattach")
     };

    const component = mount(
        <Autocomplete
          id="1234978"
          labels={{ "cap.placeholder": "Search..." }}
          maxDropdownItems={5}
          searchFun={ (text, callback )=>{callback([{label:"Grapefruit",value:"Grapefruit"},{label:"Mandarin",value:"Mandarin"}])}}
          onChangeAfterCharNum={3}
          onSelection={() => {}}
          delay={1}
        />,
        options
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    let eventObj = { target: { value: "AAA" } };
    component.find("#rbc-13sxxr-input-1234978").simulate("change", eventObj);
    component.update();
    
    jest.runAllTimers()

    shallow(component.find(".rbc-selection").get(0)).simulate("click");

    expect(component.find(".input-box").html()).toEqual(
      '<div class=\"input-box\" style=\"width: 100%;\"><div class=\"input-container\" style=\"width: 100%;\"><div class=\"rbc-1hwfws3\"><div class=\"rbc-b8ldur-Input\"><div style=\"margin-left: 8px; margin-right: 8px;\"><input id=\"rbc-13sxxr-input-1234978\" class=\"rbc-13sxxr-input\" placeholder=\"Search...\" type=\"search\" style=\"box-sizing: content-box; background: center; border: 0px; font-size: inherit; opacity: 1; outline: 0px;\" autocomplete=\"off\" value=\"Grapefruit\"><div class=\"pull-right\"><a class=\"clear\"><img class=\"wrapper-img\" src=\"data:image/png;base64,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\"></a></div></div></div></div><div class=\"dropdown-menu \" style=\"width: 100%;\"><ul id=\"rbc-menu-button-dropdown-list-1234978\" class=\"dropdown-menu inner\" style=\"max-height: 130px;\"> <li><a class=\"rbc-selection\"><span class=\"rbc-icon\"></span>Grapefruit</a></li><li><a class=\"rbc-selection\"><span class=\"rbc-icon\"></span>Mandarin</a></li></ul></div></div></div>'
    );

    
  });
});
