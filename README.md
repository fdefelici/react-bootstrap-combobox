# react-bootstrap-combobox &middot; [![NPM version](https://img.shields.io/badge/npm-v1.3.0-blue)](https://www.npmjs.com/package/@fdefelici/react-bootstrap-combobox) [![Build Status](https://travis-ci.org/fdefelici/react-bootstrap-combobox.svg?branch=v1.3.0)](https://travis-ci.org/fdefelici/react-bootstrap-combobox) [![codecov](https://codecov.io/gh/fdefelici/react-bootstrap-combobox/branch/v1.3.0/graph/badge.svg)](https://codecov.io/gh/fdefelici/react-bootstrap-combobox) [![CodeSandBox](https://img.shields.io/badge/demo-live-blueviolet)](https://codesandbox.io/s/github/fdefelici/react-bootstrap-combobox/tree/v1.3.0/example?fontsize=14)

Combobox Component for React based on Bootstrap which offer the following features:
* Single Selection
* Multiple Selection
* Selection Handling
* Search through items
* Scrollbar Control
* Localization 

![Component ShowCase](example/src/images/showcase.png)

# Usage
This component is based on React and Bootstrap (only css part), so in your project you must have these dependencies. It's suggested to adopt the following versions:
* react >= 15.0.0
* bootstrap >= 3.3.0

then import the library:
```shell
$ npm install @fdefelici/react-bootstrap-combobox[@VERSION] --save
```

and use it in your code:
```javascript
import Combobox from "@fdefelici/react-bootstrap-combobox"

...

<Combobox
    data={["Apple", "Banana", "Citrus", "Grapefruit"]}
/>
```

> For a full working example take a look at the [local example](example/) or at the [live demo](https://codesandbox.io/s/github/fdefelici/react-bootstrap-combobox/tree/v1.3.0/example?fontsize=14).

# Configuration
This component allow customization tweeking the following attributes:

| Attribute | Type | Description | Default |
|  ---: | :--- | :---        | :---    |
| `data` | array | List of strings, e.g. `["Apple", "Banana"]`<br/><b>or</b><br/> list of label/value objects, e.g. `[{label: "Apple", value: "apple"}, {label: "Banana", value: "banana, icon:<img alt="" src={require('./images/apple.png')"}]` where icon is optional (see details in [icons](#icons)).    | []  |
| `id` | string | html element ID  | none  |
| `isMultiSelect` | boolean | Allow multiple selection | false  |
| `labels` | object | Localization support (see details in [localization paragraph](#localization-support)) | - |
| `maxCaptionItems` | integer | Max number of visible items (comma separated) in caption before showing label message `cap.select.singular` or `cap.select.plural` | 0 |
| `maxDropdownItems` | integer | Max number of visible items in dropdown menu | 6 |
| `onChange` | function | Callback function called when a selection/deselection happen (see details in the [example](example/)) | none  |
| `showButtons` | boolean | Show Select/Deselect All buttons | false |
| `showSearch` | boolean | Show Search field | false |

## Icons
When data is an array of label/value objects, it is possibile to add an icon attribute to show it on the left side of an element of the list (look at the previous screenshot); the attribute is optional for each element.

The max height of the icon is setted to 20px.

Examples of icon attribute:
```javascript
    data={[
        { label: "Apple", value: "apple", icon:<img alt="" src={require("./images/apple.png")}/>},
        { label: "Banana", value: "banana", icon:<span className={"glyphicon glyphicon-plus"}></span>},
        { label: "Citrus", value: "citrus"}
    ]};
```

## Localization Support
Using ```labels``` attribute it is possible to customize any text the component shows.

| Attribute | Type | Description | Default |
|  ---: | :--- | :---        | :---    |
| `cap.select.empty` | string | Shown when there are no item selected | "Select an item" |
| `cap.select.singular` | string | Shown when just one item is selected, only when `maxCaptionItems` is set to 0 | "1 item selected" or same as `cap.select.plural` if only plural attribute is defined. |
| `cap.select.plural` | string | Shown when multiple items are selected, only when the number of selected items is greather than  `maxCaptionItems` | "{size} item selected" |
| `btn.select.all` | string | Label for Select All Button | "All" |
| `btn.unselect.all` | string | Label for Unselect All Button | "Clear" |

**Special Markers**

To build labels it's possible to use the follow markers:
* ```{size}```: represent the total number of items
* ```{sel}```: represent the number of items currently selected

**Example**

Example of fully labels customization:
```javascript
<Combobox
    ...
    labels={{
        "cap.select.empty": "Select an item",
        "cap.select.singular": "One item selected",
        "cap.select.plural": "{sel} of {size} items selected",
        "btn.select.all": "Pick All",
        "btn.unselect.all": "Release All",
    }}
/>
```

# Browsers Compatibility
This component has been tested against the following browsers:
* Chrome  76+
* Firefox 68+
* Internet Explorer Edge 


# How to Contribute
If you want to contribute to the project, please follow the [guidelines](CONTRIBUTING.md).
