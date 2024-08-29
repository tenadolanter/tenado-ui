export default {
  name: "ElDescriptionsRow",
  props: {
    row: {
      type: Array,
    },
  },
  inject: ["elDescriptions"],
  render(h) {
    const { elDescriptions } = this;
    const row = (this.row || []).map((item) => {
      return {
        ...item,
        label: item.slots.label || item.props.label,
        ...[
          "labelClassName",
          "contentClassName",
          "labelStyle",
          "contentStyle",
        ].reduce((res, key) => {
          res[key] = item.props[key] || elDescriptions[key];
          return res;
        }, {}),
      };
    });
    if (elDescriptions.direction === "vertical") {
      return (
        <tbody>
          <tr class="td-descriptions-row">
            {row.map((item) => {
              return (
                <th
                  class={{
                    "td-descriptions-item__cell": true,
                    "td-descriptions-item__label": true,
                    "has-colon": elDescriptions.border
                      ? false
                      : elDescriptions.colon,
                    "is-bordered-label": elDescriptions.border,
                    [item.labelClassName]: true,
                  }}
                  style={item.labelStyle}
                  colSpan={item.props.span}
                >
                  {item.label}
                </th>
              );
            })}
          </tr>
          <tr class="td-descriptions-row">
            {row.map((item) => {
              return (
                <td
                  class={[
                    "td-descriptions-item__cell",
                    "td-descriptions-item__content",
                    item.contentClassName,
                  ]}
                  style={item.contentStyle}
                  colSpan={item.props.span}
                >
                  {item.slots.default}
                </td>
              );
            })}
          </tr>
        </tbody>
      );
    }
    if (elDescriptions.border) {
      return (
        <tbody>
          <tr class="td-descriptions-row">
            {row.map((item) => {
              return [
                <th
                  class={{
                    "td-descriptions-item__cell": true,
                    "td-descriptions-item__label": true,
                    "is-bordered-label": elDescriptions.border,
                    [item.labelClassName]: true,
                  }}
                  style={item.labelStyle}
                  colSpan="1"
                >
                  {item.label}
                </th>,
                <td
                  class={[
                    "td-descriptions-item__cell",
                    "td-descriptions-item__content",
                    item.contentClassName,
                  ]}
                  style={item.contentStyle}
                  colSpan={item.props.span * 2 - 1}
                >
                  {item.slots.default}
                </td>,
              ];
            })}
          </tr>
        </tbody>
      );
    }
    return (
      <tbody>
        <tr class="td-descriptions-row">
          {row.map((item) => {
            return (
              <td
                class="td-descriptions-item td-descriptions-item__cell"
                colSpan={item.props.span}
              >
                <div class="td-descriptions-item__container">
                  <span
                    class={{
                      "td-descriptions-item__label": true,
                      "has-colon": elDescriptions.colon,
                      [item.labelClassName]: true,
                    }}
                    style={item.labelStyle}
                  >
                    {item.label}
                  </span>
                  <span
                    class={[
                      "td-descriptions-item__content",
                      item.contentClassName,
                    ]}
                    style={item.contentStyle}
                  >
                    {item.slots.default}
                  </span>
                </div>
              </td>
            );
          })}
        </tr>
      </tbody>
    );
  },
};
