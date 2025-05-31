import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
//import { provideRouter } from '@angular/router';
//import { routes } from './app/app.routes';
//import { NgxPaginationModule } from 'ngx-pagination';

bootstrapApplication(AppComponent, appConfig,)
  .catch((err) => console.error(err));

  // bootstrapApplication(AppComponent, {
  //   ...appConfig,
  //   providers: [
  //     provideRouter(routes),
  //     importProvidersFrom(NgxPaginationModule), // Import NgxPaginationModule globally
  //   ],
  // }).catch((err) => console.error(err));
