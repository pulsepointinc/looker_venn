    constant: vis_id {
        value: "pp_venn"
        export: override_optional
    }
    constant: vis_label {
        value: "Venn/Euler (Custom)"
        export: override_optional
    }
    visualization: {
        id: "@{vis_id}"
        label: "@{vis_label}"
        file: "venn_euler.js"
    }