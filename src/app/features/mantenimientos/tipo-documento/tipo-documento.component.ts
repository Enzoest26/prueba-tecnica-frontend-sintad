import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoDocumentoService } from 'src/app/api/tipo-documento/tipo-documento.service';
import { TipoDocumento } from 'src/app/core/models/tipo-documento';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-tipo-documento',
  templateUrl: './tipo-documento.component.html',
  styleUrls: ['./tipo-documento.component.css']
})
export class TipoDocumentoComponent {
  @ViewChild('generalModal') generalModal: any;
  @ViewChild('eliminarModal') eliminarModal: any;

  dataTiposDocumentos : TipoDocumento[] = [];

  tipoDocumentoForm : FormGroup;

  indAccion = 0; //0 - Registro y 1 - Actualizar
  idEliminar = 0;
  constructor(private modalService : NgbModal, private formBuilder : FormBuilder
    , private tipoDocumentoService : TipoDocumentoService, private toastService : ToastService){
    this.tipoDocumentoForm = this.formBuilder.group({
      id: [""],
      codigo : ["", Validators.required],
      nombre : ["", Validators.required],
      descripcion : [""],
      estado: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.llenarDatosTabla();
  }

  cerrarModal(){
    this.modalService.dismissAll();
  }

  abrirModal(){
    this.modalService.open(this.generalModal, { size: 'lg' });
  }

  limpiarModalForm(){
    this.tipoDocumentoForm.reset();
  }

  abrirRegistrar(){
    this.abrirModal();
    this.indAccion = 0;
    this.limpiarModalForm();
  }

  abrirEditar(id: number){
    this.indAccion = 1;

    this.tipoDocumentoService.buscarPorId(id).subscribe(data => {
      this.tipoDocumentoForm.patchValue(data);
    });
    this.abrirModal();
  }

  abrirEliminar(id : number){
    this.idEliminar = id;
    this.modalService.open(this.eliminarModal);
  }

  llenarDatosTabla(){
    this.dataTiposDocumentos = [];
    this.tipoDocumentoService.listarTodos().subscribe(data => this.dataTiposDocumentos = data);
  }

  //Acciones
  
  accionRegistrar(){
    if(!this.tipoDocumentoForm.valid){
      this.toastService.error("Faltan campos requeridos");
      return;
    }

    this.tipoDocumentoService.registrar(this.tipoDocumentoForm.value).subscribe(data => {
      this.llenarDatosTabla();
      this.cerrarModal();
    });
    
  }

  accionActualizar(){
    if(!this.tipoDocumentoForm.valid){
      this.toastService.error("Faltan campos requeridos");
      return;
    }

    this.tipoDocumentoService.actualizar(this.tipoDocumentoForm.value.id,this.tipoDocumentoForm.value).subscribe(data => {
      this.llenarDatosTabla();
      this.cerrarModal();
    });
    
  }

  accionEliminar(){
    this.tipoDocumentoService.eliminar(this.idEliminar).subscribe(data => {
      this.llenarDatosTabla();
      this.cerrarModal();
    });
  }
}
