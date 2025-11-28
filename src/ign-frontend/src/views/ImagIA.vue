<template>
  <div class="getting-started">
    <Main
        h1="AI Recolor Tool"
        h2="Intelligent palette application using PaletteNet"
      />
    
    <div class="canvas-container">
      <svg viewBox="0 -20 700 110" width="100%" height="110" preserveAspectRatio="none">
        <path transform="translate(0, -20)" d="M0,10 c80,-22 240,0 350,18 c90,17 260,7.5 350,-20 v50 h-700" />
        <path d="M0,10 c80,-18 230,-12 350,7 c80,13 260,17 350,-5 v100 h-700z" />
      </svg>
    </div>

    <section class="demo-section">
      <center>
        <h3>1. Select a Palette</h3>
        <p>Choose the target color scheme for the AI</p>
      </center>
      
      <div class="palette-grid container">
        <div 
          @click="selectedPalette = palette.name" 
          :class="{'palette-post': true, 'current-palette': (selectedPalette === palette.name)}" 
          v-for="palette in availablePalettes" 
          :key="palette.name"
        >
          <div class="palette-img" :style="generateGradient(palette.colors)"></div>
          <span class="palette-title">{{ palette.name }}</span>
        </div>
      </div>

      <center style="margin-top: 2em;">
        <h3>2. Upload Image</h3>
      </center>
      
      <Demo :isAi="true" :selectedPalette="`${(selectedPalette !== '') ? selectedPalette : []}`" />
    </section>
  </div>
</template>

<script>
import Demo from '@/components/Demo.vue';
import Main from '@/components/Main.vue';
import json from '../assets/palettes/ai-palettes/6x-palette.json';

export default {
  name: 'ImagIA',
  data() {
    return {
      availablePalettes: json,
      selectedPalette: '',
    };
  },
  components: {
    Demo,
    Main,
  },
  methods: {
    // Kiszerveztem a csúnya HTML stílust egy függvénybe
    generateGradient(colors) {
      return `background: linear-gradient(to right, 
        ${colors[0]} 16.65%, 
        ${colors[1]} 16.65% 33.3%, 
        ${colors[2]} 33.3% 49.95%, 
        ${colors[3]} 49.95% 66.55%, 
        ${colors[4]} 66.55% 83.2%, 
        ${colors[5]} 83.2%
      );`;
    }
  }
};
</script>

<style scoped lang="scss">
.canvas-container {
  margin-top: 1em; /* Kicsit feljebb húztuk */
  svg {
    margin-bottom: -5px;
    path:nth-of-type(1) { fill: $nord4; }
    path:nth-of-type(2) { fill: $nord5; }
  }
}

.demo-section {
  min-height: 500px;
  background: $nord5;
  margin-bottom: -5em; /* Kevésbé lóg bele a láblécbe */
  margin-top: -1em;
  padding: 2em 0; /* PADDING CSÖKKENTVE: 5em -> 2em (Kevesebb görgetés!) */

  h3 {
    font-size: 1.8em;
    margin: .3em 0;
    color: $nord0;
  }

  p {
    margin: .3em 0;
    color: $nord3;
  }
  
  /* Paletta rács stílusok (ha hiányoznának globálisan) */
  .palette-grid {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
    margin-top: 20px;
  }

  .palette-post {
    cursor: pointer;
    border: 3px solid transparent;
    border-radius: 8px;
    transition: transform 0.2s;
    text-align: center;
    
    &:hover {
      transform: scale(1.05);
    }
    
    &.current-palette {
      border-color: $nord10; /* Kijelölés színe */
      background-color: rgba(255,255,255,0.5);
    }
  }

  .palette-img {
    width: 150px;
    height: 40px;
    border-radius: 5px;
    margin-bottom: 5px;
    border: 1px solid #ccc;
  }
  
  .palette-title {
    font-weight: bold;
    color: $nord1;
  }
}

/* Sötét mód */
.#{$dark-mode-class} {
  .demo-section {
    background: $nord2;
    h3 { color: $nord6; }
    p { color: $nord4; }
    
    .palette-title { color: $nord4; }
    .current-palette { background-color: $nord3; }
  }

  .canvas-container {
    svg {
      path:nth-of-type(1) { fill: $dark-bg-secondary; }
      path:nth-of-type(2) { fill: $nord2; }
    }
  }
}
</style>