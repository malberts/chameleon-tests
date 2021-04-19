FROM prowiki/mediawiki:35

# Xdebug
RUN pecl install xdebug
RUN { \
        echo "[xdebug]"; \
        echo "zend_extension=$(find /usr/local/lib/php/ -name xdebug.so)"; \
        echo "xdebug.mode=debug"; \
        echo "xdebug.discover_client_host = 1"; \
    } > /usr/local/etc/php/conf.d/xdebug.ini;

##
# Base Mediawiki
##
RUN php maintenance/install.php --server="http://localhost:8080" --dbtype sqlite --dbuser root --dbname mw --dbpath /var/www/data/ --scriptpath "/w" --pass AdminPassword "Chameleon Tests" AdminUser

RUN chown -R www-data:www-data /var/www/data/

RUN { \
    echo '$wgServer = getenv("MW_SERVER") ? getenv("MW_SERVER") : "http://localhost:8080";'; \
    echo '$wgArticlePath = "/wiki/$1";'; \
    echo '$wgUsePathInfo = true;'; \
    echo '$wgShowExceptionDetails = true;'; \
    echo '$wgShowDBErrorBacktrace = true;'; \
    # echo '$wgDevelopmentWarnings = true;'; \
    echo '$wgGroupPermissions["*"]["edit"] = false;'; \
} >> LocalSettings.php;

##
# Testing pages
##
COPY ./mediawiki/load-pages.sh load-pages.sh
COPY ./mediawiki/pages pages
RUN ./load-pages.sh

##
# Dependencies
##
RUN { \
    echo 'wfLoadExtension( "Bootstrap" );'; \
    echo 'wfLoadExtension( "BootstrapExamples" );'; \
    echo 'wfLoadExtension( "VisualEditor" );'; \
    echo 'wfLoadExtension( "WikiEditor" );'; \
    echo 'wfLoadSkin( "chameleon" );'; \
    echo '$wgDefaultSkin = "chameleon";'; \
    echo '$egChameleonAvailableLayoutFiles = ['; \
    echo '    "standard"   => __DIR__ . "/skins/chameleon/layouts/standard.xml",'; \
    echo '    "navhead"    => __DIR__ . "/skins/chameleon/layouts/navhead.xml",'; \
    echo '    "fixedhead"  => __DIR__ . "/skins/chameleon/layouts/fixedhead.xml",'; \
    echo '    "stickyhead" => __DIR__ . "/skins/chameleon/layouts/stickyhead.xml",'; \
    echo '    "clean"      => __DIR__ . "/skins/chameleon/layouts/clean.xml",'; \
    echo '];'; \
} >> LocalSettings.php;

RUN curl -sS https://getcomposer.org/installer | php -- --2 --install-dir=/usr/local/bin --filename=composer
COPY ./mediawiki/composer.local.json /var/www/html/composer.local.json
RUN composer update --no-dev

RUN php maintenance/update.php --quick
