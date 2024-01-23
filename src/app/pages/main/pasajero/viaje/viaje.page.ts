import { Component, OnInit, inject } from '@angular/core';
import { RouteConfigLoadStart, Router } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { User } from 'firebase/auth';
import { Viaje } from 'src/app/models/viaje.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.page.html',
  styleUrls: ['./viaje.page.scss'],
})
export class ViajePage implements OnInit {

  constructor(
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private firebaseService: FirebaseService,
    private alertController: AlertController,
    private router: Router
    ) { 
    
  }

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  viajes: Viaje[] = [];
  filteredViajes: Viaje[] = [];
  usuarioLogeado: User;

  ngOnInit() {
    this.usuarioLogeado = this.user();
  }
  ionViewWillEnter() {
    this.getViajes();
    this.filteredViajes = this.viajes;
  }
  user(): User {
    return this.utilsSvc.getFromLocalStorage('user');
  }

  getViajes() {
    let path = '/viajes';

    let sub = this.firebaseSvc.getCollectionData(path).subscribe({
      next: (res: any) => {
        console.log(res);
        this.viajes = res.filter(viaje => viaje.emailP === this.usuarioLogeado.email && !viaje.completo);
        this.filteredViajes = this.viajes;
        sub.unsubscribe();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
