// Interactive SVG Muscle Anatomy Diagram (Anterior & Posterior Views)
// Highlights primary agonist and secondary synergist muscle groups dynamically

export class MuscleDiagram {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.activePrimary = [];
    this.activeSecondary = [];
    this.currentView = 'both'; // 'both' | 'front' | 'back'
  }

  // Set active target muscles
  setTargetMuscles(primary = [], secondary = []) {
    this.activePrimary = primary;
    this.activeSecondary = secondary;
    this.render();
  }

  // Render SVG views
  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="muscle-anatomy-wrapper">
        <div class="muscle-views-row">
          <!-- Anterior (Front) View -->
          <div class="muscle-view-card">
            <div class="view-header">ANTERIOR (FRONT)</div>
            <div class="svg-stage">
              <svg viewBox="0 0 200 360" class="anatomy-svg front-svg" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <filter id="neon-glow-primary" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                  <filter id="neon-glow-secondary" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                <!-- Head / Neck -->
                <circle cx="100" cy="30" r="16" class="muscle-part base-body" />
                <path d="M92 46 L92 56 L108 56 L108 46 Z" class="muscle-part base-body" />

                <!-- Shoulders / Anterior Deltoids -->
                <path id="muscle-anterior_deltoids-l" data-group="anterior_deltoids" 
                      d="M66 60 Q60 74 65 88 Q78 84 76 66 Z" 
                      class="muscle-part ${this.getMuscleClass('anterior_deltoids')}" />
                <path id="muscle-anterior_deltoids-r" data-group="anterior_deltoids" 
                      d="M134 60 Q140 74 135 88 Q122 84 124 66 Z" 
                      class="muscle-part ${this.getMuscleClass('anterior_deltoids')}" />

                <!-- Pectorals (Chest) -->
                <path id="muscle-pectorals-l" data-group="pectorals" 
                      d="M77 66 Q88 64 97 70 L97 96 Q80 98 72 82 Z" 
                      class="muscle-part ${this.getMuscleClass('pectorals', 'upper_pectorals')}" />
                <path id="muscle-pectorals-r" data-group="pectorals" 
                      d="M123 66 Q112 64 103 70 L103 96 Q120 98 128 82 Z" 
                      class="muscle-part ${this.getMuscleClass('pectorals', 'upper_pectorals')}" />

                <!-- Biceps (Arms) -->
                <path id="muscle-biceps-l" data-group="biceps" 
                      d="M62 89 Q57 106 60 124 Q69 122 71 104 Q71 90 62 89 Z" 
                      class="muscle-part ${this.getMuscleClass('biceps')}" />
                <path id="muscle-biceps-r" data-group="biceps" 
                      d="M138 89 Q143 106 140 124 Q131 122 129 104 Q129 90 138 89 Z" 
                      class="muscle-part ${this.getMuscleClass('biceps')}" />

                <!-- Forearms -->
                <path d="M57 127 Q52 148 57 168 Q65 168 67 146 Q67 127 57 127 Z" class="muscle-part base-body" />
                <path d="M143 127 Q148 148 143 168 Q135 168 133 146 Q133 127 143 127 Z" class="muscle-part base-body" />

                <!-- Abdominals (Core) -->
                <path d="M85 100 L115 100 L112 148 L88 148 Z" class="muscle-part base-body core-mesh" />

                <!-- Quadriceps (Thighs) -->
                <path id="muscle-quadriceps-l" data-group="quadriceps" 
                      d="M74 156 Q68 190 73 234 Q89 234 94 195 Q96 160 88 156 Z" 
                      class="muscle-part ${this.getMuscleClass('quadriceps')}" />
                <path id="muscle-quadriceps-r" data-group="quadriceps" 
                      d="M126 156 Q132 190 127 234 Q111 234 106 195 Q104 160 112 156 Z" 
                      class="muscle-part ${this.getMuscleClass('quadriceps')}" />

                <!-- Knees -->
                <circle cx="81" cy="242" r="6" class="muscle-part base-body" />
                <circle cx="119" cy="242" r="6" class="muscle-part base-body" />

                <!-- Calves / Shin (Front) -->
                <path id="muscle-calves-front-l" data-group="calves" 
                      d="M74 252 Q69 285 75 324 L86 324 Q89 285 88 252 Z" 
                      class="muscle-part ${this.getMuscleClass('calves')}" />
                <path id="muscle-calves-front-r" data-group="calves" 
                      d="M126 252 Q131 285 125 324 L114 324 Q111 285 112 252 Z" 
                      class="muscle-part ${this.getMuscleClass('calves')}" />
              </svg>
            </div>
          </div>

          <!-- Posterior (Back) View -->
          <div class="muscle-view-card">
            <div class="view-header">POSTERIOR (BACK)</div>
            <div class="svg-stage">
              <svg viewBox="0 0 200 360" class="anatomy-svg back-svg" xmlns="http://www.w3.org/2000/svg">
                <!-- Head / Neck -->
                <circle cx="100" cy="30" r="16" class="muscle-part base-body" />

                <!-- Trapezius & Upper Back -->
                <path id="muscle-trapezius" data-group="trapezius" 
                      d="M90 46 L110 46 L130 64 L100 86 L70 64 Z" 
                      class="muscle-part ${this.getMuscleClass('trapezius')}" />

                <!-- Posterior Deltoids -->
                <path id="muscle-posterior_deltoids-l" data-group="posterior_deltoids" 
                      d="M66 60 Q60 74 65 88 Q74 84 73 66 Z" 
                      class="muscle-part ${this.getMuscleClass('posterior_deltoids')}" />
                <path id="muscle-posterior_deltoids-r" data-group="posterior_deltoids" 
                      d="M134 60 Q140 74 135 88 Q126 84 127 66 Z" 
                      class="muscle-part ${this.getMuscleClass('posterior_deltoids')}" />

                <!-- Latissimus Dorsi (Lats) -->
                <path id="muscle-latissimus_dorsi-l" data-group="latissimus_dorsi" 
                      d="M74 72 Q64 96 68 126 Q86 138 98 128 L98 86 Q86 76 74 72 Z" 
                      class="muscle-part ${this.getMuscleClass('latissimus_dorsi')}" />
                <path id="muscle-latissimus_dorsi-r" data-group="latissimus_dorsi" 
                      d="M126 72 Q136 96 132 126 Q114 138 102 128 L102 86 Q114 76 126 72 Z" 
                      class="muscle-part ${this.getMuscleClass('latissimus_dorsi')}" />

                <!-- Triceps (Back Arms) -->
                <path id="muscle-triceps-l" data-group="triceps" 
                      d="M62 89 Q57 106 60 124 Q69 122 71 104 Q71 90 62 89 Z" 
                      class="muscle-part ${this.getMuscleClass('triceps')}" />
                <path id="muscle-triceps-r" data-group="triceps" 
                      d="M138 89 Q143 106 140 124 Q131 122 129 104 Q129 90 138 89 Z" 
                      class="muscle-part ${this.getMuscleClass('triceps')}" />

                <!-- Gluteus Maximus -->
                <path id="muscle-glutes-l" data-group="glutes" 
                      d="M75 146 Q70 174 86 186 Q98 186 98 152 Z" 
                      class="muscle-part ${this.getMuscleClass('glutes')}" />
                <path id="muscle-glutes-r" data-group="glutes" 
                      d="M125 146 Q130 174 114 186 Q102 186 102 152 Z" 
                      class="muscle-part ${this.getMuscleClass('glutes')}" />

                <!-- Hamstrings (Back Thighs) -->
                <path id="muscle-hamstrings-l" data-group="hamstrings" 
                      d="M74 188 Q68 214 73 234 Q89 234 94 210 Q96 188 88 188 Z" 
                      class="muscle-part ${this.getMuscleClass('hamstrings')}" />
                <path id="muscle-hamstrings-r" data-group="hamstrings" 
                      d="M126 188 Q132 214 127 234 Q111 234 106 210 Q104 188 112 188 Z" 
                      class="muscle-part ${this.getMuscleClass('hamstrings')}" />

                <!-- Calves / Gastrocnemius (Back Lower Leg) -->
                <path id="muscle-calves-l" data-group="calves" 
                      d="M72 250 Q66 280 74 322 L86 322 Q92 284 88 250 Z" 
                      class="muscle-part ${this.getMuscleClass('calves')}" />
                <path id="muscle-calves-r" data-group="calves" 
                      d="M128 250 Q134 280 126 322 L114 322 Q108 284 112 250 Z" 
                      class="muscle-part ${this.getMuscleClass('calves')}" />
              </svg>
            </div>
          </div>
        </div>

        <!-- Muscle Legend & Engagement Tags -->
        <div class="muscle-legend-bar">
          <div class="legend-item primary-legend">
            <span class="legend-swatch cyan-glow"></span>
            <span class="legend-label">Primary Agonist: <strong>${this.formatMuscleNames(this.activePrimary)}</strong></span>
          </div>
          <div class="legend-item secondary-legend">
            <span class="legend-swatch amber-glow"></span>
            <span class="legend-label">Synergist / Stabilizer: <strong>${this.formatMuscleNames(this.activeSecondary)}</strong></span>
          </div>
        </div>
      </div>
    `;

    this.attachInteractiveTooltips();
  }

  // Get CSS class based on muscle role
  getMuscleClass(...names) {
    for (const name of names) {
      if (this.activePrimary.includes(name)) return 'is-primary-agonist';
      if (this.activeSecondary.includes(name)) return 'is-secondary-synergist';
    }
    return 'base-body';
  }

  // Format nice muscle group labels
  formatMuscleNames(muscles) {
    if (!muscles || muscles.length === 0) return 'None';
    return muscles.map(m => m.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())).join(', ');
  }

  // Add click/hover tooltips
  attachInteractiveTooltips() {
    const paths = this.container.querySelectorAll('.muscle-part[data-group]');
    paths.forEach(p => {
      p.addEventListener('mouseenter', (e) => {
        const group = e.target.getAttribute('data-group');
        p.classList.add('hover-highlight');
      });
      p.addEventListener('mouseleave', (e) => {
        p.classList.remove('hover-highlight');
      });
    });
  }
}
