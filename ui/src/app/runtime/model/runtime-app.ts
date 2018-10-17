import { RuntimeAppInstance } from './runtime-app-instance';
import { Page } from '../../shared/model/page';

/**
 * Runtime application model that corresponds to AppStatusResource from SCDF server.
 *
 * @author Ilayaperumal Gopinathan
 */
export class RuntimeApp {

  public deploymentId: string;
  public state: string;
  public instances: any;
  public appInstances: RuntimeAppInstance[];

  constructor(deploymentId: string,
              state: string,
              instances: any,
              appInstances: RuntimeAppInstance[]) {
    this.deploymentId = deploymentId;
    this.state = state;
    this.instances = instances;
    this.appInstances = appInstances;
  }

  public static pageFromJSON(input): Page<RuntimeApp> {
    const page = new Page<RuntimeApp>();
    if (input) {
      if (input._embedded && input._embedded.appStatusResourceList) {
        page.items = (input._embedded.appStatusResourceList as RuntimeApp[]).map((item) => {
          item.appInstances = item.instances._embedded.appInstanceStatusResourceList;
          return item;
        });
      }
      if (input.page) {
        page.totalElements = input.page.totalElements;
        page.totalPages = input.page.totalPages;
        page.pageNumber = input.page.number;
        page.pageSize = input.page.size;
      }
    }
    return page;
  }
}
