import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ApiService {

 /**
  * Endereço da api.
  */
  private serverAddress: string = 'http://';

  /**
  * Header Padão da requisição com a api.
  */
  private defaultHeaders = { 'Content-Type': 'application/json', 'Accept-Language':'pt-br'};

  /**
   * Token do usuário
   */
  public UserToken:string = '';

  constructor(public http: Http) {
    console.log('Hello ApiService Provider');
  }

  /**
   * Função que realizar um post na api.
   * @param url Url do servido da api.
   * @param parametro Json de Parametros.
   * @return Retorna um json com dados do servidor.
   */
  apiPost(url:string, parametro:any){
    let headers = new Headers(this.defaultHeaders);
    // Verificar se tem token de acesso
    (this.UserToken!='') ? headers.append('Authorization', 'Bearer '.concat(this.UserToken)):false;
    let options = new RequestOptions({ headers: headers });
    return new Promise(resolve => {
      this.http.post(this.serverAddress + url, parametro, options)
      .map(res => res.json())
      .subscribe(data => {
        resolve(data);
      },
      error => {
        resolve(error._body);
      });
    });
  }

}
