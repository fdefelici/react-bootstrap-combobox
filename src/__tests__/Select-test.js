import React from 'react';
import ReactDOM from 'react-dom'
import {cleanup, fireEvent, render, create} from '@testing-library/react';
import RBS, { Select } from '../index';
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Dropdown tests', () => {

  it('Should not call action on click inside the component', () => {
    const map = {}
  
    document.addEventListener = jest.fn((event, cb) => {
      map[event] = cb
    })
  
    const props = {
      actions: {
        something: jest.fn(),
      }
    }
  
    const wrapper = mount(<Select {... props} />)
  
    map.mousedown({
      target: ReactDOM.findDOMNode(wrapper.instance()),
    })
  
    expect(props.actions.something).not.toHaveBeenCalled()
  })

  it('Click select/deselect all', () => {
    
    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="5"
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"\"></span></a></li><li class=\"noselect\"><a>AB<span class=\"\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"\"></span></a></li><li class=\"noselect\"><a>CC<span class=\"\"></span></a></li><li class=\"noselect\"><a>DD<span class=\"\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"\"></span></a></li><li class=\"noselect\"><a>EE<span class=\"\"></span></a></li><li class=\"noselect\"><a>FF<span class=\"\"></span></a></li><li class=\"noselect\"><a>GG<span class=\"\"></span></a></li></ul>")
    
    component.find('#rbs-menu-button-selectall-button-123').simulate('click');
    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>AB<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>CC<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>DD<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>EE<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>FF<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>GG<span class=\"glyphicon glyphicon-ok\"></span></a></li></ul>")

    component.find('#rbs-menu-button-deselectall-button-123').simulate('click');
    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"\"></span></a></li><li class=\"noselect\"><a>AB<span class=\"\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"\"></span></a></li><li class=\"noselect\"><a>CC<span class=\"\"></span></a></li><li class=\"noselect\"><a>DD<span class=\"\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"\"></span></a></li><li class=\"noselect\"><a>EE<span class=\"\"></span></a></li><li class=\"noselect\"><a>FF<span class=\"\"></span></a></li><li class=\"noselect\"><a>GG<span class=\"\"></span></a></li></ul>")
  
  });

  it('Click select/deselect all with different labels', () => {
    
    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="5"
      labels = {{
        "cap.select.empty": "Select a car",
        "cap.select.singular": "One car selected",
        "cap.select.plural": "{sel} of {size} cars selected",
        "btn.select.all": "Pick All",
        "btn.unselect.all": "Release All",
      }}
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select a car</span> <span class=\"caret\"></span></button>")
    
    component.find('#rbs-menu-button-selectall-button-123').simulate('click');
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">9 of 9 cars selected</span> <span class=\"caret\"></span></button>")

    component.find('#rbs-menu-button-deselectall-button-123').simulate('click');
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select a car</span> <span class=\"caret\"></span></button>")
  
  });

  it('Click select/deselect all with different labels - no singular', () => {
    
    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="0"
      labels = {{
        "cap.select.empty": "Select a car",
        "cap.select.plural": "{sel} of {size} cars selected",
        "btn.select.all": "Pick All",
        "btn.unselect.all": "Release All",
      }}
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select a car</span> <span class=\"caret\"></span></button>")
    
    shallow(component.find("a").get(0)).simulate("click")
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">1 of 9 cars selected</span> <span class=\"caret\"></span></button>")

    component.find('#rbs-menu-button-deselectall-button-123').simulate('click');
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select a car</span> <span class=\"caret\"></span></button>")
  
  });

  it('Select first, filter, select all and remove filter', () => {
    
    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"]}
      maxItemsAsCaption="0"
      labels = {{
        "cap.select.empty": "Select a car",
        "cap.select.plural": "{sel} of {size} cars selected",
        "btn.select.all": "Pick All",
        "btn.unselect.all": "Release All",
      }}
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select a car</span> <span class=\"caret\"></span></button>")
    
    shallow(component.find("a").get(0)).simulate("click")
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">1 of 8 cars selected</span> <span class=\"caret\"></span></button>")

    let eventObj = { target: { value: 'B' } };
    component.find('input').simulate('change', eventObj);
    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>BB<span class=\"\"></span></a></li></ul>")
    shallow(component.find("a").get(0)).simulate("click")

    eventObj = { target: { value: '' } };
    component.find('input').simulate('change', eventObj);
    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>AB<span class=\"\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"glyphicon glyphicon-ok\"></span></a></li><li class=\"noselect\"><a>CC<span class=\"\"></span></a></li><li class=\"noselect\"><a>DD<span class=\"\"></span></a></li><li class=\"noselect\"><a>EE<span class=\"\"></span></a></li><li class=\"noselect\"><a>FF<span class=\"\"></span></a></li><li class=\"noselect\"><a>GG<span class=\"\"></span></a></li></ul>")

  });

  it('Data change', () => {

    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"]
    let data2 = ["HH", "GG"]

    
    const component = mount(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={data}
      maxItemsAsCaption="0"
      labels = {{
        "cap.select.empty": "Select a car",
        "cap.select.plural": "{sel} of {size} cars selected",
        "btn.select.all": "Pick All",
        "btn.unselect.all": "Release All",
      }}
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"\"></span></a></li><li class=\"noselect\"><a>AB<span class=\"\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"\"></span></a></li><li class=\"noselect\"><a>CC<span class=\"\"></span></a></li><li class=\"noselect\"><a>DD<span class=\"\"></span></a></li><li class=\"noselect\"><a>EE<span class=\"\"></span></a></li><li class=\"noselect\"><a>FF<span class=\"\"></span></a></li><li class=\"noselect\"><a>GG<span class=\"\"></span></a></li></ul>")
    component.setProps({ data: data2 });
    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>HH<span class=\"\"></span></a></li><li class=\"noselect\"><a>GG<span class=\"\"></span></a></li></ul>")

  });

  it('onChange run', () => {

    let data = ["AA", "AB", "BB", "CC", "DD", "EE", "FF", "GG"]
    let data2 = ["HH", "GG"]

    let isTested = false
    let onChange = () => { isTested = true }
    
    const component = mount(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={data}
      maxItemsAsCaption="0"
      onChange = {onChange}
      labels = {{
        "cap.select.empty": "Select a car",
        "cap.select.plural": "{sel} of {size} cars selected",
        "btn.select.all": "Pick All",
        "btn.unselect.all": "Release All",
      }}
      id="123"
    ></Select>,
    );

    shallow(component.find("a").get(0)).simulate("click")
    expect(isTested).toEqual(true)

  });

  it('Click select/deselect all with different labels - no singular and no plural', () => {
    
    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="0"
      labels = {{
        "cap.select.empty": "Select a car",
        "btn.select.all": "Pick All",
        "btn.unselect.all": "Release All",
      }}
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select a car</span> <span class=\"caret\"></span></button>")
    
    shallow(component.find("a").get(0)).simulate("click")
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">1 item selected</span> <span class=\"caret\"></span></button>")

    component.find('#rbs-menu-button-deselectall-button-123').simulate('click');
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select a car</span> <span class=\"caret\"></span></button>")
  
  });


  it('Filter list', () => {
    
    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="5"
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"\"></span></a></li><li class=\"noselect\"><a>AB<span class=\"\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"\"></span></a></li><li class=\"noselect\"><a>CC<span class=\"\"></span></a></li><li class=\"noselect\"><a>DD<span class=\"\"></span></a></li><li class=\"noselect\"><a>BB<span class=\"\"></span></a></li><li class=\"noselect\"><a>EE<span class=\"\"></span></a></li><li class=\"noselect\"><a>FF<span class=\"\"></span></a></li><li class=\"noselect\"><a>GG<span class=\"\"></span></a></li></ul>")
    
    let eventObj = { target: { value: 'AA' } };
    component.find('input').simulate('change', eventObj);
    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"\"></span></a></li></ul>")

    eventObj = { target: { value: 'A' } };
    component.find('input').simulate('change', eventObj);
    expect(component.find("#rbs-menu-button-dropdown-list-123").html()).toEqual("<ul id=\"rbs-menu-button-dropdown-list-123\" class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"\"></span></a></li><li class=\"noselect\"><a>AB<span class=\"\"></span></a></li></ul>")
      
  });
  
  it('Singular/plural labels', () => {

    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="5"
  
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select an item</span> <span class=\"caret\"></span></button>")
    
    component.find('#rbs-menu-button-selectall-button-123').simulate('click');
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">9 items selected</span> <span class=\"caret\"></span></button>")

    component.find('#rbs-menu-button-deselectall-button-123').simulate('click');
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select an item</span> <span class=\"caret\"></span></button>")
 
  });

  it('Select first element', () => {

    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="5"
      
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select an item</span> <span class=\"caret\"></span></button>")
    shallow(component.find("a").get(0)).simulate("click")
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">AA</span> <span class=\"caret\"></span></button>")  
    
  });

  it('Select three elements, maxItemsAsCaption = 2', () => {

    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="2"
      labels={{singular: "car"}}
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select an item</span> <span class=\"caret\"></span></button>")
    shallow(component.find("a").get(0)).simulate("click")
    shallow(component.find("a").get(1)).simulate("click")
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">AA, AB</span> <span class=\"caret\"></span></button>")  
    shallow(component.find("a").get(2)).simulate("click")
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">9 items selected</span> <span class=\"caret\"></span></button>")  

  });

  
  it('Single select', () => {

    const component = shallow(
      <Select
      isMultiSelect={false}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="2"
      labels = {{
        "cap.select.empty": "Select a car",
        "cap.select.singular": "One car selected",
        "cap.select.plural": "{sel} of {size} cars selected",
        "btn.select.all": "Pick All",
        "btn.unselect.all": "Release All",
      }}
      id="123"
    ></Select>,
    );

    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select a car</span> <span class=\"caret\"></span></button>")
    shallow(component.find("a").get(0)).simulate("click")
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">AA</span> <span class=\"caret\"></span></button>")  
    shallow(component.find("a").get(1)).simulate("click")
    expect(component.find("#rbs-menu-button-123").html()).toEqual("<button id=\"rbs-menu-button-123\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">AB</span> <span class=\"caret\"></span></button>")  

  });
  

  it('Select/deselect all labels', () => {
    

    const {getByText} = render(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxItemsAsCaption="5"
      labels = {{
        "cap.select.empty": "Select a car",
        "cap.select.singular": "One car selected",
        "cap.select.plural": "{sel} of {size} cars selected",
        "btn.select.all": "Pick All",
        "btn.unselect.all": "Release All",
      }}
      id="123"
    ></Select>,
    );
    
    expect(getByText(/Pick All/i)).toBeTruthy()
    expect(getByText(/Release All/i)).toBeTruthy()

  });

  it('No html ids', () => {
  
    const component = shallow(
      <Select
      isMultiSelect={true}
      showSearch={true}
      showButtons={true}
      data={["AA"]}/>
    );
    
    expect(component.find(".input-box").html()).toEqual("<div class=\"input-box\"><button type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select an item</span> <span class=\"caret\"></span></button><div class=\"dropdown-menu \"><div class=\"bs-searchbox \"><input type=\"text\" class=\"form-control\"/></div><div class=\"bs-actionsbox \"><div class=\"btn-group btn-block\"><button type=\"button\" class=\"actions-btn bs-select-all btn btn-default select-all-button\">All</button><button type=\"button\" class=\"actions-btn bs-deselect-all btn btn-default deselect-all-button\">Clear</button></div></div><ul class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"\"></span></a></li></ul></div></div>")
  
  });

  it('Hide search bar', () => {
  
    const component = shallow(
      <Select
      isMultiSelect={true}
      showButtons={true}
      data={["AA"]}/>
    );
    
    expect(component.find(".input-box").html()).toEqual("<div class=\"input-box\"><button type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select an item</span> <span class=\"caret\"></span></button><div class=\"dropdown-menu \"><div class=\"bs-searchbox hide\"><input type=\"text\" class=\"form-control\"/></div><div class=\"bs-actionsbox \"><div class=\"btn-group btn-block\"><button type=\"button\" class=\"actions-btn bs-select-all btn btn-default select-all-button\">All</button><button type=\"button\" class=\"actions-btn bs-deselect-all btn btn-default deselect-all-button\">Clear</button></div></div><ul class=\"dropdown-menu inner\"><li class=\"noselect\"><a>AA<span class=\"\"></span></a></li></ul></div></div>")
  
  });
  
});