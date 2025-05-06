import { findCookie, findCookieAttribute, createSessionCookie, Cookie, findCookieV2 } from "./cookie.js"; 
//SECTION Test 1
const name = 'memoir'
const value = 'd19ef599-9439-444d-9141-209a1b0fd748'
const domain = 'localhost'
var mCookie:Cookie = createSessionCookie(name,value,domain)
console.log('mCookie:',mCookie)
var expectedCookie = {
    name: 'memoir',
    value: 'd19ef599-9439-444d-9141-209a1b0fd748',
    domain: 'localhost',
    path: '/',
    expires: 'Session',
    secure: true,
    httpOnly: true,
    sameSite: 'Lax'
  } as Cookie
  
  if (Cookie.cookiesMatch(mCookie,expectedCookie)) {
    console.log('Test 1 - create cookie object: successful')
  }
//_csrf=LX2sCpfX5zvK2TFKAFafxnHt;'
//SECTION Test 2
var multipleCookiesStr = 'cname1=value1;cname2=value2;cname3=value3;'+ mCookie.getCookieStr()
const asArray = false
var sessionCookieStr = findCookieV2(multipleCookiesStr, 'memoir', asArray) as string
console.log('multipleCookieStr:', multipleCookiesStr)
console.log('sessionCookieStr:',sessionCookieStr, '\n')
if (sessionCookieStr == mCookie.toString()) {
  console.log('Test 2 - Find cookie in string: Successful')
}

//SECTION Test 3
var expires:string = findCookieAttribute(sessionCookieStr, 'Expires')
//@ts-ignore
console.log('attribute - expires:',expires)
if(expires == 'Session') {
  console.log('Test 3 - function findCookieAttribute works: Sucessful')
}
