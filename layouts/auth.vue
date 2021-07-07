<template lang="pug">
  Nuxt
</template>

<style lang="scss">
.container-auth {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.show-password {
  display: flex;
  align-items: center;
  margin-left: 4px;
  font-size: 0.8rem;
  input {
    width: 16px;
    height: 16px;
  }
  label {
    user-select: none;
  }
}

.form {
  width: auto;
  height: auto;
  &__input-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.2rem;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: 4px;
    padding: 0.2rem;
  }
}
</style>
