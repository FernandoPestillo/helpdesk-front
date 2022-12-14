import { Attribute } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService) { }
    
    ngOnInit(): void {
      this.router.navigate(['/produtos']);
      this.darkCheck();
    }
    
  logout() {
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info("Logout realizado com sucesso!", "Logout", { timeOut: 5000 });
  }
  
  public toggleTheme() {
    document.body.classList.toggle('dark');
  }
  
  ativo = 'true';
  darkCheck() {
    if (document.body.classList.contains('dark')) {
      this.ativo = 'true';
    } else {
      this.ativo = 'false';
    }
  }
  
  
}
