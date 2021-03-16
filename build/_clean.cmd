@echo off
setlocal
set projdocs="docs"
set projmodules="node_modules"
set projlock="package-lock.json"
if exist %projdocs% rd /s /q %projdocs%
if exist %projmodules% rd /s /q %projmodules%
if exist %projlock% del /q %projlock%
endlocal
