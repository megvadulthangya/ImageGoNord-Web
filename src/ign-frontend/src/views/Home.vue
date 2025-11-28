<template>
  <div class="home">
    
    <div class="hero-header">
      <h1>ImageGoNord</h1>
      <h2>Self-Hosted Converter</h2>
    </div>

    <section class="demo-section">
      <center>
        
        <div class="status-container">
          <span><b>System Status</b>:</span>
          <div :class="`ring-container ${apiStatus}`">
              <div class="ringring"></div>
              <div class="circle"></div>
          </div>
          <span class="count-text">
            <strong>Converted locally: </strong>{{ apiCount.toString() }}
          </span>
        </div>

      </center>
      
      <Demo />
    </section>

  </div>
</template>

<script>
import Demo from '@/components/Demo.vue';

export default {
  name: 'Home',
  data() {
    return {
      apiStatus: 'success',
      apiCount: 0,
    };
  },
  mounted() {
    const self = this;
    // JAVÍTÁS: Most már a te saját /v1 API-dat hívja, nem a külső szervert!
    const checkStatus = () => {
      fetch('/v1/status')
        .then((r) => { 
            self.apiStatus = 'success'; 
            r.json().then((j) => { self.apiCount = j.count; }); 
        })
        .catch(() => { self.apiStatus = 'failed'; });
    };

    // Azonnali ellenőrzés és utána 8 másodpercenként
    checkStatus();
    setInterval(checkStatus, 8000);
  },
  components: {
    Demo,
  },
};
</script>

<style scoped lang="scss">

.home {
  padding-bottom: 2em;
}

.hero-header {
  text-align: center;
  padding: 2em 0 1em 0;
  
  h1 {
    font-size: 3em;
    font-weight: 800;
    margin: 0;
    color: $nord0;
  }
  
  h2 {
    font-size: 1.5em;
    font-weight: 300;
    margin: 0;
    color: $nord3;
  }
}

.demo-section {
  /* Itt hozzuk feljebb a dobozt */
  background: transparent; 
  padding: 1em 0;

  .status-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    font-size: 1.1em;
  }

  .ring-container {
    display: inline-block;
    position: relative;
    width: 20px;
    height: 20px;
  }

  .circle {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    position: absolute;
    top: 2.5px;
    left: 2.5px;
  }

  .ringring {
    -webkit-border-radius: 30px;
    height: 25px;
    width: 25px;
    position: absolute;
    left: -2.5px;
    top: -2.5px;
    -webkit-animation: pulsate 1s ease-out;
    -webkit-animation-iteration-count: infinite;
    opacity: 0.0;
  }

  .ring-container.success {
    .circle { background-color: #a3be8c; } /* Nord green */
    .ringring { border: 3px solid #a3be8c; }
  }

  .ring-container.failed {
    .circle { background-color: #bf616a; } /* Nord red */
    .ringring { border: 3px solid #bf616a; }
  }
}

/* Sötét mód */
.#{$dark-mode-class} {
  .hero-header {
    h1 { color: $nord6; }
    h2 { color: $nord4; }
  }
}

@-webkit-keyframes pulsate {
  0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
  50% {opacity: 1.0;}
  100% {-webkit-transform: scale(1.1, 1.1); opacity: 0.0;}
}

</style>