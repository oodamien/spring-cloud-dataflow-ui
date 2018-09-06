import { Component, OnDestroy } from '@angular/core';
import { NotificationService } from '../../shared/services/notification.service';
import { AppsService } from '../../apps/apps.service';
import { StreamsService } from '../../streams/streams.service';
import { TasksService } from '../../tasks/tasks.service';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

/**
 * Applications Unregister modal
 *
 * @author Gunnar Hillert
 * @author Damien Vitrac
 */
@Component({
  selector: 'app-dev-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['styles.scss']
})
export class DashboardComponent implements OnDestroy {

  /**
   * Subscription
   */
  operationSubscription: Subscription;

  /**
   * Processing state
   */
  processing = false;

  /**
   * Initialize component
   *
   * @param {AppsService} appsService
   * @param {StreamsService} streamsService
   * @param {TasksService} tasksService
   * @param {NotificationService} notificationService
   */
  constructor(private appsService: AppsService,
              private streamsService: StreamsService,
              private tasksService: TasksService,
              private notificationService: NotificationService) {

  }

  /**
   * On Destroy, clean subscription
   */
  ngOnDestroy(): void {
    if (this.operationSubscription) {
      this.operationSubscription.unsubscribe();
    }
  }

  /**
   * Run Operation
   */
  runOperation(operation: string) {
    if (this.operationSubscription) {
      this.operationSubscription.unsubscribe();
    }
    this.processing = true;
    this.operationSubscription = this.getOperation(operation).subscribe(() => {
      this.processing = false;
      this.notificationService.success('The operation has been processed with success.');
    });
  }

  /**
   * Get Operation
   *
   * @param {string} operation
   * @returns {Observable<any>}
   */
  getOperation(operation: string): Observable<any> {
    const observables = [];
    switch (operation) {
      case 'IMPORT_APPS':
        return forkJoin(this.getOperation('IMPORT_APPS_STREAM'), this.getOperation('IMPORT_APPS_TASK'));
      case 'IMPORT_APPS_STREAM':
        return this.appsService.bulkImportApps({
          uri: 'http://bit.ly/Celsius-BUILD-SNAPSHOT-stream-applications-kafka-10-maven',
          properties: null,
          force: false
        });
      case 'IMPORT_APPS_TASK':
        return this.appsService.bulkImportApps({
          uri: 'http://bit.ly/Clark-BUILD-SNAPSHOT-task-applications-maven',
          properties: null,
          force: false
        });
      case 'CREATE_STREAM':
        for (let i = 0; i < 20; i++) {
          const name = 'foo_' + Math.random().toString(36).substr(2, 10);
          observables.push(this.streamsService.createDefinition(name, 'file | log', ''));
        }
        return forkJoin(...observables);
      case 'CREATE_DEPLOY_STREAM':
        for (let i = 0; i < 20; i++) {
          const name = 'foo_' + Math.random().toString(36).substr(2, 10);
          observables.push(this.streamsService.createDefinition(name, 'file | log', '', true));
        }
        return forkJoin(...observables);
      case 'CREATE_TASK':
        for (let i = 0; i < 20; i++) {
          const name = 'bar_' + Math.random().toString(36).substr(2, 10);
          observables.push(this.tasksService.createDefinition({
            name: name,
            definition: 'timestamp',
            description: ''
          }));
        }
        return forkJoin(...observables);
      case 'CREATE_LAUNCH_TASK':
        for (let i = 0; i < 20; i++) {
          const name = 'bar_' + Math.random().toString(36).substr(2, 10);
          observables.push(this.tasksService.createDefinition({ name: name, definition: 'timestamp', description: '' })
            .pipe(mergeMap(
              rest => this.tasksService.launchDefinition({ name: name })
            )));
        }
        return forkJoin(...observables);
      case 'CREATE_TASK_JOB':
        for (let i = 0; i < 20; i++) {
          const name = 'bar_' + Math.random().toString(36).substr(2, 10);
          observables.push(this.tasksService.createDefinition({
            name: name,
            definition: 'timestamp-batch',
            description: ''
          }));
        }
        return forkJoin(...observables);
      case 'CREATE_LAUNCH_TASK_JOB':
        for (let i = 0; i < 20; i++) {
          const name = 'bar_' + Math.random().toString(36).substr(2, 10);
          observables.push(this.tasksService.createDefinition({
            name: name,
            definition: 'timestamp-batch',
            description: ''
          })
            .pipe(mergeMap(res => this.tasksService.launchDefinition({ name: name }))));
        }
        return forkJoin(...observables);
    }
    return null;
  }

}
