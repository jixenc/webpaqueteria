import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, MinValidator, Validators } from '@angular/forms';
import { BreadcrumbsService } from '../../../../services/breadcrumbs.service';
import { CustomerService } from '../../../../services/customer.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CustomersComponent } from '../../customers.component';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit {
  customereditForm!: FormGroup;
  customId: number = 0;
  customerNo: string = '';
 
constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private breadcrumbsService: BreadcrumbsService, private router:Router, private route:ActivatedRoute){
  this.customereditForm = this.formBuilder.group({
    clienteID:[],
    codigoCliente:[''],
    nombresCliente:['',Validators.required],
    apellidosCliente:['', Validators.required],
    direccionCliente:['', Validators.required],
    telefonoCliente:['', Validators.required],
    correoCliente:['', Validators.required],
    nit:['', Validators.required],
    categoriaCliente:['', Validators.required],
    departamento:['', Validators.required],
    municipio:['', Validators.required],
    estadoCliente:['', Validators.required],
    accion:['', Validators.required]
  });
}




  ngOnInit(): void {
   
    this.customId = Number(this.route.snapshot.paramMap.get('id'));
    this.breadcrumbsService.setBreadcrumbVisibility(false);

    if(this.customId >0){
      this.customerService.searchCus(this.customId).subscribe((customer)=>{
        this.customereditForm.patchValue({
          clienteID:this.customId,
          codigoCliente:customer.codigoCliente,
          nombresCliente:customer.nombresCliente,
          apellidosCliente:customer.apellidosCliente,
          direccionCliente:customer.direccionCliente,
          telefonoCliente:customer.telefonoCliente,
          correoCliente:customer.correoCliente,
          nit:customer.nit,
          categoriaCliente:customer.categoriaCliente,
          departamento:customer.departamento,
          municipio:customer.municipio,
          estadoCliente:customer.estadoCliente,
          accion:customer.accion

        });
        this.customerNo = customer.codigoCliente;
      });
    }
    
  }

  onSubmit():void{
    if(this.customereditForm.valid){
      const customerdataForm = this.customereditForm.value;
      console.log("Info de cliente a enviar: ",customerdataForm);
      this.customerService.setCustomer(customerdataForm).subscribe((response:any)=>{
      
          console.log("Cliente actualizado con exito ",response);
          this.router.navigate(['dashboard/customers']);
        
       
      },
    (error)=>{
      console.log("Error al crear el cliente ", error);
    });
    }else{
      const invalidFields = this.getInvalidFields(this.customereditForm);
      console.log('Campos inválidos: ', invalidFields);
      this.customereditForm.markAllAsTouched();
     
    }
  }

  getInvalidFields(formGroup: FormGroup): { [key: string]: any } {
    const invalidFields: { [key: string]: any } = {};
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control && control.invalid) {
        invalidFields[key] = control.errors; // Guardamos el campo junto con sus errores
      }
    });
    return invalidFields;
  }

}
