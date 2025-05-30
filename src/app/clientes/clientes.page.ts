import { Component, OnInit } from '@angular/core';
import { Cliente } from '../models/Cliente';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../services/ClienteService';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
  standalone: false,

})
export class ClientesPage implements OnInit {

  clientes: Cliente[] = [];
  form: FormGroup;
  isEditing = false;
  selectedId: string | null = null;

  constructor(
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: [''],
      documento: [''],
      nacionalidad: [''],
      pais: [''],
      direccion: [''],
      telefono: ['']
    });
  }

  ngOnInit() {
    this.loadClientes();
  }

  loadClientes() {
    this.clienteService.getAll().subscribe(data => this.clientes = data);
  }

  edit(cliente: Cliente) {
    this.isEditing = true;
    this.selectedId = cliente.id!;
    this.form.patchValue({
      nombre: cliente.nombre,
      documento: cliente.documento,
      nacionalidad: cliente.nacionalidad,
      pais: cliente.pais,
      direccion: cliente.direccion,
      telefono: cliente.telefono
    });
  }

  cancel() {
    this.isEditing = false;
    this.selectedId = null;
    this.form.reset();
  }

  save() {
    if (this.form.invalid) return;

    const data: Cliente = this.form.value;

    if (this.isEditing && this.selectedId) {
      this.clienteService.update(this.selectedId, data).then(() => this.cancel());
    } else {
      this.clienteService.add(data).then(() => this.form.reset());
    }
  }

  delete(id: string) {
    if (confirm('¿Estás seguro de que quieres eliminar este cliente?')) {
      this.clienteService.delete(id);
    }
  }

}
