import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-viaje',
  templateUrl: './modificar-viaje.page.html',
  styleUrls: ['./modificar-viaje.page.scss'],
})
export class ModificarViajePage implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController
  ) { }
  

  ngOnInit() {
  }

  public actionSheetButtons = [
    {
      text: 'Eliminar',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },
    {
      text: 'Modificar',
      handler: () => {
        this.navCtrl.navigateForward('/main/modificar-viaje2');
      },
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

}
