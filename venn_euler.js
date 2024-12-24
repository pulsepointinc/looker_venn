const visObject = {
  options: {
    diagram_type: {
      section: 'General',
      order: 1,
      type: 'string',
      label: 'Chart type',
      display: 'select',
      values: [{ Venn: 'venn' }, { Euler: 'euler' }],
      default: 'venn',
    },
    autosizing: {
      section: 'General',
      order: 2,
      type: 'boolean',
      label: 'Auto-size',
      default: true,
    },
    layout_padding: {
      section: 'General',
      order: 3,
      type: 'number',
      label: 'Layout padding',
      default: 10,
    },
    legend_show: {
      section: 'General',
      order: 4,
      type: 'boolean',
      label: 'Display legend',
      default: false,
    },
    legend_text: {
      section: 'General',
      order: 5,
      type: 'string',
      label: 'Legend label',
      default: '',
    },
    legend_font_family: {
      section: 'General',
      order: 6,
      type: 'string',
      display: 'select',
      label: 'Font family',
      values: [
        { Looker: '"Google Sans"' },
        {
          Helvetica:
            'BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        },
        {
          'Times New Roman':
            'Roboto, "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif',
        },
      ],
      default: '"Google Sans"',
    },
    legend_font_size: {
      section: 'General',
      order: 7,
      type: 'number',
      label: 'Font size (pt)',
      default: 12,
    },
    background_colors: {
      section: 'Circle',
      order: 1,
      type: 'array',
      display: 'colors',
      label: 'Background colors',
      default: ['#ffffff', '#9CDCFE'],
    },
    border_width: {
      section: 'Circle',
      order: 2,
      type: 'number',
      label: 'Border width (pt)',
      default: 1,
    },
    border_colors: {
      section: 'Circle',
      order: 3,
      type: 'array',
      display: 'colors',
      label: 'Border colors',
      default: ['#000000'],
    },
    labels_show: {
      section: 'Label',
      order: 1,
      type: 'boolean',
      label: 'Display labels',
      default: true,
    },
    labels_font_family: {
      section: 'Label',
      order: 2,
      type: 'string',
      display: 'select',
      label: 'Font family',
      values: [
        { Looker: '"Google Sans"' },
        {
          Helvetica:
            'BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        },
        {
          'Times New Roman':
            'Roboto, "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif',
        },
      ],
      default: '"Google Sans"',
    },
    labels_font_size: {
      section: 'Label',
      order: 3,
      type: 'number',
      label: 'Font size (pt)',
      default: 12,
    },
    labels_color: {
      section: 'Label',
      order: 4,
      type: 'string',
      display: 'color',
      label: 'Labels color',
      default: '#000000',
    },
    data_labels_show: {
      section: 'Data',
      order: 1,
      type: 'boolean',
      label: 'Display labels',
      default: true,
    },
    data_labels_hide_zeros: {
      section: 'Data',
      order: 2,
      type: 'boolean',
      label: 'Hide zeros',
      default: true,
    },
    data_labels_font_family: {
      section: 'Data',
      order: 3,
      type: 'string',
      display: 'select',
      label: 'Font Family',
      values: [
        { Looker: '"Google Sans"' },
        {
          Helvetica:
            'BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
        },
        {
          'Times New Roman':
            'Roboto, "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif',
        },
      ],
      default: '"Google Sans"',
    },
    data_labels_font_size: {
      section: 'Data',
      order: 4,
      type: 'number',
      label: 'Font size (pt)',
      default: 12,
    },
    data_labels_color: {
      section: 'Data',
      order: 5,
      type: 'string',
      display: 'color',
      label: 'Labels color',
      default: '#000000',
    },
  },

  create: function (element) {
    element.innerHTML = `
    <head>
    <link href='https://fonts.googleapis.com/css2?family=Google+Sans:wght@100;200;300;400;500;700;900&display=swap' rel='stylesheet'>
    </head>
  `;
  },

  updateAsync: function (
    data,
    element,
    config,
    queryResponse,
    details,
    doneRendering
  ) {
    this.clearErrors();

    // META
    const measures_count = queryResponse.fields.measures.length;
    const dimensions_count = queryResponse.fields.dimensions.length;
    const pivots_count = queryResponse.fields.pivots.length;
    const table_calculations_count =
      queryResponse.fields.table_calculations.length;

    // VALIDATION
    if (measures_count == 0) {
      this.addError({
        title: 'No measure',
        message: 'Visualization requires one dimension and one measure.',
      });
      return;
    }
    if (measures_count > 1) {
      this.addError({
        title: 'Too many measures',
        message: 'Visualization requires one dimension and one measure.',
      });
      return;
    }
    if (dimensions_count == 0) {
      this.addError({
        title: 'No dimension',
        message: 'Visualization requires one dimension and one measure.',
      });
      return;
    }
    if (dimensions_count > 1) {
      this.addError({
        title: 'Too many dimensions',
        message: 'Visualization requires one dimension and one measure.',
      });
      return;
    }
    if (pivots_count > 0 || table_calculations_count > 0) {
      this.addError({
        title: 'Pivots',
        message: "Visualization can't accept pivots or table calculations",
      });
      return;
    }

    const dimension_name = queryResponse.fields.dimensions[0].name;
    const measure_name = queryResponse.fields.measures[0].name;
    const result = [];

    const uniqueSets = new Set();
    for (const item of data) {
      const sets = item[dimension_name].value.split(',');
      for (const set of sets) {
        uniqueSets.add(set.trim());
      }
    }

    if (uniqueSets > 5) {
      this.addError({
        title: 'Too many elements',
        message: 'Visualization can handle up to 5 distinct groups',
      });
      return;
    }

    const externalDataSets = new Set();
    for (const item of data) {
      const sets = item[dimension_name].value;
      externalDataSets.add(sets);
    }

    const dimensions = Array.from(externalDataSets);
    const availableData = dimensions.map((dimension, i) =>
      dimension.includes(',')
        ? dimension.split(',').map((item) => item.trim())
        : [dimension]
    );

    function generateCombinations(setArray) {
      const result = [];
      const f = function (setArray, prefix) {
        for (let i = 0; i < setArray.length; i++) {
          result.push([...prefix, setArray[i]]);
          f(setArray.slice(i + 1), [...prefix, setArray[i]]);
        }
      };
      f(setArray, []);
      const sorted = result.sort((a, b) => a.length - b.length);
      return sorted;
    }

    const allCombinations = generateCombinations(Array.from(uniqueSets));
    const labelArray = Array.from(allCombinations).map((item) => {
      if (item.length > 1) {
        return item.join();
      } else {
        return item[0];
      }
    });

    for (const combination of allCombinations) {
      let value = 0;
      for (const item of data) {
        const itemSets = item[dimension_name].value
          .split(',')
          .map((s) => s.trim());

        for (const set of availableData) {
          if (
            set.sort().join(',') === combination.sort().join(',') &&
            itemSets.sort().join(',') === set.sort().join(',')
          ) {
            value = item[measure_name].value;
          }
        }
      }
      if (value == 0 && config.data_labels_hide_zeros) {
        value = '';
      }
      result.push({ sets: combination, value });
    }

    const vizCanvas = document.createElement('canvas');
    vizCanvas.setAttribute('id', 'myChart');
    const vizDiv = document.getElementById('vis');
    vizDiv.appendChild(vizCanvas);

    const ctx = document.getElementById('myChart');

    const diagramData = {
      labels: labelArray,
      datasets: [
        {
          label: config.legend_text,
          data: result,
        },
      ],
    };

    let chartStatus = Chart.getChart('myChart');
    if (chartStatus != undefined) {
      chartStatus.destroy();
    }

    const chart = new Chart(ctx, {
      type: config.diagram_type,
      data: diagramData,
      options: {
        layout: {
          padding: config.layout_padding,
        },
        plugins: {
          legend: {
            display: config.legend_show,
          },
          title: {
            display: false,
          },
        },
        backgroundColor: config.background_colors,
        borderColor: config.border_colors,
        borderWidth: config.border_width,
        responsive: config.autosizing,
        maintainAspectRatio: false,
        scales: {
          y: {
            ticks: {
              display: config.labels_show,
              font: {
                size: config.labels_font_size,
                family: config.labels_font_family,
              },
              color: config.labels_color,
            },
          },
          x: {
            ticks: {
              display: config.data_labels_show,
              font: {
                size: config.data_labels_font_size,
                family: config.data_labels_font_family,
              },
              color: config.labels_color,
            },
          },
        },
        onClick: function (event, elements) {
          const chartElement = elements[0];
          if (!chartElement) return;
          const index = chartElement.index;
          const dataPoint = data[index];
          if (!dataPoint) return;
          const dimensionLinks = dataPoint[dimension_name].links ?? [];
          const measureLinks = dataPoint[measure_name].links ?? [];
          const links = [...dimensionLinks, ...measureLinks];
          LookerCharts.Utils.openDrillMenu({
            event: event.native,
            links,
          });
          if (details.crossfilterEnabled)
            LookerCharts.Utils.toggleCrossfilter({
              row: dataPoint,
              event: event.native,
            });
        },
      },
    });

    doneRendering();
    var elementExists = document.getElementById('myChart');
    if (elementExists && !elementExists?.hasAttribute('style')) {
      return;
    }
  },
};

looker.plugins.visualizations.add(visObject);
