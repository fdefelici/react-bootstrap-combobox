import React from "react";
import { cleanup, render } from "@testing-library/react";
import {Select} from "../index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { lstat } from "fs";

Enzyme.configure({ adapter: new Adapter() });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Label tests", () => {
    it("Select/deselect all labels", () => {
        const { getByText } = render(
          <Select
            showButtons={true}
            data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
            labels={{
              "btn.select.all": "Pick All",
              "btn.unselect.all": "Release All"
            }}
            id="123"
          ></Select>
        );
    
        expect(getByText(/Pick All/i)).toBeTruthy();
        expect(getByText(/Release All/i)).toBeTruthy();
      });
    
      it("No html ids", () => {
        const component = shallow(<Select data={["AA"]} />);
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find(".input-box").html()).toEqual(
          '<div class="input-box"><button type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-undefined"><div class="caption-text-area" id="caption-text-area-undefined">Select an item</div></span> <span class="caret"></span></button><div class="dropdown-menu "><div class="bs-searchbox hide"><input type="text" class="form-control"/></div><div class="bs-actionsbox hide"><div class="btn-group btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default select-all-button">All</button><button type="button" class="actions-btn bs-deselect-all btn btn-default deselect-all-button">Clear</button></div></div><ul class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li></ul></div></div>'
        );
      });

      it("Singular/plural labels", () => {
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

      it("Click select/deselect all with different labels - no singular and no plural", () => {
        const component = mount(
          <Select
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
          ></Select>
        );
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
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

      it("Empty list label", () => {
        const component = shallow(<Select data={[]} />);
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find(".input-box").html()).toEqual(
          '<div class=\"input-box\"><button type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-undefined\"><div class=\"caption-text-area\" id=\"caption-text-area-undefined\">Select an item</div></span> <span class=\"caret\"></span></button><div class=\"dropdown-menu \"><div class=\"bs-searchbox hide\"><input type=\"text\" class=\"form-control\"/></div><div class=\"bs-actionsbox hide\"><div class=\"btn-group btn-block\"><button type=\"button\" class=\"actions-btn bs-select-all btn btn-default select-all-button\">All</button><button type=\"button\" class=\"actions-btn bs-deselect-all btn btn-default deselect-all-button\">Clear</button></div></div><div class=\"rbc-padding-left20\">No items</div></div></div>'
        );
      });

      it("Empty list label - different label", () => {
        const component = shallow(<Select data={[]} labels={{"lst.empty":"No cars"}} />);
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find(".input-box").html()).toEqual(
          '<div class=\"input-box\"><button type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-undefined\"><div class=\"caption-text-area\" id=\"caption-text-area-undefined\">Select an item</div></span> <span class=\"caret\"></span></button><div class=\"dropdown-menu \"><div class=\"bs-searchbox hide\"><input type=\"text\" class=\"form-control\"/></div><div class=\"bs-actionsbox hide\"><div class=\"btn-group btn-block\"><button type=\"button\" class=\"actions-btn bs-select-all btn btn-default select-all-button\">All</button><button type=\"button\" class=\"actions-btn bs-deselect-all btn btn-default deselect-all-button\">Clear</button></div></div><div class=\"rbc-padding-left20\">No cars</div></div></div>'
        );
      });

      it("Join initial selection", () => {
        const component = shallow(<Select
           data={[{ label: "AA", value: "aa", selected: true}, { label: "BB", value: "bb", selected: true}]} maxCaptionItems={3}  />);
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find(".input-box").html()).toEqual(
          '<div class=\"input-box\"><button type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-undefined\"><div class=\"caption-text-area\" id=\"caption-text-area-undefined\">AA, BB</div></span> <span class=\"caret\"></span></button><div class=\"dropdown-menu \"><div class=\"bs-searchbox hide\"><input type=\"text\" class=\"form-control\"/></div><div class=\"bs-actionsbox hide\"><div class=\"btn-group btn-block\"><button type=\"button\" class=\"actions-btn bs-select-all btn btn-default select-all-button\">All</button><button type=\"button\" class=\"actions-btn bs-deselect-all btn btn-default deselect-all-button\">Clear</button></div></div><ul class=\"dropdown-menu inner\" style=\"max-height:156px\"> <li class=\"noselect\"><a class=\"\"><span class=\"rbc-icon\"></span>AA<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a class=\"\"><span class=\"rbc-icon\"></span>BB<span class=\"glyphicon glyphicon-ok\"></span></a></li></ul></div></div>'
        );
      });
});
