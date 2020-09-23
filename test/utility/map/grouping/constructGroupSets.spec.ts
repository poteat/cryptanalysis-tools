import { constructGroupSets } from "../../../../src/utility/map/grouping/constructGroupSets";

describe("basic", () => {
  it("can make groups", () => {
    const groups = constructGroupSets("ABCDEFGHIJK", 3);
    expect(groups).toStrictEqual(["ADGJ", "BEHK", "CFI"]);
  });
});
