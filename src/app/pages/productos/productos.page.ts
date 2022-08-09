/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
/* eslint-disable no-var */
import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { ModalInfoPage } from '../modal-info/modal-info.page';
import { FiredataService } from 'src/app/services/firedata.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.page.html',
  styleUrls: ['./productos.page.scss'],

})
export class ProductosPage implements OnInit {

  cards: any[] = [];
  obj = {
    id: '',
    //img: '',
    descripcion: '',
    precio: '',
  };
  constructor(
    public modalController: ModalController,
    private dataService: FiredataService,
    public alertController: AlertController,

  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.dataService.getAll('gestionVentas').then(
      firebaseResp => {
        firebaseResp.subscribe(data => {
          this.cards = [];
          data.forEach((element: any) => {
            this.cards.push({
              id: element.payload.doc.id,
              ...element.payload.doc.data()
            });
          });
        });
      }
    );
  }

  async modalRegister() {

    const modal = await this.modalController.create({
      component: ModalInfoPage,
      componentProps: {
        titulo: 'Registrar producto',
        obj: this.obj
      },
      showBackdrop: true,
      backdropDismiss: false
    });
    return await modal.present();
  }

  async modalEdit(data: any) {
    const modal = await this.modalController.create({
      component: ModalInfoPage,
      componentProps: {
        titulo: 'Editar producto',
        obj: data
      },
      showBackdrop: true,
      backdropDismiss: false
    });
    return await modal.present();
  }

  eliminar(id: any) {
    console.log("eliminar", id);
    this.mensaje(id);
  }

  //ALERTAS

  async mensaje(id: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'ESPERA!',
      message: '¿Estás seguro que decea eliminar el producto?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Si',
          handler: () => {
            this.dataService.delete('gestionInventario', id).then(res => {
              this.mensaje2();
              console.log('Confirm Okay');
            }).catch(err => {
              console.log("ERROR al eliminar ", err);
            });
          }
        }
      ]
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  async mensaje2() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'EXITO!',
      message: 'Producto eliminado exitosamente',
      buttons: ['ACEPTAR']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
