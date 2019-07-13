@IF EXIST "%~dp0\node.exe" (
  "%~dp0\node.exe"  "%~dp0\ls\q.js" %*
) ELSE (
  @SETLOCAL
  @SET PATHEXT=%PATHEXT:;.JS;=;%
  node  "%~dp0\ls\q.js" %*
)