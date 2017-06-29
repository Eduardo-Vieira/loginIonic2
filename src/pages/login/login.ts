import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/* providers */
import { ApiService } from "../../providers/api-service";

/* pages */
import { Home } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  public username:string;
  public password:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,public api: ApiService) {
  }

  ionViewDidLoad() {
    console.log('Load Login');
  }

  /**
   * Realizar acesso de login na api
   */
  doAccess(){
    let body = '{"cpf":"'.concat(this.username,'", "password":"',this.password,'"}');
    this.api.apiPost('/login', body).then((result)=>{
      if(result['code']=='200'){
        this.navCtrl.setRoot(Home);
      }
    });
  }

}
