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
import { EditCustomerComponent } from './customers/components/edit-customer/edit-customer.component';
import { EditUserComponent } from './users/components/edit-user/edit-user.component';

const routes: Routes=[
  {path: 'dashboard', component: PagesComponent,canActivate:[AuthGuard],
    children:[
      {path:'',component: DashboardComponent},
      {path:'users', component:UsersComponent,canActivate:[AuthGuard],
        children:[
          {path: '', component:HomeUserComponent,canActivate:[AuthGuard]},
          {path:'create-user', component:CreateUserComponent,canActivate:[AuthGuard]},
          {path: 'edit-user/:idUser', component:EditUserComponent,canActivate:[AuthGuard]}
        ]
      },
      {path:'products', component:ProductsComponent,canActivate:[AuthGuard]},
      {path:'customers', component:CustomersComponent,canActivate:[AuthGuard],
        children: [
          { path: '', component: HomeComponent },
          { path: 'create-customer', component: CreateCustomerComponent },
          { path: 'edit-customer/:id', component:EditCustomerComponent}
          
        ]
      },
    ]
   },
   
  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PagesRoutingModule { }
