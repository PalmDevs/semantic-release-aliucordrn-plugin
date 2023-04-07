# semantic-release-aliucordrn-plugin

[**semantic-release**](https://github.com/semantic-release/semantic-release) to update an [**AliucordRN**](https://github.com/Aliucord/AliucordRN) plugin's `version` field in the **manifest.json** file.

| Step               | Description                                                                                           |
| ------------------ | ----------------------------------------------------------------------------------------------------- |
| `verifyConditions` | Verify if the file `manifestFile` in configuration exists.                                            |
| `prepare`          | Verify if the contents of file manifest file is valid and updates the manifest file's version field.  |

## Install

```bash
$ npm install semantic-release-aliucordrn-plugin -D
```

### Options

| Options        | Description                                                                 | Default                                                                                                                      |
| -------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `manifestFile` | The path to the **manifest.json** file which contains the plugin's metadata | `${CWD}/manifest.json`<br/><br/>Where `CWD` is `context.cwd` given by **semantic-release** or if undefined, `process.cwd()`. |

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
    ]
  ]
}
```
