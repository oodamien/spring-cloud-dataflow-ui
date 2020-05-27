import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecurityServiceMock } from '../../tests/api/security.service.mock';
import { AboutServiceMock } from '../../tests/api/about.service.mock';
import { AppServiceMock } from '../../tests/api/app.service.mock';
import { NotificationServiceMock } from '../../tests/service/notification.service.mock';
import { ContextService } from '../../shared/service/context.service';
import { ActionFilterComponent } from './action.filter';
import { RecordServiceMock } from '../../tests/api/record.service.mock';
import { By } from '@angular/platform-browser';

describe('manage/records/action.filter.ts', () => {

  let component: ActionFilterComponent;
  let fixture: ComponentFixture<ActionFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActionFilterComponent,
      ],
      imports: [
        FormsModule,
        ClarityModule,
        BrowserAnimationsModule,
      ],
      providers: [
        SecurityServiceMock.provider,
        AboutServiceMock.provider,
        AppServiceMock.provider,
        NotificationServiceMock.provider,
        RecordServiceMock.provider,
        ContextService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionFilterComponent);
    component = fixture.componentInstance;
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should set the value', async (done) => {
    component.value = 'DELETE';
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(component).toBeTruthy();
    expect(component.val).toBe('DELETE');
    const radio = fixture.debugElement.queryAll(By.css('input[type=radio]'));
    radio[0].nativeElement.click();
    fixture.detectChanges();
    expect(component.value).toBeNull();
    radio[1].nativeElement.click();
    fixture.detectChanges();
    expect(`${component.value}`).toBe('CREATE');
    expect(component.isActive()).toBeTruthy();
    expect(component.accepts(null)).toBeTruthy();
    done();
  });

});
