import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  isLogoutModalVisible: boolean = false; 
  constructor(private router: Router) {}
  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  toggleLogoutModal(): void {
    this.isLogoutModalVisible = !this.isLogoutModalVisible;
  }

  logout(): void {
    // Lógica para cerrar sesión
    console.log('Cerrar sesión');
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.router.navigate(['/login'], { replaceUrl: true }).then(() => {
      window.location.reload();
    });
    return;
    this.toggleLogoutModal();
  }
}
