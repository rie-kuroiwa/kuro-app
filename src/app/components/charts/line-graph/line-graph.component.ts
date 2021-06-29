import {
  Component,
  OnInit,
  Inject,
  NgZone,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  Renderer2,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { modalAnimation } from '../../../animations';

import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { ModalService } from '../../../service/modal.service';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
  animations: [modalAnimation],
})
export class LineGraphComponent implements OnInit, AfterViewInit, OnDestroy {
  private chart!: am4charts.XYChart;
  isOpen: boolean;

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private renderer: Renderer2,
    private zone: NgZone,
    private modalService: ModalService
  ) {
    this.isOpen = true;
    // モーダル表示時に全体のスクロールを無効にする
    this.renderer.addClass(document.body, 'display-modal');
  }

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

      let chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round(
          (Math.random() < 0.5 ? 1 : -1) * Math.random() * 10
        );
        data.push({
          date: new Date(2018, 0, i),
          name: 'name' + i,
          value: visits,
        });
      }
      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip!.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = 'date';
      series.dataFields.valueY = 'value';
      series.tooltipText = '{valueY.value}';

      chart.cursor = new am4charts.XYCursor();

      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      chart.scrollbarX = scrollbarX;

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

  closeModal() {
    this.isOpen = false;

    // スクロール防止用スタイルクラスをbodyから削除
    this.renderer.removeClass(document.body, 'display-modal');

    // 通常はここではウィンドウ破棄の必要はないが、chartの仕様上、ここで破棄実行
    this.modalService.modalDestroy();
  }
}
