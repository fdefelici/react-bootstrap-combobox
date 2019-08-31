import React from 'react';
import {cleanup, fireEvent, render, create} from '@testing-library/react';
import { Dropdown } from '../index';
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

describe('Dropdown tests', () => {

  it('Click select/deselect all', () => {
    

    const component = shallow(
      <Dropdown
      isMultiSelect={true}
      showButtonsSelectAll={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxElementPlaceholder="5"
      labels={{deselectAll: "NoneSelected",selectAll: "AllSelected"}}
    ></Dropdown>,
    );

    expect(component.find("#restboot-dropdown-list").html()).toEqual("<ul id=\"restboot-dropdown-list\" class=\"dropdown-menu inner\"><li><a>AA<span class=\"\"></span></a></li><li><a>AB<span class=\"\"></span></a></li><li><a>BB<span class=\"\"></span></a></li><li><a>CC<span class=\"\"></span></a></li><li><a>DD<span class=\"\"></span></a></li><li><a>BB<span class=\"\"></span></a></li><li><a>EE<span class=\"\"></span></a></li><li><a>FF<span class=\"\"></span></a></li><li><a>GG<span class=\"\"></span></a></li></ul>")
    
    component.find('#restboot-selectall-button').simulate('click');
    expect(component.find("#restboot-dropdown-list").html()).toEqual("<ul id=\"restboot-dropdown-list\" class=\"dropdown-menu inner\"><li><a>AA<span class=\"glyphicon glyphicon-ok\"></span></a></li><li><a>AB<span class=\"glyphicon glyphicon-ok\"></span></a></li><li><a>BB<span class=\"glyphicon glyphicon-ok\"></span></a></li><li><a>CC<span class=\"glyphicon glyphicon-ok\"></span></a></li><li><a>DD<span class=\"glyphicon glyphicon-ok\"></span></a></li><li><a>BB<span class=\"glyphicon glyphicon-ok\"></span></a></li><li><a>EE<span class=\"glyphicon glyphicon-ok\"></span></a></li><li><a>FF<span class=\"glyphicon glyphicon-ok\"></span></a></li><li><a>GG<span class=\"glyphicon glyphicon-ok\"></span></a></li></ul>")

    component.find('#restboot-deselectall-button').simulate('click');
    expect(component.find("#restboot-dropdown-list").html()).toEqual("<ul id=\"restboot-dropdown-list\" class=\"dropdown-menu inner\"><li><a>AA<span class=\"\"></span></a></li><li><a>AB<span class=\"\"></span></a></li><li><a>BB<span class=\"\"></span></a></li><li><a>CC<span class=\"\"></span></a></li><li><a>DD<span class=\"\"></span></a></li><li><a>BB<span class=\"\"></span></a></li><li><a>EE<span class=\"\"></span></a></li><li><a>FF<span class=\"\"></span></a></li><li><a>GG<span class=\"\"></span></a></li></ul>")

  
  });

  it('Filter list', () => {
    
    const component = shallow(
      <Dropdown
      isMultiSelect={true}
      showButtonsSelectAll={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxElementPlaceholder="5"
      labels={{deselectAll: "NoneSelected",selectAll: "AllSelected"}}
    ></Dropdown>,
    );

    expect(component.find("#restboot-dropdown-list").html()).toEqual("<ul id=\"restboot-dropdown-list\" class=\"dropdown-menu inner\"><li><a>AA<span class=\"\"></span></a></li><li><a>AB<span class=\"\"></span></a></li><li><a>BB<span class=\"\"></span></a></li><li><a>CC<span class=\"\"></span></a></li><li><a>DD<span class=\"\"></span></a></li><li><a>BB<span class=\"\"></span></a></li><li><a>EE<span class=\"\"></span></a></li><li><a>FF<span class=\"\"></span></a></li><li><a>GG<span class=\"\"></span></a></li></ul>")
    
    let eventObj = { target: { value: 'AA' } };
    component.find('input').simulate('change', eventObj);
    expect(component.find("#restboot-dropdown-list").html()).toEqual("<ul id=\"restboot-dropdown-list\" class=\"dropdown-menu inner\"><li><a>AA<span class=\"\"></span></a></li></ul>")

    eventObj = { target: { value: 'A' } };
    component.find('input').simulate('change', eventObj);
    expect(component.find("#restboot-dropdown-list").html()).toEqual("<ul id=\"restboot-dropdown-list\" class=\"dropdown-menu inner\"><li><a>AA<span class=\"\"></span></a></li><li><a>AB<span class=\"\"></span></a></li></ul>")
  });
  
  it('Singular/plural labels', () => {

    const component = shallow(
      <Dropdown
      isMultiSelect={true}
      showButtonsSelectAll={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxElementPlaceholder="5"
      labels={{singular: "car", plural: "cars"}}
    ></Dropdown>,
    );

    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select car</span> <span class=\"caret\"></span></button>")
    
    component.find('#restboot-selectall-button').simulate('click');
    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">9 cars selected</span> <span class=\"caret\"></span></button>")

    component.find('#restboot-deselectall-button').simulate('click');
    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select car</span> <span class=\"caret\"></span></button>")

  
  });

  it('Select first element', () => {

    const component = shallow(
      <Dropdown
      isMultiSelect={true}
      showButtonsSelectAll={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxElementPlaceholder="5"
      labels={{singular: "car", plural: "cars"}}
    ></Dropdown>,
    );

    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select car</span> <span class=\"caret\"></span></button>")
    shallow(component.find("a").get(0)).simulate("click")
    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">AA</span> <span class=\"caret\"></span></button>")  
    
  });

  it('Select three elements, maxElementPlaceholder = 2', () => {

    const component = shallow(
      <Dropdown
      isMultiSelect={true}
      showButtonsSelectAll={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxElementPlaceholder="2"
      labels={{singular: "car"}}
    ></Dropdown>,
    );

    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select car</span> <span class=\"caret\"></span></button>")
    shallow(component.find("a").get(0)).simulate("click")
    shallow(component.find("a").get(1)).simulate("click")
    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">AA, AB</span> <span class=\"caret\"></span></button>")  
    shallow(component.find("a").get(2)).simulate("click")
    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">3 items selected</span> <span class=\"caret\"></span></button>")  

  });

  it('Single select', () => {

    const component = shallow(
      <Dropdown
      isMultiSelect={false}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxElementPlaceholder="2"
      labels={{singular: "car"}}
    ></Dropdown>,
    );

    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">Select car</span> <span class=\"caret\"></span></button>")
    shallow(component.find("a").get(0)).simulate("click")
    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">AA</span> <span class=\"caret\"></span></button>")  
    shallow(component.find("a").get(1)).simulate("click")
    expect(component.find("#restboot-menu-button").html()).toEqual("<button id=\"restboot-menu-button\" type=\"button\" class=\"btn btn-default dropdown-toggle show-special-title button-dropdown\"><span class=\"pull-left filter-option\"></span><span class=\"pull-left special-title\">AB</span> <span class=\"caret\"></span></button>")  

  });
  

  it('Select/deselect all labels', () => {
    

    const {getByText} = render(
      <Dropdown
      isMultiSelect={true}
      showButtonsSelectAll={true}
      data={["AA", "AB", "BB", "CC", "DD", "BB", "EE", "FF", "GG"]}
      maxElementPlaceholder="5"
      labels={{deselectAll: "NoneSelected",selectAll: "AllSelected"}}
    ></Dropdown>,
    );
    
    expect(getByText(/AllSelected/i)).toBeTruthy()
    expect(getByText(/NoneSelected/i)).toBeTruthy()

    //expect(Object.is(getByText(/NoneSelected/i),getByText(/NoneSelected/i))).toBe(true) 
    //expect(getByText(/NoneSelected/i)).toBe("ciao")
    //expect(getByText(/NoneSelected/i)).toBe('<button class="actions-btn bs-deselect-all btn btn-default deselect-all-button" type="button">NoneSelected</button>')
   
  
    //fireEvent.click(getByLabelText(/selettato/i));
  
    //expect(queryByLabelText(/on/i)).toBeTruthy();
  });
  
});