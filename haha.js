fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
)
  .then((res) => res.json())
  .then((data) => func(data));

const func = (dataset) => {
  // Constants
  const base = dataset.baseTemperature;
  const data = dataset.monthlyVariance;

  const cell_w = 5;
  const cell_h = 25;
  const padding = { top: 40, bottom: 40, left: 40, right: 40 };
  const width =
    cell_w * Math.ceil(data.length / 12) + padding.left + padding.right;
  const height = cell_h * 12 + padding.top + padding.bottom;

  const minYear = new Date(d3.min(data, (d) => d.year).toString());
  const maxYear = new Date(d3.max(data, (d) => d.year).toString());

  const minMonth = new Date(
    (d3.min(data, (d) => d.month) - 0.9) * 30 * 24 * 60 * 60 * 1000
  );
  const maxMonth = new Date(
    (d3.max(data, (d) => d.month) - 0) * 30 * 24 * 60 * 60 * 1000
  );
  console.log(minMonth, maxMonth, minMonth.getTimezoneOffset());

  // Scales
  const xScale = d3
    .scaleTime()
    .domain([minYear, maxYear])
    .range([0, width - padding.left - padding.right]);

  // const yScale = d3
  //   .scaleBand()
  //   .domain([12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  //   .range([height - padding.bottom, padding.top]);

  const yScale = d3
    .scaleTime()
    .domain([minMonth, maxMonth])
    .range([height - padding.bottom, padding.top]);

  const colorScale = d3
    .scaleQuantize()
    .domain([
      d3.min(data, (d) => base + d.variance),
      d3.max(data, (d) => base + d.variance),
    ])
    .range([
      "#0c2461",
      "#1e3799",
      "#4a69bd",
      "#6a89cc",
      "#f8c291",
      "#e55039",
      "#eb2f06",
      "#EA2027",
    ]);

  // Big Daddy SVG
  const svg = d3
    .select("#container")
    .append("svg")
    .attr("height", height)
    .attr("width", width)
    .style("border", "1px solid black");

  // Rects
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("height", cell_h)
    .attr("width", cell_w)
    .attr("x", (d) => xScale(new Date(d.year.toString())))
    .attr("y", (d) => yScale(d.month))
    .attr("fill", (d) => colorScale(base + d.variance))
    .attr("data-year", (d) => d.year)
    .attr("data-month", (d) => d.month)
    .attr("data-temp", (d) => base + d.variance);

  // Axes
  const xAxis = d3.axisBottom(xScale).ticks(26);
  const yAxis = d3.axisLeft(yScale).ticks(12);

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", "translate(0, 340)")
    .call(xAxis);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", "translate(40, 0)")
    .call(yAxis);

  console.log(data);
  console.log(d3.max(data, (d) => base + d.variance));
  console.log(d3.min(data, (d) => base + d.variance));
  // console.log(yScale.domain(), yScale.range());
  // END
};
