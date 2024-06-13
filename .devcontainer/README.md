# DEV CONTAINER

## Run Unit Test

```sh
xvfb-run -a npm test
```

## Debug Unit Test

1. Select `Launch tests` launch profile
1. Hit `F5`
1. It will launch a new automated `VS Code` instance, with up to date extension installed
1. [Test campaign](./src/test/runTest.ts) will be unfolded  

## Manual Test

1. Select `Run extension` launch profile
1. Hit `F5`
1. It will launch a new `VS Code` instance, with up to date extension installed
1. Exercise extension

## Package Extension

```sh
vsce package
```