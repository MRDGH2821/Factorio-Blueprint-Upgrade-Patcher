import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { base64ToBytes } from 'byte-base64';
import { inflate } from 'pako';
import { BlueprintInputStore } from '../ts-interfaces/blueprint';
import textBoxStyles from './text_box.css?inline';

export function BlueprintDecrypt(bpCtx: BlueprintInputStore) {
  if (bpCtx.encodedInput[0] !== '0') {
    bpCtx.decodedInput = `${new Error('"0" not found in the beginning of blueprint string')}`;
    return;
  }
  const bpBase64Str = bpCtx.encodedInput.slice(1);
  try {
    const bpZlibDeflateStr = base64ToBytes(bpBase64Str);
    bpCtx.decodedInput = inflate(bpZlibDeflateStr, { to: 'string' });
  } catch (error) {
    bpCtx.decodedInput = `${
      error || 'An error ocurred while decrypting. Most likely it is not a base64 encoded string.'
    }`;
  }
}

interface BPprops {
  bpStrStore: BlueprintInputStore;
}

export default component$((props: BPprops) => {
  useStylesScoped$(textBoxStyles);

  const { bpStrStore } = props;

  let validity = '✅ Blueprint input received';

  if (!bpStrStore.encodedInput) {
    validity = '❌ No Blueprint found';
  } else if (!bpStrStore.decodedInput || bpStrStore.decodedInput.includes('rror:')) {
    validity = `⚠️ Blueprint cannot be decoded. ${
      bpStrStore.decodedInput || 'Download to know more.'
    }`;
  } else {
    validity = '✅ Blueprint decoded, enter a config & download!';
  }

  return (
    <>
      <span>Input factorio Blueprint</span>
      <br />
      <textarea
        cols={50}
        rows={10}
        preventdefault:input
        required={true}
        onInput$={(input) => {
          bpStrStore.encodedInput = (input.target as HTMLTextAreaElement).value;
          BlueprintDecrypt(bpStrStore);
        }}
      />
      <p>{validity}</p>
    </>
  );
});
