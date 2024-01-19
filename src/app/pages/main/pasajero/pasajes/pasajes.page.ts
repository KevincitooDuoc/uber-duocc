import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { Viaje } from 'src/app/models/viaje.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-pasajes',
  templateUrl: './pasajes.page.html',
  styleUrls: ['./pasajes.page.scss'],
})
export class PasajesPage implements OnInit {

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  viajes: Viaje[] = [];
  viajeId: string;
  viajeData: Viaje;
  filteredViajes: Viaje[] = [];
  usuarioLogeado: User;
  

  constructor(
    private activatedRoute: ActivatedRoute,
    private firebaseService: FirebaseService,
    private navCtrl: NavController,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {}
  
  ngOnInit() {
    this.viajeData = JSON.parse(this.activatedRoute.snapshot.paramMap.get('viajeData'));
  }
  
  user () : User{
    return this.utilsSvc.getFromLocalStorage('user')
  }
  ionViewWillEnter(){
   this.getViajes();
  }

  getViajes(){
    let path ='/viajes';

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any)=> {
        console.log(res);
        this.viajes = res.filter(viaje =>  !viaje.completo);
        this.filteredViajes = this.viajes;
        sub.unsubscribe();
      }
    })
  }
  // restar solo en el html
  restar(v : Viaje){

    if (v.pasajeros > 0){
      v.pasajeros--;
    }
    else{
      this.utilsSvc.presentToast({
        message: 'no hay cupos disponibles',
        duration: 3500,
        color: 'danger',
        position: 'middle',
        icon: 'checkmark-circle-outline'
      })
    }

  }

  // Restar disponibilidad en la bdd

  async presentActionSheet(viaje: Viaje) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Pruebas',
      buttons: [
        {
          text: 'Confirmar',
          role: 'complete',
          handler: async () => {
            // Lógica para marcar el viaje como completo
            try {
              await this.firebaseService.disponible(viaje.id, viaje.disponibles-1);
              console.log('Completar viaje clicked', viaje);
              this.filteredViajes = this.filteredViajes.filter(v => v !== viaje);
            } catch (error) {
              console.error('Error al completar el viaje:', error);
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            // Lógica al cancelar el Action Sheet
            console.log('Cancelar clicked');
          }
        }
      ]
    });

    await actionSheet.present();
  }

}