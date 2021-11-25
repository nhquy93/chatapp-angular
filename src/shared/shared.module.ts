import { NgModule } from "@angular/core";
import { NzSpinModule } from "ng-zorro-antd/spin";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzAlertModule } from "ng-zorro-antd/alert";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzAnchorModule } from "ng-zorro-antd/anchor";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzAvatarModule } from "ng-zorro-antd/avatar";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzCollapseModule } from "ng-zorro-antd/collapse";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzTypographyModule } from "ng-zorro-antd/typography";

const modules = [
    NzCardModule,
    NzGridModule,
    NzSpinModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    NzModalModule,
    NzAlertModule,
    NzAnchorModule,
    NzSelectModule,
    NzAvatarModule,
    NzButtonModule,
    NzToolTipModule,
    NzCollapseModule,
    NzTypographyModule,
];

@NgModule({
    imports: [
        ...modules
    ],
    exports: [
        ...modules
    ]
})
export class SharedModule { }