export const state = () => ({
  name: null,
  email: null,
})

export const mutations = {
  add(state, { name, email }) {
    state.name = name
    state.email = email
  },
  remove(state) {
    state.user = null
  },
}
