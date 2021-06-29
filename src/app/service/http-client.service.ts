import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { PurchasingCollectionModel } from '../components/purchasing-collection/purchasing-collection.component';
import { PurchasingModel } from '../components/purchasing-detail/purchasing-detail.component';
import { ProductCollectionModel } from '../components/product-collection/product-collection.component';
import { ProductModel } from '../components/product-detail/product-detail.component';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  /**
   * Http クライアントを実行する際のヘッダーオプション
   * @private
   * @type{*}
   * @memberof HttpClientService
   * @description
   * 認証トークンを使用するために `httpOptions` としてオブジェクトを用意した。
   */

  private purchasingList = '/purchasing-list';
  private purchasingDetail = '/purchasing-detail';
  private productList = '/product-list';
  private productDetail = '/product-detail';

  private httpOptions: any = {
    // ヘッダー情報
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    // リクエストパラメータ
    params: null,
    body: null,
  };

  /**
   * RST-API 実行時に指定するURL
   *
   * バックエンドはExpress で実装し、ポート番号「3000」で待ち受けているため、
   * そのまま指定すると CORS でエラーになる
   * それを回避するため、ここではフロントエンドのポート番号「4200」を指定し、
   * AgularCLI のリバースプロキシを利用してバックエンドとの通信を実現する
   *
   * @private
   * @memberof ttpClientService
   */
  private host: string = environment.localHost;

  /**
   * コンストラクタ. HttpClientService のインスタンスを生成する
   *
   * @param {Http} http Httpサービスを DIする
   * @memberof HttpClientService
   */

  /**
   * REST-API 実行時のエラーハンドラ
   *
   * @private
   * @param{*} error
   * @return{*}
   * @memberof HttpClientService
   */
  private errorHandler(error: any) {
    console.error(error);
    try {
      alert('サーバー問い合わせ時にエラーが発生しました。');
    } catch (error) {
      console.log(error);
    }
    return of(null);
  }

  constructor(private http: HttpClient) {
    // `Authorization`に`Bearer トークン` をセットする
    // TODO 固定値のため動的に変更できるよう修正
    this.setAuthorization('my-auth-token');
  }

  /**
   * HTTP GET メソッドを実行する
   * (toPromise.then((res) =>{}) を利用する場合のコード)
   *
   * @returns {Promise<any[]>}
   * @menberof HttpClientService
   */
  public get(params: object = {}): Observable<any> {
    return this.http.get(this.host + '/get', this.httpOptions).pipe(
      map((result) => result),
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  /**
   * HTTP GET メソッドを実行する
   * 仕入れ一覧取得
   *
   * @returns {ObservableObservable<PurchasingCollectionModel[] | any>}
   * @menberof HttpClientService
   */
  public getPurchasingList(
    params: object = {}
  ): Observable<PurchasingCollectionModel[] | any> {
    return this.http
      .get<PurchasingCollectionModel[]>(
        this.host + this.purchasingList,
        this.httpOptions
      )
      .pipe(
        map((result) => result),
        catchError((error) => {
          return this.errorHandler(error);
        })
      );
  }

  /**
   * HTTP GET メソッドを実行する
   * 仕入れ詳細取得
   *
   * @returns {ObservableObservable<PurchasingModel[] | any>}
   * @menberof HttpClientService
   */
  public getPurchasingDetail(
    params: object = {}
  ): Observable<PurchasingModel[] | any> {
    return this.http
      .get<PurchasingModel[]>(
        this.host + this.purchasingDetail,
        this.httpOptions
      )
      .pipe(
        map((result) => result),
        catchError((error) => {
          return this.errorHandler(error);
        })
      );
  }

  /**
   * HTTP GET メソッドを実行する
   * 商品一覧取得
   *
   * @returns {ObservableObservable<ProductCollectionModel[] | any>}
   * @menberof HttpClientService
   */
  public getProductList(
    params: object = {}
  ): Observable<ProductCollectionModel[] | any> {
    return this.http
      .get<ProductCollectionModel[]>(
        this.host + this.productList,
        this.httpOptions
      )
      .pipe(
        map((result) => result),
        catchError((error) => {
          return this.errorHandler(error);
        })
      );
  }

  /**
   * HTTP GET メソッドを実行する
   * 商品詳細取得
   *
   * @returns {ObservableObservable<ProductModel[] | any>}
   * @menberof HttpClientService
   */
  public getProductDetail(
    params: object = {}
  ): Observable<ProductModel[] | any> {
    return this.http
      .get<ProductModel[]>(this.host + this.productDetail, this.httpOptions)
      .pipe(
        map((result) => result),
        catchError((error) => {
          return this.errorHandler(error);
        })
      );
  }

  // public get(callback:any) {
  //   let options:object = this.httpOptions;
  //   this.http.get(this.host + '/get',options).subscribe((result)=>{
  //     console.log('===========',result);
  //     const response:any = result;
  //               callback(response);
  //   },
  //   (error)=>{
  //      this.errorHandler(error);
  //   });
  // }

  //    public get(): Promise<any[]> {
  //   return this.http.get(this.host + '/get', this.httpOptions)
  //   .toPromise()
  //   .then((res)=>{
  //     // responsen の型は any ではなく interface で型を定義した方が良い
  //     const response:any = res;
  //     return response;
  //   })
  //   .catch(this.errorHandler);
  // }

  /**
   * メッセージの登録
   *
   * @param {*} リクエストボディー
   * @returns {Observable<any>} バックエンドからのレスポンス
   * @memberof HttpClientService
   */
  public register(body: any): Observable<any> {
    return this.http.post(this.host + '/post', body, this.httpOptions).pipe(
      map((result) => result),
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  /**
   * メッセージ更新
   *
   * @param {*} body リクエストボディ
   * @returns {Observable<any>} バックエンドからのレスポンス
   * @memberof HttpClientService
   */
  public update(body: any): Observable<any> {
    return this.http.put(this.host + '/put', body, this.httpOptions).pipe(
      map((result) => result),
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  /**
   * メッセージ削除
   *
   * @param {*} body
   * @returns {Observable<any>} バックエンドからのレスポンス
   * @memberof HttpClientService
   */
  public delete(body: any): Observable<any> {
    const options = this.httpOptions;
    options.body = body;
    return this.http.delete(this.host + '/delete', options).pipe(
      map((result) => result),
      catchError((error) => {
        return this.errorHandler(error);
      })
    );
  }

  /**
   * Authorization に認証トークンを設定する
   *
   * @param {string} token 認証トークン
   * @returns {void}
   * @memberof HttpClientService
   * @descripion
   * トークンを動的に設定できるようメソッドかしている
   * Bearer トークンをヘッダーに設定したい場合はこのメソッドを利用する
   */
  public setAuthorization(token: string = ''): void {
    if (!token) {
      return;
    }
    const bearerToken: string = `Bearer ${token}`;
    this.httpOptions.headers = this.httpOptions.headers.set(
      'Authorization',
      bearerToken
    );
  }
}
