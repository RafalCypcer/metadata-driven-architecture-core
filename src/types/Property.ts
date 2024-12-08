/**
 * Property stores metadata for resolved properties.
 */
export type Property = {
  /**
   * Refers to main node row Id.
   */
  mainNodeRowId: string;
  /**
   * Current computed property ID.
   *
   * If property is not computed property it has `null` value.
   */
  computedPropertyUniqueId?: string | null;
  /**
   * In nested chain it points to direct property id (ancestor).
   */
  ancestorId: string | null;
  /**
   * Ids of all direct children nodes. If node is a leaf node then array is empty `[]`.
   *
   * Order of nodes does not reflect the order of item under parent.
   */
  childrenIds: Array<string>;
  /**
   * Order of node under main node row Id. First element counts from `1`.
   */
  nestedLevel: number;
  /**
   * Value of given property (both computed or non-computed).
   */
  value: unknown;
  /**
   * UNDEFINED - Does not have any value yet.
   *
   * PENDING - it's executed some async action which will return some value.
   *
   * RESOLVED - value is assigned
   *
   * REFERENCE - value is dependent on another Computed Property.
   */
  state: "UNDEFINED" | "PENDING" | "RESOLVED" | "REFERENCE";
  /**
   * Parameters to compute.
   */
  parameters?: Array<unknown>;
  /**
   * Function which computes and recomputes
   * value of property when dependant change is triggered.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  compute?: Function | null;
  /**
   * Path in object where data should be assigned.
   *
   * Example: `["products", 0, "name"]`
   * refers to product `name` as first (`0`) index item inside `products` array.
   *
   * Computed property has empty array as it cannot contain property.
   */
  accessor: Array<string | number>;
};
