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
    dependencies: [
        "https://code.jquery.com/jquery-2.2.4.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/d3/4.13.0/d3.js",
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js",
        "https://cdn.jsdelivr.net/npm/chartjs-chart-venn@4.2.5/build/index.umd.min.js"
    ]
}