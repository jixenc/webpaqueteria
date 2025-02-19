import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { CustomerService } from '../../../../services/customer.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html'
})
export class CreateCustomerComponent implements OnInit {
  customerForm!: FormGroup;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private fb: FormBuilder, private breadcrumbService:BreadcrumbsService, private customerService:CustomerService, private router:Router){}
  ngOnInit(): void {
    this.customerForm = this.fb.group({
      clienteID:[null],
      codigoCliente:['', Validators.required],
      nombresCliente:['',Validators.required], //Para nombre de cliente a facturar
      apellidosCliente:['', Validators.required], //Para nombre de comercio
      estadoCliente:['', Validators.required], // EstadoCliente
      telefonoCliente:['', Validators.required],
      correoCliente:['', Validators.required],
      direccionCliente:['', Validators.required], //Para direccion de cliente
      municipio:['',Validators.required], //Para ciudad o Municipio = Municipio
      //postCode:['',Validators.required], //Para codigo Postal
      departamento:['', Validators.required], //Para País o region = Departamento
      nIT: ['', Validators.required],
      categoriaCliente:['', Validators.required],
      accion:['', Validators.required]

    });

    this.breadcrumbService.setBreadcrumbVisibility(false);
    }
    onSubmit(): void {

      if(this.customerForm.valid){
        const customerdataForm = this.customerForm.value;
        this.customerService.setCustomer(customerdataForm).subscribe((response:any)=>{

            console.log("Cliente registrado con exito");
            this.router.navigate(['dashboard/customers']);


        },
      (error)=>{
        console.log("Error al crear el cliente ", error);
      });
      }else{
        this.customerForm.markAllAsTouched();
      }

  }

}
