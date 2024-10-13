/**
 * Node representation as row item in table.
 */
export type NodeRow<T = Record<string, any>> = {
  /**
   * Id of existing node.
   */
  id: string;
  /**
   * Id of parent node. If node is a root node then does not have parent then value is empty string `""`.
   */
  parentNodeId: string;
  /**
   * Ids of children nodes. If node is a leaf node then array is empty `[]`.
   *
   * Order of nodes does not reflect the order of item under parent.
   */
  childrenNodeIds: Array<string>;
  /**
   * Order of node under parent node. First item starts counting from `1`.
   */
  order: number;
  /**
   * Raw properties (metadata) of existing node.
   */
  properties: T;
  /**
   * Computed properties for existing node.
   */
  computedProperties: T;
};
