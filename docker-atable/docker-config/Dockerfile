FROM php:7.2-apache

WORKDIR /var/www/html

EXPOSE 80

ENV APACHE_DOCUMENT_ROOT /var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && chown -R www-data:www-data /var/www/html/

RUN a2enmod rewrite

# install system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends git zip unzip nano iputils-ping \
    && docker-php-ext-install pdo_mysql \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer \
    && apt-get install -y gnupg gnupg2 gnupg1 \
    && curl -sL https://deb.nodesource.com/setup_11.x | bash - \
    && apt-get install -y nodejs \
    && apt-get install git
