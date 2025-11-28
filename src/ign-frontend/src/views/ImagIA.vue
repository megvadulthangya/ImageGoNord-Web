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
      
      <div class="palette-container container">
        <div 
          v-for="palette in availablePalettes" 
          :key="palette.name"
          @click="selectedPalette = palette.name" 
          :class="{'palette-card': true, 'active': (selectedPalette === palette.name)}"
        >
          <div class="color-strip" :style="getGradientStyle(palette.colors)"></div>
          <span class="palette-name">{{ palette.name }}</span>
        </div>
      </div>

      <center style="margin-top: 3em;">
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
    // JAVÍTVA: Nincsenek sortörések, egyetlen stringet ad vissza
    getGradientStyle(colors) {
      if (!colors || colors.length < 6) return 'background: #ccc'; // Fallback
      return `background: linear-gradient(to right, ${colors[0]} 16.6%, ${colors[1]} 16.6% 33.3%, ${colors[2]} 33.3% 50%, ${colors[3]} 50% 66.6%, ${colors[4]} 66.6% 83.3%, ${colors[5]} 83.3%);`;
    }
  }
};
</script>

<style scoped lang="scss">
.canvas-container {
  margin-top: 1em;
  svg {
    margin-bottom: -5px;
    path:nth-of-type(1) { fill: $nord4; }
    path:nth-of-type(2) { fill: $nord5; }
  }
}

.demo-section {
  min-height: 500px;
  background: $nord5;
  padding: 2em 0;
  margin-bottom: -5em;

  h3 {
    font-size: 1.8em;
    margin: .5em 0;
    color: $nord0;
  }
  
  /* JAVÍTOTT RÁCS (GRID) RENDSZER */
  .palette-container {
    display: grid;
    /* Automatikusan kitölti a teret, minimum 160px széles elemekkel */
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); 
    gap: 15px;
    padding: 10px;
  }

  .palette-card {
    background: white;
    border-radius: 8px;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    transition: all 0.2s ease-in-out;
    border: 2px solid transparent;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);

    &:hover {
      transform: translateY(-3px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }

    &.active {
      border-color: $nord10;
      background-color: #f0f4f8;
    }
  }

  .color-strip {
    height: 40px;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 8px;
    border: 1px solid rgba(0,0,0,0.1);
  }

  .palette-name {
    font-size: 0.9em;
    font-weight: 600;
    color: $nord1;
    display: block;
    /* Hosszú nevek kezelése */
    white-space: nowrap; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

/* Sötét mód */
.#{$dark-mode-class} {
  .demo-section {
    background: $nord2;
    h3 { color: $nord6; }
    p { color: $nord4; }
    
    .palette-card {
      background: $nord3;
      color: $nord6;
      
      &.active {
        background-color: $nord1;
        border-color: $nord8;
      }
    }
    
    .palette-name { color: $nord6; }
  }

  .canvas-container {
    svg {
      path:nth-of-type(1) { fill: $dark-bg-secondary; }
      path:nth-of-type(2) { fill: $nord2; }
    }
  }
}
</style>