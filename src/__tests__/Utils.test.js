import Utils from "../Utils";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Utils tests", () => {
  it("isEqual - undefined", () => {
    let utils = Utils();

    expect(utils.isEqual([], undefined)).toEqual(false);
    expect(utils.isEqual(undefined, [])).toEqual(false);
  });

  it("isEqual - not equal value", () => {
    let utils = Utils();

    expect(utils.isEqual([{value:"value1", label:"label1"}], [{value:"value2", label:"label2"}])).toEqual(false);
    
  });

  it("isEqual - not equal label", () => {
    let utils = Utils();

    expect(utils.isEqual([{value:"value1", label:"label1"}], [{value:"value1", label:"label2"}])).toEqual(false);
    
  });
});
