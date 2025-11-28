<template>
  <header class="container">
    <div class="inner-header-container">
      
      <div class="logo">
        <router-link to="/">
          <img alt="Logo" width="36" src="../../assets/logo-64.png">
          <span>ImageGoNord</span>
        </router-link>
      </div>

      <nav>
        <div class="navbar">
          <router-link to="/imagia">🤖 ImagIA</router-link>
          <router-link to="/documentation">Documentation</router-link>
          <router-link to="/color-schemes">ImageGoWild</router-link>
          <router-link to="/wallpaper">Wallpaper</router-link>
          <router-link to="/about">About</router-link>
          
          <a href="https://github.com/megvadulthangya/ImageGoNord-Web" target="_blank" title="GitHub">
            <i class="mobile-menu-icon fab fa-github"></i>
          </a>

          <a @click="toggleMobileMenu" href="#" class="hamburger-icon">
            <i class="mobile-menu-icon fas fa-hamburger"></i>
          </a>

          <a @click="toggleDarkMode" href="#" title="Dark Mode">
            <i class="dark-mode-icon fas fa-moon"></i>
          </a>
        </div>
      </nav>
    </div>
    <MobileMenu />
  </header>
</template>

<script>
import Vue from 'vue';
import MobileMenu from '@/components/layout/MobileMenu.vue';

export default Vue.component('Navbar', {
  props: {},
  components: {
    MobileMenu,
  },
  mounted() {
    // Ha a felhasználó korábban bekapcsolta a sötét módot, kapcsoljuk be most is
    if (localStorage.getItem('darkMode') === 'yes') {
      this.enableDarkMode(true);
    }
  },
  methods: {
    toggleMobileMenu(event) {
      if (event) event.preventDefault();
      document.querySelector('.mobile-menu-container').classList.toggle('loaded');
      document.body.classList.toggle('overflow-hidden');
    },

    // Ez a SEGÉDFÜGGVÉNY kapcsolja a módot konkrétan
    enableDarkMode(isDark) {
      const icon = document.querySelector('.dark-mode-icon');
      
      if (isDark) {
        // Sötét mód BE
        document.documentElement.classList.add('dark-theme');
        if (icon) {
          icon.classList.remove('fa-moon'); // Hold le
          icon.classList.add('fa-sun');     // Nap fel
        }
      } else {
        // Sötét mód KI (Világos)
        document.documentElement.classList.remove('dark-theme');
        if (icon) {
          icon.classList.add('fa-moon');    // Hold fel
          icon.classList.remove('fa-sun');  // Nap le
        }
      }
    },

    // Ez fut le kattintáskor
    toggleDarkMode(event) {
      if (event) event.preventDefault();
      
      // Megnézzük, most épp be van-e kapcsolva
      const isCurrentlyDark = document.documentElement.classList.contains('dark-theme');
      
      // Fordítsunk rajta egyet (Ha sötét volt -> legyen világos, és fordítva)
      const newState = !isCurrentlyDark;
      
      this.enableDarkMode(newState);
      localStorage.setItem('darkMode', newState ? 'yes' : 'no');
    },
  },
});
</script>

<style scoped lang="scss">

header {
  margin: auto;
  text-align: left;
  height: 5em;
  display: flex;
  padding: 0 !important;
  margin-top: 60px !important;

  .inner-header-container {
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

      span {
        font-size: 1.8em;
        font-weight: 600;
        margin-left: 0.3em;
        vertical-align: super;
      }
    }

    nav {
      display: flex;

      .navbar {
        list-style: none;
        display: flex;
        justify-content: space-between;
        align-items: center;

        a {
          border-radius: 0.25em;
          margin: 0 0.25em;
          padding: 0.2em 0.5em;
          transition: background-color 100ms ease-in-out 0s;
          cursor: pointer;
          font-size: 1.2em;
          text-decoration: none;
          color: inherit;

          /* MOBIL NÉZET: */
          /* Az első 6 elem (szöveges linkek) elrejtése */
          &:nth-child(-n+6) {
            display: none;
          }

          &:hover {
            background-color: $bg-secondary;
          }
        }
      }
    }
  }
}

/* DESKTOP NÉZET */
@media (min-width: 56.25em) {
  header {
    .inner-header-container {
      padding: 0 0;

      .logo span {
        font-size: 2em;
      }

      nav {
        .navbar {
          a {
            /* Desktopon jelenjen meg a szöveges menü is */
            &:nth-child(-n+6) {
              display: inline;
            }
            
            /* A 8. elem (Hamburger) rejtése desktopon.
               (6 link + 1 Github = 7. elem, a Hamburger a 8.) */
            &:nth-child(8) {
              display: none;
            }
          }
        }
      }
    }
  }
}

.#{$dark-mode-class} {
  header {
    .inner-header-container {
      nav {
        .navbar {
          a {
            &:hover {
              background-color: $dark-bg-secondary;
            }
          }
        }
      }
    }
  }
}

</style>