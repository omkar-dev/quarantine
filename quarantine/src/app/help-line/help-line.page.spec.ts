import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpLinePage } from './help-line.page';

describe('HelpLinePage', () => {
  let component: HelpLinePage;
  let fixture: ComponentFixture<HelpLinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpLinePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpLinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
