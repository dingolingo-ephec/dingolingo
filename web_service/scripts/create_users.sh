#!/bin/bash
# Script d'automatisation - Focus AD et Dossiers Partagés

CSV_FILE="$(dirname "$0")/users.csv"

echo "--- Début de l'automatisation AD et Système ---"

while IFS=, read -r nom prenom dep
do
    # Format de login type: p.nom (ex: j.dupont)
    LOGIN=$(echo "${prenom:0:1}.${nom}" | tr '[:upper:]' '[:lower:]' | tr -d ' ')
    
    echo "Utilisateur : $LOGIN | Département : $dep"

    # 1. Commande AD (Samba-tool est souvent utilisé en 3TI)
    # On crée l'utilisateur dans l'Unité Organisationnelle (OU) de son département
    # samba-tool user add $LOGIN --usergroup=$dep --surname=$nom --given-name=$prenom

    # 2. Création du Home Directory (Obligatoire selon le doc)
    # Chaque utilisateur (sauf invités) doit avoir son home directory [cite: 203]
    if [ "$dep" != "Invites" ]; then
        echo "Création du dossier personnel : /home/shares/users/$LOGIN"
        # mkdir -p /home/shares/users/$LOGIN
        # chown $LOGIN:"Domain Users" /home/shares/users/$LOGIN
    fi

done < "$CSV_FILE"

echo "--- Automatisation terminée ---"