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
   name:string
   value:string|null
   domain:string
   /**
    * "the path that must exist in the requested URL for the browser to send the Cookie header" -
    * https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Set-Cookie#pathpath-value
    */
   path:string
   expires:string
   // size:string -  size of the cookie - can be left blank 
   secure:boolean
   httpOnly:boolean
   sameSite:string

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
   constructor(name:string, value:string|null, domain:string, path?:string, expires?:string|Date|null, secure?:boolean, httpOnly?:boolean, sameSite?:'Strict'|'Lax'|'None'|null) {
       this.name = name
       this.value = value
       this.domain = domain 
       this.path = path ? path : '/'
       //set expiry date
       const d = new Date();
       const year = d.getFullYear()
       const month = d.getMonth()
       const day = d.getDate()
       const twoDaysTime = day + 3
       //@ts-ignore
       if (typeof expires === Date) {
         this.expires = (expires as Date).toUTCString()
       }
       //@ts-ignore
       else if (typeof expires === 'string') {
         this.expires = expires as string
       }
       else {
         this.expires = new Date(year,month,twoDaysTime).toUTCString()
       }
       
       // this.size = size ? size : 
       this.secure = secure != null ? secure : false
       this.httpOnly = httpOnly ? httpOnly : false
       this.sameSite = sameSite != null ? sameSite : 'Lax'
   }




   getCookieStr() {
       var cookie:string = `${this.name}=${this.value};`

       cookie += `Domain=${this.domain};`
       cookie += `Path=${this.path};`
       //@ts-ignore
       cookie += `Expires=${this.expires};`
       if (this.secure == true)
       {
           cookie +='Secure;'
       }
       if (this.httpOnly == true)
       {
           cookie += 'HttpOnly;'
       }
       cookie += `SameSite=${this.sameSite};`
       return cookie;
   }

   print() {
       console.log('\n'+`printing cookie:${this.getCookieStr()}`)
   }

   toString() {
       return this.getCookieStr()
   }
}

/**
* Creates a default session cookie with the following default properties:
* expires in two days (as the cookie class does by default)
* secure - true //use https
* httpOnly - true // can be accessed via javascript
* sameSite - Lax //whether the cookies can be sent with cross site requests
* 
* @param name 
* @param value 
* @param domain 
*/
export function createSessionCookie(name:string, value:string|null, domain:string):Cookie
{
    var cname = name
    var cvalue = value
    var cdomain = domain//which hosts can recieve a cookies
    var path = '/'
    var expires = 'Session'
    var secure = true//i.e. use https
    var httpOnly = true //don't give javascript access to cookie
    var sameSite:'Strict'|'Lax'|'None' = 'Lax'//whether the cookies can be sent with cross site requests
    var cookie = new Cookie(cname,cvalue,cdomain,path,expires,secure,httpOnly,sameSite)

    return cookie
}

 

/**
* 
* @param cookies the string containing all the cookies you are looking
* @param cookieName the name of the cookie that you are searching for in all the cookies
* @param asArr whether to return the results as an array of attributes - default to false
* 
*/
export function findCookie(cookies:string, cookieName:string, asArr:boolean=false):string|string[]|undefined
{
   console.log('function findCookie called')
   if (cookies) {//if not null or undefined
      var arrCookies = cookies.trim().split(';')
      var cookieStrReturn:string = ''
      var cookieAndValueArr:any[] = []
      for(var i=0; i< arrCookies.length; i++) {
         var cookieStr = arrCookies[i]
         if (cookieStr.includes(cookieName))
         {

            if (asArr) 
            {
               console.log('returning cookie as array of attributes')
               cookieAndValueArr = cookieStr.trim().split('=')
               return cookieAndValueArr
            }
            else
            {
               console.log('returning cookieStr...')
               return cookieStr
            }
         }
      }
   }
   else return 'string was undefined'
}

/**
 * Takes a string array of cookie attributes and values
 * and returns it as a string.
 * @param cookieArr array of cookie attributes
 * @returns 
 */
function cookieArrToString(cookieArr:string[]):string {
   var cookieStr = ''
   for (var i = 0; i < cookieArr.length; i++ ) {
      cookieStr += cookieArr[i]+';';
   }
   return cookieStr
} 
/**
 * Will take a list of cookies and isolate
 * one specific cookie and its attributes.
 * @param cookies list of cookies in a string.
 */
export function findCookieV2(cookies:string, cookieName:string, asArr:boolean=true):string[]|string {
   if (cookies.length == 0) { return []}
   //split the cookies into their attributes and values
   const attributesAndValues = cookies.split(';')
   const cookieAttributes = ['Domain', 'Expires', 'HttpOnly', 'Max-Age', 'Partitioned', 'Path', 'Secure', 'SameSite'] 
   //if there's an empty 
   if (attributesAndValues.length == 0) {
      if (asArr) return []
      else return ''
   }
   //handle array of one item
   if (attributesAndValues.length == 1) {
      if (asArr) {return attributesAndValues }
      else { return attributesAndValues[1] }
   }
   //handle array of 2 items
   if (attributesAndValues.length == 2) {
      //check if item 0 has/is the cookie we're searching for
      if (attributesAndValues[0].includes(cookieName)) {
         //check whether the next item is an attribute of the same cookie or is another cookie
         for (var i = 0; i < cookieAttributes.length; i++ ){
            if (attributesAndValues[1].includes(cookieAttributes[i])) {
               //return the cookie (already in it's attribute segements)
               if (asArr) {
                  return attributesAndValues
               }
               else {
                  return cookieArrToString(attributesAndValues)
               }
               
            }
         }
      }
      //if the first item wasn't the cookie, check the second
      else if (attributesAndValues[1].includes(cookieName)){
         //return array with single cookie attribute (the name and it's value)
         if (asArr) return[attributesAndValues[1]]
         else return attributesAndValues[1]
      }
   }
   /**
    * Index of the cookie we are looking for.
    */
   var c1Index = 0;
   /**
    * Index of the first cookie that follows the one 
    * we are looking for.
    */
   var c2Index = 0;
   /**
    * An array of the attributes of the cookie
    * that we are looking for.
    */
   var cookieArr:string[] = []
   /** Cookie 1 Found 
    * whether you found the cookie with the mathcing cookieName.
    * */
   var c1Found:boolean = false//
   //try to locate the name of a cookie
   for(var i = 0; i < attributesAndValues.length; i++) {
      //get one attribute and value pair
      var currentAttr = attributesAndValues[i]
      //check if it has the cookie name
      if (currentAttr.includes(cookieName)) {
         c1Found = true
         c1Index = i
         break
      }
   }

   //if there is no mathcing cookie in the array
   if(!c1Found) {
      console.log('cookie not found.')
      if (asArr) {return []}
      else {return ''}
   }
   //if the cookieName was found & another index exists after the cookie
   if (c1Found && c1Index+1 < attributesAndValues.length){
      console.log('function findCookiev2 - attributesAndValues:', attributesAndValues)
      //then locate the next cookie (everything before the next cookie is part of the first located cookie)
      for(var i = c1Index+1; i < attributesAndValues.length; i++) {
         var currentAttr = attributesAndValues[i]
         var matchesOneStandardAttribute = false
         console.log('currentAttr:',currentAttr)
         for(var j = 0; j < cookieAttributes.length; j++) {
            //check if current attribute and value is a standard cookie attribute
            //if not it's the next cookie
            if (currentAttr.includes(cookieAttributes[j])) {
               matchesOneStandardAttribute = true
            }
         }
         /**
          * If after checking the attributes and it's not one,
          * then it's another cookie. So we need to save it's
          * index and stop searching for more of cookie-1's 
          * attributes.
          */
         if (!matchesOneStandardAttribute) {
            //it's a new cookie
            c2Index = i
            break;
         }
      }
      //Find all the attributes of cookie one and put them into an array
      if (c1Index < c2Index) {
         for(var i = c1Index; i < c2Index; i++) {
            cookieArr.push(attributesAndValues[i])
         }
         if (asArr) { return cookieArr }
         else { return cookieArrToString(cookieArr) }
      }
      //if there is no second cookie - add all items till end of array
      else {
         for(var i = c1Index; i < attributesAndValues.length; i++ ) {
            cookieArr.push(attributesAndValues[i])
         }
         if (asArr) { return cookieArr }
         else { return cookieArrToString(cookieArr) }
      }
      
   }
   else {//if the cookies index is the last element of the array
      if (asArr) { return [attributesAndValues[c1Index]]}
      else { return attributesAndValues[c1Index] }
   }
   
   
   return []
}

/**
* Method to find an attribute in a single cookie string
* @param cookieStr single cookie in a strings
* @param attribute single attribute you want the value of from the cookie
* @return [attributeValue,cookie] - cookie returned as object with key value pairs
*/
export function findCookieAttribute(cookieStr:string, attribute:string):string[]
{
  var cookie:any = {}
  var attributeValue:string = ''
  if (cookieStr) {
      //split cookie into attributes
      var attributeArr = cookieStr.trim().split(';')
      //split attributes into key value pairs
      attributeArr.forEach((attr) => {
         const [key,value] = attr.trim().split('=')
         cookie[key] = value
         if (key == attribute)
         {
            attributeValue = value
         }
      })
      return [attributeValue, cookie]
  }
  var message = 'cookieStr was empty'
  return [message,message]
}