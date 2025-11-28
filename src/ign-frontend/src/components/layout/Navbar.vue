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
          <router-link to="/color-schemes">ImageGoWild</router-link>
          <router-link to="/wallpaper">Wallpaper</router-link>
          <router-link to="/documentation">Docs</router-link>
          <router-link to="/about">About</router-link>

          <a href="https://github.com/megvadulthangya/ImageGoNord-Web" target="_blank" title="GitHub">
            <i class="mobile-menu-icon fab fa-github"></i>
          </a>

          <a @click="toggleMobileMenu" href="#" class="hamburger-icon">
            <i class="mobile-menu-icon fas fa-bars"></i>
          </a>

          <a @click="toggleDarkMode" href="#" title="Dark Mode" class="dark-mode-btn">
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
  components: { MobileMenu },
  mounted() {
    if (localStorage.getItem('darkMode') === 'yes') {
      this.enableDarkMode(true);
    }
  },
  methods: {
    toggleMobileMenu(event) {
      if(event) event.preventDefault();
      document.querySelector('.mobile-menu-container').classList.toggle('loaded');
      document.body.classList.toggle('overflow-hidden');
    },
    enableDarkMode(isDark) {
      const icon = document.querySelector('.dark-mode-icon');
      if (isDark) {
        document.documentElement.classList.add('dark-theme');
        if (icon) { icon.classList.remove('fa-moon'); icon.classList.add('fa-sun'); }
      } else {
        document.documentElement.classList.remove('dark-theme');
        if (icon) { icon.classList.add('fa-moon'); icon.classList.remove('fa-sun'); }
      }
    },
    toggleDarkMode(event) {
      if(event) event.preventDefault();
      const isCurrentlyDark = document.documentElement.classList.contains('dark-theme');
      this.enableDarkMode(!isCurrentlyDark);
      localStorage.setItem('darkMode', !isCurrentlyDark ? 'yes' : 'no');
    },
  },
});
</script>

<style scoped lang="scss">
header {
  margin: auto; text-align: left; height: 5em; display: flex; padding: 0 !important; margin-top: 20px !important;
  .inner-header-container {
    width: 100%; display: flex; align-items: center; justify-content: space-between; margin: 0px auto; padding: 0 .5em;
    .logo {
      display: flex; align-items: center;
      a { display: flex; align-items: center; text-decoration: none; color: inherit; }
      span { font-size: 1.8em; font-weight: 600; margin-left: 0.3em; }
    }
    nav .navbar {
      list-style: none; display: flex; align-items: center;
      a {
        border-radius: 0.25em; margin: 0 0.25em; padding: 0.2em 0.5em; cursor: pointer; font-size: 1.2em; text-decoration: none; color: inherit;
        /* Alapból (mobilon) rejtsük el a szöveget, de az ikonokat NE */
        &:not([href="#"]):not([href*="github"]) { display: none; }
        &:hover { background-color: $bg-secondary; }
      }
      /* Hamburger ikon látható mobilon */
      .hamburger-icon { display: inline-block; }
      /* Dark mode gomb látható mindig */
      .dark-mode-btn { display: inline-block !important; }
    }
  }
}

/* DESKTOP */
@media (min-width: 56.25em) {
  header .inner-header-container {
    padding: 0 0;
    .logo span { font-size: 2em; }
    nav .navbar a {
      /* Szöveg megjelenik */
      &:not([href="#"]):not([href*="github"]) { display: inline-block; }
      /* Hamburger eltűnik */
      &.hamburger-icon { display: none; }
    }
  }
}

.#{$dark-mode-class} header .inner-header-container nav .navbar a:hover { background-color: $dark-bg-secondary; }
</style>