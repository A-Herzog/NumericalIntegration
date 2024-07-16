cd ..
del NumericalIntegration.exe
del NumericalIntegration_Linux_MacOS.zip
call neu.cmd build --release
cd desktop-app
"C:\Program Files (x86)\NSIS\makensis.exe" Launcher.nsi
move NumericalIntegration.exe ..
cd ..
move .\dist\NumericalIntegration-release.zip NumericalIntegration_Linux_MacOS.zip
rmdir /S /Q dist
cd desktop-app