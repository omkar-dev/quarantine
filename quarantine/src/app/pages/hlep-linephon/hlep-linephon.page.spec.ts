import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HlepLinephonPage } from './hlep-linephon.page';

describe('HlepLinephonPage', () => {
  let component: HlepLinephonPage;
  let fixture: ComponentFixture<HlepLinephonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HlepLinephonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HlepLinephonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
