import { Moment } from 'moment';
import { ExecutionContext } from './execution-context.model';
import * as moment from 'moment';

/**
 * Contains information about a specific step execution.
 * @author Janne Valkealahti
 */
export class StepExecution {
  public id: string;
  public name: string;
  public status: string;
  public readCount: number;
  public writeCount: number;
  public commitCount: number;
  public rollbackCount: number;
  public readSkipCount: number;
  public processSkipCount: number;
  public writeSkipCount: number;
  public filterCount: number;
  public skipCount: number;
  public startTime: Moment;
  public endTime: Moment;
  public executionContext: ExecutionContext;
  public exitCode: string;
  public exitMessage: string;


  static fromJSON(input) {
    const stepExecution: StepExecution = new StepExecution();
    stepExecution.id = input.id;
    stepExecution.name = input.stepName;
    stepExecution.status = input.status;
    stepExecution.readCount = input.readCount;
    stepExecution.writeCount = input.writeCount;
    stepExecution.commitCount = input.commitCount;
    stepExecution.rollbackCount = input.rollbackCount;
    stepExecution.readSkipCount = input.readSkipCount;
    stepExecution.processSkipCount = input.processSkipCount;
    stepExecution.writeSkipCount = input.writeSkipCount;
    stepExecution.filterCount = input.filterCount;
    stepExecution.skipCount = input.skipCount;
    stepExecution.startTime = moment.utc(input.startTime, 'Y-MM-DD[T]HH:mm:ss.SSS[Z]');
    stepExecution.endTime = moment.utc(input.endTime, 'Y-MM-DD[T]HH:mm:ss.SSS[Z]');
    if (input.executionContext) {
      const values = new Array<Map<string, string>>();
      input.executionContext.values.forEach(item => {
        const map = new Map<string, string>();
        for (const prop in item) {
          if (item.hasOwnProperty(prop)) {
            map.set(prop, item[prop]);
          }
        }
        values.push(map);
      });
      stepExecution.executionContext = new ExecutionContext(
        input.executionContext.dirty,
        input.executionContext.empty,
        values);
    }

    if (input.exitStatus) {
      stepExecution.exitCode = input.exitStatus.exitCode;
      stepExecution.exitMessage = input.exitStatus.exitDescription;
    }
    return stepExecution;
  }

}
