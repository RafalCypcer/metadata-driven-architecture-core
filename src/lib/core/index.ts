/* Constants */
export const OBJECT = '[object Object]';
export const ARRAY = '[object Array]';
export const DATE = '[object Date]';
export const FUNCTION = '[object Function]';
export const BOOLEAN = '[object Boolean]';
export const NUMBER = '[object Number]';
export const STRING = '[object String]';
export const NULL = '[object Null]';
export const UNDEFINED = '[object Undefined]';
export const SYMBOL = '[object Symbol]';

/**
 * Returns name of instance as string in format "[object TYPE]"
 *
 * ### Example (es module)
 * ```js
 * import { getInstanceOf } from 'metadata-driven-architecture-core'
 * console.log(getInstanceOf([]))
 * // => [object Array]
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var getInstanceOf = require('metadata-driven-architecture-core').getInstanceOf;
 * console.log(getInstanceOf([]))
 * // => [object Array]
 * ```
 *
 * @param obj - Represents any object to check.
 * @returns String with format '[object X]' where X can be Object, Array, Date, Function, Boolean, Number, String, Null, Undefined or Symbol.
 */
export const getInstanceOf = (obj: unknown): string => {
	return {}.toString.apply(obj);
};

/**
 * Checks whether object is instance of string."
 *
 * ### Example (es module)
 * ```js
 * import { isString } from 'metadata-driven-architecture-core'
 * console.log(isString('a'))
 * // => true
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var isString = require('metadata-driven-architecture-core').isString;
 * console.log(isString('a'))
 * // => true
 * ```
 *
 * @param obj - Represents any object to check.
 * @returns True if object is of type string. Otherwise returns false..
 */
export const isString = (obj: unknown): boolean => {
	return {}.toString.apply(obj) == STRING;
};

/**
 * Checks whether object is instance of Date."
 *
 * ### Example (es module)
 * ```js
 * import { isDate } from 'metadata-driven-architecture-core'
 * console.log(isDate(new Date()))
 * // => true
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var isDate = require('metadata-driven-architecture-core').isDate;
 * console.log(isDate(new Date()))
 * // => true
 * ```
 *
 * @param obj - Represents any object to check.
 * @returns True if object is of type Date. Otherwise returns false..
 */
export const isDate = (obj: unknown): boolean => {
	return {}.toString.apply(obj) == DATE;
};
