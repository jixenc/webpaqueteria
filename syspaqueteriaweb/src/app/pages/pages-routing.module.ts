import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomerComponent } from './customers/components/create-customer/create-customer.component';
import { CreateUserComponent } from './users/components/create-user/create-user.component';
import { HomeUserComponent } from './users/components/home-user/home-user.component';
import { HomeComponent } from './customers/components/home/home.component';
import { AuthGuard } from '../guards/auth.guard';
import { SalesComponent } from './sales/sales.component';  // Importa el componente Sales
import { CreateProductsComponent } from './products/create-products/create-products.component';
import { EditCustomerComponent } from './customers/components/edit-customer/edit-customer.component';
import { EditUserComponent } from './users/components/edit-user/edit-user.component';
import { HomeSalesComponent } from './sales/components/home-sales/home-sales.component';
import { NewSalesComponent } from './sales/components/new-sales/new-sales.component';
import { PendingsSalesComponent } from './sales/components/pendings-sales/pendings-sales.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { CreateSuppliersComponent } from './suppliers/create-suppliers/create-suppliers.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent },
      {
        path: 'users',
        component: UsersComponent,
        children: [
          { path: '', component: HomeUserComponent },
          { path: 'create-user', component: CreateUserComponent },
          { path: 'edit-user/:idUser', component: EditUserComponent }
        ]
      },
      { path: 'products', component: ProductsComponent },
      { path: 'products/create', component: CreateProductsComponent },
      {
        path: 'customers',
        component: CustomersComponent,
        children: [
          { path: '', component: HomeComponent },
          { path: 'create-customer', component: CreateCustomerComponent },
          { path: 'edit-customer/:id', component: EditCustomerComponent }
        ]
      },
      { 
        path: 'sales',
        component: SalesComponent,
        children:[
          {path: '', component: HomeSalesComponent},
          {path: 'new-sales', component: NewSalesComponent},
          {path: 'pendings-sales', component: PendingsSalesComponent}
        ]
      },
      {
        path:'suppliers',
        component: SuppliersComponent,
        children:[
          {path: '', component:SuppliersComponent},
          {path:'create-suppliers', component:CreateSuppliersComponent}
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

