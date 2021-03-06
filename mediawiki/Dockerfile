# PHP 7.4 version of https://github.com/wikimedia/mediawiki-docker/blob/master/1.35/apache/Dockerfile
FROM php:7.4-apache as base-mw

# System dependencies
RUN set -eux; \
  \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    git \
    librsvg2-bin \
    imagemagick \
    # Required for SyntaxHighlighting
    python3 \
    # Added for PHP 7.4
    libonig-dev \
  ; \
  rm -rf /var/lib/apt/lists/*

# Install the PHP extensions we need
RUN set -eux; \
  \
  savedAptMark="$(apt-mark showmanual)"; \
  \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    libicu-dev \
  ; \
  \
  docker-php-ext-install -j "$(nproc)" \
    intl \
    mbstring \
    mysqli \
    opcache \
  ; \
  \
  pecl install APCu-5.1.20; \
  docker-php-ext-enable \
    apcu \
  ; \
  rm -r /tmp/pear; \
  \
  # reset apt-mark's "manual" list so that "purge --auto-remove" will remove all build dependencies
  apt-mark auto '.*' > /dev/null; \
  apt-mark manual $savedAptMark; \
  ldd "$(php -r 'echo ini_get("extension_dir");')"/*.so \
    | awk '/=>/ { print $3 }' \
    | sort -u \
    | xargs -r dpkg-query -S \
    | cut -d: -f1 \
    | sort -u \
    | xargs -rt apt-mark manual; \
  \
  apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false; \
  rm -rf /var/lib/apt/lists/*

# Enable Short URLs
RUN set -eux; \
  a2enmod rewrite; \
  { \
    echo "<Directory /var/www/html>"; \
    echo "  RewriteEngine On"; \
    echo "  RewriteCond %{REQUEST_FILENAME} !-f"; \
    echo "  RewriteCond %{REQUEST_FILENAME} !-d"; \
    echo "  RewriteRule ^ %{DOCUMENT_ROOT}/index.php [L]"; \
    echo "</Directory>"; \
  } > "$APACHE_CONFDIR/conf-available/short-url.conf"; \
  a2enconf short-url

# Enable AllowEncodedSlashes for VisualEditor
RUN sed -i "s/<\/VirtualHost>/\tAllowEncodedSlashes NoDecode\n<\/VirtualHost>/" "$APACHE_CONFDIR/sites-available/000-default.conf"

# set recommended PHP.ini settings
# see https://secure.php.net/manual/en/opcache.installation.php
RUN { \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=4000'; \
    echo 'opcache.revalidate_freq=60'; \
  } > /usr/local/etc/php/conf.d/opcache-recommended.ini

# SQLite Directory Setup
RUN set -eux; \
  mkdir -p /var/www/data; \
  chown -R www-data:www-data /var/www/data

# Version
ENV MEDIAWIKI_MAJOR_VERSION 1.35
ENV MEDIAWIKI_VERSION 1.35.2

# MediaWiki setup
RUN set -eux; \
  fetchDeps=" \
    gnupg \
    dirmngr \
  "; \
  apt-get update; \
  apt-get install -y --no-install-recommends $fetchDeps; \
  \
  curl -fSL "https://releases.wikimedia.org/mediawiki/${MEDIAWIKI_MAJOR_VERSION}/mediawiki-${MEDIAWIKI_VERSION}.tar.gz" -o mediawiki.tar.gz; \
  curl -fSL "https://releases.wikimedia.org/mediawiki/${MEDIAWIKI_MAJOR_VERSION}/mediawiki-${MEDIAWIKI_VERSION}.tar.gz.sig" -o mediawiki.tar.gz.sig; \
  export GNUPGHOME="$(mktemp -d)"; \
# gpg key from https://www.mediawiki.org/keys/keys.txt
  gpg --batch --keyserver ha.pool.sks-keyservers.net --recv-keys \
    D7D6767D135A514BEB86E9BA75682B08E8A3FEC4 \
    441276E9CCD15F44F6D97D18C119E1A64D70938E \
    F7F780D82EBFB8A56556E7EE82403E59F9F8CD79 \
    1D98867E82982C8FE0ABC25F9B69B3109D3BB7B0 \
  ; \
  gpg --batch --verify mediawiki.tar.gz.sig mediawiki.tar.gz; \
  tar -x --strip-components=1 -f mediawiki.tar.gz; \
  gpgconf --kill all; \
  rm -r "$GNUPGHOME" mediawiki.tar.gz.sig mediawiki.tar.gz; \
  chown -R www-data:www-data extensions skins cache images; \
  \
  apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false $fetchDeps; \
  rm -rf /var/lib/apt/lists/*

RUN set -eux; \
  \
  apt-get update; \
  apt-get install -y --no-install-recommends \
    cron \
    vim \
    libbz2-dev=1.* gettext-base=0.19.* \
    zip unzip libzip-dev \
    # Required for PDFHandler
    ghostscript \
    xpdf-utils \
    # Required for Scribunto
    liblua5.1-0-dev \
  ; \
  docker-php-ext-install -j "$(nproc)" calendar bz2 \
  ; \
  rm -rf /var/lib/apt/lists/*

# Install the PHP luasendbox extension we need for Scribunto
RUN docker-php-source extract && \
        \
  git clone https://gerrit.wikimedia.org/r/mediawiki/php/luasandbox.git /usr/local/src/luasandbox && \
  docker-php-ext-configure /usr/local/src/luasandbox && \
  docker-php-ext-install /usr/local/src/luasandbox && \
  rm -rf /usr/local/src/luasandbox

COPY mediawiki/htaccess /var/www/html/.htaccess
RUN ln -s /var/www/html/ /var/www/html/w

CMD ["apache2-foreground"]

##
# Original ProfessionalWiki base image
##
# FROM prowiki/mediawiki:35

# Xdebug
RUN pecl install xdebug
RUN { \
    echo "[xdebug]"; \
    echo "zend_extension=$(find /usr/local/lib/php/ -name xdebug.so)"; \
    echo "xdebug.mode=debug"; \
    echo "xdebug.discover_client_host = 1"; \
    } > /usr/local/etc/php/conf.d/xdebug.ini;

# Debug
RUN { \
    echo "[debug]"; \
    echo "display_errors=on"; \
    echo "error_reporting=E_ALL "; \
    } > /usr/local/etc/php/conf.d/debug.ini;

##
# Base Mediawiki
##
RUN php maintenance/install.php --server="http://localhost:8080" --dbtype sqlite --dbuser root --dbname mw --dbpath /var/www/data/ --scriptpath "/w" --pass AdminPassword "Chameleon Tests" AdminUser

RUN chown -R www-data:www-data /var/www/data/

RUN { \
    echo '$wgServer = getenv("MW_SERVER") ? getenv("MW_SERVER") : "http://localhost:8080";'; \
    echo '$wgArticlePath = "/wiki/$1";'; \
    echo '$wgUsePathInfo = true;'; \
    echo '$wgEnableUploads = true;'; \
    echo '$wgShowExceptionDetails = true;'; \
    echo '$wgShowDBErrorBacktrace = true;'; \
    echo '$wgDevelopmentWarnings = true;'; \
    echo '$wgGroupPermissions["*"]["edit"] = false;'; \
    echo '$wgNamespacesWithSubpages[NS_MAIN] = true;'; \
    } >> LocalSettings.php;

##
# Extra users
##
RUN php maintenance/createAndPromote.php AnotherUser AnotherPassword

##
# Testing pages
##
COPY ./mediawiki/load-pages.sh load-pages.sh
COPY ./mediawiki/pages pages
RUN ./load-pages.sh \
    && rm -r pages \
    && rm load-pages.sh

##
# Imags
##
COPY ./mediawiki/images /tmp/images
RUN php maintenance/importImages.php /tmp/images \
    && chown -R www-data:www-data images \
    #     && chmod -R 777 images \
    && rm -r /tmp/images


##
# Extra Chamelon layouts
##
COPY ./mediawiki/layouts ./layouts

##
# Dependencies
##
# Git only
RUN git clone --branch REL1_35 --single-branch https://gerrit.wikimedia.org/r/mediawiki/extensions/Echo.git extensions/Echo
RUN git clone --branch REL1_35 --single-branch https://gerrit.wikimedia.org/r/mediawiki/extensions/FlaggedRevs.git extensions/FlaggedRevs
RUN git clone --branch v3.2.0 --single-branch https://bitbucket.org/wikiskripta/medik.git skins/Medik

# RUN git clone --branch master --single-branch https://github.com/oetterer/BootstrapComponents.git extensions/BootstrapComponents
RUN git clone --branch master --single-branch https://github.com/malberts/BootstrapExamples.git extensions/BootstrapExamples

RUN { \
    echo 'wfLoadExtension( "Bootstrap" );'; \
    echo 'wfLoadExtension( "BootstrapComponents" );'; \
    echo 'wfLoadExtension( "BootstrapExamples" );'; \
    echo 'wfLoadExtension( "CiteThisPage" );'; \
    echo 'wfLoadExtension( "Echo" );'; \
    echo '// wfLoadExtension( "FlaggedRevs" );'; \
    echo 'wfLoadExtension( "MultimediaViewer" );'; \
    echo 'wfLoadExtension( "PageForms" );'; \
    echo 'wfLoadExtension( "TemplateData" );'; \
    echo 'wfLoadExtension( "VisualEditor" );'; \
    echo 'wfLoadExtension( "WikiEditor" );'; \
    echo 'enableSemantics( "https://www.semantic-mediawiki.org/" );'; \
    echo '$wgVirtualRestConfig["modules"]["parsoid"] = ['; \
    echo '    "url" => "http://localhost/w/rest.php",'; \
    echo '];'; \
    echo 'wfLoadExtension( "Parsoid", dirname(__FILE__) . "/vendor/wikimedia/parsoid/extension.json" );'; \
    echo 'wfLoadSkin( "chameleon" );'; \
    echo 'wfLoadSkin( "Medik" );'; \
    echo '$wgDefaultSkin = "chameleon";'; \
    echo '$egChameleonAvailableLayoutFiles = ['; \
    echo '    "standard"            => __DIR__ . "/skins/chameleon/layouts/standard.xml",'; \
    echo '    "navhead"             => __DIR__ . "/skins/chameleon/layouts/navhead.xml",'; \
    echo '    "fixedhead"           => __DIR__ . "/skins/chameleon/layouts/fixedhead.xml",'; \
    echo '    "stickyhead"          => __DIR__ . "/skins/chameleon/layouts/stickyhead.xml",'; \
    echo '    "clean"               => __DIR__ . "/skins/chameleon/layouts/clean.xml",'; \
    echo '    "dirty"               => __DIR__ . "/layouts/dirty.xml",'; \
    echo '    "standard_echo_icons" => __DIR__ . "/layouts/standard_echo_icons.xml",'; \
    echo '    "standard_echo_links" => __DIR__ . "/layouts/standard_echo_links.xml",'; \
    echo '    "stickyhead_echo"     => __DIR__ . "/layouts/stickyhead_echo.xml",'; \
    echo '    "fixedhead_no_echo"   => __DIR__ . "/layouts/fixedhead_no_echo.xml",'; \
    echo '    "sidebar"             => __DIR__ . "/layouts/sidebar.xml",'; \
    echo '];'; \
    echo '// $egChameleonLayoutFile = __DIR__ . "/layouts/sidebar.xml";'; \
    echo '// $theme = "cosmo";'; \
    echo '// $egChameleonThemeFile = __DIR__ . "/vendor/thomaspark/bootswatch/dist/" . $theme . "/_variables.scss";'; \
    echo '$egChameleonExternalStyleModules = ['; \
    echo '    // __DIR__ . "/vendor/thomaspark/bootswatch/dist/" . $theme . "/_bootswatch.scss" => "afterMain",'; \
    echo '];'; \
    echo '$egChameleonExternalStyleVariables = ['; \
    echo '];'; \
    echo '$egChameleonEnableExternalLinkIcons = true;'; \
    echo '$wgVisualEditorShowBetaWelcome = false;'; \
    echo '$wgVisualEditorEnableWikitext = true;'; \
    echo '$wgDefaultUserOptions["visualeditor-newwikitext"] = 1;'; \
    } >> LocalSettings.php;

RUN curl -sS https://getcomposer.org/installer | php -- --2 --install-dir=/usr/local/bin --filename=composer
COPY ./mediawiki/composer.local.json /var/www/html/composer.local.json
RUN composer update

RUN php maintenance/update.php --quick
