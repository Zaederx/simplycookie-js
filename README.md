# simplycookie-js
 Class for creating cookie strings for your apps.
Link to the npm package: https://www.npmjs.com/package/simplycookie-js?activeTab=readme

# Usage:

Example of making a session cookie with express in node.js
```
import express from 'express'
import { Cookie } from 'simplycookie-js'

//Set up express server
const server = express()
const PORT = 3000
server.listen(PORT, () => {
   var message =  '\n'+`Server listening on port:${PORT}`
   console.log(message)
})

//send cookie to client in header on url 'host/'
server.get('/', (req,res) => {
    var cname = name
    var cvalue = value

    var cdomain = domain//which hosts can recieve a cookies
    var path = '/'
    var expires:string|Date|null = null
    var secure:boolean = true//i.e. use https
    var httpOnly = false //don't give javascript access to cookie
    var sameSite:'Strict'|'Lax'|'None' = 'None'//whether the cookies can be sent with cross site requests

    //cookies
    var cookie = new Cookie(cname,cvalue,cdomain,path,expires,secure,httpOnly,sameSite)
    var cookieStr = cookie.getCookieStr()//or cookie.toString()

    //set cookie in header
    res.setHeader('Set-Cookie', [cookieStr])
    res.send({res:true})
})

```

Also has a default createSessionCookie method which is really just a convinience method
for myself. It has some defaults for the cookies making the assumption that you are planning to use it as a session cookie that expires in 2 days
