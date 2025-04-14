import { findCookie, findCookieAttribute } from "./cookie.js";
var cookiesStr = 'memoir-session=d19ef599-9439-444d-9141-209a1b0fd748; _csrf=LX2sCpfX5zvK2TFKAFafxnHt';
var sessionCookieStr = findCookie(cookiesStr, 'memoir-session');
console.log('sessionCookieStr:', sessionCookieStr, '\n');
var [attribute, cookie] = findCookieAttribute(sessionCookieStr, 'memoir-session');
console.log('attribute:', attribute, '\n', 'cookie:', cookie);
