Component({
  properties: {
    likeStatus: Boolean,
    favNums: Number,
  },
  data: {
    yesSrc: '/images/components/like/like.png',
    noSrc: '/images/components/like/unlike.png',
  },
  methods: {
    onLike() {
      const { likeStatus, favNums } = this.properties;

      const count = likeStatus ? favNums - 1 : favNums + 1;
      this.setData({
        favNums: count,
        likeStatus: !likeStatus,
      });

      const behavior = this.properties.likeStatus ? 'like' : 'cancel';

      this.triggerEvent('like', { behavior }, {});
    },
  },
});
