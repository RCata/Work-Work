// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
const REST_BASE_URL: string = 'http://localhost:8080/psmpng-vr';

// tslint:disable-next-line: typedef
export const environment = {
    production: false,
    ENV_NAME: 'DEV',
    RESOURCE_MODE: 'SERVICES',

    /* this will eventually be the landing page (postLogin) */
    ENDPOINT_ROOT: REST_BASE_URL + '/link-distribution-service/v1/root-links',
};
