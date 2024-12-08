import { NodeRow } from "../../../../types/NodeRow";
import { Property } from "../../../../types/Property";
import { ARRAY, getInstanceOf, isPrimitive, OBJECT } from "../../index";

/*
	Recursive function which traverse the metadata tree to find out computed properties to compute.
	It returns new metadata (not mutated).
*/
export const compute = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  metadata: any,
  mainNodeRowId: string,
  nestedLevel: number = 1
): Array<Property> => {
  // If part of metadata is array we need to iterate over items and call 'compute' function
  // to find out all computer properties
  const newMetadataArray: Array<Property> = [];
  if (getInstanceOf(metadata) === ARRAY) {
    for (let i = 0; i < (metadata as Array<unknown>).length; i++) {
      const newMetadataArrayItem = compute(
        (metadata as Array<unknown>)[i],
        mainNodeRowId,
        nestedLevel + 1
      );
      newMetadataArray.push(...newMetadataArrayItem);
    }

    return newMetadataArray;
  }
  // If we have object we need to iterate over properties to figure it out if there is
  // some object which contains computed property to compute.
  if (getInstanceOf(metadata) === OBJECT) {
    // const uniqueId = metadata.$uniqueId as string | undefined;
    const propertyNames = Object.keys(metadata as Record<string, unknown>);
    const newMetadataObject: Record<string, unknown> = {};
    for (const propertyName of propertyNames) {
      if (propertyName === "$uniqueId") {
        continue;
      }
      const value = metadata[propertyName];
      if (getInstanceOf(value) === ARRAY) {
        const newComputedChildComponentsArray: Array<unknown> = [];
        for (let i = 0; i < (metadata[propertyName] as Array<unknown>).length; i++) {
          const newComputedChildComponentsItem = compute(
            (metadata[propertyName] as Array<unknown>)[i],
            mainNodeRowId,
            nestedLevel + 1
          );
          if (newComputedChildComponentsItem) {
            newComputedChildComponentsArray.push(newComputedChildComponentsItem);
          }
        }

        newMetadataObject[propertyName] = newComputedChildComponentsArray;
      }
      // We need to check if value of property is object
      if (getInstanceOf(value) === OBJECT) {
        // If there is computed property inside object we need to handle it
        if ((value as Record<string, unknown>).hasOwnProperty("$func")) {
          const computedProperty = value;
          const computedPropertyType = (computedProperty as Record<string, unknown>).$func;
          // We can define different types of computed properties.
          // In switch statement we can extend behaviors for our metadata.
          switch (computedPropertyType) {
            // Computed property "value" gets the function if exists and returns value directly to related property.
            case "expression": {
              // TODO: Implement logic for creating function for expression
              break;
            }
          }
        } else {
          newMetadataObject[propertyName] = value;
        }
      } else {
        // Otherwise we need to clone object
        if (isPrimitive(value))
          newMetadataArray.push({
            mainNodeRowId: mainNodeRowId,
            nestedLevel: nestedLevel,
            childrenIds: [],
            state: "RESOLVED",
            value: value,
            accessor: [propertyName],
            ancestorId: null,
          });
      }
    }

    return newMetadataArray;
  }

  return newMetadataArray;
};

export const computeMetadata = (
  metadata: NodeRow,
  mainNodeRowId: string,
  nestedLevel: number = 1
): Array<Property> => {
  const properties: Array<Property> = [];
  const arrayOfProperties = compute(metadata.properties, mainNodeRowId, nestedLevel);

  if (arrayOfProperties) {
    properties.push(...(arrayOfProperties as unknown as Array<Property>));
  }

  return properties;
};
