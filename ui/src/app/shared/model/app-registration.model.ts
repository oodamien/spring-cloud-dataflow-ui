import { Selectable } from '../../shared/model/selectable';
import { ApplicationType } from './application-type';
import { Serializable } from '../../shared/model';
import { AppVersion } from './app-version';
import { Page } from './page';

/**
 * Represents an App Registration and implements Selectable
 * so it can be used in multi-select data-grids.
 *
 * @author Gunnar Hillert
 */
export class AppRegistration implements Serializable<AppRegistration> {

  public name: string;

  public type: ApplicationType;

  public uri: string;

  public metaDataUri: string;

  public force: boolean;

  public version: string;

  public defaultVersion: boolean;

  public versions: AppVersion[] = [];

  constructor(name?: string, type?: ApplicationType, uri?: string, metaDataUri?: string) {
    this.name = name;
    this.type = type;
    this.uri = uri;
    this.metaDataUri = metaDataUri;
  }

  public static fromJSON(input): AppRegistration {
    return new AppRegistration().deserialize(input);
  }

  public static pageFromJSON(input): Page<AppRegistration> {
    const page = new Page<AppRegistration>();
    if (input) {
      if (input._embedded && input._embedded.appRegistrationResourceList) {
        page.items = input._embedded.appRegistrationResourceList.map(AppRegistration.fromJSON);
      }
      if (input.page) {
        page.totalElements = input.page.totalElements;
        page.pageNumber = input.page.number;
        page.pageSize = input.page.size;
        page.totalPages = input.page.totalPages;
      }
    }
    return page;
  }

  versionOnError(): boolean {
    for (let i = 0; i < this.versions.length; i++) {
      if (this.versions[i].defaultVersion) {
        return false;
      }
    }
    return true;
  }

  /**
   * For a given JSON data object, this method
   * will populate the corresponding AppRegistration object, with
   * the provided properties.
   *
   * @param input JSON input data
   */
  public deserialize(input) {
    this.name = input.name;
    this.type = input.type as ApplicationType;
    this.uri = input.uri;
    this.version = input.version;
    this.defaultVersion = input.defaultVersion;
    return this;
  }

}
