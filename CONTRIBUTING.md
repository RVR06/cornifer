# Contributing

When contributing to this repository, please first discuss the change you wish to make by opening a [new issue](https://github.com/rvr06/cornifer/issues/new/choose) or contributing to an [existing one](https://github.com/rvr06/cornifer/issues).

## Pull Request Process

1. Branch must be prefixed eg `features/xxx`, `fixes/yyy` or `spikes/zzz`.
1. [Mandatory] Update the `CHANGELOG.md` with details of changes.
1. [Optional] Update the `README.md` to introduce new features.
1. Increase the **version number** that this Pull Request would represent. The versioning scheme we use is [SemVer](https://semver.org).

## Recipe

* This extension has been developed sticking to [Extension API](https://code.visualstudio.com/api) guidelines.
* Template has been generated via [yeoman](https://yeoman.io) & [VS Code Extension generator](https://www.npmjs.com/package/generator-code), using `New Extension (TypeScript)` option.
* You need a valid [Node.js](https://nodejs.org/en/) installation to operate.


1. Clone repository and install
    ```ps
    > git clone 
    > npm install
    ```
1. Install [Visual Studio Code Extensions](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)
    ```ps
    > npm install -g  @vscode/vsce
    ```
1. You may have to enrich your `PATH` with `vsce` location, eg `C:\Users\{username}\AppData\Roaming\npm`
1. Run `vsce package` from repository root directory
    ```ps
    # ./Cornifer
    > vsce package
    ```

## Unit Test

1. Select `Launch tests` launch profile
1. Hit `F5`
1. It will launch a new automated `VS Code` instance, with up to date extension installed
1. [Test campaign](./src/test/runTest.ts) will be unfolded  

## Manual Test

1. Select `Run extension` launch profile
1. Hit `F5`
1. It will launch a new `VS Code` instance, with up to date extension installed
1. Exercise extension