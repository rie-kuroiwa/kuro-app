import { Component, OnInit } from '@angular/core';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-http-client',
  templateUrl: './http-client.component.html',
  styleUrls: ['./http-client.component.scss'],
})
export class HttpClientComponent implements OnInit {
  /**
   * バックエンドから返却されたレスポンスをセットするプロパティ
   *
   * TODO:型はanyではなくinterfaceで型定義する
   *
   * @private
   * @type {string}
   * @memberof HttpClientComponent
   */
  public param: any = {};

  /**
   * バックエンドから返却されたメッセージをセットするプロパティ
   *
   * @type {*}
   * @memberof HttpClientComponent
   */
  public messageInfo: any = {
    id: null,
    message: null,
  };

  private endpoint: string = '/get';

  /**
   * バックエンドから返却されたメッセージを保持するリストプロパティ
   *
   * @type{*}
   * @memberof HttpClientComponent
   */
  public messageInfoList: any = [this.messageInfo];

  /**
   * メッセージ登録回数
   *
   * @private
   * @type {number}
   * @memberof HttpClientComponent
   */
  public messageId: number = 1;

  /**
   * 入力メッセージ
   *
   * @type {string}
   * @memberof HttpClientComponent
   */
  public message: string = '';

  /**
   * メッセージの登録
   *
   * @private
   * @memberof httpClientComponent
   */
  private doResister() {
    const body: any = {
      id: this.messageId,
      message: this.message,
    };
    this.httpClientService.register(body).subscribe(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * メッセージ更新
   *
   * @private
   * @memberof HttpClientComponent
   */
  private doUpdate() {
    const body: any = {
      id: this.messageId,
      message: this.message,
    };
    this.httpClientService.update(body).subscribe(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * メッセージの削除
   *
   * @private
   * @memberof httpClientComponent
   */
  private doDelete() {
    const body: any = {
      id: this.messageId,
    };
    this.httpClientService.delete(body).subscribe(
      (response) => {
        this.param = response;
        this.messageInfoList = this.param.messages;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  /**
   * コンストラクタ. HttpClinentComponent のインスタンスを生成する
   * HttpClientService を DIする
   *
   * @param {HttpClientService} ttpClientService HTTP通信を担当するサービス
   * @memberof HttpClientComponent
   */
  constructor(private httpClientService: HttpClientService) {}

  /**
   * ライフサイクルメソッド。コンポーネントの初期化で使用
   * コンポネントの初期化時にバックエンドから情報を取得してビューに表示する
   */

  ngOnInit(): void {
    this.httpClientService.get().subscribe((response) => {
      this.param = response;
      this.messageInfoList = this.param.messages;
    });

    // this.httpClientService.get((response:any)=>{
    //   this.param = response;
    //   this.messageInfoList = this.param.messages;
    // });

    // this.httpClientService.get().then((response)=>{
    //   this.param=response;
    //   this.messageInfoList = this.param.messages;
    // })
    // .catch(
    //   (error)=>console.log(error)
    // );
  }

  onClickRegister(e: any) {
    this.doResister();
  }

  onClickUpdate(e: any) {
    this.doUpdate();
  }

  onClickDelete(e: any) {
    this.doDelete();
  }
}
