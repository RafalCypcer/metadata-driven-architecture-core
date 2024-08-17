import { NodeRow } from "../../../../types/NodeRow";
import { insertNodeRow } from "./insertNodeRow";

describe("insertNodeRow Test Suite", () => {
  test("insertNodeRow should add child item under root node", () => {
    const state: Array<NodeRow> = [
      {
        id: "root",
        childrenNodeIds: [],
        order: 0,
        parentNodeId: "",
        properties: {},
      },
    ];

    const result = insertNodeRow(state, "root", {}, { id: "child" });

    const expectedResult: Array<NodeRow> = [
      {
        id: "root",
        childrenNodeIds: ["child"],
        order: 0,
        parentNodeId: "",
        properties: {},
      },
      {
        id: "child",
        childrenNodeIds: [],
        order: 0,
        parentNodeId: "root",
        properties: {},
      },
    ];

    expect(result).toEqual(expectedResult);
  });
});
