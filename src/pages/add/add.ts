import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ToastController} from 'ionic-angular';
import {BillService} from "../../providers/BillService/BillService";
import {BaseUI} from "../../common/baseui";
import {CookieService} from "ngx-cookie-service";

/**
 * Generated class for the AddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage extends BaseUI {
  private name;
  private money: number = 100;
  private type = 0;
  private time;
  private detail: string;
  private title: string;
  private names = [];

  constructor(public navCtrl: NavController,
              public billService: BillService,
              public loadingController: LoadingController,
              public toastController: ToastController,
              public alertController:AlertController,
              public cookieService: CookieService,
              public navParams: NavParams) {
    super();
  }

  isNotEmpty(s){
    return s!=null&&s.length>0;
  }
  showAlert(msg) {
    const alert = this.alertController.create({
      title: '提示!',
      subTitle: msg,
      buttons: ['确认']
    });
    alert.present();
  }
  ionViewDidLoad() {
    this.time = new Date().toISOString();
    this.billService.getNames().subscribe(res => {
      this.names = res.msg;
      console.log(res.msg);
      if (this.names.length > 0) this.name = this.names[0].name;
    });
  }

  add() {
    if (!this.isNotEmpty(this.title)){
      this.showAlert("请输入标题");
      return;
    }
    if (!this.isNotEmpty(this.detail)){
      this.showAlert("请输入详细信息");
      return;
    }
    if (!this.isNotEmpty(this.name)){
      this.showAlert("请输入操作人");
      return;
    }
    if (!this.isNotEmpty(this.money)){
      this.showAlert("请输入操作金额");
      return;
    }
    let loading = this.showLoading(this.loadingController, "正在添加中...");
    this.billService.addBill(this.name, this.title, this.type, new Date(this.time).getTime(), this.money, this.detail).subscribe(
      res => {
        if (res.status == 1) {
          //添加成功，写入cookies 通知数据变动
          this.cookieService.set("isChange", "true");
          loading.dismiss();
          this.navCtrl.pop();
          this.showToast(this.toastController, res.msg);
        } else if (res.status == 2) { //未登入
          this.cookieService.set('isLogin', '0');
          loading.dismiss();
          this.navCtrl.pop();
          this.showToast(this.toastController, '登入信息已过期，请重新登入！');
        } else {
          //添加失败
          loading.dismiss();
          this.showToast(this.toastController, res.msg);
        }
      },
      error1 => {
        loading.dismiss();
        this.showToast(this.toastController, "网络异常或服务器异常");
      }
    );
  }
}
