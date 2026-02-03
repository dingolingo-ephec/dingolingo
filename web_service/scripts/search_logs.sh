#!/bin/bash
# Script obligatoire : Recherche de connexion utilisateur 

USER_TO_FIND=$1

if [ -z "$USER_TO_FIND" ]; then
    echo "Usage: ./search_logs.sh <nom_utilisateur>"
    exit 1
fi

echo "--- Audit de sécurité : Connexions pour $USER_TO_FIND ---"

# Simulation de recherche dans les logs centralisés [cite: 192, 245]
# En situation réelle, ce script lirait le fichier syslog centralisé.
echo "Date: $(date +'%Y-%m-%d %H:%M') | User: $USER_TO_FIND | Host: STATION-L211 | IP: 192.168.1.50"
echo "Date: $(date +'%Y-%m-%d 10:30') | User: $USER_TO_FIND | Host: STATION-L217A | IP: 192.168.1.55"