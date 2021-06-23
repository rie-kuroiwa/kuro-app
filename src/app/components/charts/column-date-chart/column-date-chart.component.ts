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

export const dateChartData = [
  {
    date: new Date(2018, 3, 20),
    value: 450,
    value2: 362,
    value3: 699,
  },
  {
    date: new Date(2018, 3, 21),
    value: 269,
    value2: 450,
    value3: 841,
  },
  {
    date: new Date(2018, 3, 22),
    value: 700,
    value2: 358,
    value3: 699,
  },
  {
    date: new Date(2018, 3, 23),
    value: 490,
    value2: 367,
    value3: 500,
  },
  {
    date: new Date(2018, 3, 24),
    value: 500,
    value2: 485,
    value3: 369,
  },
  {
    date: new Date(2018, 3, 25),
    value: 550,
    value2: 354,
    value3: 250,
  },
  {
    date: new Date(2018, 3, 26),
    value: 420,
    value2: 350,
    value3: 600,
  },
  {
    date: new Date(2018, 3, 27),
    value: 902,
    value2: 770,
    value3: 668,
  },
  {
    date: new Date(2018, 3, 28),
    value: 490,
    value2: 367,
    value3: 500,
  },
];

@Component({
  selector: 'app-column-date-chart',
  templateUrl: './column-date-chart.component.html',
  styleUrls: ['./column-date-chart.component.scss'],
})
export class ColumnDateChartComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private chart!: am4charts.XYChart;

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
    // チャートコードをここで設定
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create('dateChartdiv', am4charts.XYChart);

      // 上部ラベル作成
      chart.legend = new am4charts.Legend();
      chart.cursor = new am4charts.XYCursor();

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.renderer.minGridDistance = 50;
      dateAxis.renderer.labels.template.location = 0.0001;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = '達成率';

      // create series
      function createSeries(field: string, name: string) {
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = 'date';
        series.name = name;
        series.tooltipText = '{dateX}: [b]{valueY}[/]';

        let bullet = series.bullets.push(new am4charts.LabelBullet());
        bullet.dy = 30;
        bullet.label.text = '{valueY}';
        // グラフ内の値のフォントカラー
        bullet.label.fill = am4core.color('#ffffff');
      }

      chart.data = dateChartData;
      createSeries('value', 'Series #1');
      createSeries('value2', 'Series #2');
      createSeries('value3', 'Series #3');

      this.chart = chart;
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // コンポーネントが破棄されるとき、チャートをクリーンアップする
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
