import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutosService } from '../service/produtos.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html',
  styleUrls: ['./produto-form.component.scss']
})
export class ProdutoFormComponent implements OnInit {

  form:FormGroup

  constructor(
    private formBuilder:FormBuilder,
    private produtoService:ProdutosService,
    private snackBar:MatSnackBar,
    private location:Location
    ){
    this.form = this.formBuilder.group({
        nome:[null],
        descricao:[null]
    })
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.produtoService.create(this.form.value)
    .subscribe({
      next: (v) => this.onSucess(),
      error: (e) => this.snackBar.open(e, "", {duration:1000 }),
      complete: () => console.info('complete') }
    )
  }

  onSucess(){
    this.snackBar.open("Cadastro realizado com sucesso", "", {duration:1000 })
    this.location.back();
  }

  onCancel(){
    this.location.back();
  }

}
