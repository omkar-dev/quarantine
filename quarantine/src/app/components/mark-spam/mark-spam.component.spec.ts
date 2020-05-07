import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MarkSpamComponent } from './mark-spam.component';

describe('MarkSpamComponent', () => {
  let component: MarkSpamComponent;
  let fixture: ComponentFixture<MarkSpamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkSpamComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MarkSpamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
