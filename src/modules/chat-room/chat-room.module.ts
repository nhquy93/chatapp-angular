import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { SharedModule } from "@shared/shared.module";
import { NzIconModule } from "ng-zorro-antd/icon";
import { ChatRoomRoutingModule } from "./chat-room-routing.module";
import { ChatRoomComponent } from "./chat-room.component";
import { ChatWindowComponent, MessageComponent, ProfileComponent, RoomListComponent, SideBarComponent } from "./components";
import { ChatRoomService } from "./services/chat-room.service";
import { IconDefinition } from '@ant-design/icons-angular';
import { PlusCircleOutline, UserAddOutline } from '@ant-design/icons-angular/icons';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ModalAddRoomComponent, ModalInviteMemberComponent } from "./components/modal";

const icons: IconDefinition[] = [
  UserAddOutline,
  PlusCircleOutline,
];

@NgModule({
  declarations: [
    SideBarComponent,
    ProfileComponent,
    MessageComponent,
    ChatRoomComponent,
    RoomListComponent,
    ChatWindowComponent,
    ModalAddRoomComponent,
    ModalInviteMemberComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChatRoomRoutingModule,
    NzIconModule.forChild(icons)
  ],
  providers: [
    ChatRoomService
  ]
})
export class ChatRoomModule { }