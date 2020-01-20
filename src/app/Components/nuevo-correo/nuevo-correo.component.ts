import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-nuevo-correo',
  templateUrl: './nuevo-correo.component.html',
  styleUrls: ['./nuevo-correo.component.scss']
})
export class NuevoCorreoComponent implements OnInit {

  nuevoCorreo: FormGroup;
  submitted = false;

  // Este es el nombre que se le da entre [] <app-nuevo-correo [correo]="correo"></app-nuevo-correo>
  @Input() correo: any; 
  @Output() accionRealizada: EventEmitter<any> = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.nuevoCorreo = this.formBuilder.group({
        titulo: ['', [Validators.required, Validators.minLength(3)]],
        cuerpo: ['', [Validators.required, Validators.minLength(10)]],
        destinatario: ['', [Validators.required, Validators.email]],
      });
      
      if(this.correo != undefined){
        console.log("A",this.correo);
        this.nuevoCorreo.patchValue({
          titulo: 'Re: '+ this.correo.titulo, 
          destinatario: this.correo.destinatario
        });
      }
  }

  get formulario() { return this.nuevoCorreo.controls; }

  onSubmit() {
      this.submitted = true;

      if (this.nuevoCorreo.invalid) {
          return;
      }

      let correo = this.nuevoCorreo.value;
      correo.leido= false;
      correo.emisor= 'correoEmisor1@openWebinar.inv';

      alert("Correo Enviado \nEliminamos el formulario");
      this.onReset();
  }

  public onReset() {
      this.submitted = false;
      this.nuevoCorreo.reset();
      this.accionRealizada.emit();
  }

}