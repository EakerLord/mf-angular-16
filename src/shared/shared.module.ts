import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { TemperaturePipe } from "../pipes/temperature.pipe";
import { SafeLinkDirective } from "../directives/safe-link.directive";

import { AuthDirective } from "../directives/auth.directive";

@NgModule({
  declarations: [ TemperaturePipe, SafeLinkDirective, AuthDirective ],
  imports: [ CommonModule, FormsModule ],
  exports: [ CommonModule, FormsModule, TemperaturePipe, SafeLinkDirective, AuthDirective ]
})
export class SharedModule {}
