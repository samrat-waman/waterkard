import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewCustomerGroupPage } from './new-customer-group.page';

describe('NewCustomerGroupPage', () => {
  let component: NewCustomerGroupPage;
  let fixture: ComponentFixture<NewCustomerGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCustomerGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewCustomerGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
