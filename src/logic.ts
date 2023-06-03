



// Sub turnOnOff(aMnu)
// 	If SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = False Then
// 		'Remember Crossfade's previous state
// 		SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"prevState") = SDB.Player.isCrossfade
// 		'Turn On
// 		activateAutoCrossfade
		
// 		SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = True
// 		aMnu.Checked = True
// 	Else
// 		'Turn Off
// 		On Error Resume Next
// 		Script.UnregisterEvents SDB
// 		'Set crossfade back to previous state
// 		SDB.Player.isCrossfade = SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"prevState")
		
// 		SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = False
// 		aMnu.Checked = False
// 	End If
// End Sub




