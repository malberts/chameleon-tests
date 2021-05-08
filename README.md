# chameleon-tests

**Work in progress!**

Automated UI tests for the [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki) skin [Chameleon](https://github.com/ProfessionalWiki/chameleon/) built with [Cypress](https://www.cypress.io/).

It provides a base MediaWiki instance using [Docker Compose](https://docs.docker.com/compose/).

## Table of contents

- [Installation](#installation)
- [Base MediaWiki](#base-mediawiki)
  - [Build and run MediaWiki instance](#build-and-run-mediawiki-instance)
  - [Reset MediaWiki instance](#reset-mediawiki-instance)
- [MediaWiki customisations](#mediawiki-customisations)
  - [Add custom Bootstrap or Chameleon](#add-custom-bootstrap-or-chameleon)
- [Cypress](#cypress)
  - [Run with Cypress UI](#run-with-cypress-ui)
  - [Run with Cypress](#run-with-cypress)
  - [Run with cy2](#run-with-cy2)
  - [Run with Docker browser](#run-with-docker-browser)
  - [Report](#report)
  - [Update UI snapshots](#update-ui-snapshots)
  - [Snapshots](#snapshots)
  - [Test directories](#test-directories)

---

## Installation

Requirements:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Node.js](https://nodejs.org/en/)

Install Node.js requirements:

```
npm install
```

## Base MediaWiki

### Build and run MediaWiki instance

To access MediaWiki locally at http://localhost:8080, run:

```
npm run up:local
```

### Reset MediaWiki instance

Stop and remove the container:

```
docker-compose stop
docker-compose rm -f
```

## MediaWiki customisations

### Add custom Bootstrap or Chameleon

Add volumes for the custom directories in `docker-compose.override.yml`

Example:

```
cp docker-compose.override.yml.example docker-compose.overide.yml
git pull https://github.com/ProfessionalWiki/Bootstrap mediawiki/extensions/bootstrap
git pull https://github.com/ProfessionalWiki/chameleon mediawiki/skins/chameleon
```

Only the original requirements will be part of the Docker container. If the custom versions have different requirements, rerun Composer:

```
docker-compose exec mediawiki composer update --no-dev
```

## Cypress

Cypress tests can be executed in a few ways:

- single-threaded with the Cypress UI
- single-threaded with the `cypress` command
- single-threaded with the [`cy2`](https://github.com/sorry-cypress/cy2/) command
- multi-threaded with the `cy2` command along with the [`sorry-cypress`](https://github.com/sorry-cypress/sorry-cypress/) parallel director

### Run with Cypress UI

Terminal 1: Run MediaWiki

```
npm run up:local
```

Terminal 2: Run Cypress UI

```
npm run local
```

### Run with Cypress

Terminal 1: Run MediaWiki

```
npm run up:local
```

Terminal 2: Run Cypress headless

```
npx cypress run
```

### Run with cy2

Terminal 1: Run MediaWiki

```
npm run up:local
```

Terminal 2: Run sorry-cypress director

```
npm run up:director
```

Repeat the following in a separate terminal for each parallel execution

```
npm run cy2 -- --ci-build-id some-id
```

Replace `some-id` with a unique value when starting a new full execution, but use the same value for each separate parallel execution per full execution.

### Run with Docker browser

Local runs can have differences when rendering pages and this can affect snapshot comparisons. Use the Docker browser image to ensure reproducible rendering.

Terminal 1: Run MediaWiki

```
npm run up:mw
```

(Note this starts a MediaWiki instance accessible by the Docker Compose network and won't work correctly when accessed locally)

Terminal 2: Run sorry-cypress director

```
npm run up:director
```

Terminal 3: Run tests with 1 thread

```
npm run up:test
```

or Terminal 3: Run tests with 2 threads

```
npm run up:test2
```

or Terminal 3: Run tests with X number of threads

```
npm run up:test -- --scale cypress=123
```

### Report

Generate report

```
npm run report
```

This will create an HTML report in `mochawesome-report`.

To prevent contamination by separate test runs, run the following before running the tests

```
npm run clean
```

### Update UI snapshots

Terminal 1: Run MediaWiki

```
npm run up:mw
```

Terminal 2: Run Docker tests to update snapshots

```
npm run up:base
```

### Snapshots

Base snapshots created using:

| Project             | Version | Source                                                                                                    |
| ------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| MediaWiki           | 1.35.2  |                                                                                                           |
| Bootstrap extension | 4.4.3   | [`tag/4.4.3`](https://github.com/ProfessionalWiki/Bootstrap/releases/tag/4.4.3)                           |
| Bootstrap library   | 4.3.1   |                                                                                                           |
| Chameleon           | 3.1.0   | [`master`](https://github.com/ProfessionalWiki/chameleon/commit/c817e3a89193ecb8e2ec37800d4534b4747e6903) |

### Test directories

| Directory                                    | What it tests                                                                                    |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| [bootstrap](cypress/integration/bootstrap)   | Bootstrap (library) styles                                                                       |
| [components](cypress/integration/components) | [Chameleon components](https://github.com/ProfessionalWiki/chameleon/tree/master/src/Components) |
| [layouts](cypress/integration/layouts)       | [Chameleon layouts](https://github.com/ProfessionalWiki/chameleon/tree/master/layouts)           |
| [mediawiki](cypress/integration/mediawiki)   | MediaWiki formatting                                                                             |
| [pages](cypress/integration/pages)           | Page content or interactions. Subfolders indicate titles with `:` seperation                     |

Test names match:

- Chameleon layout/component names
- Page titles
