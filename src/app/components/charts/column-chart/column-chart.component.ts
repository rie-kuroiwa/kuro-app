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

export const progressData = [
  {
    date: '2021/01',
    research: 40,
    plan: 55,
    implement: 60,
  },
  {
    date: '2021/02',
    research: 30,
    plan: 78,
    implement: 69,
  },
  {
    date: '2021/03',
    research: 27,
    plan: 40,
    implement: 45,
  },
  {
    date: '2021/04',
    research: 50,

    plan: 33,
    implement: 75,
  },
];

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

      // tooltipを表示させる為、カーソルを有効化
      chart.cursor = new am4charts.XYCursor();

      // 上部ラベル(legend)の設定
      chart.legend = new am4charts.Legend();
      chart.legend.position = 'top';
      chart.legend.paddingBottom = 20;
      chart.legend.labels.template.maxWidth = 95;

      let xAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      xAxis.dataFields.category = 'date';
      // x軸のタイトル設定
      xAxis.title.text = 'サイクル';
      xAxis.renderer.cellStartLocation = 0.1;
      xAxis.renderer.cellEndLocation = 0.9;
      xAxis.renderer.grid.template.location = 0;
      // xAxis.renderer.line.strokeOpacity = 1;
      // xAxis.renderer.line.strokeWidth = 2;
      // xAxis.renderer.line.stroke = am4core.color('#dc3545');

      let yAxis = chart.yAxes.push(new am4charts.ValueAxis());
      yAxis.min = 0;
      yAxis.max = 100;

      /**
       * Y軸のメモリラベルの編集
       * yAxis.renderer.labels.template.fill = am4core.color('orange');
       * yAxis.renderer.labels.template.fontSize = 20;
       */

      /**
       * y軸のメモリの設定 ※defaultは非表示のため、表示させる
       * yAxis.renderer.ticks.template.disabled = false;
       * yAxis.renderer.ticks.template.strokeOpacity = 1;
       * メモリの色指定
       * yAxis.renderer.ticks.template.stroke = am4core.color('#dc3545');
       * メモリの太さ
       * yAxis.renderer.ticks.template.strokeWidth = 2;
       * メモリの長さ
       * yAxis.renderer.ticks.template.length = 10;
       */

      /**
       * 水平の値軸の編集
       * yAxis.renderer.grid.template.strokeOpacity = 1;
       * yAxis.renderer.grid.template.stroke = am4core.color('#dc3545');
       * yAxis.renderer.grid.template.strokeWidth = 4;
       */

      // yAxis.renderer.ticks.template.strokeOpacity = 1;
      // yAxis.renderer.ticks.template.strokeWidth = 2;
      // yAxis.renderer.ticks.template.length = 10;

      /**
       * y軸の項目表示を上部に、x軸の項目表示を右側にする
       * yAxis.renderer.opposite = true;
       * xAxis.renderer.opposite = true;
       */

      chart.data = progressData;
      this.eventChart = chart;
      this.eventXaxis = xAxis;

      this.createSeries('research', '調査', chart);
      this.createSeries('plan', '計画', chart);
      this.createSeries('implement', '実装', chart);
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
    series.dataFields.categoryX = 'date';
    series.name = name;

    // 棒チャートhover時にツールチップを表示
    series.tooltipText = '種別:{name}/時期:{categoryX}\nValue:{valueY}';

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

  /**
   * legendをクリックし棒グラフの表示非表示の際の棒グラフの位置をアニメーションさせる
   *
   * @private
   * @memberof ColumnChartComponent
   */
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
