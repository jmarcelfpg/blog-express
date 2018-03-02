echo off
set arg1=%1
IF "%arg1%"=="Types" (
    GOTO :Types
)

:Packages
call npm install body-parser@latest
call npm install cookie-parser@latest
call npm install errorhandler@latest
call npm install express@latest
call npm install express-session@latest
call npm install method-override@latest
call npm install mongoose@latest
call npm install morgan@latest
call npm install pug@latest
call npm install serve-favicon@latest
call npm install stylus@latest
call npm install expect.js@latest -D
call npm install mocha@latest -D
call npm install standard@latest -D
call npm install superagent@latest -D
IF "%arg1%"=="Install" (
    GOTO :eof
)

:Types
call npm install @types/body-parser@latest -D
call npm install @types/cookie-parser@latest -D
call npm install @types/errorhandler@latest -D
call npm install @types/express@latest -D
call npm install @types/express-session@latest -D
call npm install @types/method-override@latest -D
call npm install @types/mongoose@latest -D
call npm install @types/morgan@latest -D
call npm install @types/pug@latest -D
call npm install @types/serve-favicon@latest -D
call npm install @types/stylus@latest -D
call npm install @types/expect.js@latest -D
call npm install @types/mocha@latest -D
call npm install @types/superagent@latest -D