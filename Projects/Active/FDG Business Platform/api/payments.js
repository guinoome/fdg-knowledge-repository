import {paymentHandlers} from '../server/payment-handlers.js';
export default {fetch: request => paymentHandlers().account(request)};
