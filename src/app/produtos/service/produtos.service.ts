import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, Observable, tap } from 'rxjs';
import { Produto } from '../model/produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private API_URL = "http://localhost:8080/produtos";

  constructor(private httpClient:HttpClient) { }

  list():Observable<Produto[]>{
   return this.httpClient.get<Produto[]>(this.API_URL)
      .pipe(
        delay(1),
        first(),
        tap( r => console.log(r))
      )
  }
  listById(){

  }
  create(p:Produto){
    return this.httpClient.post(this.API_URL, p);
  }
  delete(id:number){
    return this.httpClient.delete(this.API_URL+"/"+id.toString());
  }
  edit(){

  }
}
