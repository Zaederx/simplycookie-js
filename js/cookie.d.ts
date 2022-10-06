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
export declare class Cookie {
    name: string;
    value: string | null;
    domain: string;
    path: string;
    expires: string | Date | null;
    secure: boolean;
    httpOnly: boolean;
    sameSite: string;
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
    constructor(name: string, value: string | null, domain: string, path?: string, expires?: string | Date | null, secure?: boolean, httpOnly?: boolean, sameSite?: 'Strict' | 'Lax' | 'None' | null);
    getCookieStr(): string;
    print(): void;
    toString(): string;
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
export declare function createSessionCookie(name: string, value: string | null, domain: string): Cookie;
