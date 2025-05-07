import { printFormatted } from 'printformatted-js';
import { findCookieAttribute, createSessionCookie, Cookie, findCookieV2 } from "./cookie.js";
//SECTION Test 1
printFormatted('yellow', '\n', '**** TEST 1 *****');
const name = 'memoir';
const value = 'd19ef599-9439-444d-9141-209a1b0fd748';
const domain = 'localhost';
var mCookie = createSessionCookie(name, value, domain);
printFormatted('blue', 'mCookie:', mCookie);
printFormatted('blue', 'mCookie.getCookieStr():', mCookie.getCookieStr());
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
if (Cookie.cookiesMatch(mCookie, expectedCookie)) {
    printFormatted('green', 'Test 1 - create cookie object: Successful', '\n');
}
else {
    printFormatted('red', 'Test 1 - create cookie object: Unsuccessful', '\n');
}
//SECTION TEST 2
printFormatted('yellow', '\n', '**** TEST 2 *****');
const mCookieStr = 'memoir=d19ef599-9439-444d-9141-209a1b0fd748;Domain=localhost;Path=/;Expires=Session;Secure;HttpOnly;SameSite=Lax;';
if (mCookie.getCookieStr() == mCookieStr) {
    printFormatted('green', 'Test 2 - check whether cookie.getCookieString() works (dependent on Test 1 success: Successful)');
}
else {
    printFormatted('red', 'Test 2 - check whether cookie.getCookieString() works (dependent on Test 1 success: Unsuccessful)');
}
//SECTION Test 3
printFormatted('yellow', '\n', '**** TEST 3 *****');
var multipleCookiesStr = 'cname1=value1;cname2=value2;cname3=value3;' + mCookie.getCookieStr();
const asArray = false;
const log = true;
var sessionCookieStr = findCookieV2(multipleCookiesStr, 'memoir', asArray, log);
printFormatted('blue', 'multipleCookieStr:', multipleCookiesStr);
printFormatted('blue', 'sessionCookieStr:', sessionCookieStr);
if (sessionCookieStr == mCookie.toString()) {
    printFormatted('green', 'Test 3 - Find cookie in string: Successful');
}
else {
    printFormatted('red', 'Test 3 - Find cookie in string: Unsuccessful');
}
//SECTION Test 4
printFormatted('yellow', '\n', '**** TEST 4 *****');
var expires = findCookieAttribute(sessionCookieStr, 'Expires');
printFormatted('blue', 'attribute - expires:', expires);
if (expires == 'Session') {
    printFormatted('green', 'Test 4 - function findCookieAttribute works: Sucessful');
}
else {
    printFormatted('red', 'Test 4 - function findCookieAttribute works: Unsucessful');
}
