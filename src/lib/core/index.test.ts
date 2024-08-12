import { ARRAY, DATE, getInstanceOf, isDate, isString, OBJECT } from "./index";

describe("Primitive types functions", () => {
  test("getInstanceOf() - Array assertion test", () => {
    expect(getInstanceOf([])).toBe(ARRAY);
  });

  test("getInstanceOf() - Object assertion test", () => {
    expect(getInstanceOf({})).toBe(OBJECT);
  });

  test("getInstanceOf() - Date assertion test", () => {
    expect(getInstanceOf(new Date())).toBe(DATE);
  });

  test("isString() - String assertion test", () => {
    expect(isString("I am string!")).toBe(true);
  });

  test("isString() - Number assertion test", () => {
    expect(isString(1)).toBe(false);
  });

  test("isDate() - Date assertion test", () => {
    expect(isDate(new Date())).toBe(true);
  });

  test("isDate() - Number assertion test", () => {
    expect(isDate(1)).toBe(false);
  });
});
