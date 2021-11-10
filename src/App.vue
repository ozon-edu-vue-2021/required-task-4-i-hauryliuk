<template>
  <div id="app">
    <Form />
  </div>
</template>

<script>
import Form from './components/Form.vue';

export default {
  name: 'App',
  components: {
    Form,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  background-color: #fafafa;
  padding: 12px;
}

html,
body,
#app {
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}
</style>
