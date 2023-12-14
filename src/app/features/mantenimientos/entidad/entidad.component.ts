import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { concatMap } from 'rxjs';
import { EntidadService } from 'src/app/api/entidad/entidad.service';
import { TipoContribuyenteService } from 'src/app/api/tipo-contribuyente/tipo-contribuyente.service';
import { TipoDocumentoService } from 'src/app/api/tipo-documento/tipo-documento.service';
import { Entidad } from 'src/app/core/models/entidad';
import { TipoContribuyente } from 'src/app/core/models/tipo-contribuyente';
import { TipoDocumento } from 'src/app/core/models/tipo-documento';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit{

  @ViewChild('myModal') myModal: any;
  @ViewChild('eliminarModal') eliminarModal: any;

  dataEntidades : Entidad[] = [];
  dataTiposContribuyentes : TipoContribuyente[] = [];
  dataTiposDocumentos : TipoDocumento[] = [];

  entidadForm : FormGroup;

  indAccion = 0; //0 - Registro y 1 - Actualizar
  idEliminar = 0;
  constructor(private entidadService : EntidadService, private modalService : NgbModal, private formBuilder : FormBuilder
    , private tipoContribuyenteService : TipoContribuyenteService, private tipoDocumentoService : TipoDocumentoService, private toastService : ToastService){
    this.entidadForm = this.formBuilder.group({
      id: [""],
      idTipoDocumento : ["", Validators.required],
      nroDocumento: ["", Validators.required],
      razonSocial: ["", Validators.required],
      nombreComercial: [""],
      idTipoContribuyente: [""],
      direccion: [""],
      telefono: [""],
      estado: ["", Validators.required]
    });
  }

  ngOnInit(): void {
    this.llenarDatosTabla();
    this.tipoContribuyenteService.listarTodos().pipe(concatMap(dataUno => {
      this.dataTiposContribuyentes = dataUno
      return this.tipoDocumentoService.listarTodos();
    })).subscribe(data => {
      this.dataTiposDocumentos = data;
    })
  }

  cerrarModal(){
    this.modalService.dismissAll();
  }

  abrirModal(){
    this.modalService.open(this.myModal, { size: 'lg' });
  }

  limpiarModalForm(){
    this.entidadForm.reset();
  }

  abrirRegistrar(){
    this.abrirModal();
    this.indAccion = 0;
    this.limpiarModalForm();
  }

  abrirEditar(id: number){
    this.indAccion = 1;

    this.tipoContribuyenteService.listarTodos().pipe(concatMap(dataUno => {
      this.dataTiposContribuyentes = dataUno
      return this.tipoDocumentoService.listarTodos();
    }),concatMap(dataDos => {
      this.dataTiposDocumentos = dataDos
      return this.entidadService.buscarPorId(id);
    })
    ).subscribe(data => {
      let entidad : Entidad = data;
      let entidadForm : any = entidad;
      entidadForm.idTipoDocumento = entidad.objTipoDocumento.id.toString();
      entidadForm.idTipoContribuyente = entidad.objTipoContribuyente?.id.toString();
      this.entidadForm.patchValue(entidadForm);
    });
    this.abrirModal();
  }

  abrirEliminar(id : number){
    this.idEliminar = id;
    this.modalService.open(this.eliminarModal);
  }

  llenarDatosTabla(){
    this.dataEntidades = [];
    this.entidadService.listarTodos().subscribe(data => this.dataEntidades = data);
  }

  //Acciones
  
  accionRegistrar(){
    if(!this.entidadForm.valid){
      this.toastService.error("Faltan campos requeridos");
      return;
    }

    this.entidadService.registrar(this.entidadForm.value).subscribe(data => {
      this.llenarDatosTabla()
      this.cerrarModal();
    });
    
  }

  accionActualizar(){
    if(!this.entidadForm.valid){
      this.toastService.error("Faltan campos requeridos");
      return;
    }

    this.entidadService.actualizar(this.entidadForm.value.id,this.entidadForm.value).subscribe(data => {
      this.llenarDatosTabla();
      this.cerrarModal();
    });
    
  }

  accionEliminar(){
    this.entidadService.eliminar(this.idEliminar).subscribe(data => {
      this.llenarDatosTabla();
      this.cerrarModal();
    });
  }


}
