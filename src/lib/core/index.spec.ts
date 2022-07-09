import test from 'ava';

import { ARRAY, DATE, getInstanceOf, isDate, isString, OBJECT  } from './index';

test('getInstanceOf() - Array assertion test', (context) => {
  context.is(getInstanceOf([]), ARRAY)
});

test('getInstanceOf() - Object assertion test', (context) => {
  context.is(getInstanceOf({}), OBJECT)
});

test('getInstanceOf() - Date assertion test', (context) => {
  context.is(getInstanceOf(new Date()), DATE)
});

test('isString() - String assertion test', (context) => {
  context.is(isString('I am string!'), true)
});

test('isString() - Number assertion test', (context) => {
  context.is(isString(1), false)
});

test('isDate() - Date assertion test', (context) => {
  context.is(isDate(new Date()), true)
});

test('isDate() - Number assertion test', (context) => {
  context.is(isDate(1), false)
});


