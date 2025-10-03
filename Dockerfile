# Memulai dengan image resmi PHP 8.2 yang sudah termasuk Apache
FROM php:8.2-apache

# Mengatur direktori kerja di dalam kontainer
WORKDIR /var/www/html

# Install dependensi sistem dan ekstensi PHP yang dibutuhkan Laravel
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    zip \
    libzip-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install pdo pdo_mysql zip gd

# Install Composer (manajer paket PHP)
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Node.js dan NPM (untuk build aset Vue.js)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

# Konfigurasi Apache agar menunjuk ke folder /public Laravel
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf
RUN a2enmod rewrite

# Copy file aplikasi Anda dan install dependensi
COPY . .
RUN composer install --no-interaction --optimize-autoloader --no-dev
RUN npm install && npm run build

# Atur izin folder yang benar untuk Laravel
RUN chown -R www-data:www-data storage bootstrap/cache