import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoContribuyenteService } from 'src/app/api/tipo-contribuyente/tipo-contribuyente.service';
import { TipoContribuyente } from 'src/app/core/models/tipo-contribuyente';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-tipo-contribuyente',
  templateUrl: './tipo-contribuyente.component.html',
  styleUrls: ['./tipo-contribuyente.component.css']
})
export class TipoContribuyenteComponent {

  @ViewChild('generalModal') generalModal: any;
  @ViewChild('eliminarModal') eliminarModal: any;

  dataTiposContribuyentes : TipoContribuyente[] = [];

  tipoContribuyenteForm : FormGroup;

  indAccion = 0; //0 - Registro y 1 - Actualizar
  idEliminar = 0;
  constructor(private modalService : NgbModal, private formBuilder : FormBuilder
    , private tipoContribuyenteService : TipoContribuyenteService, private toastService : ToastService){
    this.tipoContribuyenteForm = this.formBuilder.group({
      id: [""],
      nombre : ["", Validators.required],
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
    this.tipoContribuyenteForm.reset();
  }

  abrirRegistrar(){
    this.abrirModal();
    this.indAccion = 0;
    this.limpiarModalForm();
  }

  abrirEditar(id: number){
    this.indAccion = 1;

    this.tipoContribuyenteService.buscarPorId(id).subscribe(data => {
      this.tipoContribuyenteForm.patchValue(data);
    });
    this.abrirModal();
  }

  abrirEliminar(id : number){
    this.idEliminar = id;
    this.modalService.open(this.eliminarModal);
  }

  llenarDatosTabla(){
    this.dataTiposContribuyentes = [];
    this.tipoContribuyenteService.listarTodos().subscribe(data => this.dataTiposContribuyentes = data);
  }

  //Acciones
  
  accionRegistrar(){
    if(!this.tipoContribuyenteForm.valid){
      this.toastService.error("Faltan campos requeridos");
      return;
    }

    this.tipoContribuyenteService.registrar(this.tipoContribuyenteForm.value).subscribe(data => {
      this.llenarDatosTabla();
      this.cerrarModal();
    });
    
  }

  accionActualizar(){
    if(!this.tipoContribuyenteForm.valid){
      this.toastService.error("Faltan campos requeridos");
      return;
    }

    this.tipoContribuyenteService.actualizar(this.tipoContribuyenteForm.value.id,this.tipoContribuyenteForm.value).subscribe(data => {
      this.llenarDatosTabla();
      this.cerrarModal();
    });
    
  }

  accionEliminar(){
    this.tipoContribuyenteService.eliminar(this.idEliminar).subscribe(data => {
      this.llenarDatosTabla();
      this.cerrarModal();
    });
  }
}
