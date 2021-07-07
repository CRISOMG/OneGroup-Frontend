const express = require('express')
const app = express()

const cookieParser = require('cookie-parser')

const axios = require('axios')

app.use(express.json(), cookieParser())

const { ONEGROUP_API_URL, API_KEY_TOKEN } = process.env

app.post('/login', async function (req, res, next) {
  const { email, password } = req.body

  try {
    const { data, status } = await axios({
      url: `${ONEGROUP_API_URL}/api/auth/sign-in`,
      method: 'post',
      auth: {
        username: email,
        password,
      },
      data: {
        apiKeyToken: API_KEY_TOKEN,
      },
    })

    const { token, user } = data

    res.cookie('token', token, {
      httpOnly: false,
      secure: false,
      sameSite: 'Strict',
    })
    res.status(status).json(user)
  } catch (error) {
    next(error)
  }
})

app.post('/sing-up', async function (req, res, next) {
  const { username, email, password } = req.body

  try {
    const { data, status } = await axios({
      url: `${ONEGROUP_API_URL}/api/auth/sign-up`,
      method: 'post',
      data: {
        name: username,
        email,
        password,
      },
    })

    res.status(status).json(data)
  } catch (error) {
    next(error)
  }
})

app.get('/user/me', async function (req, res, next) {
  const { token } = req.cookies
  try {
    const { data: user, status } = await axios(
      `${ONEGROUP_API_URL}/api/auth/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    res.status(status).json(user)
  } catch (error) {
    next(error)
  }
})

app.get('/products', async function (req, res, next) {
  const { token } = req.cookies
  const { page } = req.query
  try {
    const {
      data: { data },
      status,
    } = await axios({
      url: `${ONEGROUP_API_URL}/api/products`,
      params: {
        page,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    res.status(status).json(data)
  } catch (error) {
    next(error)
  }
})

app.get('/product/:id', async function (req, res, next) {
  const { token } = req.cookies
  const { id } = req.params
  try {
    const {
      data: { data },
      status,
    } = await axios({
      url: `${ONEGROUP_API_URL}/api/products/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    res.status(status).json(data)
  } catch (error) {
    next(error)
  }
})

app.post('/product', async function (req, res, next) {
  const { token } = req.cookies
  const { body: product } = req

  try {
    const { data, status } = await axios.post(
      `${ONEGROUP_API_URL}/api/products`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    res.status(status).json(data)
  } catch (error) {
    next(error)
  }
})

app.put('/product/:id', async function (req, res, next) {
  const { token } = req.cookies
  const { id } = req.params
  const { body: product } = req

  try {
    const { data, status } = await axios.put(
      `${ONEGROUP_API_URL}/api/products/${id}`,
      product,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    res.status(status).json(data)
  } catch (error) {
    next(error)
  }
})

app.delete('/product/:id', async function (req, res, next) {
  const { token } = req.cookies
  const { id } = req.params

  try {
    const { data, status } = await axios.delete(
      `${ONEGROUP_API_URL}/api/products/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )

    res.status(status).json(data)
  } catch (error) {
    next(error)
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (error, req, res, next) {
  if (error.isAxiosError) {
    const { request, response } = error
    if (response) {
      const { status, data } = response

      res.status(status).send(data)
    } else if (request) {
      res.status(400).send(error)
    }
  } else {
    res.status(500).send(error)
  }
})

module.exports = {
  path: '/api',
  handler: app,
}
