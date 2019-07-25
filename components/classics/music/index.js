import classBeh from '../classic-beh';

const bgMusic = wx.getBackgroundAudioManager();

Component({
  behaviors: [classBeh],
  properties: {
    src: String,
    title: String,
  },
  data: {
    playing: false,
    playSrc: '/images/components/classic/player@play.png',
    pauseSrc: '/images/components/classic/player@pause.png',
  },
  lifetimes: {
    attached() {
      this.recoverStatus();
      this.monitorStatus();
    },
  },
  methods: {
    onPlay() {
      if (!this.data.playing) {
        this.setData({
          playing: true,
        });
        bgMusic.src = this.properties.src;
        bgMusic.title = this.properties.title;
      } else {
        this.setData({
          playing: false,
        });
        bgMusic.pause();
      }
    },
    recoverStatus() {
      if (bgMusic.paused) {
        this.setData({
          playing: false,
        });
        return;
      }
      if (bgMusic.src === this.data.src) {
        this.setData({
          playing: true,
        });
      }
    },
    monitorStatus() {
      bgMusic.onPlay(() => {
        this.recoverStatus();
      });
      bgMusic.onPause(() => {
        this.recoverStatus();
      });
      bgMusic.onEnded(() => {
        this.recoverStatus();
      });
      bgMusic.onStop(() => {
        this.recoverStatus();
      });
    },
  },
});
