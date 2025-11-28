<template>
  <div class="gowild">
    <div class="container">
      <Main
        h1="Palette Collection"
        h2="Choose a color scheme to apply to your image"
      />
    </div>

    <section class="gallery-section">
      <SeparatorDoubleLine />
      <center>
        <h3>Available Palettes</h3>
        <p>Click on a palette to select it, then upload your image below.</p>
      </center>
      
      <div class="palette-grid container">
        <div 
            @click="selectedPalette = palette.file" 
            :class="{'palette-post': true, 'current-palette': (selectedPalette === palette.file)}" 
            v-for="palette in palettes" 
            :key="palette.name"
        >
          <div class="palette-img" :style="`width: 100%; background-position: center; background-size: cover; object-fit: cover; background-image: url(${require('../assets/' + palette.img)})`" />
          <span class="palette-title">{{ palette.name }}</span>
        </div>
      </div>
      
      <br/>
      <SeparatorDoubleLine />
    </section>

    <section class="demo-section">
      <center>
        <h3>Upload & Convert</h3>
        
        <div class="status-container">
          <span><b>System Status</b>:</span>
          <div :class="`ring-container ${apiStatus}`">
              <div class="ringring"></div>
              <div class="circle"></div>
          </div>
        </div>

      </center>
      
      <Demo :selectedPalette="`${(selectedPalette !== '') ? selectedPalette : []}`" />
    </section>
  </div>
</template>

<script>
import Main from '@/components/Main.vue';
import Demo from '@/components/Demo.vue';
import SeparatorDoubleLine from '@/components/separator/DoubleLine.vue';
import json from '../assets/palettes/available-palettes.json';

export default {
  name: 'GoWild',
  data() {
    return {
      apiStatus: 'success',
      palettes: json,
      selectedPalette: '',
    };
  },
  mounted() {
    const self = this;
    // JAVÍTVA: Helyi API ellenőrzés
    const checkStatus = () => {
      fetch('/v1/status')
        .then(() => { self.apiStatus = 'success'; })
        .catch(() => { self.apiStatus = 'failed'; });
    };
    
    checkStatus();
    setInterval(checkStatus, 8000);
  },
  components: {
    Main,
    Demo,
    SeparatorDoubleLine,
  },
};
</script>

<style scoped lang="scss">

.gallery-section {
  background: $nord5;
  padding-top: 1em;

  h3 {
    font-size: 2em;
    margin: .3em 0;
    color: $nord0;
  }
  
  p {
    color: $nord3;
    margin-bottom: 2em;
  }
}

/* Paletta rács stílusok */
.palette-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.palette-post {
    width: 200px; /* Fix szélesség a rendezettségért */
    cursor: pointer;
    text-align: center;
    padding: 10px;
    border-radius: 8px;
    border: 3px solid transparent;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-5px);
        background-color: rgba(255,255,255,0.5);
    }

    &.current-palette {
        border-color: $nord10;
        background-color: rgba(255,255,255,0.8);
    }

    .palette-img {
        height: 120px;
        border-radius: 5px;
        margin-bottom: 10px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .palette-title {
        font-weight: bold;
        display: block;
    }
}

.demo-section {
  min-height: 500px;
  background: $nord5;
  padding: 2em 0;
  margin-bottom: -2em;

  h3 {
    font-size: 2em;
    margin: .3em 0;
    color: $nord0;
  }
  
  /* Státuszjelző CSS */
  .status-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
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
    .circle { background-color: #a3be8c; }
    .ringring { border: 3px solid #a3be8c; }
  }

  .ring-container.failed {
    .circle { background-color: #bf616a; }
    .ringring { border: 3px solid #bf616a; }
  }
}

/* Sötét mód */
.#{$dark-mode-class} {
  .demo-section, .gallery-section {
    background: $nord2;
    h3 { color: $nord6; }
    p { color: $nord4; }
    
    .palette-post:hover {
        background-color: $nord3;
    }
    .current-palette {
        background-color: $nord3;
    }
    .palette-title { color: $nord4; }
  }
}

@-webkit-keyframes pulsate {
  0% {-webkit-transform: scale(0.1, 0.1); opacity: 0.0;}
  50% {opacity: 1.0;}
  100% {-webkit-transform: scale(1.1, 1.1); opacity: 0.0;}
}

</style>