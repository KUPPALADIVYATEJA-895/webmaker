// Web Audio API ambient cosmic synthesizer
// Creates a deep, hypnotic interstellar drone and sound effects without external audio files

class CosmicAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private isPlaying = false;

  private init() {
    if (this.ctx) return;
    const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioCtxClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(4, this.ctx.currentTime);

    this.filter.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  private start() {
    if (!this.ctx || !this.filter) return;

    // Sub-bass drone (55Hz / A1)
    this.osc1 = this.ctx.createOscillator();
    this.osc1.type = 'sine';
    this.osc1.frequency.setValueAtTime(55, this.ctx.currentTime);

    // Harmonic fifth (82.4Hz / E2) with slow LFO detuning
    this.osc2 = this.ctx.createOscillator();
    this.osc2.type = 'triangle';
    this.osc2.frequency.setValueAtTime(82.4, this.ctx.currentTime);

    const gain1 = this.ctx.createGain();
    gain1.gain.setValueAtTime(0.6, this.ctx.currentTime);
    const gain2 = this.ctx.createGain();
    gain2.gain.setValueAtTime(0.3, this.ctx.currentTime);

    this.osc1.connect(gain1);
    this.osc2.connect(gain2);

    gain1.connect(this.filter);
    gain2.connect(this.filter);

    this.osc1.start();
    this.osc2.start();

    this.isPlaying = true;
  }

  private stop() {
    if (this.osc1) {
      try { this.osc1.stop(); } catch { /* ignore */ }
      this.osc1.disconnect();
      this.osc1 = null;
    }
    if (this.osc2) {
      try { this.osc2.stop(); } catch { /* ignore */ }
      this.osc2.disconnect();
      this.osc2 = null;
    }
    this.isPlaying = false;
  }

  public triggerWarpPulse() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const pulseOsc = this.ctx.createOscillator();
      const pulseGain = this.ctx.createGain();
      pulseOsc.type = 'sine';
      pulseOsc.frequency.setValueAtTime(240, this.ctx.currentTime);
      pulseOsc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.8);

      pulseGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      pulseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.8);

      pulseOsc.connect(pulseGain);
      if (this.masterGain) pulseGain.connect(this.masterGain);

      pulseOsc.start();
      pulseOsc.stop(this.ctx.currentTime + 0.85);
    } catch {
      // Audio fallback
    }
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const cosmicAudio = new CosmicAudioEngine();
