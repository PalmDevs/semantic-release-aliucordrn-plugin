# semantic-release-aliucordrn-plugin

[**semantic-release**](https://github.com/semantic-release/semantic-release) to bump [**AliucordRN**](https://github.com/Aliucord/AliucordRN) plugin version in the manifest file.

| Step               | Description                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------- |
| `verifyConditions` | Verifies if the `manifestFile` configuration exists.                                                 |
| `prepare`          | Updates the manifest file's version supplied by `manifestFile` configuration                         |

## Install

```bash
$ npm install semantic-release-aliucordrn-plugin -D
```

### Options

| Options        | Description                                                           | Default                                                                |
| -------------- | --------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `manifestFile` | The path to the manifest.json file which contains the plugin metadata | `${process.cwd()}/manifest.json`                                       |

### Examples

```json
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "semantic-release-aliucordrn-plugin",
      {
        "manifestFile": "manifest.json"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": [
          "manifest.json"
        ]
      }
    ],
    [
      "@semantic-release/github",
      {
        "assets": "dist/*.tgz"
      }
    ]
  ]
}
```