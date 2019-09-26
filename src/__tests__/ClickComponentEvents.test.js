import React from "react";
import ReactDOM from "react-dom";
import { cleanup, fireEvent, render, create } from "@testing-library/react";
import Combobox from "../index";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe("Click Component Events tests", () => {
  

  it("Should click outside the component, closing menu", () => {

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

    wrapper.instance().getCaptionTextContainerSize = jest.fn(() => 0);
    wrapper.instance().getCaptionTextSize = jest.fn(() => 0);
    wrapper.update();


    map.mousedown({
      target: ReactDOM.findDOMNode(wrapper.instance())
    });

    expect(props.actions.something).not.toHaveBeenCalled();
  });
});
