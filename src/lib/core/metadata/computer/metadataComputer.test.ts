import { NodeRow } from "../../../../types/NodeRow";
import { Property } from "../../../../types/Property";

import { computeMetadata } from "./metadataComputer";

describe("metadataComputer Test Suite", () => {
  test("Non-computed property stores only value", () => {
    const metadataRow: NodeRow = {
      id: "1",
      parentNodeId: "",
      childrenNodeIds: [],
      order: 0,
      properties: {
        $uniqueId: "B",
        value: 1,
      },
      computedProperties: {},
    };

    const result = computeMetadata(metadataRow, metadataRow.id);

    const expectedResult: Array<Property> = [
      {
        mainNodeRowId: "1",
        childrenIds: [],
        nestedLevel: 1,
        state: "RESOLVED",
        ancestorId: null,
        accessor: ["value"],
        value: 1,
      },
    ];

    expect(result).toStrictEqual(expectedResult);
  });

  test("Nested computed property 'expression' generates structure for recomputing", () => {
    const metadataRow: NodeRow = {
      id: "A",
      parentNodeId: "",
      childrenNodeIds: [],
      order: 0,
      properties: {
        $uniqueId: "C",
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

    const result = computeMetadata(metadataRow, metadataRow.id);

    const expectedResult: Array<Property> = [
      {
        mainNodeRowId: "A",
        childrenIds: ["B"],
        nestedLevel: 1,
        state: "REFERENCE",
        ancestorId: null,
        accessor: ["value"],
        value: undefined,
      },
      {
        mainNodeRowId: "A",
        computedPropertyUniqueId: "B",
        childrenIds: [],
        nestedLevel: 2,
        state: "UNDEFINED",
        ancestorId: "C",
        accessor: [],
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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
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
        value: undefined,
      },
    ];

    expect(result).toStrictEqual(expectedResult);
  });
});
