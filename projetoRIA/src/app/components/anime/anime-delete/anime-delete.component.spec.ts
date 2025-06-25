import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeDeleteComponent } from './anime-delete.component';

describe('AnimeDeleteComponent', () => {
  let component: AnimeDeleteComponent;
  let fixture: ComponentFixture<AnimeDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimeDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
