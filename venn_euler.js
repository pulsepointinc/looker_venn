const visObject = {
  
  options: {
    diagram_type: {
      default: 'venn',
      display: 'select',
      label: 'Chart type',
      order: 1,
      section: 'General',
      type: 'string',
      values: [
        { 'Venn': 'venn' },
        { 'Euler': 'euler' },
      ],
    },
    legend_show: {
      default: false,
      display_size: 'third',
      label: 'Show legend',
      order: 2,
      section: 'General',
      type: 'boolean',
    },
    legend_text: {
      section: 'General',
      type: "string",
      label: "Legend label",
      display_size: 'two-thirds',
      order: 3,
      default: ""
    },
    background_color: {
      section: 'General',
      display_size: 'third',
      order: 4,
      type: "string",
      label: "Background color",
      default: "#000000",
      display: "color"
    },
    border_color: {
      section: 'General',
      display_size: 'third',
      order: 5,
      type: "string",
      label: "Border color",
      default: "#000000",
      display: "color"
    },
    border_width: {
      default: 1,
      display_size: 'third',
      label: 'Border width (pt)',
      order: 6,
      section: 'General',
      type: 'number',
    },
    autosizing: {
      default: true,
      display_size: 'third',
      label: 'Auto-size',
      order: 7,
      section: 'General',
      type: 'boolean',
    },
    layout_padding: {
      default: 10,
      display_size: 'two-thirds',
      label: 'Layout padding',
      order: 8,
      section: 'General',
      type: 'number',
    },
    labels_show: {
      default: true,
      display_size: 'third',
      label: 'Show labels',
      order: 1,
      section: 'Labels',
      type: 'boolean',
    },
    labels_color: {
      section: 'Labels',
      display_size: 'third',
      order: 2,
      type: "string",
      label: "Labels color",
      default: "#000000",
      display: "color"
    },
    labels_font_size: {
      default: 12,
      display_size: 'third',
      label: 'Font size (pt)',
      order: 3,
      section: 'Labels',
      type: 'number',
    },
    labels_font_family: {
      default: '"Google Sans"',
      display: 'select',
      label: 'Font Family',
      order: 4,
      section: 'Labels',
      type: 'string',
      values: [
        { 'Looker': '"Google Sans"' },
        { 'Helvetica': 'BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif' },
        { 'Times New Roman': 'Roboto, "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif' },
      ],
    },
    data_labels_show: {
      default: true,
      display_size: 'third',
      label: 'Show labels',
      order: 1,
      section: 'Data',
      type: 'boolean',
    },
    data_labels_color: {
      section: 'Data',
      display_size: 'third',
      order: 2,
      type: "string",
      label: "Labels color",
      default: "#000000",
      display: "color"
    },
    data_labels_font_size: {
      default: 12,
      display_size: 'third',
      label: 'Font size (pt)',
      order: 3,
      section: 'Data',
      type: 'number',
    },
    data_labels_font_family: {
      default: '"Google Sans"',
      display: 'select',
      label: 'Font Family',
      order: 4,
      section: 'Data',
      type: 'string',
      values: [
        { 'Looker': '"Google Sans"' },
        { 'Helvetica': 'BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif' },
        { 'Times New Roman': 'Roboto, "Noto Sans", "Noto Sans JP", "Noto Sans CJK KR", "Noto Sans Arabic UI", "Noto Sans Devanagari UI", "Noto Sans Hebrew", "Noto Sans Thai UI", Helvetica, Arial, sans-serif' },
      ],
    },
  },

  create: function (element, config) {
    element.innerHTML = "";
  },

  updateAsync: function (data, element, config, queryResponse, details, doneRendering) {
    function replaceCommaWithSymbol(str) {
      return str.replace(/,/g, ' ∩ ');
    }

    const result = [];

    const uniqueSets = new Set();
    for (const item of data) {
      const sets = item['npi_list_aggregate.lists'].value.split(',');
      for (const set of sets) {
        uniqueSets.add(set.trim());
      }
    }

    
    const externalDataSets = new Set();
    for (const item of data) {
      const sets = item['npi_list_aggregate.lists'].value;
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
      const sorted = result.sort((a,b) => a.length - b.length)
      return sorted;
    }

    const allCombinations = generateCombinations(Array.from(uniqueSets));
    console.log(allCombinations, 'asd')
    const labelArray = Array.from(allCombinations).map((item) => {
      if(item.length > 1) {
        return item.join()
      } else {
        return item[0];
      }
    })
    
    
    for (const combination of allCombinations) {
      let value = 0;
      for (const item of data) {
        const itemSets = item['npi_list_aggregate.lists'].value
          .split(',')
          .map((s) => s.trim());

        console.log(item['npi_list_aggregate.lists'].value)

        for (const set of availableData) {
          if (
            set.sort().join(',') === combination.sort().join(',') &&
            itemSets.sort().join(',') === set.sort().join(',')
          ) {
            value = item['npi_reference.count'].value;
          }
        }
      }
      result.push({ sets: combination, value });
    }

    console.log(result)
    
    const vizCanvas = document.createElement('canvas');
    vizCanvas.setAttribute("id", "myChart");
    const vizDiv = document.getElementById("vis");
    vizDiv.appendChild(vizCanvas);

    const ctx = document.getElementById("myChart");

    const diagramData = {
      labels: labelArray,
      datasets: [
        {
          label: config.legend_text,
          data: result,
        },
      ],
    };

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
        backgroundColor: config.background_color,
        borderColor: config.border_color,
        borderWidth: config.border_width,
        responsive: config.autosizing,
        scales: {
          y: {
            ticks: {
              display: config.labels_show,
              color: config.labels_color,
              font: {
                size: config.labels_font_size,
                family: config.labels_font_family,
              },
            },
          },
          x: {
            ticks: {
              display: config.data_labels_show,
              color: config.data_labels_color,
              font: {
                size: config.data_labels_font_size,
                family: config.data_labels_font_family,
              },
            },
          },
        },
      },
    });

    doneRendering();
  },
};

looker.plugins.visualizations.add(visObject);
