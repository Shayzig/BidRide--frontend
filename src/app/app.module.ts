import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { MainHeroComponent } from './main-hero/main-hero.component';
import { AppHeaderComponent } from './app-header/app-header.component';
import { RentFlowComponent } from './rent-flow/rent-flow.component';
import { RentalFleetComponent } from './rental-fleet/rental-fleet.component';
import { MediaCarListComponent } from './media-car-list/media-car-list.component';
import { MediaCarPreviewComponent } from './media-car-preview/media-car-preview.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FaqComponent } from './faq/faq.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { CarPageComponent } from './pages/car-page/car-page.component';
import { CarEditPageComponent } from './pages/car-edit-page/car-edit-page.component';
import { CarListComponent } from './cmps/car-list/car-list.component';
import { CarPreviewComponent } from './cmps/car-preview/car-preview.component';
import { CarFilterComponent } from './cmps/car-filter/car-filter.component'
import { CarDetailsComponent } from './cmps/car-details/car-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './cmps/about/about.component';
import { ModelDrivenComponent } from './cmps/model-driven/model-driven.component';
import { LoginSignupComponent } from './cmps/login-signup/login-signup.component';
import { BidRentComponent } from './cmps/bid-rent/bid-rent.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import en from '@angular/common/locales/en';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { UserBidsComponent } from './cmps/user-bids/user-bids.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { LoaderComponent } from './cmps/loader/loader.component';
import { DateDescPipe } from './pipes/date-desc.pipe';
import { NaturalTypePipe } from './pipes/natural-type.pipe';
import { ClickOutsideDirective } from './directives/click-outside.directive';





registerLocaleData(en);

@NgModule({
    declarations: [
        AppComponent,
        AppHeaderComponent,
        MainHeroComponent,
        RentFlowComponent,
        RentalFleetComponent,
        MediaCarListComponent,
        MediaCarPreviewComponent,
        FaqComponent,
        CarPageComponent,
        CarEditPageComponent,
        CarListComponent,
        CarPreviewComponent,
        CarFilterComponent,
        CarDetailsComponent,
        HomeComponent,
        AboutComponent,
        ModelDrivenComponent,
        LoginSignupComponent,
        BidRentComponent,
        UserBidsComponent,
        LoaderComponent,
        DateDescPipe,
        NaturalTypePipe,
        ClickOutsideDirective
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NzButtonModule,
        NzFormModule,
        NzIconModule,
        NzButtonModule,
        NzSelectModule,
        NzInputModule,
        NzDatePickerModule,
        NzPopoverModule,
        NzRateModule

    ],
    providers: [

        { provide: NZ_I18N, useValue: en_US }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }




