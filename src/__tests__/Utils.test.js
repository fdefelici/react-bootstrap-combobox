import Utils from "../Utils";

import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Utils tests", () => {
    it("isEqual - undefined", () => {
        let utils = Utils()

        expect(utils.isEqual([], undefined)).toEqual(false)
        expect(utils.isEqual(undefined, [])).toEqual(false)

      });
    
      
});

