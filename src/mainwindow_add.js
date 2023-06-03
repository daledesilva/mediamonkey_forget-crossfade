// Execute when the window is ready
window.whenReady(() => {
    uitools.toastMessage.show('Hello world! From Dale', {
        disableUndo: true
    });
});



// Sub OnStartup
// 	Dim aMnu
	
// 	'add link to turn on / off play menu
// 	Set aMnu = SDB.UI.AddMenuItem(SDB.UI.Menu_Play,4,1)
// 	aMnu.Caption = "Auto Crossfade"
// 	'Turn on ForgetCrossfade if first use
// 	If SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = True Then
// 		activateAutoCrossfade
// 	End If
// 	aMnu.Checked = SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active")
			
// 	Script.RegisterEvent aMnu, "OnClick", "turnOnOff"
// End Sub