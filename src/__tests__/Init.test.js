import React from "react";
import { cleanup, fireEvent, render, create } from "@testing-library/react";
import {Select} from "../index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Init tests", () => {
    it("Hide search bar", () => {
        const component = shallow(<Select data={["AA"]} />);
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find(".input-box").html()).toEqual(
          '<div class="input-box"><button type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-undefined"><div class="caption-text-area" id="caption-text-area-undefined">Select an item</div></span> <span class="caret"></span></button><div class="dropdown-menu "><div class="bs-searchbox hide"><input type="text" class="form-control"/></div><div class="bs-actionsbox hide"><div class="btn-group btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default select-all-button">All</button><button type="button" class="actions-btn bs-deselect-all btn btn-default deselect-all-button">Clear</button></div></div><ul class="dropdown-menu inner" style="max-height:156px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li></ul></div></div>'
        );
      });
    
      it("Test items shown in scrollbar, [2 items = 52px, 4 items = 104px]", () => {
        let component = shallow(
          <Select
            data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
            maxDropdownItems="2"
            id="123"
          ></Select>
        );
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
          '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height:52px"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
        );
    
        component = shallow(
          <Select
            data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
            maxDropdownItems="4"
            id="123"
          ></Select>
        );
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
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
          <Select data={data} onChange={onChange}></Select>
        );
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
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
          <Select
            isMultiSelect={true}
            data={data}
            onChange={onChange}
          ></Select>
        );
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
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
          <Select isMultiSelect={true} data={data} id="123"></Select>
        );
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
          '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class="rbc-padding-left10"><span class="rbc-icon"><span class="glyphicon glyphicon-plus"></span></span>AA<span class=""></span></a></li><li class="noselect"><a class="rbc-padding-left30"><span class="rbc-icon"></span>AB<span class=""></span></a></li></ul>'
        );
      });

      it("Test maxCaptionItems auto", () => {
        let data = ["Apple", "Banana", "Citrus", "Strawberry", "Watermelon"];
    
        const component = mount(
          <Select
            maxCaptionItems="auto"
            isMultiSelect={true}
            data={data}
            id="123"
          ></Select>
        );
    
        component.instance().getCaptionTextContainerSize = jest.fn(() => 150);
        component.instance().getCaptionTextSize = jest.fn(() => 0);
        component.update();
    
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id="rbc-menu-button-123" type="button" class="btn btn-default dropdown-toggle show-special-title button-dropdown"><span class="pull-left filter-option"></span><span class="pull-left special-title" id="caption-text-area-container-rbc-123"><div class="caption-text-area" id="caption-text-area-rbc-123">Select an item</div></span>&nbsp;<span class="caret"></span></button>'
        );
        
        component.instance().getCaptionTextSize = jest.fn(() => 50);
        component.update();
        shallow(component.find("a").get(0)).simulate("click");
    
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Apple</div></span>&nbsp;<span class=\"caret\"></span></button>'
        );
        
        component.instance().getCaptionTextSize = jest.fn(() => 100);
        component.update();
        shallow(component.find("a").get(1)).simulate("click");
        
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Apple, Banana</div></span>&nbsp;<span class=\"caret\"></span></button>'
        );
    
        component.instance().getCaptionTextSize = jest.fn(() => 110);
        component.update();
        shallow(component.find("a").get(2)).simulate("click");
        
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Apple, Banana, Citrus</div></span>&nbsp;<span class=\"caret\"></span></button>'
        );
    
        component.instance().getCaptionTextSize = jest.fn(() => 200);
        component.update();
        shallow(component.find("a").get(3)).simulate("click");
        
        expect(component.find("#rbc-menu-button-123").html()).toEqual(
          '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">4 items selected</div></span>&nbsp;<span class=\"caret\"></span></button>'
        );
      
      });
});
