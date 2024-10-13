/**
 * ComputedProperty stores data to initialize computed properties from metadata.
 */
export type ComputedProperty = {
  /**
   * Refers to main node row Id.
   */
  mainNodeRowId: string;
  /**
   * In nested chain it points to direct property id (ancestor).
   */
  ancestorId: string;
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
  computedValue: unknown;
  state: "UNDEFINED" | "PENDING" | "RESOLVED";
  /**
   * Parameters to compute.
   */
  parameters: Array<unknown>;
  /**
   * Function which computes and recomputes
   * value of property when dependant change is triggered.
   */
  compute: Function;
  /**
   * Path in object where data should be assigned.
   *
   * Example: `["products", 0, "name"]`
   * refers to product `name` as first (`0`) index item inside `products` array.
   */
  accessor: Array<string | number>;
};
