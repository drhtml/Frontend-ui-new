import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
} from '@angular/core';
import * as d3 from 'd3';

export interface IPieData {
  name: string;
  value: string;
  color?: string;
}
const defaultColors = ['#6DC8C9', '#F3B1B1', '#A5D8D9', '#F9D0B6', '#FCEAB8'];
export const getRandomColor = (index: number) => {
  if (defaultColors[index]) {
    return defaultColors[index];
  }
  return Math.floor(Math.random() * 16777215).toString(16);
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, OnChanges {
  @Input('data') data: IPieData[] = [
    { name: 'Dallas', value: '35', color: '#6DC8C9' },
    { name: 'Houston', value: '25', color: '#F3B1B1' },
    { name: 'San Diego', value: '18', color: '#A5D8D9' },
    { name: 'Chicago', value: '12', color: '#F9D0B6' },
    { name: 'Miami', value: '10', color: '#FCEAB8' },
  ];
  private margin = { top: 10, right: 30, bottom: 30, left: 40 };
  private width = 450;
  private height = 450;
  private svg: any;
  private svgG: any;
  private colors: any;
  private radius = Math.min(this.width, this.height) / 2 - this.margin.left;
  constructor(public chartElem: ElementRef) {}

  ngOnInit(): void {
    this.createSvg();
    this.createColors(this.data);

    setTimeout(() => {
      this.drawChart();
    });
  }

  public ngOnChanges(changes: any): void {
    if (changes.hasOwnProperty('data') && this.data) {
      this.drawChart();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.drawChart();
  }

  private createSvg(): void {
    this.svg = d3
      .select(this.chartElem.nativeElement)
      .select('figure#donut')
      .append('svg');
    this.svgG = this.svg.append('g');
  }

  private createColors(data: IPieData[]): void {
    let index = 0;
    const defaultColors = [
      '#6773f1',
      '#32325d',
      '#6162b5',
      '#6586f6',
      '#8b6ced',
      '#1b1b1b',
      '#212121',
    ];
    const colorsRange: string[] = [];
    this.data.forEach((element) => {
      if (element.color) colorsRange.push(element.color);
      else {
        colorsRange.push(defaultColors[index]);
        index++;
      }
    });
    this.colors = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.value.toString()))
      .range(colorsRange);
  }

  private drawChart(): void {
    if (!this.svg) {
      return;
    }
    this.svg.selectAll('.dynamicData').remove();

    this.width = this.chartElem.nativeElement.getBoundingClientRect().width;
    this.height = this.chartElem.nativeElement.getBoundingClientRect().height;
    this.svg.attr('viewBox', `0 0 ${this.width} ${this.height}`);
    this.svg.attr('width', this.width);
    this.svg.attr('height', this.height);

    this.svgG.attr(
      'transform',
      'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
    );
    this.radius = Math.min(this.width, this.height) / 2 - this.margin.left;

    // Compute the position of each group on the pie:
    const pie = d3
      .pie()
      .sort(null) // Do not sort group by size
      .value((d: any) => {
        return d.value;
      });
    const data_ready = pie(this.data as any);

    // The arc generator
    const arc = d3
      .arc()
      .innerRadius(this.radius * 0.5) // This is the size of the donut hole
      .outerRadius(this.radius * 0.8);

    // Another arc that won't be drawn. Just for labels positioning
    const outerArc = d3
      .arc()
      .innerRadius(this.radius * 0.9)
      .outerRadius(this.radius * 0.9);

    // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
    this.svgG
      .selectAll('allSlices')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('class', 'dynamicData')
      .attr('fill', (d: any) => this.colors(d.data.value))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    // Add the polylines between chart and labels:
    this.svgG
      .selectAll('allPolylines')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('stroke', 'black')
      .attr('class', 'dynamicData')
      .style('fill', 'none')
      .attr('stroke-width', 1)
      .attr('points', (d: any) => {
        const posA = arc.centroid(d); // line insertion in the slice
        const posB = outerArc.centroid(d); // line break: we use the other arc generator that has been built only for that
        const posC = outerArc.centroid(d); // Label position = almost the same as posB
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2; // we need the angle to see if the X position will be at the extreme right or extreme left
        posC[0] = this.radius * 0.95 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
        return [posA, posB, posC];
      });

    // Add the polylines between chart and labels:
    this.svgG
      .selectAll('allLabels')
      .data(data_ready)
      .enter()
      .append('text')
      .attr('class', 'dynamicData')
      .text((d: any) => {
        return d.data.name;
      })
      .attr('transform', (d: any) => {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        if (pos[0] > 0) {
          pos[0] += 12;
        } else {
          pos[0] -= 12;
        }
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', (d: any) => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
    this.svgG
      .selectAll('allLabels2')
      .data(data_ready)
      .enter()
      .append('text')
      .attr('class', 'dynamicData')
      .text((d: any) => {
        return `${d.data.value} %`;
      })
      .attr('transform', (d: any) => {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        pos[1] += 12;
        if (pos[0] > 0) {
          pos[0] += 12;
        } else {
          pos[0] -= 12;
        }
        return 'translate(' + pos + ')';
      })
      .style('text-anchor', (d: any) => {
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        return midangle < Math.PI ? 'start' : 'end';
      });
    this.svgG
      .selectAll('allLegends')
      .data(data_ready)
      .enter()
      .append('circle')
      .attr('class', 'dynamicData')
      .attr('cx', (d: any) => 0)
      .attr('cy', (d: any) => 0)
      .attr('r', (d: any) => 6)
      .attr('transform', (d: any) => {
        const pos = outerArc.centroid(d);
        const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = this.radius * 0.99 * (midangle < Math.PI ? 1 : -1);
        return 'translate(' + pos + ')';
      })
      .attr('fill', (d: any) => this.colors(d.data.value));
  }
}
