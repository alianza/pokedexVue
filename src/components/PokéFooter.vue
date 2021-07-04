<template>
  <div class="footer">
    <p>PokéDex Vue App</p>
  </div>
</template>

<script>
export default {
  name: "PokéFooter"
}
</script>

<style lang="scss" scoped>

.footer {
  height: 5em;
  padding: 1em;
  background-color: #222;
  color: white;
  box-shadow: 0 0 6px rgba(0, 0, 0, .5);
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  transition: margin-left .5s;
}

</style>
