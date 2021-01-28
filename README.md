# django-react-postgres-boilerplate

## Prerequisites
Install Docker Desktop

## Installation

There are 3 .env files provided. Note in particular the .env files in backend/ and postgres/; there, you can adjust the database credentials, debug mode, secret key, allowed hosts, etc. Things should run just fine without any changes, but just know these files are there.

The included sample helloyou django app can be easily removed by removing 'helloyou' from INSTALLED_APPS in django mainapp/settings.py, removing the associated helloyou path in mainapp/urls.py and deleting the entire helloyou folder. On the frontend, delete/replace the contents of Home.tsx.

Change the boilerplate app name (shown in header and footer) by changing the constant APP_NAME in frontend/src/settings.tsx.

The left navigation bar (intially shown on the left with only the Home icon upon login) is auto-generated along with the associated Router's private routes. These routes can be easily added/modified in routes/Routes.ts.

The Material UI Theme can be adjusted in frontend\src\Theme.tsx

**_NOTE: If you change your database name/credentials, but have already run the steps below, you may need to delete the associated postgres docker image in order to get things to work._**


For development mode without NGINX server, run the following command:

```sh
docker-compose -f "docker-compose.dev.yml" up -d --build
```
The react frontend should be available at `http://localhost:3000/` and django backend at `http://localhost:8000/` (django admin at `http://localhost:8000/admin/`). This mode supports both react hot reloading and django auto-refresh with changes.

For development with the NGINX server run:
```sh
docker-compose -f "docker-compose.yml" up -d --build
```
The server should be available at `http://127.0.0.1/`. This mode will not hot reload since it's running a production build (npm build).


**_NOTE: This repo is still largely a work in progress, but it should be a good starting point. Suggestions/feedback in discussions tab are greatly appreciated._**

**TODO:**
- [ ] Backend Testing
- [ ] Frontend Testing (React Testing Library)
- [x] Readme (setup and how to remove remnants of dummy stuff)
- [x] Material UI Theme
- [ ] Auto redirect to login with Failed Request
- [x] Auto Generation of Left Nav based on Routes?
- [x] Fix NGINX Docker Compose
- [ ] Axios Interfaces
- [ ] Update and Pin versions (remove anything unused)
- [x] fix django admin not serving css files on admin page
- [x] error context
- [x] show password errors
- [x] loading icon on login
- [ ] forgot password functionality (email)
- [ ] add logo holder
- [ ] ability to customize background on login
- [ ] Add support for sub-routes off the main left-nav routes
