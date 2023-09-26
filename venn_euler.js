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
  
      const dimensions = [];
      const measures = [];
      const rowCap = 5;
  
      for (const row of data) {
        const keys = Object.keys(row);
        const dimensionKey = keys[0];
        const measureKey = keys[1];
        const columnName = row[dimensionKey].value;
        const measureValue = row[measureKey].value;
  
        dimensions.push(columnName);
        measures.push(measureValue);
      }
      
      const individualElements = Array.from(new Set(dimensions.flatMap(item => item.split(','))));
      
      if (individualElements.length >= rowCap) {
        //error
      }
  
      const labelArray = dimensions.map(replaceCommaWithSymbol);
      const setJSON = dimensions.map((dimension, i) => ({
        sets: dimension.includes(',') ? dimension.split(',').map(item => item.trim()) : [dimension],
        value: measures[i],
      }));
  
      const vizCanvas = document.createElement('canvas');
      vizCanvas.setAttribute("id", "myChart");
      const vizDiv = document.getElementById("vis");
      vizDiv.appendChild(vizCanvas);
  
      const ctx = document.getElementById("myChart");
  
      const diagramData = {
        labels: labelArray,
        datasets: [
          {
            label: 'Legend Label', //config.legend_text,
            data: [
              { sets: ['Soccer'], value: 2 },
              { sets: ['Tennis'], value: 0 },
              { sets: ['Volleyball'], value: 1 },
              { sets: ['Soccer', 'Tennis'], value: 1 },
              { sets: ['Soccer', 'Volleyball'], value: 0 },
              { sets: ['Tennis', 'Volleyball'], value: 100 },
              { sets: ['Soccer', 'Tennis', 'Volleyball'], value: 1 },
            ],
            // data: setJSON,
          },
        ],
      };
  
      const chart = new Chart(ctx, {
        type: 'venn', //config.diagram_type,
        data: diagramData,
        options: {
          layout: {
            padding: 0, //config.layout_padding,
          },
          plugins: {
            legend: {
              display: true, //config.legend_show,
            },
            title: {
              display: false,
            },
          },
          backgroundColor: '#D6EFFF', //config.background_color,
          borderColor: '#4E598C', //config.border_color,
          borderWidth: 1, //config.border_width,
          responsive: true, //config.autosizing,
          scales: {
            y: {
              ticks: {
                display: true, //config.labels_show,
                color: '#4E598C', //config.labels_color,
                font: {
                  size: 20, //config.labels_font_size,
                  family: 'Arial', //config.labels_font_family,
                },
              },
            },
            x: {
              ticks: {
                display: true, //config.data_labels_show
                color: '#4E598C', //config.data_labels_color
                font: {
                  size: 14, //config.data_labels_font_size
                  family: 'Arial', //config.data_labels_font_family
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
  