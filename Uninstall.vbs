myName = "Forget Crossfade"    'Put script name here (shown to user)
iniSec = "ForgetCrossfade_MM"&Round(SDB.VersionHi)     'Put ini section name here
 
' Deletes settings & cache
Dim path : path = SDB.ApplicationPath&"Scripts\Auto\"
Dim i : i = InStrRev(SDB.Database.Path,"\")
Dim appPath : appPath = Left(SDB.Database.Path,i)
Dim fso : Set fso = CreateObject("Scripting.FileSystemObject")


SDB.IniFile.DeleteSection(iniSec)

If fso.FileExists(path&"ForgetCrossfade.vbs") Then
	Call fso.DeleteFile(path&"ForgetCrossfade.vbs")
End If

MsgBox("I hope your experiences with Forget Crossfade were not all bad." & vbNewLine & "Please restart MediaMonkey for the uninstall to have full effect.")




