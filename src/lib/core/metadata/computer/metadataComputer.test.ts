import { ComputedProperty } from "../../../../types/ComputedProperty";
import { NodeRow } from "../../../../types/NodeRow";
import { computeMetadata } from "./metadataComputer";

describe("metadataComputer Test Suite", () => {
  test("Nested computed property 'expression' generates structure for recomputing", () => {
    const metadataRow: NodeRow = {
      id: "A",
      parentNodeId: "",
      childrenNodeIds: [],
      order: 0,
      properties: {
        value: {
          $uniqueId: "B",
          $func: "expression",
          source: [
            {
              name: "John",
              age: "31",
            },
            {
              name: "Ryan",
              age: "13",
            },
            {
              name: "Ryan",
              age: "31",
            },
          ],
          expression: `.find((item) => item.age === "31" && item.name === "Ryan")?.name`,
        },
      },
      computedProperties: {},
    };

    const result = computeMetadata(metadataRow);

    const expectedResult: Array<ComputedProperty> = [
      {
        mainNodeRowId: "A",
        childrenIds: ["B"],
        nestedLevel: 1,
        state: "UNDEFINED",
        ancestorId: "",
        accessor: ["value"],
        parameters: [
          [
            {
              name: "John",
              age: "31",
            },
            {
              name: "Ryan",
              age: "13",
            },
            {
              name: "Ryan",
              age: "31",
            },
          ],
        ],
        compute: (): Function => {
          function createComputeFunction() {
            return new Function(`[
              {
                name: "John",
                age: "31",
              },
              {
                name: "Ryan",
                age: "13",
              },
              {
                name: "Ryan",
                age: "31",
              },
            ].find((item) => item.age === "31" && item.name === "Ryan")?.name
            `);
          }

          return createComputeFunction;
        },
        computedValue: "Ryan",
      },
    ];

    expect(result).toStrictEqual(expectedResult);
  });
});
