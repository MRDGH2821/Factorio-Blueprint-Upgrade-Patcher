import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { default as defaultConfig } from '../../../public/default-config.json';
import type { ConfigInputStore } from '../ts-interfaces/config';
import textBoxStyles from './text_box.css?inline';
interface CFGprop {
  cfgStore: ConfigInputStore;
}

export default component$((props: CFGprop) => {
  useStylesScoped$(textBoxStyles);

  const { cfgStore } = props;
  let valid = '✅ No errors found in config';
  try {
    configValidator(cfgStore.config as string);
  } catch (error) {
    valid = `⚠️ ${error}`;
  }
  return (
    <>
      <span>Input Upgrade Configuration</span>
      <br />
      <textarea
        cols={50}
        rows={10}
        preventdefault:input
        placeholder={JSON.stringify(defaultConfig, null, 2)}
        onInput$={(input) => {
          const inputConfig = (input.target as HTMLTextAreaElement).value;
          cfgStore.config =
            inputConfig.length < 1 ? JSON.stringify(defaultConfig, null, 2) : inputConfig;
        }}
      />
      <br />
      <p>{valid}</p>
    </>
  );
});

export function configValidator(config: string) {
  const cfg = JSON.parse(config);

  if (cfg.entities.length < 1) {
    throw new Error(`No entities found to be replaced`);
  }

  for (let i = 0; i < cfg.entities.length; i++) {
    const entity = cfg.entities[i];
    if (!entity.old) {
      throw new Error(`No old entity found at index ${i}`);
    }
    if (!entity.new) {
      throw new Error(`No new entity found at index ${i}`);
    }
  }
}
