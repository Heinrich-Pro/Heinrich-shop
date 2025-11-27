# Parcours Utilisateurs - Site E-commerce Next.js

## 1. Parcours Visiteur Non Connecté

### 1.1 Découverte du Site (Premier Visiteur)

**Étape 1 : Arrivée sur le site**
- Utilisateur arrive via Google, réseaux sociaux ou lien direct
- Atterrissage sur la page d'accueil
- Affichage : bannière promo, produits phares, catégories

**Étape 2 : Navigation initiale**
- Scroll sur la page d'accueil pour découvrir l'offre
- Consultation des catégories principales
- Utilisation du menu de navigation

**Étape 3 : Exploration des produits**
- Clic sur une catégorie qui l'intéresse
- Visualisation de la liste des produits
- Utilisation des filtres (prix, marque, couleur, etc.)

**Étape 4 : Consultation d'un produit**
- Clic sur un produit spécifique
- Lecture de la description
- Consultation des images (galerie, zoom)
- Lecture des avis clients
- Visualisation des produits similaires

**Étape 5 : Ajout au panier (sans compte)**
- Sélection des options (taille, couleur)
- Clic sur "Ajouter au panier"
- Notification de confirmation
- Possibilité de continuer les achats

**Étape 6 : Consultation du panier**
- Clic sur l'icône panier
- Vérification des articles
- Modification des quantités si besoin
- Calcul automatique du total

**Étape 7 : Tentative de commande**
- Clic sur "Passer commande"
- Redirection vers page de connexion/inscription
- Options : créer un compte ou continuer en invité

---

### 1.2 Recherche de Produit Spécifique

**Étape 1 : Utilisation de la recherche**
- Clic sur la barre de recherche
- Saisie du nom du produit recherché
- Suggestions en temps réel (autocomplétion)

**Étape 2 : Résultats de recherche**
- Affichage des résultats pertinents
- Filtrage des résultats si trop nombreux
- Tri par pertinence, prix, popularité

**Étape 3 : Sélection du produit**
- Clic sur le produit correspondant
- Consultation de la fiche détaillée
- Vérification de la disponibilité

**Étape 4 : Décision d'achat**
- Ajout au panier ou à la liste de souhaits
- Comparaison avec des produits similaires
- Consultation des avis pour confirmer le choix

---

## 2. Parcours Client Inscrit

### 2.1 Création de Compte

**Étape 1 : Accès à l'inscription**
- Clic sur "S'inscrire" dans le header
- Ou invitation lors du passage de commande

**Étape 2 : Formulaire d'inscription**
- Saisie email
- Création mot de passe
- Confirmation mot de passe
- Acceptation des CGV
- Option newsletter (optionnel)

**Étape 3 : Validation**
- Soumission du formulaire
- Email de confirmation envoyé
- Validation du compte via lien email

**Étape 4 : Connexion automatique**
- Redirection vers page d'accueil ou panier
- Message de bienvenue
- Compte créé et actif

---

### 2.2 Connexion Utilisateur

**Étape 1 : Accès à la connexion**
- Clic sur "Se connecter"
- Affichage formulaire de connexion

**Étape 2 : Authentification**
- Saisie email
- Saisie mot de passe
- Option "Se souvenir de moi"
- Clic sur "Connexion"

**Étape 3 : Connexion réussie**
- Redirection vers la page précédente ou accueil
- Affichage du nom/prénom dans le header
- Accès à l'espace client

**Alternative : Mot de passe oublié**
- Clic sur "Mot de passe oublié"
- Saisie de l'email
- Réception email de réinitialisation
- Création nouveau mot de passe

---

### 2.3 Achat avec Compte

**Étape 1 : Connexion**
- Utilisateur connecté à son compte
- Navigation sur le site

**Étape 2 : Ajout produits au panier**
- Sélection de plusieurs produits
- Ajout au panier avec options choisies
- Panier sauvegardé dans le compte

**Étape 3 : Consultation du panier**
- Accès au panier
- Vérification des articles
- Application d'un code promo (si disponible)
- Visualisation du total avec réductions

**Étape 4 : Passage de commande**
- Clic sur "Commander"
- Redirection vers tunnel de commande

**Étape 5 : Adresse de livraison**
- Sélection adresse enregistrée ou nouvelle adresse
- Validation de l'adresse
- Possibilité d'adresse de facturation différente

**Étape 6 : Mode de livraison**
- Choix parmi les options disponibles :
  - Standard (3-5 jours)
  - Express (24-48h)
  - Point relais
- Affichage des frais de livraison
- Estimation de la date de livraison

**Étape 7 : Mode de paiement**
- Choix du mode de paiement :
  - Carte bancaire
  - PayPal
  - Carte enregistrée (si applicable)
- Saisie des informations de paiement

**Étape 8 : Récapitulatif**
- Vérification finale :
  - Articles commandés
  - Adresse de livraison
  - Mode de livraison
  - Prix total
- Acceptation des CGV
- Clic sur "Confirmer la commande"

**Étape 9 : Paiement sécurisé**
- Redirection vers plateforme de paiement
- Validation du paiement (3D Secure si applicable)
- Traitement du paiement

**Étape 10 : Confirmation**
- Page de confirmation avec numéro de commande
- Email de confirmation envoyé
- Possibilité de télécharger la facture
- Retour à l'accueil ou suivi de commande

---

### 2.4 Gestion du Compte Client

**Étape 1 : Accès à l'espace client**
- Clic sur nom/prénom dans le header
- Menu déroulant avec options
- Sélection "Mon compte"

**Étape 2 : Dashboard client**
- Vue d'ensemble :
  - Dernières commandes
  - Commandes en cours
  - Points de fidélité (si applicable)
  - Messages importants

**Étape 3 : Modification du profil**
- Accès à "Mes informations"
- Modification :
  - Nom, prénom
  - Email
  - Téléphone
  - Mot de passe
- Sauvegarde des modifications

**Étape 4 : Gestion des adresses**
- Consultation des adresses enregistrées
- Ajout de nouvelle adresse
- Modification ou suppression d'adresses
- Définition d'une adresse par défaut

**Étape 5 : Historique des commandes**
- Liste de toutes les commandes passées
- Filtres : date, statut
- Détails de chaque commande :
  - Produits commandés
  - Date et montant
  - Statut de livraison
  - Téléchargement facture

**Étape 6 : Suivi de commande en cours**
- Sélection d'une commande en cours
- Visualisation du statut :
  - Confirmée
  - En préparation
  - Expédiée
  - En livraison
  - Livrée
- Numéro de suivi transporteur

---

### 2.5 Liste de Souhaits

**Étape 1 : Ajout à la liste**
- Lors de la navigation, clic sur icône cœur
- Produit ajouté à la liste de souhaits
- Notification de confirmation

**Étape 2 : Consultation de la liste**
- Accès via menu compte ou header
- Visualisation de tous les produits sauvegardés
- Affichage du prix et disponibilité

**Étape 3 : Actions sur la liste**
- Ajout rapide au panier
- Suppression d'un article
- Partage de la liste (optionnel)
- Notifications si changement de prix

---

### 2.6 Retour et Réclamation

**Étape 1 : Demande de retour**
- Accès à l'historique des commandes
- Sélection de la commande concernée
- Clic sur "Retourner un article"

**Étape 2 : Sélection des articles**
- Choix des produits à retourner
- Sélection de la quantité
- Indication du motif de retour

**Étape 3 : Validation du retour**
- Récapitulatif de la demande
- Génération d'un bon de retour
- Instructions pour le renvoi
- Email de confirmation

**Étape 4 : Suivi du retour**
- Statut du retour dans l'espace client
- Notification de réception par le service
- Traitement du remboursement
- Confirmation du remboursement

---

## 3. Parcours Administrateur

### 3.1 Connexion Admin

**Étape 1 : Accès au dashboard**
- URL dédiée : /admin
- Page de connexion sécurisée
- Authentification renforcée (2FA optionnel)

**Étape 2 : Dashboard principal**
- Vue d'ensemble des statistiques :
  - Ventes du jour
  - Commandes en attente
  - Stock faible
  - Nouveaux clients
- Accès rapide aux sections principales

---

### 3.2 Gestion des Produits

**Étape 1 : Accès catalogue**
- Menu "Produits" > "Tous les produits"
- Liste complète des produits
- Filtres et recherche

**Étape 2 : Ajout d'un produit**
- Clic sur "Ajouter un produit"
- Formulaire de création :
  - Nom du produit
  - Description courte et longue
  - Prix (normal, promotionnel)
  - SKU/référence
  - Catégories et tags
  - Images (upload multiple)
  - Variantes (tailles, couleurs)
  - Stock par variante
  - Poids et dimensions
  - SEO (meta title, description)

**Étape 3 : Publication**
- Prévisualisation du produit
- Choix du statut : brouillon ou publié
- Sauvegarde et publication

**Étape 4 : Modification d'un produit**
- Sélection du produit dans la liste
- Modification des champs nécessaires
- Mise à jour et sauvegarde

**Étape 5 : Gestion du stock**
- Vue "Inventaire"
- Modification des quantités en stock
- Alertes stock faible
- Import/export CSV pour mise à jour en masse

---

### 3.3 Gestion des Commandes

**Étape 1 : Liste des commandes**
- Menu "Commandes"
- Vue d'ensemble : nouvelles, en cours, terminées
- Filtres : date, statut, montant, client

**Étape 2 : Traitement d'une commande**
- Clic sur une commande
- Détails complets :
  - Informations client
  - Produits commandés
  - Adresses
  - Mode de paiement et livraison
  - Historique des actions

**Étape 3 : Changement de statut**
- Mise à jour du statut :
  - Paiement reçu
  - En préparation
  - Expédiée
- Ajout d'un numéro de suivi
- Email automatique au client

**Étape 4 : Impression documents**
- Génération bon de préparation
- Impression étiquette d'expédition
- Téléchargement facture

**Étape 5 : Gestion des retours**
- Vue "Retours"
- Liste des demandes de retour
- Validation ou refus
- Traitement du remboursement

---

### 3.4 Gestion des Clients

**Étape 1 : Liste clients**
- Menu "Clients"
- Vue d'ensemble de tous les clients
- Recherche et filtres

**Étape 2 : Fiche client**
- Clic sur un client
- Informations détaillées :
  - Coordonnées
  - Historique d'achats
  - Total dépensé
  - Dernière connexion
  - Adresses enregistrées

**Étape 3 : Actions sur le client**
- Envoi d'email
- Ajout de note interne
- Modification des informations
- Suppression du compte (RGPD)

---

### 3.5 Statistiques et Rapports

**Étape 1 : Accès aux statistiques**
- Menu "Rapports" ou Dashboard
- Sélection de la période

**Étape 2 : Visualisation des données**
- Chiffre d'affaires :
  - Graphique d'évolution
  - Comparaison périodes
- Produits :
  - Top ventes
  - Moins vendus
- Clients :
  - Nouveaux clients
  - Taux de rétention
- Trafic :
  - Sources d'acquisition
  - Taux de conversion

**Étape 3 : Export des données**
- Génération de rapports PDF
- Export CSV pour analyse externe
- Planification de rapports automatiques

---

### 3.6 Configuration du Site

**Étape 1 : Paramètres généraux**
- Menu "Paramètres"
- Configuration :
  - Nom et logo du site
  - Informations de contact
  - Devise et langue
  - Timezone

**Étape 2 : Modes de paiement**
- Activation/désactivation des moyens de paiement
- Configuration API (Stripe, PayPal)
- Test des intégrations

**Étape 3 : Modes de livraison**
- Création de zones de livraison
- Configuration des tarifs
- Délais de livraison
- Poids/dimensions limites

**Étape 4 : Taxes et frais**
- Configuration des taux de TVA
- Règles de taxation par pays/région
- Frais supplémentaires

**Étape 5 : Emails transactionnels**
- Personnalisation des templates
- Configuration SMTP
- Test d'envoi

---

## 4. Cas d'Usage Spécifiques

### 4.1 Achat Invité (Guest Checkout)

**Parcours simplifié sans création de compte**

1. Ajout produits au panier
2. Clic sur "Commander"
3. Choix "Continuer sans compte"
4. Saisie informations :
   - Email
   - Adresse de livraison
   - Téléphone
5. Choix livraison et paiement
6. Confirmation et paiement
7. Email de confirmation avec lien de suivi

**Post-achat**
- Email avec proposition de créer un compte
- Lien de création avec données pré-remplies

---

### 4.2 Abandon de Panier

**Scénario : Client connecté abandonne son panier**

1. Client ajoute produits au panier
2. Client quitte le site sans commander
3. Système détecte l'abandon après 1h
4. Email de rappel envoyé après 24h :
   - Récapitulatif des produits
   - Lien direct vers le panier
   - Code promo de 10% (optionnel)
5. Client revient et finalise l'achat

---

### 4.3 Produit en Rupture de Stock

**Parcours quand produit non disponible**

1. Client consulte fiche produit
2. Affichage "Rupture de stock"
3. Options proposées :
   - Notification de retour en stock
   - Produits similaires disponibles
   - Liste d'attente
4. Client saisit son email
5. Notification envoyée lors du réapprovisionnement

---

### 4.4 Code Promo / Réduction

**Application d'une réduction**

1. Client a des produits dans le panier
2. Consultation du panier
3. Zone "Code promo" visible
4. Saisie du code
5. Clic sur "Appliquer"
6. Validation et calcul de la réduction
7. Affichage du nouveau total
8. Réduction appliquée à la commande

---

### 4.5 Programme de Fidélité (Optionnel)

**Accumulation et utilisation de points**

1. Client effectue un achat
2. Points crédités automatiquement (ex: 1€ = 1 point)
3. Visualisation dans l'espace client
4. Lors d'un nouvel achat :
   - Option "Utiliser mes points"
   - Conversion en réduction
   - Application au panier
5. Confirmation de l'utilisation

---

## 5. Points d'Attention UX

### 5.1 Navigation
- Menu clair et structuré
- Fil d'Ariane sur toutes les pages
- Recherche accessible en permanence
- Panier toujours visible (icône + nombre d'articles)

### 5.2 Processus de Commande
- Progression visible (étapes numérotées)
- Possibilité de revenir en arrière
- Sauvegarde automatique des données
- Récapitulatif avant validation finale

### 5.3 Messages et Notifications
- Confirmations visuelles claires
- Messages d'erreur explicites
- Chargement avec indicateurs
- Emails transactionnels à chaque étape

### 5.4 Responsive
- Navigation mobile optimisée
- Filtres accessibles
- Panier adapté au mobile
- Paiement mobile-friendly

### 5.5 Accessibilité
- Contraste suffisant
- Taille de texte lisible
- Navigation au clavier
- Labels clairs sur les formulaires

---

## 6. User Stories

### 6.1 Visiteur / Client Non Connecté

#### Navigation et Découverte

**US-001 : Consulter la page d'accueil**
- **En tant que** visiteur
- **Je veux** consulter la page d'accueil du site
- **Afin de** découvrir les produits mis en avant et les promotions en cours
- **Critères d'acceptation :**
  - La page affiche un carrousel de bannières promotionnelles
  - Les produits phares sont visibles
  - Les catégories principales sont accessibles
  - Le chargement est inférieur à 2 secondes

**US-002 : Naviguer dans les catégories**
- **En tant que** visiteur
- **Je veux** parcourir les différentes catégories de produits
- **Afin de** trouver le type de produit qui m'intéresse
- **Critères d'acceptation :**
  - Le menu de catégories est clair et organisé
  - Les sous-catégories s'affichent au survol
  - Le fil d'Ariane indique ma position
  - Le nombre de produits par catégorie est visible

**US-003 : Rechercher un produit**
- **En tant que** visiteur
- **Je veux** rechercher un produit spécifique
- **Afin de** le trouver rapidement sans naviguer dans les catégories
- **Critères d'acceptation :**
  - La barre de recherche est visible en permanence
  - Des suggestions apparaissent pendant la saisie
  - Les résultats sont pertinents et triés
  - Le message "Aucun résultat" s'affiche si pas de correspondance

**US-004 : Filtrer les produits**
- **En tant que** visiteur
- **Je veux** filtrer les produits selon mes critères
- **Afin de** affiner ma recherche et trouver ce qui me convient
- **Critères d'acceptation :**
  - Filtres disponibles : prix, marque, couleur, taille, note
  - Les filtres sont cumulables
  - Le nombre de résultats se met à jour en temps réel
  - Je peux réinitialiser tous les filtres d'un clic

**US-005 : Trier les résultats**
- **En tant que** visiteur
- **Je veux** trier les produits affichés
- **Afin de** voir en premier ceux qui correspondent à mes priorités
- **Critères d'acceptation :**
  - Options de tri : pertinence, prix croissant/décroissant, popularité, nouveautés
  - Le tri s'applique immédiatement
  - L'option active est visuellement identifiable

#### Consultation Produit

**US-006 : Consulter une fiche produit**
- **En tant que** visiteur
- **Je veux** voir les détails d'un produit
- **Afin de** décider si je souhaite l'acheter
- **Critères d'acceptation :**
  - Images haute qualité avec zoom
  - Description complète et claire
  - Prix affiché (avec promo si applicable)
  - Disponibilité en stock visible
  - Caractéristiques techniques listées
  - Avis clients visibles

**US-007 : Voir les avis clients**
- **En tant que** visiteur
- **Je veux** lire les avis d'autres clients
- **Afin de** m'assurer de la qualité du produit
- **Critères d'acceptation :**
  - Note moyenne visible en étoiles
  - Nombre total d'avis affiché
  - Avis triés par pertinence ou date
  - Possibilité de filtrer par note
  - Photos clients visibles si disponibles

**US-008 : Voir des produits similaires**
- **En tant que** visiteur
- **Je veux** voir des produits similaires
- **Afin de** comparer et trouver une alternative
- **Critères d'acceptation :**
  - Section "Produits similaires" visible
  - Au moins 4 produits suggérés
  - Accès rapide à leur fiche
  - Basé sur la catégorie et les caractéristiques

#### Gestion Panier

**US-009 : Ajouter un produit au panier**
- **En tant que** visiteur
- **Je veux** ajouter un produit à mon panier
- **Afin de** préparer ma commande
- **Critères d'acceptation :**
  - Sélection des variantes (taille, couleur) obligatoire si applicable
  - Choix de la quantité possible
  - Confirmation visuelle de l'ajout (notification)
  - Le compteur du panier se met à jour
  - Possibilité de continuer mes achats

**US-010 : Consulter mon panier**
- **En tant que** visiteur
- **Je veux** voir le contenu de mon panier
- **Afin de** vérifier mes articles avant de commander
- **Critères d'acceptation :**
  - Liste complète des articles avec images
  - Prix unitaire et total par article
  - Quantité modifiable
  - Possibilité de supprimer un article
  - Total du panier affiché
  - Estimation des frais de livraison

**US-011 : Modifier la quantité d'un article**
- **En tant que** visiteur
- **Je veux** changer la quantité d'un produit dans mon panier
- **Afin de** ajuster ma commande
- **Critères d'acceptation :**
  - Boutons +/- ou champ de saisie
  - Mise à jour instantanée du total
  - Message si quantité non disponible
  - Stock maximum respecté

**US-012 : Appliquer un code promo**
- **En tant que** visiteur
- **Je veux** saisir un code promotionnel
- **Afin de** bénéficier d'une réduction
- **Critères d'acceptation :**
  - Champ de saisie visible dans le panier
  - Validation du code en temps réel
  - Réduction appliquée et visible
  - Message d'erreur si code invalide
  - Possibilité de retirer le code

**US-013 : Sauvegarder mon panier**
- **En tant que** visiteur
- **Je veux** que mon panier soit sauvegardé
- **Afin de** retrouver mes articles lors d'une prochaine visite
- **Critères d'acceptation :**
  - Panier sauvegardé en localStorage (non connecté)
  - Conservation pendant 30 jours minimum
  - Vérification de la disponibilité au retour
  - Notification si produit plus disponible

---

### 6.2 Client Inscrit

#### Authentification

**US-014 : Créer un compte**
- **En tant que** visiteur
- **Je veux** créer un compte client
- **Afin de** faciliter mes futurs achats et suivre mes commandes
- **Critères d'acceptation :**
  - Formulaire clair : email, mot de passe, confirmation
  - Validation en temps réel des champs
  - Email de confirmation envoyé
  - Connexion automatique après validation
  - Message de bienvenue affiché

**US-015 : Me connecter**
- **En tant que** client inscrit
- **Je veux** me connecter à mon compte
- **Afin de** accéder à mon espace personnel
- **Critères d'acceptation :**
  - Formulaire email + mot de passe
  - Option "Se souvenir de moi"
  - Messages d'erreur clairs si échec
  - Redirection vers page précédente après connexion
  - Mon nom affiché dans le header

**US-016 : Réinitialiser mon mot de passe**
- **En tant que** client
- **Je veux** récupérer mon mot de passe oublié
- **Afin de** accéder à nouveau à mon compte
- **Critères d'acceptation :**
  - Lien "Mot de passe oublié" visible
  - Email de réinitialisation envoyé
  - Lien valide 24h
  - Nouveau mot de passe avec confirmation
  - Connexion automatique après changement

**US-017 : Me déconnecter**
- **En tant que** client connecté
- **Je veux** me déconnecter de mon compte
- **Afin de** sécuriser mon compte sur un appareil partagé
- **Critères d'acceptation :**
  - Bouton de déconnexion accessible
  - Confirmation de la déconnexion
  - Suppression de la session
  - Redirection vers page d'accueil

#### Profil et Compte

**US-018 : Modifier mes informations personnelles**
- **En tant que** client
- **Je veux** mettre à jour mes informations
- **Afin de** maintenir mon profil à jour
- **Critères d'acceptation :**
  - Accès via "Mon compte"
  - Modification : nom, prénom, email, téléphone
  - Validation avant sauvegarde
  - Confirmation de la mise à jour
  - Email de notification si changement d'email

**US-019 : Changer mon mot de passe**
- **En tant que** client
- **Je veux** modifier mon mot de passe
- **Afin de** renforcer la sécurité de mon compte
- **Critères d'acceptation :**
  - Saisie de l'ancien mot de passe
  - Nouveau mot de passe avec confirmation
  - Validation de la force du mot de passe
  - Email de confirmation du changement

**US-020 : Gérer mes adresses**
- **En tant que** client
- **Je veux** enregistrer plusieurs adresses
- **Afin de** sélectionner rapidement lors de mes commandes
- **Critères d'acceptation :**
  - Ajout de nouvelles adresses
  - Modification d'adresses existantes
  - Suppression d'adresses
  - Définition d'une adresse par défaut
  - Limite maximum d'adresses (ex: 5)

**US-021 : Supprimer mon compte**
- **En tant que** client
- **Je veux** supprimer définitivement mon compte
- **Afin de** exercer mon droit à l'oubli (RGPD)
- **Critères d'acceptation :**
  - Option visible dans paramètres
  - Demande de confirmation
  - Saisie du mot de passe obligatoire
  - Email de confirmation de suppression
  - Données anonymisées ou supprimées selon RGPD

#### Commandes et Achats

**US-022 : Passer une commande**
- **En tant que** client connecté
- **Je veux** finaliser l'achat de mon panier
- **Afin de** recevoir mes produits
- **Critères d'acceptation :**
  - Tunnel de commande en plusieurs étapes claires
  - Sélection adresse de livraison (enregistrée ou nouvelle)
  - Choix du mode de livraison
  - Choix du mode de paiement
  - Récapitulatif complet avant validation
  - Paiement sécurisé (3D Secure)
  - Confirmation avec numéro de commande

**US-023 : Consulter mes commandes**
- **En tant que** client
- **Je veux** voir l'historique de mes commandes
- **Afin de** suivre mes achats passés et en cours
- **Critères d'acceptation :**
  - Liste de toutes les commandes
  - Tri par date, statut
  - Détails de chaque commande accessibles
  - Statut visible (en préparation, expédiée, livrée)
  - Téléchargement de facture

**US-024 : Suivre une commande en cours**
- **En tant que** client
- **Je veux** suivre l'état d'avancement de ma commande
- **Afin de** savoir quand elle sera livrée
- **Critères d'acceptation :**
  - Statut en temps réel
  - Numéro de suivi transporteur si expédiée
  - Estimation de la date de livraison
  - Notifications par email à chaque étape
  - Historique des événements

**US-025 : Télécharger une facture**
- **En tant que** client
- **Je veux** télécharger mes factures
- **Afin de** les conserver pour ma comptabilité
- **Critères d'acceptation :**
  - Bouton de téléchargement visible
  - Format PDF
  - Nom du fichier : Facture_NumeroCommande_Date.pdf
  - Toutes les informations légales présentes

**US-026 : Recommander un produit**
- **En tant que** client
- **Je veux** racheter rapidement un produit déjà commandé
- **Afin de** gagner du temps
- **Critères d'acceptation :**
  - Bouton "Recommander" dans l'historique
  - Ajout direct au panier
  - Vérification de la disponibilité
  - Notification si produit plus disponible

#### Liste de Souhaits

**US-027 : Ajouter un produit à ma liste de souhaits**
- **En tant que** client
- **Je veux** sauvegarder des produits qui m'intéressent
- **Afin de** les retrouver facilement plus tard
- **Critères d'acceptation :**
  - Icône cœur visible sur chaque produit
  - Ajout/retrait d'un clic
  - Confirmation visuelle
  - Synchronisation sur tous mes appareils

**US-028 : Consulter ma liste de souhaits**
- **En tant que** client
- **Je veux** voir tous les produits sauvegardés
- **Afin de** décider lesquels acheter
- **Critères d'acceptation :**
  - Accès via menu ou header
  - Tous les produits avec images et prix
  - Indication si prix a baissé
  - Notification si produit en promo
  - Ajout rapide au panier

**US-029 : Recevoir une alerte prix**
- **En tant que** client
- **Je veux** être notifié si un produit de ma liste baisse de prix
- **Afin de** profiter des promotions
- **Critères d'acceptation :**
  - Option activable sur chaque produit
  - Email envoyé lors d'une baisse de prix
  - Notification dans l'espace client

#### Avis et Retours

**US-030 : Laisser un avis produit**
- **En tant que** client ayant acheté un produit
- **Je veux** donner mon avis
- **Afin de** partager mon expérience avec d'autres clients
- **Critères d'acceptation :**
  - Disponible uniquement après achat vérifié
  - Note de 1 à 5 étoiles
  - Commentaire texte (50-500 caractères)
  - Upload de photos (optionnel, max 3)
  - Modération avant publication

**US-031 : Demander un retour produit**
- **En tant que** client
- **Je veux** retourner un produit
- **Afin de** obtenir un remboursement ou échange
- **Critères d'acceptation :**
  - Option disponible sous 14 jours après livraison
  - Sélection des articles à retourner
  - Choix du motif (taille, défaut, autre)
  - Génération bon de retour PDF
  - Instructions de renvoi claires
  - Suivi du statut du retour

**US-032 : Contacter le service client**
- **En tant que** client
- **Je veux** poser une question sur ma commande
- **Afin de** obtenir de l'aide
- **Critères d'acceptation :**
  - Formulaire de contact accessible
  - Sélection du sujet (commande, produit, technique)
  - Référence commande pré-remplie si applicable
  - Accusé de réception par email
  - Réponse sous 48h maximum

---

### 6.3 Administrateur

#### Gestion Produits

**US-033 : Ajouter un nouveau produit**
- **En tant qu'** administrateur
- **Je veux** créer une fiche produit
- **Afin de** l'ajouter au catalogue du site
- **Critères d'acceptation :**
  - Formulaire complet avec tous les champs
  - Upload multiple d'images
  - Gestion des variantes (taille, couleur)
  - Définition du stock par variante
  - SEO : meta title, description, URL
  - Prévisualisation avant publication
  - Statut : brouillon ou publié

**US-034 : Modifier un produit existant**
- **En tant qu'** administrateur
- **Je veux** mettre à jour un produit
- **Afin de** corriger ou améliorer sa fiche
- **Critères d'acceptation :**
  - Accès rapide depuis la liste
  - Tous les champs modifiables
  - Historique des modifications
  - Sauvegarde automatique (brouillon)
  - Option de dépublication temporaire

**US-035 : Supprimer un produit**
- **En tant qu'** administrateur
- **Je veux** retirer un produit du catalogue
- **Afin de** ne plus le proposer à la vente
- **Critères d'acceptation :**
  - Demande de confirmation
  - Vérification si commandes en cours
  - Suppression ou archivage (historique)
  - Redirection 301 si SEO important

**US-036 : Gérer le stock**
- **En tant qu'** administrateur
- **Je veux** mettre à jour les quantités en stock
- **Afin de** refléter l'inventaire réel
- **Critères d'acceptation :**
  - Vue d'ensemble du stock
  - Modification rapide des quantités
  - Alertes si stock faible (< 5)
  - Import/export CSV pour mise à jour en masse
  - Historique des mouvements de stock

**US-037 : Créer une promotion**
- **En tant qu'** administrateur
- **Je veux** appliquer une réduction sur des produits
- **Afin de** booster les ventes
- **Critères d'acceptation :**
  - Sélection des produits concernés
  - Type : pourcentage ou montant fixe
  - Dates de début et fin
  - Application automatique
  - Badge "Promo" sur les fiches produits

**US-038 : Gérer les catégories**
- **En tant qu'** administrateur
- **Je veux** organiser les produits par catégories
- **Afin de** faciliter la navigation
- **Critères d'acceptation :**
  - Création/modification/suppression de catégories
  - Hiérarchie parent/enfant
  - Attribution d'images aux catégories
  - Ordre d'affichage modifiable (drag & drop)
  - SEO par catégorie

#### Gestion Commandes

**US-039 : Consulter les nouvelles commandes**
- **En tant qu'** administrateur
- **Je veux** voir les commandes en attente
- **Afin de** les traiter rapidement
- **Critères d'acceptation :**
  - Dashboard avec compteur de nouvelles commandes
  - Liste triée par date
  - Filtre par statut
  - Notification sonore/visuelle si nouvelle commande
  - Indicateur d'urgence si retard

**US-040 : Traiter une commande**
- **En tant qu'** administrateur
- **Je veux** gérer le cycle de vie d'une commande
- **Afin de** assurer sa livraison
- **Critères d'acceptation :**
  - Vue détaillée de la commande
  - Changement de statut simple
  - Ajout de notes internes
  - Impression bon de préparation
  - Génération étiquette d'expédition
  - Email automatique au client à chaque changement

**US-041 : Ajouter un numéro de suivi**
- **En tant qu'** administrateur
- **Je veux** renseigner le numéro de suivi transporteur
- **Afin que** le client puisse suivre son colis
- **Critères d'acceptation :**
  - Champ de saisie du numéro
  - Sélection du transporteur
  - Email automatique au client avec lien de suivi
  - Statut passé à "Expédiée"

**US-042 : Annuler une commande**
- **En tant qu'** administrateur
- **Je veux** annuler une commande
- **Afin de** gérer les cas exceptionnels
- **Critères d'acceptation :**
  - Demande de confirmation
  - Saisie du motif d'annulation
  - Remboursement automatique si déjà payée
  - Email au client
  - Stock remis à jour

**US-043 : Gérer les retours**
- **En tant qu'** administrateur
- **Je veux** traiter les demandes de retour
- **Afin de** satisfaire les clients
- **Critères d'acceptation :**
  - Liste des demandes de retour
  - Validation ou refus avec motif
  - Suivi de réception du colis
  - Traitement du remboursement
  - Remise en stock si produit OK

#### Gestion Clients

**US-044 : Consulter la liste des clients**
- **En tant qu'** administrateur
- **Je veux** voir tous les clients inscrits
- **Afin de** gérer la base client
- **Critères d'acceptation :**
  - Liste complète avec pagination
  - Recherche par nom, email
  - Filtres : date inscription, dernière commande
  - Export CSV
  - Nombre total de clients affiché

**US-045 : Consulter la fiche d'un client**
- **En tant qu'** administrateur
- **Je veux** voir les détails d'un client
- **Afin de** mieux le connaître et le servir
- **Critères d'acceptation :**
  - Informations personnelles
  - Historique complet des commandes
  - Total dépensé (LTV)
  - Dernière connexion
  - Notes internes
  - Option d'envoi d'email

**US-046 : Gérer les avis clients**
- **En tant qu'** administrateur
- **Je veux** modérer les avis laissés
- **Afin de** maintenir la qualité du contenu
- **Critères d'acceptation :**
  - Liste des avis en attente de validation
  - Détails de l'avis (note, texte, photos)
  - Validation ou refus avec motif
  - Possibilité de répondre à un avis
  - Signalement d'avis inappropriés

#### Statistiques et Rapports

**US-047 : Consulter le tableau de bord**
- **En tant qu'** administrateur
- **Je veux** voir les indicateurs clés
- **Afin de** suivre la performance du site
- **Critères d'acceptation :**
  - Chiffre d'affaires du jour/mois/année
  - Nombre de commandes
  - Panier moyen
  - Taux de conversion
  - Produits en rupture de stock
  - Nouveaux clients

**US-048 : Générer des rapports de ventes**
- **En tant qu'** administrateur
- **Je veux** créer des rapports détaillés
- **Afin d'** analyser les performances
- **Critères d'acceptation :**
  - Sélection de période
  - Graphiques d'évolution
  - Top produits vendus
  - Ventes par catégorie
  - Export PDF et Excel
  - Planification automatique (hebdo, mensuel)

**US-049 : Analyser le comportement client**
- **En tant qu'** administrateur
- **Je veux** comprendre comment les visiteurs naviguent
- **Afin d'** optimiser l'expérience
- **Critères d'acceptation :**
  - Pages les plus vues
  - Taux de rebond
  - Tunnel de conversion
  - Abandons de panier
  - Sources de trafic
  - Intégration Google Analytics

#### Configuration

**US-050 : Configurer les modes de paiement**
- **En tant qu'** administrateur
- **Je veux** gérer les moyens de paiement acceptés
- **Afin de** proposer les options adaptées
- **Critères d'acceptation :**
  - Activation/désactivation simple
  - Configuration des API (clés Stripe, PayPal)
  - Mode test et production
  - Vérification de la connexion
  - Ordre d'affichage modifiable

**US-051 : Configurer les modes de livraison**
- **En tant qu'** administrateur
- **Je veux** définir les options de livraison
- **Afin de** proposer plusieurs choix aux clients
- **Critères d'acceptation :**
  - Création de zones géographiques
  - Tarifs par zone et poids
  - Délais de livraison
  - Seuils de gratuité
  - Activation/désactivation temporaire

**US-052 : Personnaliser les emails**
- **En tant qu'** administrateur
- **Je veux** modifier les emails transactionnels
- **Afin de** les adapter à ma marque
- **Critères d'acceptation :**
  - Templates modifiables (HTML)
  - Variables dynamiques disponibles
  - Prévisualisation avant sauvegarde
  - Email de test envoyable
  - Restauration template par défaut

**US-053 : Gérer les codes promo**
- **En tant qu'** administrateur
- **Je veux** créer des codes promotionnels
- **Afin de** lancer des campagnes marketing
- **Critères d'acceptation :**
  - Code personnalisé ou généré
  - Type : pourcentage ou montant
  - Montant minimum de commande
  - Limite d'utilisation globale et par client
  - Date de validité
  - Statistiques d'utilisation

---

## 7. User Stories Techniques

### 7.1 Performance

**US-054 : Optimiser le chargement des images**
- **En tant que** développeur
- **Je veux** que les images soient optimisées automatiquement
- **Afin de** réduire le temps de chargement
- **Critères d'acceptation :**
  - Utilisation de next/image
  - Formats WebP/AVIF
  - Lazy loading automatique
  - Tailles responsive

**US-055 : Mettre en cache les données**
- **En tant que** développeur
- **Je veux** implémenter un système de cache
- **Afin de** améliorer les performances
- **Critères d'acceptation :**
  - Cache côté serveur (Redis)
  - Cache navigateur (Service Worker)
  - Invalidation intelligente
  - TTL configurables

### 7.2 Sécurité

**US-056 : Protéger contre les attaques**
- **En tant que** développeur
- **Je veux** sécuriser l'application
- **Afin de** protéger les données utilisateurs
- **Critères d'acceptation :**
  - Protection CSRF
  - Validation côté serveur
  - Rate limiting sur les API
  - Headers de sécurité (CSP, HSTS)
  - Sanitisation des entrées
  - Logs des actions sensibles

**US-057 : Gérer les sessions sécurisées**
- **En tant que** développeur
- **Je veux** gérer les sessions utilisateur de manière sécurisée
- **Afin de** éviter les vols de session
- **Critères d'acceptation :**
  - Tokens JWT sécurisés
  - Refresh tokens
  - Expiration automatique
  - Déconnexion sur inactivité
  - Stockage sécurisé

### 7.3 SEO

**US-058 : Optimiser pour les moteurs de recherche**
- **En tant que** développeur
- **Je veux** que le site soit bien référencé
- **Afin d'** attirer du trafic organique
- **Critères d'acceptation :**
  - Métadonnées dynamiques
  - URLs sémantiques
  - Schema.org markup
  - Sitemap XML généré automatiquement
  - Robots.txt configuré
  - Core Web Vitals optimisés

### 7.4 Accessibilité

**US-059 : Rendre le site accessible**
- **En tant que** développeur
- **Je veux** que le site soit accessible à tous
- **Afin de** respecter les normes WCAG 2.1
- **Critères d'acceptation :**
  - Navigation au clavier complète
  - Lecteurs d'écran supportés
  - Contraste suffisant (ratio 4.5:1)
  - Attributs ARIA appropriés
  - Formulaires avec labels clairs
  - Messages d'erreur explicites

### 7.5 Monitoring

**US-060 : Surveiller l'application**
- **En tant qu'** administrateur technique
- **Je veux** monitorer la santé de l'application
- **Afin de** détecter et résoudre rapidement les problèmes
- **Critères d'acceptation :**
  - Logs centralisés
  - Alertes en cas d'erreur
  - Métriques de performance
  - Suivi des transactions
  - Dashboard de monitoring
  - Uptime monitoring