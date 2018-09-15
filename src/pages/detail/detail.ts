import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {BillService} from "../../providers/BillService/BillService";
import {BaseUI} from "../../common/baseui";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage extends BaseUI{
  private id:number;
  private info={};
  constructor(public navCtrl: NavController,
              public toastController:ToastController,
              public billService:BillService,
              public navParams: NavParams) {
    super();
    this.id=navParams.get('id');
  }

  ionViewDidLoad() {
    this.billService.getDetailInfo(this.id).subscribe(res=>{
      console.log(res);
      if (res){
        this.info=res.msg;
      }else {
        this.showToast(this.toastController,res.msg);
      }
    },error1 => {
      this.showToast(this.toastController,"连接服务器失败")
    });
  }

}
