# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

## Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by submitting an issue to our GitHub Repository. 
Even better, you can submit a Pull Request with a fix.

## Building the Project

After cloning the project run: `npm install`.

After that run `npm run build`to packages.

### Running unit Tests

To make sure your changes do not break any unit tests, run the following:

```bash
npm run test
```

### Running sandbox Tests

To make sure your changes do not break any sandbox tests, run the following:

```bash
npm run sandbox.test
```

### Developing on Windows

At the moment, operation in the Windows development environment is not guaranteed.
We welcome contributions anytime.

### Submitting a PR

Please follow the following guidelines:

- Use your OneSignalID and make sure you can web push and unsubscribe without problems in the `npm start` environment.
- Make sure unit tests pass
- Make sure sandbox tests pass
- Make sure `npm run lint` pass
- Make sure you run `npm format`
- Update your commit message to follow the guidelines below

#### Commit Message Guidelines

Comment according to [Conventional Commits](https://www.conventionalcommits.org/).
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

##### type

The type must be one of the following:

- build - build
- ci - CI related
- feat - new feature
- fix - bug fix
- refactor - code refactoring
- release - release commit. Must only include version changes
- style - code style
- docs - documentation
- test - testing
- chore - othenrs category

##### scope

The scope must be one of the following:

- ngx-onesignal - modification or additional to ngx-onesignal feature
- sandbox - involved in sandbox testing

##### Subject

The subject must contain a description of the change.
