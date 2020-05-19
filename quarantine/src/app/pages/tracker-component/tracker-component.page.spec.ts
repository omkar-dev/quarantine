import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackerComponentPage } from './tracker-component.page';

describe('TrackerComponentPage', () => {
  let component: TrackerComponentPage;
  let fixture: ComponentFixture<TrackerComponentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackerComponentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackerComponentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
