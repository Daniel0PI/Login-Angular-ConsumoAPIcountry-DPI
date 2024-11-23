import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CountryService } from '../country.service';
import { Country } from '../country.model';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule, MatPaginatorModule, FooterComponent, HeaderComponent],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  searchQuery: string = '';
  displayedColumns: string[] = ['index', 'name', 'capital', 'region', 'subregion', 'population', 'flag', 'actions'];
  dataSource = new MatTableDataSource<Country>();
  paginatedCountries: Country[] = [];
  currentUser: any;
  isLogoutModalVisible: boolean = false;
  editingElement: Country | null = null;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private countryService: CountryService, private router: Router) {}

  ngOnInit(): void {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
    this.countryService.getCountries().subscribe((data: Country[]) => {
      this.dataSource.data = data.map((country, index) => ({ ...country, index: index + 1 }));
      this.dataSource.paginator = this.paginator;
      this.updatePaginatedCountries();
    });
  }


  onSearch(): void {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.updatePaginatedCountries();
  }



  onPageChange(event: PageEvent): void {
    this.updatePaginatedCountries();
  }

  updatePaginatedCountries(): void {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    const endIndex = startIndex + this.paginator.pageSize;
    this.paginatedCountries = this.dataSource.filteredData.slice(startIndex, endIndex);
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

  onEdit(element: Country): void {
    // Clonar el elemento para editar
    this.editingElement = { ...element };

    // Usar el índice del objeto original para encontrar la fila en la tabla
    const index = this.dataSource.data.findIndex(country => country.index === element.index);

    if (index >= 0) {
        // Seleccionar la fila correspondiente
        const tableRows = document.querySelectorAll('table tbody tr');
        const row = Array.from(tableRows).find(row => {
            const cell = row.querySelector('td');
            return cell && parseInt(cell.textContent || '0', 10) === element.index;
        });

        if (row) {
            const cells = row.querySelectorAll('td');
            cells.forEach((cell, cellIndex) => {
                // Permitir edición solo en columnas específicas (excluir índice y acciones)
                if (cellIndex > 0 && cellIndex < cells.length - 1) {
                    const input = document.createElement('input');
                    // Manejar el caso donde el nombre es un objeto
                    const field = this.displayedColumns[cellIndex];
                    let value = (field === 'name' && typeof element[field] === 'object') 
                        ? element[field]?.common 
                        : cell.textContent?.trim() || '';

                    input.value = value;
                    input.addEventListener('input', (event) => {
                        const target = event.target as HTMLInputElement;
                        if (field === 'name' && typeof this.editingElement?.[field] === 'object') {
                            (this.editingElement[field] as any).common = target.value;
                        } else {
                            (this.editingElement as any)[field] = target.value;
                        }
                    });
                    cell.textContent = '';
                    cell.appendChild(input);
                }
            });
        }
    }
}

saveEdit(): void {
    if (this.editingElement) {
        // Buscar el índice del elemento a través de su identificador inmutable
        const index = this.dataSource.data.findIndex(country => country.index === this.editingElement?.index);

        if (index >= 0) {
            // Validar que el nombre común no esté vacío
            if (!this.editingElement.name.common || this.editingElement.name.common.trim() === '') {
                console.error('El nombre común del país no puede estar vacío.');
                return;
            }

            // Actualizar los datos de la tabla
            this.dataSource.data[index] = { ...this.editingElement };
            this.dataSource._updateChangeSubscription(); // Refrescar la tabla
            this.updatePaginatedCountries(); // Actualizar la paginación si aplica
            this.editingElement = null; // Salir del modo de edición
        }
    }
}



  
  onDelete(element: Country): void {
    const index = this.dataSource.data.indexOf(element);
    if (index >= 0) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription(); // Actualiza la tabla
      this.updatePaginatedCountries(); // Actualiza la paginación
    }
  }

  isInfoModalVisible: boolean = false;
  selectedCountry: Country | null = null;

  onMoreInfo(element: Country): void {
    this.selectedCountry = element;
    this.isInfoModalVisible = true;
  }

  closeInfoModal(): void {
    this.isInfoModalVisible = false;
    this.selectedCountry = null;
  }
}