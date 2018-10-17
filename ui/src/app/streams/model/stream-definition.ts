import { Page } from '../../shared/model/page';

/**
 * Represents a StreamDefiniton.
 *
 * @author Janne Valkealahti
 * @author Gunnar Hillert
 * @author Damien Vitrac
 */
export class StreamDefinition {

  public name: string;

  public dslText: string;

  public status: string;

  public deploymentProperties: any;

  public force = false;

  constructor(name: string, dslText: string, status: string) {
    this.name = name;
    this.dslText = dslText;
    this.status = status;
  }

  /**
   * Create a StreamDefinition from JSON
   * @param input
   * @returns {StreamDefinition}
   */
  public static fromJSON(input): StreamDefinition {
    const stream = new StreamDefinition(input.name, input.dslText, input.status);
    stream.deploymentProperties = input.deploymentProperties ? JSON.parse(input.deploymentProperties) : [];
    return stream;
  }

  /**
   * Create a Page<StreamDefinition> from JSON
   * @param input
   * @returns {Page<StreamDefinition>}
   */
  public static pageFromJSON(input): Page<StreamDefinition> {
    const page = new Page<StreamDefinition>();
    if (input) {
      if (input._embedded && input._embedded.streamDefinitionResourceList) {
        page.items = input._embedded.streamDefinitionResourceList.map(StreamDefinition.fromJSON);
      }
      if (input.page) {
        page.pageNumber = input.page.number;
        page.pageSize = input.page.size;
        page.totalElements = input.page.totalElements;
        page.totalPages = input.page.totalPages;
      }
    }
    return page;
  }

}
