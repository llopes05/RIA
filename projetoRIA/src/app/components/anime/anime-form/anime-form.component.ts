import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { Anime } from '../../../models/anime.model';

@Component({
  selector: 'app-anime-form',
  imports: [FormsModule, InputTextModule, InputNumberModule, CheckboxModule, ButtonModule ],
  templateUrl: './anime-form.component.html',
  styleUrl: './anime-form.component.css'
})
export class AnimeFormComponent implements OnInit, OnChanges {
  @Input() anime: Anime | null = null;
  @Input() editMode: boolean = false;
  @Output() onSave = new EventEmitter<Omit<Anime, 'id'>>();
  @Output() onCancel = new EventEmitter<void>();

  formData = {
    nome: '',
    episodios: 0,
    assistido: false
  };

  ngOnInit() {
    this.loadFormData();
  }

  ngOnChanges(changes: SimpleChanges) {
    // Detecta mudanças no anime ou editMode e atualiza o formulário
    if (changes['anime'] || changes['editMode']) {
      this.loadFormData();
    }
  }

  private loadFormData() {
    if (this.anime && this.editMode) {
      // Preenchendo com dados do anime para edição
      this.formData = {
        nome: this.anime.nome,
        episodios: this.anime.episodios,
        assistido: this.anime.assistido
      };
      console.log('Carregando dados para edição:', this.formData);
    } else {
      // Formulário vazio para criação
      this.resetForm();
      console.log('Formulário resetado para criação');
    }
  }

  save(){
    if (this.formData.nome.trim() !== '') {  
      console.log('Salvando anime:', this.formData);
      this.onSave.emit(this.formData);
      if (!this.editMode) {
        this.resetForm();
      }
    } else {
      console.log('Nome é obrigatório!');
    }
  }

  cancel() {
    console.log('Cancelando...');
    this.onCancel.emit();
    this.resetForm();
  }
  private resetForm() {
    this.formData = {
      nome: '',
      episodios: 1,  
      assistido: false
    };
  }

}
