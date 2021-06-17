import { Component, OnInit } from '@angular/core';
import { PurchasingCollectionModel } from '../../components/purchasing-collection/purchasing-collection.component';
import { PurchasingModel } from '../../components/purchasing-detail/purchasing-detail.component';
import { HttpClientService } from '../../service/http-client.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-purchasing-list',
  templateUrl: './purchasing-list.component.html',
  styleUrls: ['./purchasing-list.component.scss'],
})
export class PurchasingListComponent implements OnInit {
  purchasingList: PurchasingCollectionModel[] = [];
  public purchasingDetail: PurchasingModel[] = [];
  constructor(private httpClientService: HttpClientService) {}

  ngOnInit(): void {
    forkJoin([
      this.httpClientService.getPurchasingList(),
      this.httpClientService.getPurchasingDetail(),
    ]).subscribe((res) => {
      console.log([res[0]]);
      this.purchasingList = res[0].messages;
      this.purchasingDetail = res[1].messages;
    });
  }
}
