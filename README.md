## Venn/Euler chart

This Looker visualization has been developed in-house at PulsePoint Inc. by the BI Team.

### Venn Diagram

A Venn diagram is a graphical representation that uses overlapping circles to show the relationships between different sets or groups of items. Each circle represents a set, and the overlapping areas between the circles indicate the elements that belong to multiple sets. Venn diagrams are commonly used to illustrate the intersections and differences between sets, making it easier to understand concepts like set theory, logic, and data analysis.

### Euler Diagram

An Euler diagram is a type of diagram used to visualize the relationships between sets or groups of items, just like Venn diagrams. However, Euler diagrams focus on showing the relationships in terms of inclusion or exclusion, without necessarily indicating the precise size or overlap of the sets. They are named after the Swiss mathematician Leonhard Euler, who developed the concept. Euler diagrams are particularly useful for illustrating logical relationships and categorical data.


In summary, both Venn and Euler diagrams are visual tools used to represent relationships between sets, but Venn diagrams emphasize the overlap between sets, while Euler diagrams emphasize the inclusion or exclusion of elements in sets.

#### Validations

* Visualization will accept up to 5 unique groups
* Visualization needs to be supplied with exactly one dimension and one measure (no pivots and table calculations are allowed)
    * Dimension representing group overlaps is a comma-delimited string (`string_agg` in BQ)

#### Options

* General
    * Show legend
    * Legend label
    * Type (`Venn/Euler`)
    * Chart color
    * Border color
    * Border width
    * Auto-Sizing
    * Padding
* Data
    * Show labels
    * Hide zeros
    * Font
    * Font size
    * Label color
* Labels
    * Show labels
    * Font
    * Font size
    * Label color