import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-create',
  templateUrl: './produto-create.component.html',
  styleUrls: ['./produto-create.component.css']
})
export class ProdutoCreateComponent implements OnInit {

  produto: Produto = {
    nome: '',
    categoria: '',
    foto: ''
  }

  
  nome: FormControl = new FormControl(null, [Validators.minLength(3)]);
  categoria: FormControl = new FormControl(null, [Validators.required]);
  foto: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service: ProdutoService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  create(): void {
    this.service.create(this.produto).subscribe(() => {
      this.toast.success('Produto adicionado com sucesso!', 'Cadastro');
      this.router.navigate(['produtos'])
    }, ex => {
      console.log(ex);
      if(ex.error.errors) {
        ex.error.errors.forEach(element => {
          this.toast.error(element.message);
        });
      } else {
        this.toast.error(ex.error.message);
      }
    })
  }
  
  validaCampos(): boolean {
    return this.nome.valid && this.foto.valid
  }
}
