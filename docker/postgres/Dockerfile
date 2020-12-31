FROM postgres:13-alpine

COPY postgresql.conf /postgresql.conf
COPY copy_postgresql_conf_to_pgdata.sh /docker-entrypoint-initdb.d/
