# OneGroup | Frontend

### Preparando Entorno

Este Cliente o Frontend consume una API o Backend que es [OneGroup Backend](https://github.com/CRISOMG/OneGroup-Backend),
recomiendo preparar ese entorno antes que este.

.env.example

```js
// OneGroup Backend
ONEGROUP_API_URL = ''

// API key Tokens de OneGroup Backend
ADMIN_API_KEY_TOKEN = ''
PUBLIC_API_KEY_TOKEN = ''

/**
 * Una de las API Key Tokens que se
 * usaran para autenticar a los usuarios
 */
API_KEY_TOKEN = ''
```

**ONEGROUP_API_URL** \
Debe ser la url ( ya sea en localhost o en produccion )
del Backend de OneGroup

**ADMIN_API_KEY_TOKEN** & **PUBLIC_API_KEY_TOKEN** \
Estas Keys deben ser las mismas que en OneGroup Backend

**API_KEY_TOKEN** \
Esta debe ser una de las API_KEY_TOKEN de arriba ya que esta va a ser la que la aplicacion va a usar para autenticar a los usuarios
( dependiendo de la Key que uses los usuarios van a tener mas o menos permisos )

### Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
