#!/bin/bash

# Fonction pour afficher les messages d'erreur
error() {
    echo "❌ $1" >&2
    exit 1
}

# Fonction pour afficher les messages de succès
success() {
    echo "✅ $1"
}

# Création des répertoires nécessaires
echo "📁 Création des répertoires..."
mkdir -p nginx/certbot/conf nginx/certbot/www || error "Impossible de créer les répertoires"
success "Répertoires créés"

# Vérification des permissions
echo "🔒 Vérification des permissions..."
chmod 755 nginx/certbot/www || error "Impossible de modifier les permissions"
success "Permissions configurées"

# Démarrage initial de Nginx pour le challenge Let's Encrypt
echo "🚀 Démarrage initial des conteneurs..."
docker-compose up -d nginx || error "Impossible de démarrer Nginx"
success "Nginx démarré"

# Attente pour s'assurer que Nginx est prêt
echo "⏳ Attente du démarrage de Nginx..."
sleep 5

# Obtention du certificat initial
echo "🔑 Obtention des certificats SSL..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email admin@video-ia.net \
    --agree-tos \
    --no-eff-email \
    -d video-ia.net \
    -d www.video-ia.net || error "Impossible d'obtenir les certificats SSL"
success "Certificats SSL obtenus"

# Démarrage de tous les services
echo "🚀 Démarrage de tous les services..."
docker-compose up -d || error "Impossible de démarrer tous les services"
success "Tous les services sont démarrés"

# Attente que MariaDB soit prêt
echo "⏳ Attente du démarrage de MariaDB..."
sleep 10

# Exécution des migrations Prisma
echo "🔄 Exécution des migrations Prisma..."
docker-compose exec -T nextjs npx prisma migrate deploy || error "Impossible d'exécuter les migrations"
success "Migrations exécutées"

# Vérification finale
echo "🔍 Vérification de l'état des services..."
docker-compose ps
success "Déploiement terminé"

echo "
🌐 L'application est accessible sur :
   - https://www.video-ia.net
   - http://video-ia.net (redirection automatique)

💡 Pour vérifier les logs :
   docker-compose logs -f

🔄 Pour renouveler les certificats manuellement :
   ./ssl-renew.sh
" 