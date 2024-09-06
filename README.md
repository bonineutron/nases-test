## Environment variables

The repository has two development environments, one for development and another for production. An independent file should be created for each environment in the following way:

##### development

#

```
.env.development
```

##### production

#

```
.env.production
```

This will be the content of the .env file:

```
VITE_SECRET_KEY=""

VITE_FIREBASE_APIKEY=""
VITE_FIREBASE_AUTHDOMAIN=""
VITE_FIREBASE_PROJECTID=""
VITE_FIREBASE_STORAGEBUCKET=""
VITE_FIREBASE_MESSAGINGSENDERID=""
VITE_FIREBASE_APPID=""
```

## Installation

install dependencies, preferably with npm:

```
npm i
```

## Start code

The .env files will be used to initialize their respective environment using the following commands:

##### development

#

```
npm run dev
```

##### production

#

```
npm run build-production
```

```
npm run start
```

## Deploy

This frontend is prepared to run statically, where rendering will be on the client side.

1. To deploy statically, you will need to build the code with the command:

```
npm run build-production
```

2. Make a copy of the generated folder in the repository, this will be the path:

```
/dist
```

3. Paste the contents of the folder into a static storage service where a host can be added. This way it will be accessible to the general public.

## Development skills

-  React 18
-  React router
-  Vite js
-  Typescript
-  Tailwind js
-  Axios
-  Redux
-  Material UI
-  Git
-  Firebase/firestore
-  Firebase/storage
-  Firebase/auth
