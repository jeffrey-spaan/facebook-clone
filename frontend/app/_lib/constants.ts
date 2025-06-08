const CONTEXT_PATH = '/api/v1';

export const constants = {

    ACCESS_TOKEN: 'access_token',
    ACCESS_TOKEN_PREFIX: 'Bearer ',
    API_BASE_URL: "http://localhost:8081",
    
    HTTP_HEADER:{
        AUTHORIZATION: 'Authorization',
    },

    REQUEST_PATH:{
        ACTUATOR: CONTEXT_PATH + '/actuator',
        AUTH: CONTEXT_PATH + '/auth',
        USERS: CONTEXT_PATH + '/users'
    },

    ROUTER_PATH:{
        DASHBOARD: '/dashboard',
        DASHBOARD_PERMISSIONS: '/dashboard/permissions',
        DASHBOARD_ROLES: '/dashboard/roles',
        DASHBOARD_USERS: '/dashboard/users',
        LOGIN: '/login',
        REGISTER: '/register',
    },
}