import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Anime } from '../../../models/anime.model';

import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-anime-form',
  imports: [FormsModule, InputTextModule, InputNumberModule, CheckboxModule, ButtonModule, ToolbarModule, DropdownModule ],
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
  episodioAtual: 0,
  nota: 0,
  status: 'pendente' as 'assistido' | 'assistindo' | 'pendente'
};

  statusOptions = [
    { label: 'Pendente', value: 'pendente' },
    { label: 'Assistindo', value: 'assistindo' },
    { label: 'Assistido', value: 'assistido' }
  ];

  ngOnInit() {
    this.loadFormData();
  }

  ngOnChanges(changes: SimpleChanges) {
    // detecta mudanças no anime e atualiza o formulário apenas quando o anime muda
    if (changes['anime'] && changes['anime'].currentValue !== changes['anime'].previousValue) {
      this.loadFormData();
    }
  }

  private loadFormData() {
    if (this.anime) {
      // pré-preenche o formulário com os dados do anime, seja em modo de edição ou adição (no caso, apenas o nome e a quantidade de episódios)
      this.formData = {
        nome: this.anime.nome,
        episodios: this.anime.episodios,
        episodioAtual: this.anime.episodioAtual,
        nota: this.anime.nota,
        status: this.anime.status
      };
      console.log('Formulário preenchido com:', this.formData);
    } else {
      this.resetForm();
    }
  }

  save(){
    if (this.formData.nome.trim() !== '') {  
      console.log('Dados do formulário antes de salvar:', this.formData);
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
    episodioAtual: 0,
    nota: 0,
    status: 'pendente'
  };
}

}
