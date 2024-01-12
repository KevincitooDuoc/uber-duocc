import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-modificar-viaje2',
  templateUrl: './modificar-viaje2.page.html',
  styleUrls: ['./modificar-viaje2.page.scss'],
})
export class ModificarViaje2Page {
  nombreLugar: string = '';
  coste: string = '';
  horaSalida: string = '';
  asientos: string = '';

  constructor(private navCtrl: NavController) {}

  guardarCambios() {
    console.log('Nombre del Lugar:', this.nombreLugar);
    console.log('Coste:', this.coste);
    console.log('Hora de Salida:', this.horaSalida);
    console.log('Asientos:', this.asientos);

  }

  volver() {
    this.navCtrl.back();
  }
}

