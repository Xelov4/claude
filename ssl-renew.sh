#!/bin/bash

# Renouveler le certificat
docker-compose run --rm certbot renew

# Recharger Nginx pour prendre en compte le nouveau certificat
docker-compose exec nginx nginx -s reload 