<template>
  <div class="demo container">
    <div class="demo-wrapper">
      
      <div class="preview" :class="{ processing: isProcessing, highlight: isDragover }">
        <div class="preview-wrapper" :class="{ uploaded: imgData !== null }">
          <Loader v-if="isProcessing" />
          <input type="file" accept="image/*" id="file" @change="loadFile" style="display:none;">
          <label for="file" v-if="imgData === null" 
                 @dragover.prevent="isDragover = true" 
                 @dragleave.prevent="isDragover = false"
                 @drop.prevent="handleDrop">
          </label>
          <canvas width="450" height="450" id="img-preview"></canvas>
        </div>
      </div>

      <div class="params">
        
        <h3>Palette <small style="font-size:0.6em; font-weight:normal;">(Click to toggle colors)</small></h3>
        
        <div class="palette" v-if="palette && palette.name">
          <span>{{ palette.name }}</span>
          <div class="palette-colors">
             <span 
                v-for="color in palette.colors" 
                :key="color" 
                :style="{ backgroundColor: color }" 
                class="color-box"
                :class="{ 'selected': isColorSelected(color) }"
                @click="toggleColor(color)"
             ></span>
          </div>
        </div>
        
        <div class="palette" v-else>
          
          <div class="palette-group">
            <span>Polar Night</span>
            <div class="palette-colors">
               <span v-for="c in nordPalettes.polar" :key="c" :style="{background: c}" class="color-box" :class="{ 'selected': isColorSelected(c) }" @click="toggleColor(c)"></span>
            </div>
          </div>

          <div class="palette-group">
            <span>Snow Storm</span>
            <div class="palette-colors">
               <span v-for="c in nordPalettes.snow" :key="c" :style="{background: c}" class="color-box" :class="{ 'selected': isColorSelected(c) }" @click="toggleColor(c)"></span>
            </div>
          </div>

          <div class="palette-group">
            <span>Frost</span>
            <div class="palette-colors">
               <span v-for="c in nordPalettes.frost" :key="c" :style="{background: c}" class="color-box" :class="{ 'selected': isColorSelected(c) }" @click="toggleColor(c)"></span>
            </div>
          </div>

          <div class="palette-group">
            <span>Aurora</span>
            <div class="palette-colors">
               <span v-for="c in nordPalettes.aurora" :key="c" :style="{background: c}" class="color-box" :class="{ 'selected': isColorSelected(c) }" @click="toggleColor(c)"></span>
            </div>
          </div>

        </div>

        <h3>Settings</h3>
        <div class="options">
          
          <div class="option-row">
            <span>Filtering <br><small>Change just the image palette</small></span>
            <label class="switch">
              <input type="checkbox" v-model="is_filter">
              <span class="slider round"></span>
            </label>
          </div>

          <div class="option-row">
            <span>Blur <br><small>Apply a blur on output</small></span>
            <label class="switch">
              <input type="checkbox" v-model="blur">
              <span class="slider round"></span>
            </label>
          </div>

          <div class="option-row">
            <span>AI <br><small>Use AI on output</small></span>
            <label class="switch">
              <input type="checkbox" v-model="ai">
              <span class="slider round"></span>
            </label>
          </div>

          <div class="actions">
            <button @click="processImage" class="btn btn-primary" :disabled="isProcessing || !imgData || activeColors.length === 0">
              {{ isProcessing ? 'Processing...' : (activeColors.length === 0 ? 'Select Colors!' : 'Process Image') }}
            </button>

            <a v-if="downloadUrl" :href="downloadUrl" download="converted-image.png" class="btn btn-success" target="_blank">
              Download Result
            </a>
          </div>

          <div v-if="errorMessage" class="error-msg">
            {{ errorMessage }}
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import Loader from './Loader.vue';

export default Vue.component('Demo', {
  props: {
    selectedPalette: [String, Array],
    isAi: Boolean,
  },
  components: { Loader },
  data() {
    return {
      apiUrl: '/v1',
      img: null,
      imgData: null,
      isProcessing: false,
      isDragover: false,
      downloadUrl: null,
      errorMessage: null,
      
      // Opciók
      blur: false,
      ai: this.isAi || false,
      is_filter: false,
      palette: null,
      
      // SZÍN KEZELÉS (Ez hiányzott!)
      activeColors: [], // Ebben tároljuk a kiválasztott hex kódokat
      
      // Nord alapértelmezett színek definíciója a Home oldalhoz
      nordPalettes: {
          polar: ['#2e3440', '#3b4252', '#434c5e', '#4c566a'],
          snow: ['#d8dee9', '#e5e9f0', '#eceff4'],
          frost: ['#8fbcbb', '#88c0d0', '#81a1c1', '#5e81ac'],
          aurora: ['#bf616a', '#d08770', '#ebcb8b', '#a3be8c', '#b48ead']
      }
    };
  },
  watch: {
    selectedPalette: {
      immediate: true,
      handler(newVal) { this.loadPalette(newVal); }
    }
  },
  mounted() {
      // Ha nincs specifikus paletta (Home), jelöljük ki az összes Nord színt alapból
      if (!this.selectedPalette || this.selectedPalette === '[]') {
          this.selectAllNordColors();
      }
  },
  methods: {
    // Összes Nord szín aktiválása alapból
    selectAllNordColors() {
        this.activeColors = [
            ...this.nordPalettes.polar,
            ...this.nordPalettes.snow,
            ...this.nordPalettes.frost,
            ...this.nordPalettes.aurora
        ];
    },

    loadPalette(paletteName) {
        this.activeColors = []; // Reset
        if (!paletteName || paletteName === '[]') {
            this.palette = null;
            this.selectAllNordColors();
            return;
        }
        
        try {
            // eslint-disable-next-line
            this.palette = require(`../assets/palettes/${paletteName}`);
            // Ha betöltöttünk egy palettát, alapból jelöljük ki minden színét
            if(this.palette && this.palette.colors) {
                this.activeColors = [...this.palette.colors];
            }
        } catch (e) {
            try {
               // eslint-disable-next-line
               const aiPalettes = require('../assets/palettes/ai-palettes/6x-palette.json');
               this.palette = aiPalettes.find((p) => p.name === paletteName); 
               if(this.palette && this.palette.colors) {
                   this.activeColors = [...this.palette.colors];
               }
            } catch (err) { console.error("Palette not found"); }
        }
    },
    
    // KATTINTÁS KEZELŐ (Ez hiányzott!)
    toggleColor(hex) {
        if (this.activeColors.includes(hex)) {
            // Ha már benne van, kivesszük (kikapcsoljuk)
            this.activeColors = this.activeColors.filter(c => c !== hex);
        } else {
            // Ha nincs benne, berakjuk (bekapcsoljuk)
            this.activeColors.push(hex);
        }
    },
    
    // Ellenőrzi, hogy aktív-e a szín (CSS classhoz)
    isColorSelected(hex) {
        return this.activeColors.includes(hex);
    },

    handleDrop(e) {
        this.isDragover = false;
        if(e.dataTransfer.files.length > 0) this.processFile(e.dataTransfer.files[0]);
    },
    loadFile(event) {
        if(event.target.files.length > 0) this.processFile(event.target.files[0]);
    },
    processFile(file) {
        this.imgData = file;
        this.downloadUrl = null;
        this.errorMessage = null;
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => { this.img = img; this.drawCanvas(img); };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },
    drawCanvas(img) {
        const canvas = document.getElementById('img-preview');
        const ctx = canvas.getContext('2d');
        const ratio = img.width / img.height;
        let newWidth = canvas.parentNode.offsetWidth * 0.9;
        let newHeight = newWidth / ratio;
        if (newHeight > 450) { newHeight = 450; newWidth = newHeight * ratio; }
        canvas.width = newWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, newWidth, newHeight);
    },
    processImage() {
      if (!this.imgData) return;
      if (this.activeColors.length === 0) {
          this.errorMessage = "Please select at least one color!";
          return;
      }

      this.isProcessing = true;
      this.errorMessage = null;
      this.downloadUrl = null;

      const endpoint = (this.is_filter === true) ? 'quantize' : 'convert-async';
      const formData = new FormData();
      formData.append('file', this.imgData);
      formData.append('b64_output', true);
      
      // FONTOS: Most már a KIVÁLASZTOTT (activeColors) színeket küldjük!
      formData.append('colors', this.activeColors.join(','));
      
      if (this.palette) {
          formData.append('palette_name', this.palette.name);
      }

      if (this.blur) formData.append('blur', true);
      if (this.ai) formData.append('is_ai', true);

      fetch(`${this.apiUrl}/${endpoint}`, { method: 'POST', body: formData })
      .then(res => {
          if(!res.ok) throw new Error('Server error');
          return endpoint === 'quantize' ? res.json() : res.text();
      })
      .then(data => {
          if (endpoint === 'quantize') { this.handleSuccess(data.b64_img); }
          else { this.pollJob(data); }
      })
      .catch(err => {
          console.error(err);
          this.errorMessage = "Error processing. Try a smaller image.";
          this.isProcessing = false;
      });
    },
    pollJob(jobId) {
        const check = () => {
            fetch(`${this.apiUrl}/get-job?job_id=${jobId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.status === 'finished') { this.handleSuccess(data.result.b64_img); }
                    else if (data.status === 'failed') { 
                        this.errorMessage = "Processing failed on server."; this.isProcessing = false; 
                    } else { setTimeout(check, 2000); }
                })
                .catch(() => { this.errorMessage = "Connection lost."; this.isProcessing = false; });
        };
        check();
    },
    handleSuccess(base64Img) {
        const img = new Image();
        img.onload = () => { this.drawCanvas(img); this.isProcessing = false; };
        img.src = `data:image/png;base64,${base64Img}`;
        
        const byteCharacters = atob(base64Img);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) { byteNumbers[i] = byteCharacters.charCodeAt(i); }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], {type: 'image/png'});
        this.downloadUrl = URL.createObjectURL(blob);
    }
  },
});
</script>

<style scoped lang="scss">
.demo {
  padding: 2em 0;
  padding-bottom: 200px !important; 

  .demo-wrapper {
    display: flex; flex-wrap: wrap; justify-content: center; gap: 2em;
    
    .preview {
      position: relative; padding: 1em; background: $bg-secondary; border-radius: 8px; min-width: 300px; min-height: 300px; display: flex; align-items: center; justify-content: center;
      z-index: 100;

      &.highlight { border: 2px dashed $nord10; }
      &.processing::before { content: ""; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(255,255,255,0.7); z-index: 5; }
      .preview-wrapper {
        width: 100%; text-align: center;
        label { display: block; width: 100%; height: 300px; border: 2px dashed #ccc; cursor: pointer; position: absolute; top:0; left:0; &::after { content: 'Click or Drop Image Here'; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: $nord3; font-size: 1.2em; } }
        &.uploaded label { display: none; }
      }
    }

    .params {
      width: 100%; max-width: 400px; padding: 0 1em; text-align: left;
      position: relative; z-index: 100; 

      h3 { margin-bottom: 0.5em; border-bottom: 2px solid $nord4; padding-bottom: 5px; }
      
      .palette-group { margin-bottom: 15px; } /* Csoportok elválasztása */

      .palette-colors {
          display: flex; gap: 8px; margin-bottom: 5px; flex-wrap: wrap;
          
          .color-box { 
              width: 35px; height: 35px; 
              border-radius: 4px; 
              border: 1px solid #ccc;
              cursor: pointer;
              transition: transform 0.1s;
              opacity: 0.4; /* Alapból halvány, ha nincs kiválasztva */
              
              &:hover { transform: scale(1.1); }

              /* Ha ki van választva */
              &.selected {
                  opacity: 1; /* Teljes szín */
                  border: 2px solid $nord10; /* Kiemelt keret */
                  box-shadow: 0 0 5px rgba(0,0,0,0.3);
              }
          }
      }
      .option-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1em; }
      
      .actions {
        display: flex; flex-direction: column; gap: 10px; margin-top: 20px;
        position: relative; z-index: 20; 
        
        .btn {
            width: 100%; text-align: center; padding: 10px; font-size: 1.1em; cursor: pointer; border: none; border-radius: 5px; text-decoration: none;
            &.btn-primary { background-color: $nord10; color: white; }
            &.btn-success { background-color: $nord14; color: $nord0; }
            &:disabled { background-color: #ccc; cursor: not-allowed; }
        }
      }
      .error-msg { color: white; background-color: $nord11; padding: 10px; border-radius: 5px; margin-top: 15px; text-align: center; font-weight: bold; z-index: 200; }
    }
  }
}

.#{$dark-mode-class} {
  .preview { background: $dark-bg-secondary; }
  .actions .btn-success { color: white; }
  h3 { border-color: $nord2; color: $nord6; }
  .palette-colors .color-box { border-color: #555; }
}
</style>