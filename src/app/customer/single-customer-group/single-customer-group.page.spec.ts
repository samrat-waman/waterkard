import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SingleCustomerGroupPage } from './single-customer-group.page';

describe('SingleCustomerGroupPage', () => {
  let component: SingleCustomerGroupPage;
  let fixture: ComponentFixture<SingleCustomerGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleCustomerGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SingleCustomerGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
