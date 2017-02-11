import 'core-js';

import {INJECTOR} from './util/Injector';
import {ExpressWebServer} from './webserver/ExpressWebServer';

const expressWebServer = INJECTOR.get(ExpressWebServer) as ExpressWebServer;

expressWebServer.start();
