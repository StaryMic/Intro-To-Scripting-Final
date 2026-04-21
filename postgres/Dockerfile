FROM postgres:latest
LABEL authors="Alexander Elledge"

WORKDIR /postgres

COPY ./init.sql /docker-entrypoint-initdb.d/init.sql

EXPOSE 5432

# Set environment variables for the default user and database
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=password
ENV POSTGRES_DB=maindb