import {Component} from '@angular/core';
import {LoadingController, ModalController, NavController, ToastController} from 'ionic-angular';
import {AddPage} from "../add/add";
import {LoginPage} from "../login/login";
import {DetailPage} from "../detail/detail";
import {BillService} from "../../providers/BillService/BillService";
import {CookieService} from "ngx-cookie-service";
import {BaseUI} from "../../common/baseui";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends BaseUI {
  private total: number = 0;
  private billCount: number = 0;
  private orderby = 0;
  private desc = 0;
  private bills;
  private pageNo;//当前页数
  private size = 5;//页面大小
  public isFirstInto = true;
  private isLogin: boolean;
  private keyword:any;
  constructor(public navCtrl: NavController,
              public billService: BillService,
              public cookieService: CookieService,
              public toastController:ToastController,
              public loadingController: LoadingController,
              public modalController: ModalController) {
    super()
  }

  pushBills() {
    if (this.pageNo - 1 < this.billCount / this.size) {
      this.billService.getBills(this.pageNo, this.size, this.orderby,this.keyword,this.desc).subscribe(res => {
        this.billCount = res.total;
        this.bills = this.bills.concat(res.rows);
        this.pageNo += 1;
      });
    }
  }
  doOrderby(){
    let loading =this.showLoading(this.loadingController,'获取数据中');
    this.initData(loading);
  }
  search(e){
    if (e.keyCode == 13){
      //回车搜索
      this.doOrderby();
    }
  }
  /**
   * 初始化数据
   */
  initData(loading = null) {
    this.bills = [];
    //加载总数
    this.billService.getTotal().subscribe(res => {
      this.total = res.msg;
    });
    this.pageNo = 1;
    //加载第一页数据
    this.billService.getBills(this.pageNo, this.size, this.orderby,this.keyword,this.desc).subscribe(res => {
      this.billCount = res.total;
      this.bills = this.bills.concat(res.rows);
      if (loading) loading.dismiss();
      this.pageNo++;
    });
  }

  ionViewDidLoad() {
    this.isLogin = this.cookieService.get("isLogin") == '1';
  }

  ionViewCanEnter() {
    if (this.isFirstInto) {
      this.initData();
      this.isFirstInto = false;
    } else {
      //判断是否添加数据
      let isChange = this.cookieService.get("isChange");
      if (isChange == "true") {
        let loading = this.showLoading(this.loadingController, "正在刷新数据");
        this.initData(loading);
        this.cookieService.set("isChange", "false")
      }
    }

  }
  logout(){
    this.cookieService.set('isLogin','0');
    this.isLogin=false;
    this.showToast(this.toastController,'注销成功')
  }
  doRefresh(refresher) {
    this.initData();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 1500);
  }

  doInfinite(infiniteScroll) {
    setTimeout(() => {
      this.pushBills();
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  setClass(t) {
    return t == "0" ? "bill-out" : "bill-in";
  }

  toAddPage() {
    if (this.cookieService.get('isLogin') == '1')
      this.navCtrl.push(AddPage);
    else
      this.showLogin();
  }

  toDetailPage(billId: string) {
    this.navCtrl.push(DetailPage, {id: billId});
  }

  showLogin() {
    let model = this.modalController.create(LoginPage);
    model.onDidDismiss(() => {
      if (this.cookieService.get('isLogin') == '1') {
        this.navCtrl.push(AddPage);
        this.isLogin=true;
      }
    });
    model.present();
  }
}
