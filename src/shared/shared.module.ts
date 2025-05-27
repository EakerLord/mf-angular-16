import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TemperaturePipe } from "../pipes/temperature.pipe";
import { SafeLinkDirective } from "../directives/safe-link.directive";

import { AuthDirective } from "../directives/auth.directive";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [ TemperaturePipe, SafeLinkDirective, AuthDirective ],
  imports: [ CommonModule, FormsModule, RouterModule ],
  exports: [ CommonModule, FormsModule, RouterModule, TemperaturePipe, SafeLinkDirective, AuthDirective ]
})
export class SharedModule {}
