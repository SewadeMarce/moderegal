# 🛍️ e-commerce Next.js

Plateforme e-commerce complète développée avec Next.js, React et TypeScript. Application moderne avec gestion complète du panier, authentification, profil utilisateur et paiements multi-passerelle.

## Installation

```bash
npm install
```

## 🚀 Démarrage

### Installation

```bash
npm install
```

### Développement

```bash
npm run dev
```

Accédez à `http://localhost:3000` dans votre navigateur.

### Production

```bash
npm run build
npm start
```

## 📁 Structure du Projet

```
├── app/                    # Routes et pages Next.js
│   ├── (app)/            # Routes principales de l'application
│   ├── auth/             # Pages d'authentification
│   ├── dashboard/        # Dashboard utilisateur
│   ├── payment/          # Intégration des paiements
│   └── admin/            # Interface d'administration
├── components/           # Composants réutilisables
│   ├── ui/              # Composants d'interface utilisateur
│   ├── (app)/           # Composants spécifiques à l'app
│   ├── auth/            # Composants d'authentification
│   ├── dashboard/       # Composants du dashboard
│   └── payement/        # Composants de paiement
├── context/             # Context React (panier, etc.)
├── lib/                 # Utilitaires et intégrations
│   ├── actions/         # Server actions Next.js
│   ├── data/            # Requêtes et accès aux données
│   ├── utils/           # Fonctions utilitaires
│   └── db.ts            # Configuration base de données
├── types/               # Définitions TypeScript
├── public/              # Ressources statiques
└── script/              # Scripts de base de données
```

## ⚙️ Configuration

Assurez-vous de configurer les variables d'environnement suivantes :

```env
# Stripe
STRIPE_PUBLIC_KEY=votre_clé_publique_stripe
STRIPE_SECRET_KEY=votre_clé_secrète_stripe

# Kkiapay
KKIAPAY_PUBLIC_KEY=votre_clé_publique_kkiapay
KKIAPAY_SECRET_KEY=votre_clé_secrète_kkiapay

# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce

# JWT
JWT_SECRET=votre_secret_jwt
```

## 📝 Notes Techniques

- ⚡ **Next.js 16** avec le système App Router moderne
- 🎨 **Tailwind CSS 4** pour un styling rapide et cohérent
- 🔐 **Protection des routes** avec authentification JWT
- 💰 **Double intégration de paiement** : Stripe + Kkiapay
- 📱 **Design responsive** adapté à tous les appareils
- 🚀 **Performance optimisée** avec SSR/SSG de Next.js