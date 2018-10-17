import { Observable } from 'rxjs/Observable';
import { PageInfo } from '../../shared/model/pageInfo';
import { Page } from '../../shared/model/page';
import { RuntimeApp } from '../../runtime/model/runtime-app';

/**
 * Mock for RuntimeAppsService.
 *
 * Create a mocked service:
 * const runtimeAppsService = new MockRuntimeAppsService();
 * TestBed.configureTestingModule({
 *   providers: [
 *     { provide: RuntimeAppsService, useValue: runtimeAppsService }
 *   ]
 * }).compileComponents();
 *
 * Set runtime app infos:
 * runtimeAppsService._testRuntimeApps = RUNTIME_APPS;//Runtime Apps json
 *
 * @author Janne Valkealahti
 */
export class MockRuntimeAppsService {

  private _testRuntimeApps: any;

  get testRuntimeApps() {
    return this._testRuntimeApps;
  }

  set testRuntimeApps(params: any) {
    this._testRuntimeApps = params;
  }

  public getRuntimeApps(pageInfo: PageInfo): Observable<Page<RuntimeApp>> {
    let page = new Page<RuntimeApp>();
    if (this.testRuntimeApps) {
      page = RuntimeApp.pageFromJSON(this.testRuntimeApps);
    }
    return Observable.of(page);
  }
}
