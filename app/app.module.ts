import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {NgModule} from "@angular/core";
import {HeaderComponent} from "./components/general/header/header.component";
import {AsideComponent} from "./components/general/aside/aside.component";

@NgModule({
    imports: [ BrowserModule ],
    declarations: [
        AppComponent,
        HeaderComponent,
        AsideComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
