import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit, OnChanges {
  @Input() public data: { value: number; year: number }[] = [];

  private width = 700;
  private height = 700;
  private margin = 20;

  public svg: any;
  public svgInner: any;
  public yScale: any;
  public xScale: any;
  public xAxis: any;
  public yAxis: any;
  public yAxis2: any;
  public lineGroup: any;
  public points: any;

  constructor(public chartElem: ElementRef) {
  }

  ngOnInit(): void {
    this.initializeChart();

    setTimeout(() => {
      this.drawChart();
    });
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('data') && this.data) {
      this.drawChart();
    }
  }

  private initializeChart(): void {
    this.svg = d3
      .select(this.chartElem.nativeElement)
      .select('figure#linechart')
      .append('svg')
      .attr('height', this.height);
    this.svgInner = this.svg
      .append('g')
      .style(
        'transform',
        'translate(' + this.margin + 'px, ' + this.margin + 'px)'
      );

    this.yScale = d3
      .scaleLinear()
      .domain([
        (d3.max(this.data, (d) => d.value) || 0) + 1,
        (d3.min(this.data, (d) => d.value) || 0) - 1,
      ]);

    this.yAxis = this.svgInner
      .append('g')
      .attr('id', 'y-axis')
      .style('transform', 'translate(' + this.margin + 'px,  0)');

    this.yAxis2 = this.svgInner.append('g').attr('id', 'y-axis-2');

    this.xScale = d3
      .scaleLinear()
      .domain([
        (d3.min(this.data, (d) => d.year) || 0) - 1,
        (d3.max(this.data, (d) => d.year) || 0) + 1,
      ]);

    this.xAxis = this.svgInner.append('g').attr('id', 'x-axis');

    this.lineGroup = this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', '#6DC8C9')
      .style('stroke-width', '2px');
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawChart();
  }

  public drawChart(): void {
    if (!this.svgInner) {
      return;
    }
    const lineColor = '#6DC8C9';
    const dotColor = '#F3B1B1';
    const pointShape: 'circle' | 'square' = 'square';

    const newWidth = this.chartElem.nativeElement.getBoundingClientRect().width;
    const newHeight =
      this.chartElem.nativeElement.getBoundingClientRect().height;
    if (newWidth === 0 && newHeight === 0) {
      return;
    }
    this.svgInner.selectAll('.dynamicData').remove();

    this.width = newWidth;
    this.height = newHeight;
    this.svg.attr('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg.attr('width', this.width);
    this.svg.attr('height', this.height);

    this.xAxis.style(
      'transform',
      'translate(0, ' + (this.height - 2 * this.margin) + 'px)'
    );

    this.xScale.range([this.margin, this.width - 2 * this.margin]);
    this.yScale.range([0, this.height - 2 * this.margin]);

    const xAxisDatas: number[] = [];
    const xAxis = d3
      .axisBottom(this.xScale)
      .tickSize(0)
      .tickFormat((d: any) => {
        xAxisDatas.push(d);
        return d;
      });

    this.xAxis.call(xAxis);
    this.xAxis.style(
      'transform',
      'translate(0, ' + (this.height - 2 * this.margin) + 'px)'
    );

    this.xAxis.selectAll('.tick text').attr('dy', '1.1em');
    const yAxis = d3.axisLeft(this.yScale).ticks(5).tickSize(0);

    this.yAxis.call(yAxis);

    this.yAxis2.style(
      'transform',
      'translate(' + (this.width - 2 * this.margin) + 'px,  0)'
    );
    const yAxis2 = d3
      .axisLeft(this.yScale)
      .ticks(5)
      .tickFormat((d) => '')
      .tickSize(this.width - 3 * this.margin - 1);

    this.yAxis2.call(yAxis2);

    const line = d3
      .line()
      .x((d) => d[0])
      .y((d) => d[1])
      .curve(d3.curveMonotoneX);

    const points: [number, number][] = this.data.map((d) => [
      this.xScale(d.year),
      this.yScale(d.value),
    ]);

    this.lineGroup.attr('d', line(points)).style('stroke', lineColor);

    this.svgInner
      .append('g')
      .append('path')
      .attr('id', 'line')
      .style('fill', 'none')
      .style('stroke', lineColor)
      .style('stroke-width', '2px');

    const xScale = this.xScale;
    const yScale = this.yScale;
    const pointDatas: any[] = [];

    _.forEach(xAxisDatas, (xData) => {
      let selectedData: any = null;
      _.forEach(this.data, (d) => {
        if (!selectedData) {
          const dataDate = d.year;
          if (dataDate >= xData) {
            selectedData = d;
          }
        }
      });
      if (selectedData) {
        pointDatas.push(selectedData);
      }
    });

    if (pointShape === 'square') {
      this.svgInner
        .selectAll('myPoints')
        .data(pointDatas)
        .enter()
        .append('rect')
        .attr('class', 'dynamicData')
        .attr('fill', dotColor)
        .attr('stroke', '#FAFAFA')
        .attr('width', '12')
        .attr('height', '12')
        .attr('x', function (d: any) {
          return xScale(d.year) - 6;
        })
        .attr('y', function (d: any) {
          return yScale(d.value) - 6;
        });
    } else if (pointShape === 'circle') {
      this.svgInner
        .selectAll('myPoints')
        .data(pointDatas)
        .enter()
        .append('circle')
        .attr('class', 'dynamicData')
        .attr('fill', dotColor)
        .attr('stroke', '#FAFAFA')
        .attr('cx', function (d: any) {
          return xScale(d.year);
        })
        .attr('cy', function (d: any) {
          return yScale(d.value);
        })
        .attr('r', 6);
    }
  }
}
