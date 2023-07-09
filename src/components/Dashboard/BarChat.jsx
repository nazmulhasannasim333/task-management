/* eslint-disable react/prop-types */
import * as d3 from "d3";
import React, { useEffect, useRef } from 'react';

const BarChat = ({data}) => {
    const chartRef = useRef(null)

    useEffect(() => {
        if (data && chartRef.current) {
          drawChart();
        }
        return () => {
            d3.select(chartRef.current).selectAll('*').remove();
          };
     }, [data]);

const drawChart = () => {
    const chartContainer = d3.select(chartRef.current);

    // Define chart dimensions
    const width = 600;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create SVG element
    const svg = chartContainer
      .append('svg')
      .attr('width', width)
      .attr('height', height);

        // Define custom colors for the bars
    const colorScale = d3.scaleOrdinal()
    .domain(data.map((d) => d.name))
    .range(['#E4572E', '#F4BC1C', '#4C78A8', '#55A868', '#C4AD66', '#5C8C6D']);

    // Create chart group
    const chart = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Define x and y scales
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .range([0, innerWidth])
      .padding(0.1);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)])
      .range([innerHeight, 0]);

    // Create x-axis
    chart
      .append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale));

    // Create y-axis
    chart.append('g').call(d3.axisLeft(yScale));

    // Create bars
    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => xScale(d.name))
      .attr('y', (d) => yScale(d.value))
      .attr('width', xScale.bandwidth())
      .attr('height', (d) => innerHeight - yScale(d.value))
      .attr('fill', (d) => colorScale(d.name));
  };


    return (
        <div ref={chartRef} />
    );
};

export default BarChat;