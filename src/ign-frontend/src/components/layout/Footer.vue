<template>
  <footer>
    <SeparatorTripleLine />
    <div class="footer-container container">
      <div class="inner-footer-container">
        
        <div class="logo">
          <router-link to="/">
            <img alt="Logo" width="36" src="../../assets/logo-64.png">
            <span>ImageGoNord</span>
          </router-link>
        </div>

        <nav>
          <div class="navbar">
            <a href="https://github.com/megvadulthangya/ImageGoNord-Web" target="_blank" title="GitHub">
              GitHub
            </a>
            
            <span class="separator">|</span>

            <span>&copy; {{ new Date().getFullYear() }} Gshoots</span>
          </div>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
import SeparatorTripleLine from '@/components/separator/TripleLine.vue';

export default {
  name: 'Footer',
  components: {
    SeparatorTripleLine,
  },
  // Nincs szükség methods-ra, mert nincs popup
};
</script>

<style scoped lang="scss">

footer {
  position: relative;
  
  /* Ez a hullámos háttér effekt, ezt megtartjuk mert szép */
  .canvas-container {
    position: absolute;
    bottom: 11em;
    left: 0;
    width: 100%;

    svg {
      path:nth-of-type(1) { fill: $nord4; }
      path:nth-of-type(2) { fill: $nord5; }
      path:nth-of-type(3) { fill: $nord6; }
    }
  }
}

.footer-container {
  margin: auto;
  padding: 7em 0 0 0 !important;
  text-align: left;
  height: 5em;
  display: flex;

  .inner-footer-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0px auto;
    padding: 0 .5em;

    .logo {
      display: flex;
      align-items: center;

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        color: inherit;
      }

      img {
        margin-right: 0.5em;
      }

      span {
        font-size: 1.5em;
        font-weight: 600;
        /* Itt állíthatod a betűtípust, ha akarod */
      }
    }

    nav {
      display: flex;

      .navbar {
        list-style: none;
        display: flex;
        align-items: center;
        
        a {
          text-decoration: none;
          color: $nord3;
          font-weight: bold;
          transition: color 0.2s;

          &:hover {
            color: $nord10;
          }
        }

        .separator {
          margin: 0 10px;
          color: $nord3;
          opacity: 0.5;
        }

        span {
          font-size: 1em;
        }
      }
    }
  }
}

@media (min-width: 56.25em) {
  footer {
    .canvas-container {
      bottom: 8em;
    }
  }
}

/* Sötét mód támogatás */
.#{$dark-mode-class} {
  .logo span {
    color: $nord6;
  }
  
  .navbar a, .navbar span, .navbar .separator {
    color: $nord6 !important;
  }

  .canvas-container {
    svg {
      path:nth-of-type(1) { fill: $dark-bg-secondary; }
      path:nth-of-type(2) { fill: $nord2; }
      path:nth-of-type(3) { fill: $dark-bg-primary; }
    }
  }
}
</style>