import { findCookieAttribute, createSessionCookie, findCookieV2 } from "./cookie.js";
//SECTION Test 1
const name = 'memoir';
const value = 'd19ef599-9439-444d-9141-209a1b0fd748';
const domain = 'localhost';
var mCookie = createSessionCookie(name, value, domain);
console.log('mCookie:', mCookie);
var expectedCookie = {
    name: 'memoir',
    value: 'd19ef599-9439-444d-9141-209a1b0fd748',
    domain: 'localhost',
    path: '/',
    expires: 'Session',
    secure: true,
    httpOnly: true,
    sameSite: 'Lax'
};
function cookiesMatch(c1, c2) {
    for (var attribute in c1) {
        if (c2.hasOwnProperty(attribute)) {
            //@ts-ignore
            if (c1[attribute] == c2[attribute]) {
                //continue
            }
            else {
                return false;
            }
        }
    }
    //return true if all that completes without returning false once
    return true;
}
if (cookiesMatch(mCookie, expectedCookie)) {
    console.log('Test 1 - create cookie object: successful');
}
//_csrf=LX2sCpfX5zvK2TFKAFafxnHt;'
//SECTION Test 2
var multipleCookiesStr = 'cname1=value1;cname2=value2;cname3=value3;' + mCookie.getCookieStr();
const asArray = false;
var sessionCookieStr = findCookieV2(multipleCookiesStr, 'memoir', asArray);
console.log('multipleCookieStr:', multipleCookiesStr);
console.log('sessionCookieStr:', sessionCookieStr, '\n');
if (sessionCookieStr == mCookie.toString()) {
    console.log('Test 2 - Find cookie in string: Successful');
}
//SECTION Test 3
if (sessionCookieStr == mCookie.toString())
    var [attribute, cookie] = findCookieAttribute(sessionCookieStr, 'expiry');
//@ts-ignore
console.log('attribute:', attribute, '\n', 'cookie:', cookie);
