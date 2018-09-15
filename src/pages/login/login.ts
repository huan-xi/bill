import {Component} from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams, ToastController, ViewController} from 'ionic-angular';
import {BaseUI} from "../../common/baseui";
import {CookieService} from "ngx-cookie-service";
import {BillService} from "../../providers/BillService/BillService";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage extends BaseUI {
  private username: any;
  private password: any;
  private captcha: any;
  private captchaSrc: any;

  constructor(public navCtrl: NavController,
              public toastController: ToastController,
              public billService: BillService,
              public loadingController: LoadingController,
              public cookieService: CookieService,
              public navParams: NavParams, public viewController: ViewController) {
    super();
  }

  refreshCaptcha() {
    console.log("test");
    this.captchaSrc = this.billService.getCaptchaSrc();
  }

  ionViewDidLoad() {
    this.refreshCaptcha();
  }

  login() {
    let loading = this.showLoading(this.loadingController, '登入中...');
    this.billService.login(this.username, this.password, this.captcha).subscribe(res => {
        console.log(res);
        if (res.status) {
          loading.dismiss();
          this.cookieService.set('isLogin','1');
          this.viewController.dismiss();
          this.showToast(this.toastController, res.msg);
        } else {
          loading.dismiss();
          this.refreshCaptcha();
          this.showToast(this.toastController, res.msg);
        }
      },
      error1 => {
        loading.dismiss();
        this.showToast(this.toastController, '连接服务器失败！')
      });

  }

  dismiss() {
    this.viewController.dismiss();
  }
}
