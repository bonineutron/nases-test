![fundes-log](https://i0.wp.com/fundes.org/wp-content/uploads/2021/11/Fundes_Latinoame%CC%81rica-1.png?fit=394%2C116&ssl=1)

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
VITE_API_URL=""
VITE_BUILD_ENV="" // "production" | "development"
VITE_SECRET_KEY=""
VITE_GOOGLE_CLIENT_ID=""
VITE_API_TOKEN_USERS=""
VITE_API_TOKEN_OPERATIONS=""
VITE_API_TOKEN_REPORTS=""
VITE_TTL="" // "1" | "2"
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
