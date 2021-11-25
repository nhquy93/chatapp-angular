import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "@modules/login/services/auth.guard";
import { ChatRoomComponent } from "./chat-room.component";

const moduleRoutes: Routes = [
    {
        path: '',
        canActivate: [AuthGuard],
        component: ChatRoomComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(moduleRoutes)],
    exports: [RouterModule]
})

export class ChatRoomRoutingModule { }