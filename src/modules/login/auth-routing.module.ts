import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth.component";

const moduleRoutes: Routes = [
    { path: '', component: AuthComponent }
];

@NgModule({
    imports: [RouterModule.forChild(moduleRoutes)],
    exports: [RouterModule]
})

export class AuthRoutingModule { }