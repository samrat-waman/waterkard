import { CustomerGroupsPageModule } from './customer/customer-groups/customer-groups.module';
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './auth/main/main.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  // },

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: MainComponent
  },

  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },

  {
    path: 'Cards',
    loadChildren: () => import('./cards/cards.module').then(m => m.CardsModule)
  },
  {
    path: 'Product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'Customers',
    loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule)
  },
  {
    path: 'customer-groups',
    loadChildren: () => import('./customer/customer-groups/customer-groups.module').then(m => m.CustomerGroupsPageModule)
  },
  {
    path: 'Drivers',
    loadChildren: () => import('./driver/driver.module').then(m => m.DriverModule)
  },
  {
    path: 'Orders',
    loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
  },
  {
    path: 'Payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentModule)
  },
  {
    path: 'Dispensers',
    loadChildren: () => import('./dispensers/dispensers.module').then(m => m.DispensersModule)
  },
  {
    path: 'Deposit',
    loadChildren: () => import('./deposite/deposite.module').then(m => m.DepositeModule)
  },
  {
    path: "Report",
    loadChildren: () =>
      import("./report/report.module").then((m) => m.ReportModule),
  },
  {
    path: "Invoice",
    loadChildren: () =>
      import("./invoice/invoice.module").then((m) => m.InvoiceModule),
  },
  {
    path: "Statement",
    loadChildren: () =>
      import("./statement/statement.module").then((m) => m.StatementModule),
  },
  {
    path: "Inventory",
    loadChildren: () =>
      import("./inventory/inventory.module").then((m) => m.InventoryModule),
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then(m => m.NotificationsPageModule)
  },
  {
    path: 'notification-detail',
    loadChildren: () => import('./notification-detail/notification-detail.module').then(m => m.NotificationDetailPageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/map.module').then(m => m.MapPageModule)
  },
  {
    path: 'Service-Request',
    loadChildren: () => import('./service-request/service-request.module').then(m => m.ServiceRequestModule)
  },
  {
    path: 'Service-History',
    loadChildren: () => import('./service-history/service-history.module').then(m => m.ServiceHistoryModule)
  },
  {
    path: 'Feedback',
    loadChildren: () => import('./feedback/feedback.module').then(m => m.FeedbackModule)
  },

  {
    path: 'Help-And-Support',
    loadChildren: () => import('./help-and-support/help-and-support.module').then(m => m.HelpAndSupportModule)
  },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.module').then(m => m.ShopPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
