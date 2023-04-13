# Contributing

Install the dependencies

```bash
$ yarn install
```

Build the typescript and package it for distribution

```bash
$ yarn dist
```

Run the tests :heavy_check_mark:

```bash
$ yarn test
...
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ yarn dist
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)

## Validate

You can now validate the action by referencing `./` in a workflow in your repo (see [test.yml](.github/workflows/test.yml))

```yaml
uses: ./
```

See the [actions tab](https://github.com/kineticio/turbocache-action/actions) for runs of this action! :rocket:
