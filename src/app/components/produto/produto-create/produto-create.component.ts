import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Produto } from 'src/app/models/produto';
import { ProdutoService } from 'src/app/services/produto.service';

interface Pokemon {
  value: string;
  viewValue: string;
}

interface PokemonGroup {
  disabled?: boolean;
  name: string;
  pokemon: Pokemon[];
}

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

  ELEMENT_DATA: Produto[] = []


  displayedColumns: string[] = ['categoria'];
  dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  pokemonControl = new FormControl('');
  pokemonGroups: PokemonGroup[] = [
    {
      name: 'Grass',
      pokemon: [
        {value: 'bulbasaur-0', viewValue: 'Bulbasaur'},
        {value: 'oddish-1', viewValue: 'Oddish'},
        {value: 'bellsprout-2', viewValue: 'Bellsprout'},
      ],
    },
    {
      name: 'Water',
      pokemon: [
        {value: 'squirtle-3', viewValue: 'Squirtle'},
        {value: 'psyduck-4', viewValue: 'Psyduck'},
        {value: 'horsea-5', viewValue: 'Horsea'},
      ],
    },
    {
      name: 'Fire',
      disabled: true,
      pokemon: [
        {value: 'charmander-6', viewValue: 'Charmander'},
        {value: 'vulpix-7', viewValue: 'Vulpix'},
        {value: 'flareon-8', viewValue: 'Flareon'},
      ],
    },
    {
      name: 'Psychic',
      pokemon: [
        {value: 'mew-9', viewValue: 'Mew'},
        {value: 'mewtwo-10', viewValue: 'Mewtwo'},
      ],
    },
  ];

  
  nome: FormControl = new FormControl(null, [Validators.minLength(3)]);
  categoria: FormControl = new FormControl(null, [Validators.required]);
  foto: FormControl = new FormControl(null, [Validators.required]);

  constructor(
    private service: ProdutoService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  teste(): void {
    console.log()
  }

  findAll(): void {
    this.service.findAll().subscribe(resposta => {
      this.ELEMENT_DATA = resposta;
      this.dataSource = new MatTableDataSource<Produto>(this.ELEMENT_DATA);
      this.dataSource.paginator = this.paginator;
    })
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

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator
  }
}
