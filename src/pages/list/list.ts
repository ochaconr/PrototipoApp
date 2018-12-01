import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SociosService} from '../../services/socios.service';
import { DetailPage } from '../detail/detail';
import { NewPage } from '../new/new';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  searchQuery: string = '';
  socios = [];
  @ViewChild('myNav') nav: NavController
  constructor(public navCtrl: NavController, public sociosService : SociosService) {
    this.socios = sociosService.getSocios();
  }

  getFiltradoSocios(ev: any ) {
    // Reset items back to all of the items
    this.socios = this.sociosService.getSocios();
    console.log(this.socios);
    // set val to the value of the searchbar
    const val = ev.target.value;
    console.log(val);
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.socios = this.socios.filter((socio) => {
        var NombreCompleto = socio.Nombres +" "+ socio.ApellidoPaterno +" "+ socio.ApellidoMaterno;
        return (
          NombreCompleto.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  public goToDetail(id){
    this.navCtrl.push(DetailPage, {id:id});
  }

  public createSocio(){
    this.navCtrl.push(NewPage);
  }
}
