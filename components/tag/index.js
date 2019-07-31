// components/tag/index.js
Component({
  /**
   * Component properties
   */
  properties: {
    text: String,
  },

  /**
   * Component initial data
   */
  data: {
    // tag: null,
  },

  /**
   * Component methods
   */
  methods: {
    onTap() {
      console.log(1);
      this.triggerEvent('tapping', {
        text: this.properties.text,
      }, {});
    },
  },
});
