import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlumnosService } from '../alumnos.service'; // Asegúrate de que la ruta sea correcta
import { User } from '../user.model'; // Asegúrate de que la ruta sea correcta
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'; // Importa MatCardModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Importa MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Importa MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Importa MatButtonModule
import { MatIconModule } from '@angular/material/icon'; // Importa MatIconModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ], // Añade los módulos de Angular Material aquí
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  datos: User[] = [];

  constructor(private servicio: AlumnosService, private router: Router) { }

  onLogin() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    this.servicio.getDatos().subscribe(
      (response: User[]) => {
        this.datos = response;
        console.log('Datos obtenidos:', this.datos);

        const user = this.datos.find(u => u.email === loginData.email && u.password === loginData.password);

        if (user) {
          alert('Login exitoso');
          // Almacenar el objeto del usuario en el localStorage
          localStorage.setItem('currentUser', JSON.stringify(user));
          // Redirigir a la página principal
          this.router.navigate(['/inicio']);return;
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      },
      (error) => {
        console.error('Error al obtener datos:', error);
      }
    );
  }
}