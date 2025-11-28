<template>
  <div class="mobile-menu-container">
    <nav>
      <div class="close-icon">
        <i @click="closeMobileMenu" class="fa fa-times"></i>
      </div>
      
      <div class="navbar">
        <router-link to="/imagia" @click.native="closeMobileMenu">🤖 ImagIA</router-link>
        <router-link to="/color-schemes" @click.native="closeMobileMenu">ImageGoWild</router-link>
        <router-link to="/wallpaper" @click.native="closeMobileMenu">Wallpaper</router-link>
        <router-link to="/documentation" @click.native="closeMobileMenu">Documentation</router-link>
        <router-link to="/about" @click.native="closeMobileMenu">About</router-link>
        
        <a href="https://github.com/megvadulthangya/ImageGoNord-Web" target="_blank">
          GitHub <i class="fab fa-github"></i>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'MobileMenu',
  methods: {
    closeMobileMenu() {
      // Közvetlenül levesszük az osztályt, nem szimulálunk kattintást (stabilabb)
      document.querySelector('.mobile-menu-container').classList.remove('loaded');
      document.body.classList.remove('overflow-hidden');
    },
  },
  watch: {
    // Ha változik az útvonal (navigálsz), automatikusan zárja be a menüt
    $route() {
      this.closeMobileMenu();
    },
  },
};
</script>

<style scoped lang="scss">

.mobile-menu-container {
  position: fixed;
  width: 100%;
  bottom: 100%; /* Alapból fent "rejtőzik" (vagyis inkább a viewport felett kezdődik a trükk miatt) */
  opacity: 0;
  background: $bg-primary;
  z-index: 9999; /* Legyen mind felett */
  left: 0;
  height: 100%;
  transition: all .4s ease-in 0s;

  nav {
    .close-icon {
      text-align: right;
      i {
        padding: .8em;
        font-size: 2em; /* Kicsit nagyobbra vettem a könnyebb kattintásért */
        cursor: pointer;
        color: $nord3;
      }
    }

    .navbar {
      text-align: center;
      margin-top: 2em;

      a {
        padding: 1em 0;
        display: block;
        font-size: 1.5em; /* Nagyobb betűk mobilon */
        border-bottom: 1px solid $bg-secondary;
        text-decoration: none;
        color: $nord0;

        &:last-child {
          border-bottom: none;
        }
        
        &:hover {
            background-color: $bg-secondary;
        }
      }
    }
  }
}

/* Amikor megkapja a 'loaded' osztályt (Navbar.vue adja rá), akkor megjelenik */
.loaded {
  &.mobile-menu-container {
    bottom: 0;
    opacity: 1;
    transition: bottom .25s ease-out 0s, opacity .3s ease-in-out 0s;
  }
}

/* Sötét mód támogatás */
.#{$dark-mode-class} {
  .mobile-menu-container {
    background: $dark-bg-primary;
    
    nav .close-icon i {
        color: $nord6;
    }

    nav .navbar a {
        color: $nord6;
        border-bottom-color: $nord1;
        
        &:hover {
            background-color: $nord1;
        }
    }
  }
}
</style>