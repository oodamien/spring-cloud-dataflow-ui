import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ClarityModule } from '@clr/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StreamsComponent } from './streams.component';
import { DestroyComponent } from './destroy/destroy.component';
import { UndeployComponent } from './undeploy/undeploy.component';
import { SecurityServiceMock } from '../../tests/api/security.service.mock';
import { AboutServiceMock } from '../../tests/api/about.service.mock';
import { NotificationServiceMock } from '../../tests/service/notification.service.mock';
import { StreamServiceMock } from '../../tests/api/stream.service.mock';
import { ContextService } from '../../shared/service/context.service';
import { By } from '@angular/platform-browser';
import { MultiDeployComponent } from './multi-deploy/multi-deploy.component';
import { GrafanaStreamDirective, GrafanaStreamsDirective } from '../../shared/grafana/grafana.directive';
import { GrafanaServiceMock } from '../../tests/service/grafana.service.mock';

describe('streams/streams/streams.component.ts', () => {

  let component: StreamsComponent;
  let fixture: ComponentFixture<StreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        StreamsComponent,
        DestroyComponent,
        MultiDeployComponent,
        UndeployComponent,
        GrafanaStreamsDirective,
        GrafanaStreamDirective
      ],
      imports: [
        FormsModule,
        ClarityModule,
        RouterTestingModule.withRoutes([]),
        BrowserAnimationsModule,
      ],
      providers: [
        SecurityServiceMock.provider,
        AboutServiceMock.provider,
        NotificationServiceMock.provider,
        StreamServiceMock.provider,
        GrafanaServiceMock.provider,
        ContextService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StreamsComponent);
    component = fixture.componentInstance;
    NotificationServiceMock.mock.clearAll();
  });

  it('should be created', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display the datagrid, pagination, action bar', async (done) => {
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();
    const datagrid = fixture.debugElement.query(By.css('clr-datagrid')).nativeElement;
    const pagination = fixture.debugElement.query(By.css('clr-dg-pagination')).nativeElement;
    const actionBar = fixture.debugElement.query(By.css('clr-dg-action-bar')).nativeElement;
    const rows = fixture.debugElement.queryAll(By.css('clr-dg-row'));
    const cols = fixture.debugElement.queryAll(By.css('clr-dg-column'));
    const title = fixture.debugElement.query(By.css('h1')).nativeElement;
    expect(datagrid).toBeTruthy();
    expect(pagination).toBeTruthy();
    expect(actionBar).toBeTruthy();
    expect(title.textContent).toContain('Streams');
    expect(rows.length === 4).toBeTruthy();
    expect(cols.length === 4).toBeTruthy();
    done();
  });

});
