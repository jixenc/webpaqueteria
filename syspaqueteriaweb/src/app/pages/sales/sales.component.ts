import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent implements OnInit {

  salesOrder = {
    sellToCustomerNo: '10001',
    sellToContactNo: 'CT00007',
    sellToCustomerName: 'The Cannon Group PLC',
    sellToAddress: '192 Market Square',
    sellToCity: 'Birmingham',
    sellToPostCode: 'B27 4KT',
    sellToContact: 'Mr. Andy Teal',
    orderDate: '2017-01-26',
    salespersonCode: 'PS',
    campaignNo: '',
    responsibilityCenter: 'BIRMINGHAM',
    status: 'open',
    lines: [
      { no: '1', description: 'Item 1', locationCode: '', quantity: 10, unitOfMeasure: 'pcs' },
      { no: '2', description: 'Item 2', locationCode: '', quantity: 5, unitOfMeasure: 'pcs' }
    ],
    invoiceDiscountAmount: 0,
    totalExclVAT: 0,
    totalVAT: 0,
    totalInclVAT: 0
  };




  currentDate: string = '';

  sellToCustomerNo: string = '';
  postingDate: string = '';
  sellToContact: string = '';
  documentDate: string = '';
  sellToCustomerName: string = '';
  externalDocumentNo: string = '';
  sellToAddress: string = '';
  salespersonCode: string = '';

  // Detalle
  lines = [
    { type: '', no: '', description: '', quantity: 0, unitPrice: 0, lineAmount: 0 },
    // Puedes agregar más líneas o inicializarlas vacías
  ];
  items: any[] = []; // Lista completa de productos
  filteredItems: any[] = []; // Productos filtrados en tiempo real

  constructor(private http: HttpClient) {}

  // Método para buscar en la API
  onSearchItem(query: string) {
    if (query.length > 2) { // Empieza la búsqueda después de 3 letras
      this.http.get<any[]>(`https://api.example.com/products?search=${query}`)
        .subscribe(data => {
          this.filteredItems = data;
        });
    } else {
      this.filteredItems = [];
    }
  }

  // Método para seleccionar un producto
  selectItem(item: any) {
    // Asigna el valor seleccionado en el campo correspondiente
    console.log('Item seleccionado:', item);
    this.filteredItems = [];
  }


  ngOnInit(): void {
    // Obtén la fecha actual
    const today = new Date();
    const day = ('0' + today.getDate()).slice(-2);
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const year = today.getFullYear();

    // Formatea la fecha como YYYY-MM-DD para el input de tipo date
    this.currentDate = `${year}-${month}-${day}`;

   
  }
}
