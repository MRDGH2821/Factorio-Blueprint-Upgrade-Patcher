import { component$, useStore } from '@builder.io/qwik';
import defaultConfig from '../../public/default-config.json';
import type { BlueprintInputStore } from '~/components/ts-interfaces/blueprint';
import type { ConfigInputStore } from '~/components/ts-interfaces/config';
import type { DocumentHead } from '@builder.io/qwik-city';
import manifest from '../../public/manifest.json';
import BlueprintInput from '~/components/text-boxes/blueprint-input';
import DownloadButton from '~/components/text-boxes/download-button';
import ConfigInput from '~/components/text-boxes/config-input';
import DisplayCode from '~/components/text-boxes/display-code';

export const code1 = {
  version: 1,
  entities: [
    {
      old: 'pipe',
      new: 'se-space-pipe',
    },
  ],
};

export const code2 = {
  version: 1,
  entities: [
    {
      old: '(?:[a-z]+-)?transport-belt',
      new: 'se-space-transport-belt',
    },
    {
      old: '(?:[a-z]+-)?underground-belt',
      new: 'se-space-underground-belt',
    },
    {
      old: '(?:[a-z]+-)?splitter',
      new: 'se-space-splitter',
    },
  ],
};

export default component$(() => {
  const bpStrStore = useStore<BlueprintInputStore>({
    encodedInput: '',
    decodedInput: '',
  });

  const cfgStore = useStore<ConfigInputStore>({
    config: JSON.stringify(defaultConfig) || '',
  });

  return (
    <div>
      <h1>Welcome to Factorio Blueprint Upgrade Planner!</h1>
      Use this site to quickly replace entities of one type to another with ease!
      <p>
        By default, this site uses{' '}
        <a href="https://github.com/MRDGH2821/Factorio-Blueprint-Upgrade-Planner/blob/main/public/default-config.json">
          a minimal config
        </a>{' '}
        which converts belts, pipes & assemblers into Space versions from Space Exploration mod.
        <br />
        Supports regex as well. Uses global flag, so no need to put any flags in regex string.
      </p>
      <BlueprintInput bpStrStore={bpStrStore} />
      <ConfigInput cfgStore={cfgStore} />
      <DownloadButton BPstore={bpStrStore} CFGstore={cfgStore} />
      <br />
      <h2>Config format</h2>
      <p>The configuration should be in JSON format.</p>
      <table class="commands">
        <thead>
          <tr>
            <th>Key</th>
            <th>Data Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>version</td>
            <td>Number</td>
            <td>
              Config version. In future, configurations may have more options thus it is recommended
              to put version else it is optional.
            </td>
          </tr>
          <tr>
            <td>entities</td>
            <td>Array</td>
            <td> Array of entity objects. Check below for Entity object format</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Entity object format</strong>
      </p>
      <table class="commands">
        <thead>
          <tr>
            <th>Key</th>
            <th>Data Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>old</td>
            <td>String</td>
            <td>
              Internal name of entity present in blueprint. This can also be a Regular expression
              (Do not put regex flags).
            </td>
          </tr>
          <tr>
            <td>new</td>
            <td>String</td>
            <td> Internal name of new entity replacing old one </td>
          </tr>
        </tbody>
      </table>
      <h3>How to create your own config?</h3>
      Open Factorio's <a href="https://wiki.factorio.com/Debug_mode">Debug Mode</a> & enable{' '}
      <mark>show-debug-info-in-tooltips</mark> which will enable you to see entity's internal name.
      <p>
        Take a note of which entity you want to replace with which one. <br />
        For example, let's replace pipes. Regular pipes have internal name: <mark>pipe</mark>
        <br />
        Now to replace them with Space pipes which have internal name: <mark>se-space-pipe</mark>
        <br />
        Your resulting config should be in JSON. So our example config would look like this:
      </p>
      <DisplayCode code={code1} />
      <p>Replacing belts with Space versions by using regex:</p>
      <DisplayCode code={code2} />
    </div>
  );
});

export const head: DocumentHead = {
  title: manifest.short_name,
  meta: [
    {
      name: manifest.name,
      content: manifest.description,
    },
  ],
};
