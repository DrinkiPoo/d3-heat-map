import { offset1, offset2, offset3 } from "./offset.js";

fetch(
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
)
  .then((res) => res.json())
  .then((data) => func(data));

const func = (dataset) => {
  // Constants
  const base = dataset.baseTemperature;
  const data = dataset.monthlyVariance;

  const pad = { top: 100, bottom: 40, left: 60, right: 40 };
  const cell_w = 5;
  const cell_h = 25;
  const width = pad.left + cell_w * Math.ceil(data.length / 12) + pad.right;
  const height = pad.top + cell_h * 12 + pad.bottom;

  const minYear = new Date(d3.min(data, (d) => d.year).toString());
  const maxYear = new Date(d3.max(data, (d) => d.year).toString());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const colors = [
    "#0c2461",
    "#1e3799",
    "#4a69bd",
    "#6a89cc",
    "#f8c291",
    "#e55039",
    "#eb2f06",
    "#EA2027",
  ];

  // Scales
  const xScale = d3
    .scaleTime()
    .domain([minYear, maxYear])
    .range([0, width - pad.left - pad.right]);

  const yScale = d3
    .scaleBand()
    .domain(months)
    .range([0, height - pad.top - pad.bottom]);

  const colorScale = d3
    .scaleQuantize()
    .domain([
      d3.min(data, (d) => base + d.variance),
      d3.max(data, (d) => base + d.variance),
    ])
    .range(colors);

  const legendScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => base + d.variance),
      d3.max(data, (d) => base + d.variance),
    ])
    .range([0, 150]);

  console.log(
    d3.min(data, (d) => base + d.variance),
    d3.max(data, (d) => base + d.variance)
  );

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
    .attr("x", (d) => pad.left + xScale(new Date(d.year.toString())))
    .attr("y", (d) => pad.top + yScale(months[d.month - 1]))
    .attr("fill", (d) => colorScale(base + d.variance))
    .attr("data-year", (d) => d.year)
    .attr("data-month", (d) => d.month - 1)
    .attr("data-temp", (d) => base + d.variance);

  // Axes
  const xAxis = d3.axisBottom(xScale).ticks(26);
  const xTranslate = `translate(${pad.left}, ${height - pad.bottom})`;

  const yAxis = d3.axisLeft(yScale);
  const yTranslate = `translate(${pad.left}, ${pad.top})`;

  svg
    .append("g")
    .attr("id", "x-axis")
    .attr("transform", xTranslate)
    .call(xAxis);

  svg
    .append("g")
    .attr("id", "y-axis")
    .attr("transform", yTranslate)
    .call(yAxis);

  const legendAxis = d3
    .axisBottom(legendScale)
    // .tickFormat(2, "0.1f")
    .ticks(8, "0.1f");
  const legendTranslate = `translate(${pad.left}, ${pad.top - 40})`;
  svg.append("g").attr("transform", legendTranslate).call(legendAxis);

  // console.log(data);
  // END
};
