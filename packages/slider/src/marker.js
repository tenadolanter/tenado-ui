export default {
  name: "TdMarker",

  props: {
    mark: {
      type: [String, Object],
    },
  },
  render() {
    let label = typeof this.mark === "string" ? this.mark : this.mark.label;

    return (
      <div class="td-slider__marks-text" style={this.mark.style || {}}>
        {label}
      </div>
    );
  },
};
