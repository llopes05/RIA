import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimedetailComponent } from './animedetail.component';

describe('AnimedetailComponent', () => {
  let component: AnimedetailComponent;
  let fixture: ComponentFixture<AnimedetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimedetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnimedetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
