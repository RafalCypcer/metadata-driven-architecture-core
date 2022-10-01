import { ARRAY, FUNCTION, getInstanceOf, OBJECT } from '../../index';

/*
	Recursive function which traverse the metadata tree to find out computed properties to compute.
	It returns new metadata (not mutated).
*/
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const compute = (
  metadata: unknown,
  values: unknown,
  optionalInjectedProps: unknown
) => {
  // If part of metadata is array we need to interate over items and call 'compute' function
  // to find out all computer properties
  const newMetadataArray: Array<unknown> = [];
  if (getInstanceOf(metadata) === ARRAY) {
    for (let i = 0; i < (metadata as Array<unknown>).length; i++) {
      const newMetadataArrayItem = compute(
        (metadata as Array<unknown>)[i],
        values,
        optionalInjectedProps
      );
      newMetadataArray.push(newMetadataArrayItem);
    }

    return newMetadataArray;
  }
  // If we have object we need to iterate over properties to figure it out if there is
  // some object which contains computed property to compute.
  else if (getInstanceOf(metadata) === OBJECT) {
    const propertyNames = Object.keys(metadata as Record<string, unknown>);
    const newMetadataObject: Record<string, unknown> = {};
    for (const propertyName of propertyNames) {
      // For childComponents we need to iterate over items and call 'compute' function
      // to find out all computer properties
      if (propertyName === 'childComponents') {
        const newComputedChildComponentsArray: Array<unknown> = [];
        for (
          let i = 0;
          i <
          (
            (metadata as Record<string, unknown>)
              .childComponents as Array<unknown>
          ).length;
          i++
        ) {
          const newComputedChildComponentsItem = compute(
            (
              (metadata as Record<string, unknown>)
                .childComponents as Array<unknown>
            )[i],
            values,
            optionalInjectedProps
          );
          if (newComputedChildComponentsItem) {
            newComputedChildComponentsArray.push(
              newComputedChildComponentsItem
            );
          }
        }

        newMetadataObject[propertyName] = newComputedChildComponentsArray;
      } else {
        const value = (metadata as Record<string, unknown>)[propertyName];
        // We need to check if value of property is object
        // because this is the only case where computed property can be defined
        if (getInstanceOf(value) === OBJECT) {
          // If there is computed property inside object we need to handle it
          if ((value as Record<string, unknown>).hasOwnProperty('$func')) {
            const computedProperty = value;
            const computedPropertyType = (
              computedProperty as Record<string, unknown>
            ).$func;
            // We can define different types of computed properties.
            // In switch statement we can extend behaviours for our metadata.
            switch (computedPropertyType) {
              // Computed property "value" gets the function if exists and returns value directly to related property.
              case 'value': {
                if (
                  (computedProperty as Record<string, unknown>).function &&
                  getInstanceOf(
                    (computedProperty as Record<string, unknown>).function
                  ) === FUNCTION
                ) {
                  newMetadataObject[propertyName] = (
                    computedProperty as {
                      function: (
                        parameterValue: unknown,
                        parameterOptionalInjectedProps: unknown
                      ) => void;
                    }
                  ).function(values, optionalInjectedProps);
                  break;
                }
                break;
              }
              case 'function': {
                const functionConstructor = (
                  computedProperty as Record<string, unknown>
                ).function as (
                  param1: unknown,
                  param2: unknown,
                  param3: unknown
                ) => void;
                newMetadataObject[propertyName] = function (runtimeProps: {
                  metadata: unknown;
                }) {
                  functionConstructor(
                    values,
                    optionalInjectedProps,
                    runtimeProps?.metadata
                  );
                };
                break;
              }
            }
          } else {
            newMetadataObject[propertyName] = value;
          }
        } else {
          // Otherwise we need to clone object
          newMetadataObject[propertyName] = value;
        }
      }
    }

    return newMetadataObject;
  }
};
