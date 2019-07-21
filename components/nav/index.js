Component({
  properties: {
    title: String,
    first: Boolean,
    latest: Boolean,
  },
  data: {
    left: '/images/components/nav/triangle@left.png',
    disLeft: '/images/components/nav/triangle.dis@left.png',
    right: '/images/components/nav/triangle@right.png',
    disRight: '/images/components/nav/triangle.dis@right.png',
  },
  methods: {
    onLeft() {
      if (!this.properties.latest) {
        this.triggerEvent('next', {}, {});
      }
    },
    onRight() {
      if (!this.properties.first) {
        this.triggerEvent('previous', {}, {});
      }
    },
  },
});
