# Factorio Blueprint Upgrade Patcher

** UPDATE: [2024-12-05] This site is taken down as this has become redundant. You may clone the repo & host the site locally. **


Plan your upgrades in config, Patch your blueprint by uploading in [site](https://factorio-blueprint-upgrade-patcher.pages.dev/), Profit!

Made using [Qwik](https://qwik.builder.io/), deployed on [Cloudflare Pages](https://pages.cloudflare.com/)

## Config File

The default config is located [here](./public/default-config.json)
Pull requests are welcome to add more entities in the default config!

### Format

The configuration should be in JSON format.

| Key      | Data Type | Description                                                                                                                |
| -------- | --------- | -------------------------------------------------------------------------------------------------------------------------- |
| version  | Number    | Config version. In future, configurations may have more options thus it is recommended to put version else it is optional. |
| entities | Array     | Array of `entity` objects. Check below for Entity object format                                                            |

Entity object format

| Key | Data Type | Description                                                                                                   |
| --- | --------- | ------------------------------------------------------------------------------------------------------------- |
| old | String    | Internal name of entity present in blueprint. This can also be a Regular expression (Do not put regex flags). |
| new | String    | Internal name of new entity replacing old one                                                                 |

### Custom Config

Open Factorio's [Debug Mode](https://wiki.factorio.com/Debug_mode) & enable `show-debug-info-in-tooltips` which will enable you to see entity's internal name.

Take a note of which entity you want to replace with which one.

For example, let's replace pipes. Regular pipes have internal name: `pipe`

Now to replace them with Space pipes which have internal name: `se-space-pipe`

Your resulting config should be in JSON. So our example config would look like this:

```json
{
  "version": 1,
  "entities": [
    {
      "old": "pipe",
      "new": "se-space-pipe"
    }
  ]
}
```

Replacing belts with Space versions by using regex:

```json
{
  "version": 1,
  "entities": [
    {
      "old": "(?:[a-z]+-)?transport-belt",
      "new": "se-space-transport-belt"
    },
    {
      "old": "(?:[a-z]+-)?underground-belt",
      "new": "se-space-underground-belt"
    },
    {
      "old": "(?:[a-z]+-)?splitter",
      "new": "se-space-splitter"
    }
  ]
}
```
