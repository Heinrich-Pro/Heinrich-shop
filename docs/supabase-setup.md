# Configuration Supabase pour Heinrich Shop

Ce guide vous explique comment configurer Supabase pour votre projet Heinrich Shop.

## Prérequis

- Un compte Supabase (créez-en un sur [supabase.com](https://supabase.com))
- Node.js et pnpm installés

## Étape 1: Créer un Projet Supabase

1. Connectez-vous à [supabase.com](https://supabase.com)
2. Cliquez sur "New Project"
3. Choisissez un nom pour votre projet (ex: `heinrich-shop`)
4. Définissez un mot de passe de base de données sécurisé
5. Choisissez une région proche de vos utilisateurs
6. Cliquez sur "Create new project"

## Étape 2: Obtenir les Clés API

1. Dans le dashboard Supabase, allez dans **Settings** > **API**
2. Copiez les valeurs suivantes:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** key
   - **service_role** key (gardez-la secrète!)

3. Mettez à jour votre fichier `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Étape 3: Exécuter les Migrations

### Option A: Via le SQL Editor (Recommandé)

1. Dans le dashboard Supabase, allez dans **SQL Editor**
2. Créez une nouvelle query
3. Copiez le contenu de `supabase/migrations/001_initial_schema.sql`
4. Exécutez la query (Run)
5. Répétez avec `supabase/migrations/002_rls_policies.sql`

### Option B: Via la CLI Supabase (Avancé)

```bash
# Installer la CLI Supabase
npm install -g supabase

# Se connecter
supabase login

# Lier votre projet
supabase link --project-ref xxxxx

# Pousser les migrations
supabase db push
```

## Étape 4: Configurer l'Authentification

### Activer l'Email/Password

1. Allez dans **Authentication** > **Providers**
2. **Email** devrait être activé par défaut
3. Configurez les paramètres:
   - **Confirm email**: Activé (recommandé pour la production)
   - **Email templates**: Personnalisez les emails si nécessaire

### Configurer OAuth (Optionnel)

#### Google OAuth

1. Allez dans [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez-en un
3. Activez l'**OAuth API**
4. Créez des identifiants OAuth 2.0:
   - **Application type**: Web application
   - **Authorized redirect URIs**: `https://xxxxx.supabase.co/auth/v1/callback`
5. Copiez le **Client ID** et **Client Secret**
6. Dans Supabase:
   - **Authentication** > **Providers** > **Google**
   - Activez Google
   - Collez Client ID et Client Secret
   - Sauvegardez

#### Facebook OAuth

1. Allez sur [Facebook Developers](https://developers.facebook.com/)
2. Créez une nouvelle app ou sélectionnez-en une
3. Ajoutez le produit **Facebook Login**
4. Configurez les **Valid OAuth Redirect URIs**: `https://xxxxx.supabase.co/auth/v1/callback`
5. Copiez l'**App ID** et **App Secret**
6. Dans Supabase:
   - **Authentication** > **Providers** > **Facebook**
   - Activez Facebook
   - Collez App ID et App Secret
   - Sauvegardez

### URLs de Redirection

Dans **Authentication** > **URL Configuration**, ajoutez:

- **Site URL**: `http://localhost:3000` (développement) ou votre domaine de production
- **Redirect URLs**: 
  - `http://localhost:3000/auth/callback`
  - `https://votre-domaine.com/auth/callback` (production)

## Étape 5: Installer les Dépendances

Dans votre terminal, dans le répertoire du projet:

```bash
pnpm add @supabase/supabase-js @supabase/ssr
```

## Étape 6: Tester l'Installation

1. Démarrez votre serveur de développement:
```bash
pnpm run dev
```

2. Naviguez vers `http://localhost:3000/auth/inscription`
3. Créez un compte test
4. Vérifiez dans **Authentication** > **Users** de votre dashboard Supabase

## Structure de la Base de Données

Les tables suivantes ont été créées:

- **users**: Profils utilisateurs (lié à auth.users)
- **categories**: Catégories de produits
- **products**: Produits du catalogue
- **product_variants**: Variantes de produits
- **orders**: Commandes
- **order_items**: Lignes de commande
- **addresses**: Adresses utilisateurs
- **reviews**: Avis clients

## Row Level Security (RLS)

Toutes les tables ont des politiques RLS activées pour garantir la sécurité:

- Les utilisateurs ne peuvent voir que leurs propres données (commandes, adresses, etc.)
- Les produits publiés sont visibles par tous
- Seuls les admins peuvent gérer les produits et catégories
- Les avis vérifiés sont publics

## Prochaines Étapes

1. **Seed Data** (Optionnel): Ajoutez des données de test pour les catégories et produits
2. **Configuration Email**: Personnalisez les templates d'email dans Supabase
3. **Production**: Mettez à jour les URLs dans `.env` avec vos valeurs de production

## Troubleshooting

### "Invalid API key"
- Vérifiez que les clés dans `.env` sont correctes
- Redémarrez votre serveur de développement

### "User already registered"
- Un compte existe déjà avec cet email
- Utilisez la fonctionnalité de connexion

### OAuth ne fonctionne pas
- Vérifiez que les redirect URIs sont exactement configurées
- Assurez-vous que les clés OAuth sont correctes

## Support

- [Documentation Supabase](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Next.js + Supabase Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
