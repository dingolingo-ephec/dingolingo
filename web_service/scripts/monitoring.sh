#!/bin/bash
# Script de monitoring pour le Dashboard Admin 

echo "--- État du Système ---"

# 1. Vérification de l'espace disque (Format lisible)
echo "Usage Disque :"
df -h | grep '^/dev/'

# 2. Vérification de la charge CPU (Moyenne sur 1 min)
echo ""
echo "Charge CPU (1 min) :"
uptime | awk -F'load average:' '{ print $2 }' | cut -d, -f1

# 3. Mémoire RAM libre
echo ""
echo "Mémoire Vive :"
free -m | awk 'NR==2{printf "Usage: %s/%sMB (%.2f%%)\n", $3,$2,$3*100/$2 }'