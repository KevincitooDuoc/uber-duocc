import { Component, OnInit, inject } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { Viaje } from 'src/app/models/viaje.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-modificar-viaje',
  templateUrl: './modificar-viaje.page.html',
  styleUrls: ['./modificar-viaje.page.scss'],
})
export class ModificarViajePage implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
  ) { }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  viajes: Viaje[] = [];
  usuarioLogeado: User;  // Agrega esta línea para almacenar el usuario logeado

  ngOnInit() {
    this.usuarioLogeado = this.user();  // Obtén el usuario logeado al inicializar el componente
  }

  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  ionViewWillEnter() {
    this.getViajes();
  }

  getViajes() {
    let path = '/viajes';

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        // Filtrar los viajes por el usuario logeado
        this.viajes = res.filter(viaje => viaje.email === this.usuarioLogeado.email);
        sub.unsubscribe();
      }
    })
  }

}
