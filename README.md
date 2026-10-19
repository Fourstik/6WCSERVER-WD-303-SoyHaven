# SoyHaven

**A restaurant finder for Pampanga, built with the MEVN stack (MongoDB, Express.js, Vue.js, Node.js).**

A WCSERVER (6WCSERVER) final project of Holy Angel University, School of Computing, section WD-303.

- **Live site:** https://soyhaven.vercel.app/
- **Figma mockup:** https://www.figma.com/design/15VdWKXCtV6AHSjv7EeOZD/WCSERVER-MOCKUP?node-id=0-1&t=vPN1DoKyCh2z0YwV-1
- **Video presentation and demonstration:** _link to be added_

---

## Introduction

SoyHaven is a website-based restaurant catalogue that helps users discover restaurants around Pampanga, mainly in Angeles City, Clark, San Fernando, and Mabalacat. The system gives users a centralized place to explore restaurants based on different cuisines, locations, and ratings.

The website features an introduction to the site, highlights featured restaurants, and provides shortcuts to browse by dish type and location. The Browse page lets users see all restaurant listings and apply filters, sorting, and search. Finally, an About page presents the purpose of the site, its technology stack, and the development team.

SoyHaven also includes an admin panel that allows only authorized administrators to create, edit, search, and delete restaurant records. The system uses Vue.js for the frontend, Express.js and Node.js for backend API operations, and MongoDB for storing restaurant information.

The name comes from *"soy,"* a Kapampangan term of address for a friend or companion, plus *"haven,"* a place where you feel at home. The idea is for the site to work like the recommendation a friend gives you when you ask where to eat.

## Problems Addressed

- **Difficulty in locating restaurants:** visitors may have trouble finding restaurants that match their food preferences and preferred locations, since the information is spread across multiple platforms.
- **Limited filtering and search features:** with no platform that acts as a centralized catalogue, users may need to keep switching between tabs and browsing manually to find restaurants by cuisine, location, or rating.
- **Disorganized restaurant details:** restaurant information can be hard to browse and compare when it is not organized neatly.
- **Maintaining restaurant records:** managing records can be ineffective when many restaurants need to be added, updated, or deleted.

## Objectives

The primary goal of this project is to develop a MEVN-stack web application that gives diners a centralized, easy-to-use catalogue of restaurants in four areas of Pampanga: Angeles City, Clark, San Fernando, and Mabalacat. Specifically, the project aims to:

- Build a responsive Vue.js frontend with four pages (Home, Browse, About, and Admin) that is easy to navigate on both desktop and mobile.
- Let users search restaurants by name and filter them by cuisine, location, and rating, with sorting and grid or list views.
- Present restaurant details in a clean, organized format so users can quickly compare options in one place.
- Develop a RESTful API using Express.js and Node.js that handles all restaurant data requests.
- Store and manage restaurant records in MongoDB Atlas so the data is always available and consistent.
- Provide a password-protected admin panel where authorized administrators can add, edit, search, and delete restaurant records.
- Apply the complete MEVN workflow, from database design to deployment, as part of the course requirements.

## Features

- **Home:** introduction, featured restaurants, and shortcuts to browse by cuisine and location.
- **Browse:** search by name, filter by cuisine, location, and rating, sort results, and switch between grid and list views.
- **About:** project background, technology stack, and the development team.
- **Admin:** password-protected page for adding, editing, searching, and deleting restaurant records.

## Tech Stack

| Layer | Technology |
|---|---|
| Database | MongoDB Atlas, with Mongoose |
| Backend | Node.js and Express.js (REST API) |
| Frontend | Vue.js 3, Vue Router, and Vite |
| Hosting | Vercel (frontend and backend as separate projects) |

## Project Structure

```
SoyHaven/
├── backend/     Express API (routes, models, middleware)
└── frontend/    Vue.js app (pages, components, router)
```

## Running Locally

**Requirements:** Node.js (LTS version), npm, and a MongoDB Atlas database.

### 1. Clone the repository

```bash
git clone https://github.com/Fourstik/6WCSERVER-WD-303-SoyHaven.git
cd 6WCSERVER-WD-303-SoyHaven
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a file named `.env` inside the `backend` folder with these variables:

```
MONGODB_URI=your-mongodb-atlas-connection-string
ADMIN_PASSWORD=your-admin-password
PORT=3000
```

Make sure your IP address is allowed under **Network Access** in MongoDB Atlas. Then start the server:

```bash
npm start
```

The API runs at `http://localhost:3000`.

### 3. Set up the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the address shown in the terminal, usually `http://localhost:5173`.

> The `.env` file holds private credentials and is excluded from the repository. Never commit it.

## API Overview

| Method | Route | Description |
|---|---|---|
| GET | `/api/restaurants` | List restaurants |
| GET | `/api/restaurants/cuisines` | List available cuisines |
| POST | `/api/admin/login` | Verify the admin password |

Creating, editing, and deleting restaurants also go through `/api/restaurants` and require the admin password.

## Deployment

The app is deployed on Vercel as two projects from this repository: the Express backend (root directory `backend`) and the Vue frontend (root directory `frontend`). The frontend forwards `/api` requests to the backend through a rewrite rule in `frontend/vercel.json`. The backend reads `MONGODB_URI` and `ADMIN_PASSWORD` from Vercel environment variables.

## Team

| Member | Nickname | Role |
|---|---|---|
| Almariego, James Michael E. | Jam | Vue.js Developer & Frontend Contributor |
| Incognito, Rich Cristoff C. | Fourstik | Project Leader & Full Stack Developer |
| Jose, Adrian Meldrich C. | Don Mel | UI/UX Lead & Creative Director |
| Montoya, Dohn Diehllon Djan D. | D3 | Systems Analyst & QA |

**Submitted to:** Prof. Rene Jr. D. Laguna, Faculty-in-Charge
**Course:** Web Server and Client Services (6WCSERVER), October 2026
