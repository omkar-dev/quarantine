import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VisitHistoryPage } from './visit-history.page';

describe('VisitHistoryPage', () => {
  let component: VisitHistoryPage;
  let fixture: ComponentFixture<VisitHistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisitHistoryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VisitHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
