# chameleon-tests

**Work in progress!**

[Chameleon](https://github.com/ProfessionalWiki/chameleon/) tests built with [Cypress](https://www.cypress.io/).

It provides a base MediaWiki instance using [Docker Compose](https://docs.docker.com/compose/).

## Base MediaWiki
### Build and run MediaWiki instance
```
docker-compose up
```

### Reset MediaWiki instance
Stop and remove the container:
```
docker-compose stop
docker-compose rm -f
```

## MediaWiki customisations
### Add custom Bootstrap/Chameleon
Add volumes for the custom directories in `docker-compose.override.yml`

Example:
```
cp docker-compose.override.yml.example docker-compose.overide.yml
git pull https://github.com/ProfessionalWiki/Bootstrap mediawiki/extensions/bootstrap
git pull https://github.com/ProfessionalWiki/chameleon mediawiki/skins/chameleon
```

The original Composer requirements for Chameleon's `master` branch will be installed. If the custom versions has different requirements, rerun Composer:
```
docker-compose exec mediawiki composer update --no-dev
```

### Additional extensions and skins
TODO

## Cypress
### Installation
```
npm install
```

### Run Cypress UI
```
$(npm bin)/cypress open
```

### Run tests including UI snapshot checks
```
npm run test:actual
```

### Update UI snapshots
```
npm run test:base
```

### Snapshots
Base snapshots created using:

|Project  |Version|Source|
|---------|-------|------|
|MediaWiki|1.35.2 |      |
|Bootstrap extension|4.4.3|[`tag/4.4.3`](https://github.com/ProfessionalWiki/Bootstrap/releases/tag/4.4.3)|
|Bootstrap library|4.3.1||
|Chameleon|3.1.0|[`master`](https://github.com/ProfessionalWiki/chameleon/commit/8d44a743a1896667e75c4c6969a62d5035605ea7)|

### Test directories
|Directory|What it tests|
|---------|-------------|
|[components](cypress/integration/components)|[Chameleon components](https://github.com/ProfessionalWiki/chameleon/tree/master/src/Components)|
|[layouts](cypress/integration/layouts)|[Chameleon layouts](https://github.com/ProfessionalWiki/chameleon/tree/master/layouts)|
|[pages](cypress/integration/pages)|Page content only. Subfolders indicate titles with `:` seperation|

Test names match:
* Chameleon layout/component names
* Page titles
