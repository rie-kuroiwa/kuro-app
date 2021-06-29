import {
  Injectable,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentRef,
} from '@angular/core';
import { Subject } from 'rxjs';
import { ModalTemplateComponent } from '../components/modal-template/modal-template.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  /**
   * モーダルウィンドウの作成元。
   * モーダルウィンドウを二度目以降にに呼び出したときに、
   * 先に作成したモーダルウィンドウをクリアするために変数で保存しておく。 */
  viewContainerRef: ViewContainerRef;

  /**
   * RxJSのサブジェクト。
   * モーダルウィンドウの呼び出し元にObservablewo返し、
   * モーダルウィンドウが閉じられたときは、それを通知(publish)する。
   */
  subject: Subject<any>;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  /**
   * モーダルウィンドウを開くメソッド。
   * モーダルウィンドウを表示するコンポーネントから呼び出す。
   * @param viewContainerRef 呼び出し元で生成し、渡す必要がある。
   * @param param 生成するモーダルウィンドウに表示するデータ
   * @param modalComponent デフォルト以外は呼び出し元で表示させたいcomponentを渡す(任意)。
   */

  public openModal(
    viewContainerRef: ViewContainerRef,
    param: any,
    modalComponent?: any
  ) {
    // モーダルウィンドウを呼び出す度にサブジェクトを新しく生成する。
    this.subject = new Subject();

    // モーダルウィンドウを二度目以降にに呼び出したときに、
    // モーダルウィンドウが無限に生成されないよう、先に作成したモーダルウィンドウを破棄する。
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }

    // viewContainerRefをクラスプロパティに保存
    this.viewContainerRef = viewContainerRef;

    // モーダルウィンドウを作成し、呼び出し元画面に追加

    let targetComponent = modalComponent || ModalTemplateComponent;
    let componentRef = this.createComponent(targetComponent, viewContainerRef);

    // 作成したモーダルウィンドウにデータを渡す。
    if (param) {
      componentRef.instance.data = param;
      param.click = this.retPublish();
    }

    // 呼び出し元にObservableを返す
    return this.subject.asObservable();
  }

  /**
   * モーダルウィンドウを破棄するメソッド。
   * 必要に応じ、表示するモーダルウィンドウコンポーネントから呼び出す。
   * ※通常はopen時に破棄するので、不要
   * @memberof ModalService
   */
  public modalDestroy() {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
  }

  /**
   * テンプレートからコンポーネントを作成し、viewContainerRefに追加する。
   * @param componentTemplate
   * @param viewContainerRef
   */
  private createComponent(
    modalComponent: any,
    viewContainerRef: ViewContainerRef
  ): ComponentRef<any> {
    let componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(modalComponent);
    return viewContainerRef.createComponent(componentFactory);
  }

  /**
   * Observableに値を通知(publish)するメソッドを返すメソッド。
   * モーダル画面から呼び出す。
   */
  private retPublish() {
    let subject = this.subject;
    return (retVal: string) => {
      try {
        subject.next(retVal);
        subject.complete();
      } catch (err) {
        subject.error(err);
      }
    };
  }
}
