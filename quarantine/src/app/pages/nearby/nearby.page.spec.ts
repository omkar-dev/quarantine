import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NearbyPage } from './nearby.page';

describe('NearbyPage', () => {
  let component: NearbyPage;
  let fixture: ComponentFixture<NearbyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearbyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NearbyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
