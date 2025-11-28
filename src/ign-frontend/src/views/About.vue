<template>
  <div class="about container">
    <Main
        h1="About"
        h2="Self-Hosted Image Converter"
      />
      
      <div class="description">
        <p>
          This is a private, self-hosted instance of the ImageGoNord tool running on Manjaro Linux.
          <br/><br/>
          It allows for fast image conversion using the Nord palette (and others) directly on this server, 
          ensuring privacy and performance.
          <br/><br/>
          Modified Source Code:
          <br/>
          <a class="external-link-color" href="https://github.com/megvadulthangya/ImageGoNord-Web" target="_blank">
            github.com/megvadulthangya/ImageGoNord-Web
          </a>
        </p>
      </div>
  </div>
</template>

<script>
import Main from '@/components/Main.vue';

export default {
  name: 'About',
  components: {
    Main,
  },
};
</script>

<style scoped lang="scss">
.about {
  .description {
    margin: auto;
    max-width: 640px;
    padding: 0 .5em;
    p {
      font-size: 1.4em;
      line-height: 1.6;
    }
  }
}
</style>