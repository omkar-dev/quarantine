import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NeedHelpPage } from './need-help.page';

describe('NeedHelpPage', () => {
  let component: NeedHelpPage;
  let fixture: ComponentFixture<NeedHelpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedHelpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NeedHelpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
