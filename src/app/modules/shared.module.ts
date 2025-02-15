import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbActionsModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbDatepickerModule,
  NbDialogModule,
  NbFocusMonitor,
  NbFormFieldModule,
  NbGlobalPhysicalPosition,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbMenuModule,
  NbNativeDateService,
  NbSelectModule,
  NbSidebarModule,
  NbSidebarService,
  NbSpinnerModule,
  NbStatusService,
  NbTagModule,
  NbThemeModule,
  NbThemeService,
  NbTimepickerModule,
  NbToastrModule,
  NbToastrService,
  NbToggleModule,
  NbUserModule
} from '@nebular/theme';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbSidebarModule,
    NbButtonModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbEvaIconsModule,
    NbMenuModule.forRoot(),
    NbSpinnerModule,
    NbToastrModule.forRoot({
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      duration: 3000,
    }),
    NbDialogModule.forRoot({}),
    NbSelectModule,
    NbTimepickerModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbToggleModule,
    NbTagModule,
    NbBadgeModule,
    NbActionsModule,
    NbUserModule
  ],
  exports: [
    NbSidebarModule,
    NbButtonModule,
    NbThemeModule,
    NbLayoutModule,
    NbCardModule,
    NbFormFieldModule,
    NbInputModule,
    NbIconModule,
    NbEvaIconsModule,
    NbMenuModule,
    NbSpinnerModule,
    NbToastrModule,
    NbDialogModule,
    NbSelectModule,
    NbTimepickerModule,
    NbDatepickerModule,
    NbToggleModule,
    NbTagModule,
    NbBadgeModule,
    NbActionsModule,
    NbUserModule
  ],
  providers: [
    NbThemeService,
    NbStatusService,
    NbFocusMonitor,
    NbSidebarService,
    NbToastrService,
    NbNativeDateService,
  ],
})
export class SharedModule {}
