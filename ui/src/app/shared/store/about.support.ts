import { AboutState, DependencyState, RuntimeEnvironmentState } from './about.reducer';
import set from 'lodash.set';

const parseDependency = (input): DependencyState => {
  return {
    name: input.name,
    version: input.version,
    url: input.url,
    checksumSha1: input.checksumSha1,
    checksumSha256: input.checksumSha256
  };
};

const parsePlatformSpecificInfo = (input) => {
  if (input) {
    let map = {};
    Object.keys(input).forEach(key => {
      set(map, key, input[key]);
    });
    return map;
  }
  return null;
};

const parseRuntimeEnvironment = (input): RuntimeEnvironmentState => {
  return {
    deployerImplementationVersion: input.deployerImplementationVersion,
    deployerName: input.deployerName,
    deployerSpiVersion: input.deployerSpiVersion,
    javaVersion: input.javaVersion,
    platformApiVersion: input.platformApiVersion,
    platformClientVersion: input.platformClientVersion,
    platformHostVersion: input.platformHostVersion,
    platformSpecificInfo: parsePlatformSpecificInfo(input.platformSpecificInfo),
    platformType: input.platformType,
    springBootVersion: input.springBootVersion,
    springVersion: input.springVersion
  };
};

export const parse = (input): AboutState => {
  return {
    versions: {
      implementation: parseDependency(input.versionInfo.implementation),
      core: parseDependency(input.versionInfo.core),
      dashboard: parseDependency(input.versionInfo.dashboard),
      shell: parseDependency(input.versionInfo.shell),
    },
    features: {
      streams: input.featureInfo.streamsEnabled,
      tasks: input.featureInfo.tasksEnabled,
      schedules: input.featureInfo.schedulesEnabled,
      grafana: input.featureInfo.grafanaEnabled
    },
    runtimeEnvironment: {
      appDeployer: parseRuntimeEnvironment(input.runtimeEnvironment.appDeployer),
      taskLaunchers: input.runtimeEnvironment.taskLaunchers.map(parseRuntimeEnvironment)
    },
    grafana: {
      url: input.grafanaInfo?.url || '',
      token: input.grafanaInfo?.token || '',
      refreshInterval: +input.grafanaInfo?.refreshInterval || 10
    },
    security: {
      isAuthentication: input.securityInfo.authenticationEnabled,
      isAuthenticated: input.securityInfo.authenticated,
      username: input.securityInfo.username,
      roles: input.securityInfo.roles as string[]
    }
  };
};
