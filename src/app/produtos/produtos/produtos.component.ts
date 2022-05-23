import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Produto } from '../model/produto';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

  produtos$: Observable<Produto[]>;

  produtos_array: Produto[] = [];
  displayedColumns = ['nome', 'descricao', 'acao']

  constructor(
    private produtosService:ProdutosService,
    private snackBar:MatSnackBar,
    private router:Router,
    private activatedRoute: ActivatedRoute
    ) {
    this.produtos$ = produtosService.list()
      .pipe(
        catchError( error => {
          console.log(error);
          this.onError(error.message, "", 1000);
          return of([])
        })
      )
    //OU
    produtosService.list().subscribe(p => this.produtos_array = p)
  }

  ngOnInit(): void {
  }

  onError(msg:string, action:string, duration:number){
    this.snackBar.open(msg, action, {
      duration:duration
    })
  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.activatedRoute})
  }

  onDelete(id:number){
    this.produtosService.delete(id)
    .subscribe({
      next: (v) => console.log(v),
      error: (e) => console.log(e),
      complete: () => this.produtos$ = this.produtosService.list() 
    }); 
  }

  onEdit(){
    console.log('edit');
  }

}
