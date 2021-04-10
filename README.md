# chameleon-tests

**Work in progress!**

[Chameleon](https://github.com/ProfessionalWiki/chameleon/) tests built with [Cypress](https://www.cypress.io/).

It provides a base Mediawiki instance using [Docker Compose](https://docs.docker.com/compose/).

## Base Mediawiki
### Build and run Mediawiki instance
```
docker-compose up
```

### Reset Mediawiki instance
Stop and remove the container:
```
docker-compose stop
docker-compose rm -f
```

## Mediawiki customisations
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

### Run tests including UI snapshot checks:
```
npm run visual:actual
```

### Update UI snapshots
```
npm run visual:base
```
