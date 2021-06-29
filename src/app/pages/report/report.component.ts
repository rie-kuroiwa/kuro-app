import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ModalService } from 'src/app/service/modal.service';
import { LineGraphComponent } from '../../components/charts/line-graph/line-graph.component';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {}

  openLineChart() {
    let param = null;
    this.modalService.openModal(
      this.viewContainerRef,
      param,
      LineGraphComponent
    );
  }
}
