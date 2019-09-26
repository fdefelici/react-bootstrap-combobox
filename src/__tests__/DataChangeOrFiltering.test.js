import React from "react";
import { cleanup } from "@testing-library/react";
import Combobox from "../index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Data Change or Filtering tests", () => {

  it("Data change", () => {
    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"];
    let data2 = ["HH", "GG"];

    const component = mount(<Combobox data={data} id="123"></Combobox>);

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>AA<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>AB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>BB<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>CC<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>DD<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>EE<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>FF<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
    component.setProps({ data: data2 });
    expect(component.find("#rbc-menu-button-dropdown-list-123").html()).toEqual(
      '<ul id="rbc-menu-button-dropdown-list-123" class="dropdown-menu inner" style="max-height: 156px;"> <li class="noselect"><a class=""><span class="rbc-icon"></span>HH<span class=""></span></a></li><li class="noselect"><a class=""><span class="rbc-icon"></span>GG<span class=""></span></a></li></ul>'
    );
  });

  it("Reset selection from parent", () => {
    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"];
    let selected = [];

    const component = mount(<Combobox data={data} selected={selected} id="123"></Combobox>);

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

    shallow(component.find("a").get(0)).simulate("click");

    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">AA</div></span>&nbsp;<span class=\"caret\"></span></button>'
    );
    component.setProps({ selected: [] });
    expect(component.find("#rbc-menu-button-123").html()).toEqual(
      '<button id=\"rbc-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\" id=\"caption-text-area-container-rbc-123\"><div class=\"caption-text-area\" id=\"caption-text-area-rbc-123\">Select an item</div></span>&nbsp;<span class=\"caret\"></span></button>'
    );
  });

  
  it("Filter list", () => {
    const component = mount(
      <Combobox
        data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
        id="123"
      ></Combobox>
    );

    component.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    component.instance().getCaptionTextSize = jest.fn(() => 0);
    component.update();

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

  

  
});
