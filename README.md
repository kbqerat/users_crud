# UserManager — CRUD Utilisateurs Full Stack

Application web full stack de gestion d'utilisateurs, construite avec **Node.js / Express** côté backend et du **Vanilla JS** côté frontend, avec **Firebase Firestore** comme base de données.

---

## Aperçu

![UserManager](https://img.shields.io/badge/Stack-Node.js%20%2B%20Express%20%2B%20Firebase-informational?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

---

## Fonctionnalités

### Gestion des utilisateurs
- **CRUD complet** — Créer, lire, mettre à jour et supprimer des utilisateurs
- **Champs** : Nom, Email, Âge (1–120), Genre (Masculin / Féminin)
- **Vérification email en temps réel** — Contrôle côté backend à la saisie et à la soumission (prévention des doublons)
- **Confirmation de suppression** — Dialogue avec le nom de l'utilisateur avant suppression
- **Archivage (soft delete)** — Archiver un utilisateur sans le supprimer définitivement, avec possibilité de restauration

### Tableau de bord & Statistiques
- **6 cartes de stats** : Total, Hommes, Femmes, Âge moyen, Plus jeune, Plus âgé
- **Animation des compteurs** — Les chiffres s'animent au chargement avec un easing fluide
- **Graphiques interactifs** (Chart.js) :
  - Donut — Répartition Hommes / Femmes
  - Barres — Distribution des tranches d'âge
- **Utilisateurs récents** — Les 5 derniers ajouts affichés en sidebar

### Recherche & Filtres
- **Recherche** par nom ou email (temps réel)
- **Filtre par genre** — Tous / Masculin / Féminin
- **Filtre par tranche d'âge** — Double slider min/max (1–120 ans)
- **Tri** sur toutes les colonnes (nom, email, genre, âge, date)
- **Pagination** avec sélecteur de lignes par page (5, 10, 25, 50)

### Import / Export
- **Export CSV** — Téléchargement de la liste complète filtrée
- **Export PDF** — Tableau formaté avec en-tête, pied de page et numéros de page (jsPDF)
- **Import CSV en masse** — Glisser-déposer ou sélection de fichier, prévisualisation des lignes avant import

### Interface & UX
- **Mode sombre / clair** — Bascule avec persistance en localStorage
- **Design responsive** — Table sur desktop, cartes sur mobile (< 768 px)
- **Skeleton loader réaliste** — Placeholder animé qui reproduit la structure exacte des lignes du tableau
- **Onboarding** — Guide de bienvenue en 5 étapes (première visite uniquement, stocké en localStorage)
- **Journal d'activité** — Historique des actions récentes (localStorage)
- **Raccourcis clavier** :
  | Touche | Action |
  |--------|--------|
  | `/` | Focus la recherche |
  | `N` | Ouvrir le formulaire (mobile) |
  | `D` | Basculer le mode sombre |
  | `?` | Afficher les raccourcis |
  | `Esc` | Fermer le formulaire |
- **Toasts** — Notifications de succès / erreur non intrusives

---

## Stack technique

| Côté | Technologie |
|------|-------------|
| Backend | Node.js, Express.js |
| Base de données | Firebase Firestore (Admin SDK) |
| Frontend | HTML5, CSS3, Vanilla JS |
| Graphiques | Chart.js |
| Export PDF | jsPDF + jsPDF-AutoTable |
| Icons | Font Awesome 6.5 |
| Fonts | Google Fonts — Inter |

---

## Structure du projet

```
user-crud-api/
├── public/
│   ├── index.html        # Interface utilisateur
│   ├── style.css         # Styles (thème clair/sombre, responsive)
│   └── app.js            # Logique frontend (fetch, rendu, filtres, charts…)
├── src/
│   ├── index.js          # Point d'entrée Express
│   ├── firebase.js       # Initialisation Firebase Admin SDK
│   ├── routes/
│   │   └── users.js      # Définition des routes REST
│   ├── controllers/
│   │   └── userController.js  # Logique métier
│   └── models/
│       └── userModel.js  # Accès Firestore
├── .env                  # Variables d'environnement (non commité)
├── serviceAccountKey.json  # Clé Firebase (non commité)
├── test-import.csv       # Fichier CSV de test (10 utilisateurs)
└── package.json
```

---

## API REST

| Méthode | Route | Description |
|---------|-------|-------------|
| `GET` | `/api/users` | Liste tous les utilisateurs (non archivés) |
| `GET` | `/api/users/:id` | Détail d'un utilisateur |
| `POST` | `/api/users` | Créer un utilisateur |
| `PUT` | `/api/users/:id` | Mettre à jour un utilisateur |
| `DELETE` | `/api/users/:id` | Supprimer un utilisateur |
| `PATCH` | `/api/users/:id/archive` | Archiver un utilisateur |
| `PATCH` | `/api/users/:id/restore` | Restaurer un utilisateur archivé |
| `GET` | `/api/users/archived` | Liste des utilisateurs archivés |
| `GET` | `/api/users/check-email` | Vérifier si un email existe déjà |
| `GET` | `/api/users/stats` | Statistiques agrégées |

---

## Installation & Lancement

### Prérequis
- Node.js ≥ 18
- Un projet Firebase avec Firestore activé

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-utilisateur/user-crud-api.git
cd user-crud-api
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer Firebase

1. Aller sur [Firebase Console](https://console.firebase.google.com)
2. Créer un projet et activer **Firestore Database**
3. Aller dans **Paramètres du projet → Comptes de service → Générer une nouvelle clé privée**
4. Sauvegarder le fichier JSON sous `serviceAccountKey.json` à la racine du projet

### 4. Configurer les variables d'environnement

Créer un fichier `.env` à la racine :

```env
FIREBASE_SERVICE_ACCOUNT_PATH=./serviceAccountKey.json
```

### 5. Lancer l'application

```bash
# Développement (avec rechargement automatique)
npm run dev

# Production
npm start
```

L'application est accessible sur [http://localhost:3000](http://localhost:3000)

---

## Fichier CSV de test

Un fichier `test-import.csv` est inclus avec 10 utilisateurs pré-remplis pour tester la fonctionnalité d'import en masse.

Format attendu par l'import :

```csv
nom,email,age,genre
Ahmed Benali,ahmed.benali@gmail.com,28,Masculin
Sara Moussaoui,sara.moussaoui@outlook.fr,24,Féminin
```

---

## Variables d'environnement

| Variable | Description |
|----------|-------------|
| `FIREBASE_SERVICE_ACCOUNT_PATH` | Chemin vers le fichier de clé de service Firebase |
| `PORT` | Port du serveur (défaut : `3000`) |

---

## .gitignore recommandé

```
node_modules/
.env
serviceAccountKey.json
```

---

## Auteur

Développé dans le cadre d'un test technique pour un stage PFE.
