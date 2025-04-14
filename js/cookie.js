/**
 * Class for representing and creating cookies.
 * Cookies are essentially just strings with information separated by
 * semi-colons.
 *
 * This call just help work as an API for creating those strings.
 * see
 *  and [Cookies - runestone academy](https://runestone.academy/ns/books/published/webfundamentals/CGI/cookies.html) and [Link about testing cookie attributes](https://owasp.org/www-project-web-security-testing-guide/latest/4-Web_Application_Security_Testing/06-Session_Management_Testing/02-Testing_for_Cookies_Attributes)
 * and [Cookies - MZD](https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies) and [Set-Cookie Header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie)
 * for information about cookies
 *
 *
 */
export class Cookie {
    /**
     *
     * @param name name of the cookie
     * @param value value of the cookie - where you store user identifation like a username (can also be stored as json string of useful information.)
     * @param domain which hosts the cookie should be sent to while browsing
     * @param path which path the must be included in the URL at the chosen domain for the cookie be sent to the host - '/' by default
     * @param expires when the cookie should expire / be deleted from browser - 2 days time by default if not specified
     * @param secure whether to use https or not (not being http instead)
     * @param httpOnly whether the cookie should be inaccessible to javascript
     * @param sameSite whether the cookies can be sent with cross site requests
     */
    constructor(name, value, domain, path, expires, secure, httpOnly, sameSite) {
        this.name = name;
        this.value = value;
        this.domain = domain;
        this.path = path ? path : '/';
        //set expiry date
        const d = new Date();
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        const twoDaysTime = day + 3;
        this.expires = expires != null ? expires : new Date(year, month, twoDaysTime);
        // this.size = size ? size : 
        this.secure = secure != null ? secure : false;
        this.httpOnly = httpOnly ? httpOnly : false;
        this.sameSite = sameSite != null ? sameSite : 'Lax';
    }
    getCookieStr() {
        var cookie = `${this.name}=${this.value};`;
        cookie += `Domain=${this.domain};`;
        cookie += `Path=${this.path};`;
        cookie += `Expires=${this.expires.toUTCString()};`;
        if (this.secure == true) {
            cookie += 'Secure;';
        }
        if (this.httpOnly == true) {
            cookie += 'HttpOnly;';
        }
        cookie += `SameSite=${this.sameSite};`;
        return cookie;
    }
    print() {
        console.log('\n' + `printing cookie:${this.getCookieStr()}`);
    }
    toString() {
        return this.getCookieStr();
    }
}
/**
* Create Session Cookies with the following default properties:
* expires in two days (as the cookie class does by default)
* secure - true //use https
* httpOnly - true // can be accessed via javascript
* sameSite - Lax //whether the cookies can be sent with cross site requests
*
* @param name
* @param value
* @param domain
*/
export function createSessionCookie(name, value, domain) {
    var cname = name;
    var cvalue = value;
    var cdomain = domain; //which hosts can recieve a cookies
    var path = '/';
    var expires = 'Session';
    var secure = true; //i.e. use https
    var httpOnly = true; //don't give javascript access to cookie
    var sameSite = 'Lax'; //whether the cookies can be sent with cross site requests
    var cookie = new Cookie(cname, cvalue, cdomain, path, expires, secure, httpOnly, sameSite);
    return cookie;
}
/**
*
* @param cookies the string containing all the cookies you are looking
* @param cookieName the name of the cookie that you are searching for in all the cookies
* @param asArr whether to the results as an array of attributes
*
* Note:
* If searching cookies from node req object.
* Each cookie is separated by a comma `,`
* and each attribute is separated by a semicolon `;`
*/
export function findCookie(cookies, cookieName, asArr = false, node = true) {
    var cookieStr = '';
    node ? cookieStr = findCookieNode(cookies, cookieName, asArr) : cookieStr = findCookieJS(cookies, cookieName, asArr);
    return cookieStr;
}
/**
*
* @param cookies the string containing all the cookies you are looking
* @param cookieName the name of the cookie that you are searching for in all the cookies
* @param asArr whether to the results as an array of attributes
*
* Note:
* If searching cookies from node req object.
* Each cookie is separated by a comma `;`
* and there is only the value attribute of each cookie
*/
export function findCookieNode(cookies, cookieName, asArr) {
    console.log('function findCookieNode called');
    var arrCookies = cookies.trim().split(';');
    var cookieStrReturn = '';
    var cookieAsArr = [];
    for (var i = 0; i < arrCookies.length; i++) {
        var cookieStr = arrCookies[i];
        if (cookieStr.includes(cookieName)) {
            if (asArr) {
                console.log('returning cookie as array of attributes');
                cookieAsArr = cookieStr.trim().split('=');
                return cookieAsArr;
            }
            else {
                console.log('returning cookieStr...');
                return cookieStr;
            }
        }
    }
}
/**
*
* @param cookies the string containing all the cookies you are looking
* @param cookieName the name of the cookie that you are searching for in all the cookies
* @param asArr whether to the results as an array of attributes
*
* Note:
* If searching cookies from node req object.
* Each cookie is separated by a comma `,`
* and each attribute is separated by a semicolon `;`
*/
export function findCookieJS(cookies, cookieName, asArr) {
    var arr = cookies.trim().split(',');
    arr.forEach((cookieStr) => {
        if (cookieStr.includes(cookieName)) {
            if (asArr) {
                var cookieAsArr = cookieStr.trim().split('=');
                return cookieAsArr;
            }
            else {
                return cookieStr;
            }
        }
    });
    return '';
}
/**
* Method to find an attribute in a single cookie string
* @param cookieStr single cookie in a strings
* @param attribute single attribute you want the value of from the cookie
* @return [attributeValue,cookie] - cookie returned as object with key value pairs
*/
export function findCookieAttribute(cookieStr, attribute) {
    var cookie = {};
    var attributeValue = '';
    //split cookie into attributes
    var attributeArr = cookieStr.trim().split(';');
    //split attributes into key value pairs
    attributeArr.forEach((attr) => {
        const [key, value] = attr.trim().split('=');
        cookie[key] = value;
        if (key == attribute) {
            attributeValue = value;
        }
    });
    return [attributeValue, cookie];
}
