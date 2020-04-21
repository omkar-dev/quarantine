import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CanHelpPage } from './can-help.page';

describe('CanHelpPage', () => {
  let component: CanHelpPage;
  let fixture: ComponentFixture<CanHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanHelpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CanHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
