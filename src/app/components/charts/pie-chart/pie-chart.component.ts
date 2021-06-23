import {
  Component,
  OnInit,
  Inject,
  NgZone,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { isPlatformBrowser } from '@angular/common';

export const damyData = [
  {
    process: '調査',
    costs: 501.9,
    color: am4core.color('#ED1C24'),
  },
  {
    process: '計画',
    costs: 301.9,
    color: am4core.color('#00cc5b'),
  },
  {
    process: '設計',
    costs: 201.1,
    color: am4core.color('#ff47be'),
  },
  {
    process: '実装',
    costs: 165.8,
    color: am4core.color('#00d6f9'),
  },
  {
    process: '評価',
    costs: 139.9,
    color: am4core.color('#ffc107'),
  },
];

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart!: am4charts.XYChart;
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private zone: NgZone
  ) {}

  // ブラウザのみで機能を実行
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      console.log('pie', this.platformId);
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);
      let chart = am4core.create('chartPiediv', am4charts.PieChart);
      chart.data = damyData;

      let pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = 'costs';
      pieSeries.dataFields.category = 'process';

      // ドーナツ型にする設定(数値：内側のradius)
      chart.innerRadius = am4core.percent(40);

      // 各スライスの周りに太い白い境界線を置きます
      pieSeries.slices.template.stroke = am4core.color('#ffffff');
      pieSeries.slices.template.strokeOpacity = 1;

      // データに'color'キーがある場合、下記のようにスライステンプレートのpropertyFieldsを使用して、その値を塗りつぶし色として設定できます。
      // pieSeries.slices.template.propertyFields.fill = 'color';

      /**ラベルとティックの非表示設定
       * pieSeries.labels.template.disabled = true;
       * pieSeries.ticks.template.disabled = true;
       */

      /**
       * スライスホバー時のツールチップの非表示
       * pieSeries.slices.template.tooltipText = '';
       */

      /**
       * ラベルのフォントカラー設定     *
       * pieSeries.labels.template.fill = am4core.color('#694b00');
       *
       * ticksのカラー設定※ticksのfillOpacityを1にしないと色の変化が分かりにくい
       * pieSeries.ticks.template.fill = am4core.color('#ED1C24');
       * pieSeries.ticks.template.fillOpacity = 1;
       */

      /**
       * ホバー時にスライスを拡大しないようにする
       * let hs = pieSeries.slices.template.states.getKey('hover');
       * hs!.properties.scale = 1;
       */

      /**
       * クリック時にスライスを引き出したくない場合は、「アクティブ」状態を変更する
       * let as = pieSeries.slices.template.states.getKey('active');
       * as!.properties.shiftRadius = 0;
       */

      /**
       * 例）ホバー時の拡大を無効にし、スライスの塗りつぶしの不透明度を変更したい場合
       * ※この場合、スライステンプレートいopacity設定は必須
       * pieSeries.slices.template.fillOpacity = 1;
       * let hs = pieSeries.slices.template.states.getKey('hover');
       * hs!.properties.scale = 1;
       * hs!.properties.fillOpacity = 0.5;
       */

      // Add a legend(凡例追加)
      chart.legend = new am4charts.Legend();
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
