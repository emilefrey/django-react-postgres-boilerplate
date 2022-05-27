# django-react-postgres-boilerplate

## Prerequisites
Install Docker Desktop

## Installation

**_Make sure backend\entrypoint.sh has LF format and not CRLF format_**

You shouldn't have to make any other changes to get the app up and running, but here's some things to note:

- The default login credentials are admin and admin_password. These can be changed in backend/.env.

- There are 3 .env files provided. Note in particular the .env files in backend/ and postgres/; there, you can adjust the database credentials, debug mode, secret key, allowed hosts, etc. The app should run just fine without any changes, but just know these files are there.

- The included sample helloyou django app can be easily removed by removing 'helloyou' from INSTALLED_APPS in django mainapp/settings.py, removing the associated helloyou path in mainapp/urls.py and deleting the entire helloyou folder. There are no database migrations, so you don't need to worry about that. On the frontend, delete/replace the contents of Home.tsx.

## Running

Run the following command:

```sh
docker-compose -f "docker-compose.dev.yml" up -d --build
```
The react frontend should be available at `http://localhost:3000/` and django backend at `http://localhost:8000/` (django admin at `http://localhost:8000/admin/`).

## Features
### Forgot Password:
- The password reset feature is fully functional. In order to get the password reset url, you will need to open the backend django logs. For example (in Powershell):
    ```sh
    $id = $(docker ps -aqf "name=backend")
    docker logs --tail 1000 -f $id
    ```
- Upon submitting a valid email (default is admin@example.com), you should get a path like `http://localhost:3000/password_reset?token=abcdefgxyz123`; paste this in your browser to access the password reset form. The password reset form first validates the token; if the token is valid, it presents the password reset interface and allows the user to provide a new password. If the token is invalid, it will redirect the user to the login page.

    Check out the Django docs starting [here](https://docs.djangoproject.com/en/3.1/topics/email/#smtp-backend) in order to update the Email Backend from a console output to an actual SMTP backend.

### Left Navigation Bar:
- The left navigation bar (intially shown on the left with only the Home icon upon login) is auto-generated along with the associated React Router's private routes. These routes can be easily added/modified in routes/Routes.ts.

### Subroutes/Params:
- There is a dummy component called Placeholder that gives an example on how to access parameters passed into the url. This is useful when ensuring the user can access a specific page given say a object's PK...even if the page is refreshed. See routes.ts on how to setup the routes to accept optional parameters in the url path.
  
### Alerts:
- An alert setter at the context level is also included. An example of TriggerAlert is shown in Home.tsx (variants displayed after successful/failed submit). See AlertContext.tsx for typings.


### Modal/Dialog:
- Similar to the alert setter, a context level modal/dialog is also provided. Use OpenDialog (basic example shown in Home.tsx) to open and set the modal title/contents/footer.

### Customization:
- The app name (shown at login & header) is set by the constant APP_NAME in frontend/src/settings.tsx.
- The default session duration is set to 5 hours in frontend/src/settings.tsx. The user will be logged out after 5 hours.
- The Material UI Theme can be adjusted in frontend\src\Theme.tsx

###

**TODO:**
- [x] Readme (setup and how to remove remnants of dummy stuff)
- [x] Material UI Theme
- [x] Auto Generation of Left Nav based on Routes?
- [x] Fix NGINX Docker Compose
- [x] fix django admin not serving css files on admin page
- [x] error context
- [x] show password errors
- [x] loading icon on login
- [x] ensure a non-existing route redirects to home 
- [x] email support (for password reset)
- [x] forgot password functionality (email)
- [x] Add support for nested sub-routes off the main left-nav routes
- [x] Ensure match params (i.e. /user/profile/1/) work correctly.
- [x] Context level modal?
- [x] Auto redirect to login with Failed Request
- [ ] Reset session timeout with activity.
- [ ] Swagger API Explorer
- [ ] Backend Testing
- [ ] Frontend Testing (React Testing Library)
- [ ] Axios Interface for demo API
- [ ] Update and Pin versions (remove anything unused)