import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController  } from 'ionic-angular';
import { SociosService } from '../../services/socios.service';
import { ListPage } from '../../pages/list/list';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {
  socio =  {id:null, Rut:"", Nombres:"", ApellidoPaterno:"",  ApellidoMaterno:"", FechaNacimiento:"", Direccion:"", Telefono:"", Email:"", ImgUrl:""};
  id = null;
  constructor(private alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public sociosService : SociosService) {
    this.id = navParams.get('id');
    if (this.id == 0) {

    }else{
      this.socio = sociosService.getSocio(this.id);
    }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailPage');
  }

  editSocio(id,title,description){
    this.navCtrl.push(ListPage, {id:id,title:title,description:description});
    console.log("editando " + id + " " + title + "" + description);
    this.navCtrl.push(ListPage);
  }

  deleteSocio(socio){
    this.sociosService.deleteSocio(socio);
    this.navCtrl.push(ListPage);
  }

  deleteComfirm(socio) {
    let alert = this.alertCtrl.create({
      title: 'Confirmación Borrado',
      message: '¿Quieres borrar el Socio?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Clic cancelar');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Clic aceptar');
            this.deleteSocio(socio);
          }
        }
      ]
    });
    alert.present()
  }

}
