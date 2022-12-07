import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-produto-delete',
  templateUrl: './produto-delete.component.html',
  styleUrls: ['./produto-delete.component.css']
})
export class ProdutoDeleteComponent implements OnInit {

  produto: Produto = {
    nome: '',
    categoria: '',
    foto: ''
  }

  constructor(
    private service: ProdutoService,
    private route: ActivatedRoute,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.produto.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  findById(): void {
    this.service.findById(this.produto.id).subscribe(resposta => {
      this.produto = resposta;
    })
  }

  delete(): void {
    this.service.delete(this.produto.id).subscribe(() => {
      this.toast.success('Produto deletado com sucesso!', 'Delete');
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


}
