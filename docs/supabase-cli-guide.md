# Guide de Connexion Supabase CLI

Ce guide vous aide à installer et configurer Supabase CLI sur WSL.

## 📦 Étape 1: Installation de Supabase CLI

Ouvrez votre terminal WSL et exécutez ces commandes:

```bash
# Télécharger la dernière version de Supabase CLI
curl -o supabase-cli.deb https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.deb

# Installer le package
sudo dpkg -i supabase-cli.deb

# Nettoyer le fichier téléchargé
rm supabase-cli.deb

# Vérifier l'installation
supabase --version
```

Vous devriez voir la version de Supabase CLI s'afficher.

## 🔐 Étape 2: Se Connecter à Supabase

```bash
supabase login
```

Cette commande va:
1. Ouvrir votre navigateur automatiquement
2. Vous demander de vous connecter à votre compte Supabase
3. Générer un token d'accès
4. Stocker le token localement

**Si le navigateur ne s'ouvre pas automatiquement**, copiez l'URL affichée dans le terminal et ouvrez-la manuellement.

## 🎯 Étape 3a: Créer un Nouveau Projet (Si vous n'en avez pas)

```bash
# Aller dans le répertoire du projet
cd /mnt/c/Users/LENOVO/OneDrive/Documents/Projet/heinrich_shop

# Initialiser Supabase dans le projet
supabase init

# Créer un nouveau projet sur Supabase (interactif)
supabase projects create heinrich-shop --org-id <votre-org-id>
```

Pour trouver votre `org-id`:
```bash
supabase orgs list
```

## 🔗 Étape 3b: Lier un Projet Existant (Si vous avez déjà créé un projet)

```bash
# Aller dans le répertoire du projet
cd /mnt/c/Users/LENOVO/OneDrive/Documents/Projet/heinrich_shop

# Initialiser Supabase (si pas déjà fait)
supabase init

# Lister vos projets
supabase projects list

# Lier votre projet (remplacez xxxxx par votre Project Reference ID)
supabase link --project-ref xxxxx
```

**Pour trouver votre Project Reference ID:**
1. Allez sur https://supabase.com/dashboard
2. Sélectionnez votre projet
3. Settings > General
4. Copiez le "Reference ID"

Ou utilisez la commande:
```bash
supabase projects list
```

## 📤 Étape 4: Pousser les Migrations

Une fois lié, poussez vos migrations vers Supabase:

```bash
# Pousser toutes les migrations
supabase db push

# Ou pousser les migrations une par une
supabase db push --path supabase/migrations/001_initial_schema.sql
supabase db push --path supabase/migrations/002_rls_policies.sql
```

## ✅ Étape 5: Vérifier la Configuration

```bash
# Voir le statut de votre projet
supabase status

# Voir la configuration actuelle
supabase projects list

# Tester la connexion à la base de données
supabase db reset --debug
```

## 🔍 Commandes Utiles

### Générer les types TypeScript
```bash
supabase gen types typescript --project-id xxxxx > src/types/database.types.ts
```

### Tester localement (optionnel)
```bash
# Démarrer Supabase localement avec Docker
supabase start

# Arrêter Supabase local
supabase stop
```

### Gérer les migrations
```bash
# Créer une nouvelle migration
supabase migration new nom_de_la_migration

# Voir l'historique des migrations
supabase migration list

# Appliquer les migrations
supabase db push
```

## 🚨 Résolution de Problèmes

### "command not found: supabase"
Redémarrez votre terminal WSL après l'installation.

### "You are not logged in"
Exécutez à nouveau `supabase login`.

### "Project not linked"
Vérifiez que vous êtes dans le bon répertoire et exécutez `supabase link`.

### Erreur lors du push des migrations
Vérifiez que votre base de données est vide ou utilisez:
```bash
supabase db reset
```

## 📚 Ressources

- [Documentation Supabase CLI](https://supabase.com/docs/guides/cli)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [Guide des Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)

## 🎬 Ordre d'Exécution Recommandé

Voici l'ordre exact des commandes à exécuter:

```bash
# 1. Installer CLI
curl -o supabase-cli.deb https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.deb
sudo dpkg -i supabase-cli.deb
rm supabase-cli.deb

# 2. Se connecter
supabase login

# 3. Aller dans le projet
cd /mnt/c/Users/LENOVO/OneDrive/Documents/Projet/heinrich_shop

# 4. Initialiser Supabase
supabase init

# 5. Lister vos projets pour trouver le ref
supabase projects list

# 6. Lier le projet (remplacez xxxxx)
supabase link --project-ref xxxxx

# 7. Pousser les migrations
supabase db push

# 8. Vérifier
supabase status
```

Bonne chance ! 🚀
