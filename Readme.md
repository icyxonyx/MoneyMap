**MoneyMap** 💰
A personal finance tracking web application built with **React** and **Firebase**. MoneyMap lets users register, log in, and log out via Firebase Authentication, then record income and expense transactions to a Firebase Realtime Database, categorize them, and visualize spending and earning trends with interactive charts.

---

## Table of Contents

1. [Features](#features)
2. [Demo](#demo)
3. [Technology Stack](#technology-stack)
4. [Getting Started](#getting-started)

   * [Prerequisites](#prerequisites)
   * [Installation](#installation)
   * [Firebase Configuration](#firebase-configuration)
   * [Available Scripts](#available-scripts)
5. [Project Structure](#project-structure)
6. [Usage](#usage)

   * [Authentication Flow](#authentication-flow)
   * [Recording Transactions](#recording-transactions)
   * [Viewing & Filtering Transactions](#viewing--filtering-transactions)
   * [Statistics & Charts](#statistics--charts)
   * [Update Password & Settings](#update-password--settings)
7. [Deployment](#deployment)
8. [License](#license)

---

## Features ✨

* **User Registration & Sign-In**

  * Secure sign-up and login with **Firebase Authentication** (email / password).
  * “Forgot password” workflow included via Firebase.
  * Automatic email verification (users must verify before accessing main features).

* **Add & Manage Transactions**

  * **Income & Expense** entries: Each transaction records

    * **Date** (via `react-datepicker`)
    * **Amount** (positive for income, negative for expense)
    * **Category** (Food, Rent, Salary, Utilities, etc.)
    * **Note**/description (optional)
  * Transactions are stored in **Firebase Realtime Database**, under each user’s unique UID.

* **Daily & Filtered Views**

  * **DailyView**: Shows all transactions logged for the current day, in a scrollable list.
  * **FilterView**: Filter by **date range** and **category**—instantly updates the displayed list and totals.

* **Statistics & Charts**

  * **Category Totals** (Doughnut Chart): Visualizes share of each category over a selected period.
  * **Monthly Trends** (Bar Chart All Months): Displays total income vs. expense for each month across the year.
  * **CategoryTotalCard**: Shows numeric totals per category alongside percentage of overall spending.

* **User Verification & Security**

  * New users receive verification emails. Only verified users can view and add transactions.
  * **Protected routes** ensure unauthenticated or unverified users see only the sign-in / sign-up screens.

* **Profile & Settings**

  * Users can **Update Password** in “Settings.”
  * **Sign Out** button to end session securely.

* **Responsive UI**

  * Built with **Bootstrap 4** and custom CSS for mobile, tablet, and desktop support.
  * Icons from **Font Awesome** and lightweight **Trianglify** background patterns.

---

## Technology Stack 🛠️

* **React 16.x** (Create React App)
* **React Router 4.x** for client-side routing
* **Redux (if used)** or React Context (lightweight global state)
* **Firebase** (v4.x)

  * **Authentication** (email/password, password reset, email verification)
  * **Realtime Database** (storing transactions per user)
* **Chart.js 2.x** + **react-chartjs-2** for rendering interactive charts
* **Bootstrap 4** for layout & components
* **Font Awesome 4.7** for icons
* **Moment.js 2.x** for date parsing & formatting
* **react-datepicker** for date selection
* **react-color** for color pickers (if any custom category color tagging)
* **Trianglify** for background patterns
* **React-GA** for Google Analytics integration (optional)

---

## Getting Started 🚀

### Prerequisites ✅

1. **Node.js (v10 or higher)** and **npm** installed on your machine.
2. A **Firebase** project (set up at [https://console.firebase.google.com](https://console.firebase.google.com)).
3. **Firebase CLI** (optional, for deployment).

---

### Installation 📥

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/moneymap.git
   cd moneymap
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a `.env` file** at the project root (optional, but recommended for environment configuration). Instead of hard-coding Firebase config in source, you can define:

   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   REACT_APP_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   > **Note:** The code’s `src/firebase/firebase.js` file currently contains an empty `config` object. You may either copy those values into `firebase/firebase.js` directly or reference them via `process.env.REACT_APP_FIREBASE_*`.

4. **Update `src/firebase/firebase.js`**
   Open `src/firebase/firebase.js` and replace the placeholder empty fields with your Firebase config. For example:

   ```js
   const config = {
     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
     databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
     appId: process.env.REACT_APP_FIREBASE_APP_ID,
     measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
   };
   ```

---

### Available Scripts 📜

From the project root (`/moneymap`), you can run:

* **`npm start`**
  Runs the app in development mode (port 3000).
  Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

* **`npm run build`**
  Builds the app for production to the `build/` folder.
  Bundles React in production mode and optimizes the build for best performance.

* **`npm test`**
  Launches the test runner (if tests are configured).

* **`npm run eject`**
  *Note: This is a one-way operation. Use only if you need to customize the build setup beyond CRA defaults.*

---

## Project Structure 📂

```
moneymap/
├── package.json
├── package-lock.json
├── public/
│   ├── 404.html
│   ├── index.html
│   ├── manifest.json
│   ├── favicon.ico
│   └── icons/…           # various social icons & Android icons
│
└── src/
    ├── index.js           # ReactDOM.render, wraps <App /> in BrowserRouter
    ├── registerServiceWorker.js
    ├── App.js             # Defines top-level routes & ProtectedRoute logic
    │
    ├── constants/
    │   └── routes.js       # All route paths (e.g., '/', '/signin', '/signup', '/statistics')
    │
    ├── firebase/           # Firebase initialization & helpers
    │   ├── firebase.js      # Initializes Firebase app instance
    │   ├── auth.js          # Auth helper methods (signIn, signUp, signOut, passwordReset)
    │   └── db.js            # Realtime Database methods (createTransaction, fetchTransactions, etc.)
    │
    ├── components/         # All React components, organized by feature
    │   ├── Common/
    │   │   ├── ProtectedRoute.js   # HOC: redirects to SignIn if no valid user
    │   │   └── Spinner.js          # Global loading spinner
    │   │
    │   ├── signUp/
    │   │   └── index.js            # Registration form (name, email, password)
    │   │
    │   ├── signIn/
    │   │   └── index.js            # Login form (email, password)
    │   │
    │   ├── SignOut/
    │   │   └── index.js            # “Sign Out” button (calls Firebase signOut)
    │   │
    │   ├── UserVerification/
    │   │   └── index.js            # If user is not email-verified, prompt them to verify
    │   │
    │   ├── DailyView/
    │   │   └── index.js            # List of today’s transactions (date = today)
    │   │
    │   ├── FilterView/
    │   │   └── index.js            # Date-range + category filters, then show results
    │   │
    │   ├── Statistics/
    │   │   ├── BarChartAllMonths.js     # Bar chart of monthly totals (income/expense)
    │   │   ├── DoughnutChartCategory.js # Doughnut chart for category breakdown
    │   │   ├── CategoryTotalCard.js     # Numeric totals per category
    │   │   └── index.js                 # Parent wrapper that pulls data & renders charts
    │   │
    │   ├── Settings/
    │   │   ├── index.js           # “Update Password” form & any other settings (e.g., theme)
    │   │   └── UpdatePassword.js  # Form: current password, new password, confirm password
    │   │
    │   └── Statistics/… (covered above)
    │
    └── assets/               # Static images used in Settings (e.g., `man.png`)
```

---

## Usage 📖

After completing the **Getting Started** steps (install dependencies and configure Firebase), run:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Authentication Flow 🔐

1. **Sign Up** (`/signup`)

   * Enter **Name**, **Email**, **Password**, and **Confirm Password**.
   * On successful submission, Firebase sends a **verification email**.
   * User is prompted to verify their email before proceeding.

2. **Email Verification** (`/userverification`)

   * After sign-up, users land on “User Verification” page.
   * Instructs them to check their inbox and click the verification link.
   * Once verified, reload or re-log in to access the main app.

3. **Sign In** (`/signin`)

   * Enter **Email** and **Password**.
   * On successful login, the user’s UID is stored in local state (and optionally in `localStorage`).
   * Protected routes become accessible (All pages except `/signin`, `/signup`, `/404`).

4. **Sign Out** (`/signout`)

   * Click “Sign Out” to terminate the Firebase session.
   * User is redirected to `/signin`.

---

### Recording Transactions 📝

* Navigate to the **Root** (`/`) or **Home** route after signing in.
* On the home page (or a dedicated “New Transaction” section), fill out the form:

  1. **Date**: Pick a date using the date picker (defaults to today).
  2. **Amount**: Positive (income) or negative (expense) numeric value.
  3. **Category**: Select from predefined categories (e.g., Food, Rent, Salary, Entertainment).
  4. **Note** (optional): A short description of the transaction.
* Click **“Add Transaction”** (button).

  * Data is pushed to Firebase Realtime Database under:

    ```
    /users/{uid}/transactions/{transactionId} → { date, amount, category, note, timestamp }
    ```

---

### Viewing & Filtering Transactions 📋

#### **DailyView** (`/dailyview`)

* Displays all transactions where `date = today`.
* Shows a simple scrollable list: date, category, amount, and note.
* Totals up today’s **income** and **expenses**.

#### **FilterView** (`/filterview`)

* Choose a **start date** and **end date** using two date pickers.
* (Optional) Choose one or multiple **categories** from a dropdown.
* Click **“Apply Filters”**.

  * The list refreshes to show only transactions that fall within the selected date range and match selected categories.
  * Updates the total amount at the top.

---

### Statistics & Charts 📊

#### **Category Breakdown (Doughnut)** (`/statistics`)

* Renders a **Doughnut Chart** showing the percentage share of each category over all recorded transactions (or filtered set).
* Also shows a table of **CategoryTotalCard** components, each displaying:

  * Category name
  * Total amount spent or earned in that category
  * Percentage of overall total

#### **Monthly Trends (Bar Chart)** (`/statistics`)

* Renders a **Bar Chart** with 12 bars (one per month).
* Each bar shows two values stacked or side by side: **total income** and **total expense** for that month.
* Hovering over a bar reveals exact figures via Chart.js tooltips.

---

### Update Password & Settings ⚙️

1. **Settings** (`/settings`)

   * Click **“Settings”** in the navigation bar.
   * Under Settings, you see a form to **“Update Password”**.

2. **Update Password** (`UpdatePassword.js`)

   * Enter **Current Password**, **New Password**, and **Confirm New Password**.
   * Click **“Change Password”**.
   * On success, the user is alerted that their password was updated in Firebase.
   * On failure (e.g., wrong current password), an error message is shown.

---

## Deployment 🌐

To deploy MoneyMap in production, you can use any static-hosting service (Netlify, Vercel, GitHub Pages) since it’s a client-only app that communicates with Firebase:

1. **Build the app**

   ```bash
   npm run build
   ```

   This outputs a `build/` folder containing static assets.

2. **Deploy `build/` to your hosting provider**

   * **Netlify:** Drag-and-drop the `build/` folder onto Netlify or connect your repo and set the build command to `npm run build` with `build/` as your publish directory.
   * **Vercel:** Run `vercel` in the project root and follow prompts (it auto-detects Create React App).
   * **GitHub Pages:** Install `gh-pages` and add:

     ```json
     // package.json
     "homepage": "https://<your-username>.github.io/moneymap",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     }
     ```

     Then run `npm run deploy`.

3. **Configure Firebase rules (Production)**
   In your Firebase console, set appropriate Realtime Database rules so that only authenticated users can read/write their own transactions. For example:

   ```json
   {
     "rules": {
       "users": {
         "$uid": {
           ".read": "auth != null && auth.uid === $uid",
           ".write": "auth != null && auth.uid === $uid"
         }
       }
     }
   }
   ```

4. **Environment Variables**
   Ensure your deployed environment has the correct `REACT_APP_FIREBASE_*` variables (Netlify & Vercel let you set those in their dashboards).

## License 📄

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
