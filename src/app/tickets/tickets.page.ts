import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TicketService } from '../services/TicketService';
import { Ticket } from '../models/Ticket';
import { ClienteService } from '../services/ClienteService';
import { Cliente } from '../models/Cliente';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.page.html',
  styleUrls: ['./tickets.page.scss'],
  standalone: false
})
export class TicketsPage implements OnInit {

  form: FormGroup;
  tickets: Ticket[] = [];
  clientes: Cliente[] = [];
  isEditing = false;
  selectedId: string | null = null;
  showForm = false;

  constructor(
    private ticketService: TicketService,
    private clienteService: ClienteService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      clienteId: [''],
      descripcion: [''],
      asunto: [''],
      estado: [''],
      asignado_a: [''],
      fecha_creacion: ['']
    });
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.ticketService.getAll().subscribe(data => this.tickets = data);
    this.clienteService.getAll().subscribe(data => this.clientes = data);
  }

  newTicket() {
    this.form.reset();
    this.isEditing = false;
    this.selectedId = null;
    this.showForm = true;
  }

  edit(ticket: Ticket) {
    this.form.patchValue(ticket);
    this.selectedId = ticket.id!;
    this.isEditing = true;
    this.showForm = true;
  }

  cancel() {
    this.form.reset();
    this.isEditing = false;
    this.selectedId = null;
    this.showForm = false;
  }

  save() {
    if (this.form.invalid) return;
    const data: Ticket = this.form.value;
    if (this.isEditing && this.selectedId) {
      this.ticketService.update(this.selectedId, data).then(() => this.cancel());
    } else {
      this.ticketService.add(data).then(() => this.cancel());
    }
  }

  delete(id: string) {
    if (confirm('¿Eliminar Ticket?')) {
      this.ticketService.delete(id);
    }
  }

  getClientName(clienteId: string): string {
    const cliente = this.clientes.find(u => u.id === clienteId);
    return cliente ? cliente.nombre : '';
  }

}
