import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const appRoutes: Routes = [
    { path: '', redirectTo: '/auth', pathMatch: 'full' },
    {
        path: 'auth',
        loadChildren: () => import('@modules/login/auth.module').then(m => m.AuthModule)
    },
    {
        path: 'chat-room',
        loadChildren: () => import('@modules/chat-room/chat-room.module').then(m => m.ChatRoomModule),
    }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }