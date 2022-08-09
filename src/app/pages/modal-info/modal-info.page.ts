/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { FiredataService } from 'src/app/services/firedata.service';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.page.html',
  styleUrls: ['./modal-info.page.scss'],
})
export class ModalInfoPage implements OnInit {


  @Input() obj: any;
  @Input() titulo: string;
  //img: string = '';
  descripcion: string = '';
  precio: string = '';


  //@Input() imgen: string;
  //@Input() nombre: string;
  //@Input() precio: string;

  constructor(
    private dataService: FiredataService,
    private modalController: ModalController,
    public alertController: AlertController
  ) {

  }

  ngOnInit() {
    if (this.obj?.id.length > 0) {
      console.log(this.obj.id);
      //this.img = this.obj.img;
      this.descripcion = this.obj.descripcion;
      this.precio = this.obj.precio;
    }
  }

  cerrarModal() {
    this.modalController.dismiss();
  }
  guardarModal() {

    const data = {
      //img: this.img,
      descripcion: this.descripcion,
      precio: this.precio,
    };
    if (this.obj?.id.length > 0) {
      this.dataService.update('gestionVentas', this.obj.id, data).then(res => {
        this.cerrarModal();
        this.update();
      }).catch(err => {
        console.log('Error al modificar: ', err);
      });
    } else {
      this.dataService.create('gestionVentas', data).then(res => {
        console.log(res);
        this.cerrarModal();
        this.exito();
      }).catch(err => {
        console.log('error al crear producto: ', err);

      });

    }

  }
  // eslint-disable-next-line @typescript-eslint/naming-convention
  async Alertas() {
    const alert = await this.alertController.create({
      header: '¡Alerta!',
      subHeader: 'Campos Vacios',
      message: 'Llene todos los campos',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
  async exito() {
    const alert = await this.alertController.create({
      header: '¡Exito!',
      message: 'Producto guardado exitosamente',
      buttons: ['Ok']
    });

    await alert.present();
  }

  async update() {
    const alert = await this.alertController.create({
      header: '¡Exito!',
      message: 'Producto modificado exitosamente',
      buttons: ['Ok']
    });

    await alert.present();
  }

}
