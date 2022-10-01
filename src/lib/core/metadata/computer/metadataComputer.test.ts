import test from 'ava';

import { compute } from './metadataComputer';

test('value computed property test', (context) => {
  const metadata = {
    valueToTest: {
      $func: 'value',
      function: () => 'hardcoded value',
    },
  } as Record<string, unknown>;

  const computedMetadata = compute(metadata, null, null) as {
    valueToTest: string;
  };
  context.is(computedMetadata.valueToTest, 'hardcoded value');
});

test('function computed property test', (context) => {
  let result = 0;

  const metadata = {
    onClick: {
      $func: 'function',
      function: (values: { text: string }) => {
        if (values.text == 'hello') {
          result = 1;
        }
      },
    },
  };

  const props = {};
  const computedMetadata = compute(metadata, { text: 'hello' }, null) as {
    onClick: (props: unknown) => void;
  };
  computedMetadata.onClick(props);
  context.is(result, 1);
});

test('function computed property test with using computed metadata', (context) => {
  let outsideClass = '';

  const metadata = {
    className: 'my-css-class',
    onClick: {
      $func: 'function',
      function: (
        values: { text: string },
        _injectedPropsFromFinalForm: unknown,
        internalMetadata: { className: string }
      ) => {
        if (values.text == 'hello') {
          outsideClass = internalMetadata.className;
        }
      },
    },
  };

  const componentProps = {
    metadata: metadata,
  };

  const computedMetadata = compute(metadata, { text: 'hello' }, null) as {
    onClick: (props: unknown) => void;
  };
  computedMetadata.onClick(componentProps);
  context.is(outsideClass, 'my-css-class');
});
