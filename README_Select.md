# "Select" Widget Documentation

Select component offers the following features:
* Single Selection
* Multiple Selection
* Selection Handling
* Search through items
* Scrollbar Control
* Localization 
* Item customization
* Customizable Callbacks

![Component ShowCase](example/src/images/showcase_select.png)

# Usage
Select component can be imported like this:
```javascript
import { Select } from "@fdefelici/react-bootstrap-combobox"

...

<Select
    data={["Apple", "Banana", "Citrus", "Grapefruit"]}
/>
```

> For a full working example take a look at the [local example](example/) or at the [live demo](https://codesandbox.io/s/github/fdefelici/react-bootstrap-combobox/tree/v1.5.1/example?fontsize=14).

# Configuration
This component allow customization tweeking the following attributes:

| Attribute | Type | Description | Default |
|  ---: | :--- | :---        | :---    |
| `data` | array | Data attribute can have following format: <ul><li>list of strings: `["Apple", "Banana"]`, <b>or</b></li><li>list of objects, e.g. `[{label: "Apple", value: "apple", selected: true, icon: <span className={"glyphicon glyphicon-plus"}></span>}]` where the attributes `selected` and `icon` are optionals (see details in [Data Attribute paragraph](#data-attribute-explained)).</li></ul>  | []  |
| `disabled` | boolean | Disable the button | false |
| `id` | string | html element ID  | none  |
| `isLoading` | boolean | Set the menu to loading status; combobox will be disabled and reactivated when isLoading comes false. | false  |
| `isMultiSelect` | boolean | Allow multiple selection | false  |
| `labels` | object | Localization support (see details in [Localization paragraph](#localization-support)) | - |
| `maxCaptionItems` | integer <br/>or<br/> "auto" | Max number of visible items (comma separated) in caption before showing label message `cap.select.singular` or `cap.select.plural`. If it is equal to `"auto"`, it automatically detects the caption overflow. | 0 |
| `maxDropdownItems` | integer | Max number of visible items in dropdown menu | 6 |
| `onChange` | function | Callback function called when a selection/deselection happens with the following signature: `function (selection)` where `selection` is an array of objects with format `{index, value}` (see details in the [example](example/)) | none  |
| `onTrigReset` | function | Callback function called when `trigReset` attribute comes `true` (see details in the [example](example/)). | none  |
| `showButtons` | boolean | Show Select/Deselect All buttons | false |
| `showSearch` | boolean | Show Search field | false |
| `trigReset` | boolean | Deselect all elements when, from `false`, it comes `true`; it will be called `onTrigReset` callback | false |
| `width` | string | Set the widget width (css style: e.g. 100px, 60%...) | 100%  |


## Data Attribute Explained
When data is an array objects, it is possibile to specify the following fields:

| Attribute | Type | Mandatory | Description | 
|  ---: | :--- | :---        | :---    |
| `label` | string | yes | the text shown to the user for the item |
| `value` | string | yes | the value retrieved on user selection |
| `selected` | bool | no | specify if the item is initially selected by default. If selected is true the onChange callback won't be called at first |
| `icon` | html | no | attach an icon using plain html or react component. For rendering reason the **Maximum Height** of this component is set to **20px** |


> NOTE: It is not mandatory to make every item have the same format. So for each one it is possible to use the fields needed. (For instance it is possibile to define some item with icon and others without).

Some examples of usage:
```javascript
    data={[
        { label: "Apple", value: "apple", icon: <img alt="" src={require("./images/apple.png")}/>},
        { label: "Banana", value: "banana", icon: <span className={"glyphicon glyphicon-plus"}></span>},
        { label: "Citrus", value: "citrus"},
        { label: "Mango", value: "mango", selected: true}
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
| `lst.empty` | string | Label used when `data` is an empty array | "No Items" |

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
