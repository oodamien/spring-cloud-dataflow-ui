import { Observable } from 'rxjs/Observable';
import { PageInfo } from '../../shared/model/pageInfo';
import { Page } from '../../shared/model/page';
import { StreamDefinition } from '../../streams/model/stream-definition';
import { Platform } from '../../streams/model/platform';
import { StreamMetrics } from '../../streams/model/stream-metrics';
import { OrderParams } from '../../shared/components/shared.interface';
import { StreamHistory } from '../../streams/model/stream-history';

/**
 * Mock for StreamsService.
 *
 * Create a mocked service:
 * const streamsService = new MockStreamsService();
 * TestBed.configureTestingModule({
 *   providers: [
 *     { provide: StreamsService, useValue: streamsService }
 *   ]
 * }).compileComponents();
 *
 * Set streamDefinition app infos:
 * runtimeAppsService._testRuntimeApps = STREAM_DEFINITIONS;//Stream Definitions json
 *
 * @author Glenn Renfro
 * @author Damien Vitrac
 */
export class MockStreamsService {

  public streamsContext = {
    q: '',
    page: 0,
    size: 30,
    sort: 'DEFINITION_NAME',
    order: OrderParams.ASC,
    itemsSelected: [],
    itemsExpanded: []
  };

  public _streamDefinitions;

  get streamDefinitions(): any {
    return this._streamDefinitions;
  }

  set streamDefinitions(value: any) {
    this._streamDefinitions = value;
  }

  getDefinitions(): Observable<Page<StreamDefinition>> {
    let page = new Page<StreamDefinition>();
    if (this.streamDefinitions) {
      page = StreamDefinition.pageFromJSON(this.streamDefinitions);
    }
    return Observable.of(page);
  }

  getDefinition(name: string): Observable<any> {
    return Observable.of(StreamDefinition.fromJSON(this.streamDefinitions._embedded.streamDefinitionResourceList[0]));
  }

  undeployDefinition(streamDefinition: StreamDefinition): Observable<Response> | Observable<any> {
    return Observable.of({});
  }

  undeployMultipleStreamDefinitions(streamDefinitions: StreamDefinition[]): Observable<Array<any>> {
    return Observable.of(Array.from({ length: streamDefinitions.length }));
  }

  destroyDefinition(streamDefinition: StreamDefinition): Observable<Response> | Observable<any> {
    return Observable.of({});
  }

  destroyMultipleStreamDefinitions(streamDefinitions: StreamDefinition[]): Observable<Array<any>> {
    return Observable.of(Array.from({ length: streamDefinitions.length }));
  }

  deployDefinition(streamDefinitionName: String, propertiesAsMap: any): Observable<Response> | Observable<any> {
    return Observable.of({});
  }

  deployMultipleStreamDefinitions(streamDefinitions: StreamDefinition[]): Observable<Array<any>> {
    return Observable.of(Array.from({ length: streamDefinitions.length }));
  }

  getRelatedDefinitions(streamDefinitionName: String, nested?: boolean): Observable<StreamDefinition[]> {
    return Observable.of([]);
  }

  getPlatforms(): Observable<Platform[]> {
    return Observable.of([
      Platform.fromJSON({name: 'default', type: 'local', description: ''}),
      Platform.fromJSON({name: 'foo', type: 'bar', description: 'foobar'})
    ]);
  }

  getMetrics(streamNames?: string[]): Observable<StreamMetrics[]> {
    return Observable.of([]);
  }

  getHistory(streamDefinition: string): Observable<StreamHistory[]> {
    return Observable.of([
      StreamHistory.fromJSON({
        name: streamDefinition,
        version: 2,
        platformName: 'default',
        info: { firstDeployed: new Date(), status: { statusCode: 'DEPLOYED' }, description: 'Upgrade complete' }
      }),
      StreamHistory.fromJSON({
        name: streamDefinition,
        version: 1,
        platformName: 'default',
        info: { firstDeployed: new Date(), status: { statusCode: 'DELETED' }, description: 'Delete complete' }
      })
    ]);
  }

}
