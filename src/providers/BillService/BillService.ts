import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Http, Headers, ResponseContentType} from "@angular/http"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the BillService provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BillService {
  private host = "//api.huanxicloud.xyz";
  private headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});

  constructor(public http: Http) {
  }

  public getNames(){
    return this.get("/bill/getNames")
  }
  public getTotal() {
    return this.get("/bill/getTotalMoney");
  }
  public getCaptchaSrc():string{
    return this.host+`/bill/captcha.jpg?t=${new Date().getTime()}`;
  }
  /**
   * 单页获取账单卡片
   */
  public getBills(pageNo,size,orderBy,keyword,desc) {
    if (!keyword) keyword="";
    return this.get(`/bill/getBills?page=${pageNo}&size=${size}&orderBy=${orderBy}&keyword=${keyword}&desc=${desc}`);
  }

  public addBill(name:string,title:string,type:number,date:number,money:number,detail:string){
    return this.get(`/bill/add?money=${money}&time=${date}&name=${name}&type=${type}&title=${title}&detail=${detail}`);
  }

  public login(username:string,password:string,captcha:string) {
    return this.get(`/bill/login?username=${username}&password=${password}&captcha=${captcha}`);
  }

  public getDetailInfo(billId: number) {
    return this.get(`/bill/getDetailInfo?id=${billId}`);
  }

  /**
   * 全局获取 HTTP GET请求的方法
   * @Parry
   * @private
   * @param {string} url
   * @returns {Promise<string[] | ErrorObservable>}
   * @memberof RestProvider
   */
  private get(url: string): Observable<any> {
    return this.http.get(this.host + url, {
      withCredentials: true,
    }).map(function (res) {
      return res.json();
    }).catch(this.handleError);
  }

  /**
   * 全局获取 HTTP POST请求的方法
   * @Parry
   * @private
   * @param {string} url
   * @returns {Observable<string[]>}
   * @memberof RestProvider
   */
  public  post(url: string):
    Observable<any> {
    return this.http.post(this.host + url, {}, {
      withCredentials: true,
      headers: this.headers,
      responseType: ResponseContentType.Json
    }).map(function (res) {
      return res.json();
    }).catch(this.handleError);
  }

  /**
   * 处理请求中的错误，考虑了各种情况的错误处理并在 console 中显示 error
   *
   * @private
   * @param {(Response | any)} error
   * @returns
   * @memberof RestProvider
   */

  private handleError(error: any) {
    return Observable.throw(error);
  }
}

