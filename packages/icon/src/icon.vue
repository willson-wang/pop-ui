<template>
  <i :class="'pop-icon-' + name"></i>
</template>

<script>
  export default {
      name: 'popIcon',
      props: {
          name: String
      }
  };
</script>