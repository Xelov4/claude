FROM mariadb:10.11

# Variables d'environnement par défaut
ENV MYSQL_DATABASE=video_ia_db \
    MYSQL_USER=video_ia_user \
    MYSQL_PASSWORD=Thunder23** \
    MYSQL_ROOT_PASSWORD=Thunder23**

# Copier les fichiers de configuration personnalisés
COPY my.cnf /etc/mysql/conf.d/
COPY init.sql /docker-entrypoint-initdb.d/

# Configuration optimisée pour MariaDB
RUN echo '[mysqld]' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'innodb_buffer_pool_size = 1G' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'innodb_log_file_size = 256M' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'innodb_log_buffer_size = 64M' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'innodb_file_per_table = 1' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'innodb_flush_method = O_DIRECT' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'innodb_flush_log_at_trx_commit = 2' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'max_connections = 500' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'query_cache_size = 64M' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'query_cache_type = 1' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'query_cache_limit = 2M' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'thread_cache_size = 50' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'table_open_cache = 4000' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'tmp_table_size = 64M' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'max_heap_table_size = 64M' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'character-set-server = utf8mb4' >> /etc/mysql/conf.d/docker.cnf \
    && echo 'collation-server = utf8mb4_unicode_ci' >> /etc/mysql/conf.d/docker.cnf

# Exposer le port
EXPOSE 3306

# Point d'entrée par défaut
CMD ["mysqld"]
