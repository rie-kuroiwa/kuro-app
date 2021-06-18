import {
  Component,
  OnInit,
  Inject,
  NgZone,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-column-chart',
  templateUrl: './column-chart.component.html',
  styleUrls: ['./column-chart.component.scss'],
})
export class ColumnChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart!: am4charts.XYChart;
  private eventChart!: am4charts.XYChart;
  private eventXaxis!: am4charts.CategoryAxis<am4charts.AxisRenderer>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone
  ) {}

  // ブラウザのみで機能を実行
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create('columnChartdiv', am4charts.XYChart);
      // グラフの色設定
      chart.colors.step = 2;

      // 上部ラベルの設定
      chart.legend = new am4charts.Legend();
      chart.legend.position = 'top';
      chart.legend.paddingBottom = 20;
      chart.legend.labels.template.maxWidth = 95;

      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      xAxis.dataFields.category = 'category';
      xAxis.renderer.cellStartLocation = 0.1;
      xAxis.renderer.cellEndLocation = 0.9;
      xAxis.renderer.grid.template.location = 0;

      let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.min = 0;

      chart.data = [
        {
          category: 'Place #1',
          first: 40,
          second: 55,
          third: 60,
        },
        {
          category: 'Place #2',
          first: 30,
          second: 78,
          third: 69,
        },
        {
          category: 'Place #3',
          first: 27,
          second: 40,
          third: 45,
        },
        {
          category: 'Place #4',
          first: 50,

          second: 33,
          third: 22,
        },
      ];
      this.eventChart = chart;
      this.eventXaxis = xAxis;

      this.createSeries('first', 'The First', chart);
      this.createSeries('second', 'The Second', chart);
      this.createSeries('third', 'The Third', chart);
      this.chart = chart;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    // コンポーネントが破棄されるとき、チャートをクリーンアップする
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  createSeries(value: string, name: string, chart: am4charts.XYChart) {
    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = value;
    series.dataFields.categoryX = 'category';
    series.name = name;

    series.events.on('hidden', this.arrangeColumns);
    series.events.on('shown', this.arrangeColumns);

    let bullet = series.bullets.push(new am4charts.LabelBullet());
    bullet.interactionsEnabled = false;
    // グラフ内の値の位置
    bullet.dy = 30;
    bullet.label.text = '{valueY}';
    // グラフ内の値のフォントカラー
    bullet.label.fill = am4core.color('#ffffff');

    return series;
  }

  private arrangeColumns = () => {
    let series = this.eventChart.series.getIndex(0);

    let w =
      1 -
      this.eventXaxis.renderer.cellStartLocation -
      (1 - this.eventXaxis.renderer.cellEndLocation);
    if (series!.dataItems.length > 1) {
      let x0 = this.eventXaxis.getX(
        (series as any).dataItems.getIndex(0),
        'categoryX'
      );
      let x1 = this.eventXaxis.getX(
        (series as any).dataItems.getIndex(1),
        'categoryX'
      );
      let delta = ((x1 - x0) / this.eventChart.series.length) * w;
      if (am4core.isNumber(delta)) {
        let middle = this.eventChart.series.length / 2;

        let newIndex = 0;
        this.eventChart.series.each((series) => {
          if (!series.isHidden && !series.isHiding) {
            series.dummyData = newIndex;
            newIndex++;
          } else {
            series.dummyData = this.eventChart.series.indexOf(series);
          }
        });
        let visibleCount = newIndex;
        let newMiddle = visibleCount / 2;

        this.eventChart.series.each(() => {
          let trueIndex = this.eventChart.series.indexOf(series!);
          let newIndex = series?.dummyData;

          let dx = (newIndex - trueIndex + middle - newMiddle) * delta;

          series?.animate(
            { property: 'dx', to: dx },
            series.interpolationDuration,
            series.interpolationEasing
          );
        });
      }
    }
  };
}
