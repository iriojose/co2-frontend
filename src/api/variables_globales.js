
const header             = process.env.VUE_APP_HEADER;
const http               = process.env.VUE_APP_SERVE_REQUEST;
const data               = process.env.VUE_APP_SERVICIO_DATA;
const auth               = process.env.VUE_APP_SERVICIO_AUTH;
const tenant_id          = process.env.VUE_APP_TENANT_ID;

export default {data, auth, header,http,tenant_id};