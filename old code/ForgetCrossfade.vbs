' MediaMonkey Script

' NAME: Forget Crossfade
' Version: 1
' Author: Dale de Silva
' Website: www.oiltinman.com
' Date last edited: 1/03/2008

' INSTALL: Copy to Scripts\Auto\

' FILES THAT SHOULD BE PRESENT UPON A FRESH INSTALL:
' ForgetCrossfade.vbs


Option Explicit
Dim trackTimer

Sub firstRun
	'Remember Crossfade's previous state
	SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"prevState") = SDB.Player.isCrossfade
	' Turn On
	SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = True
	MsgBox("Forget Crossfade has been activated for the first time."+ vbCRLF + "To deactivate it, go to the 'Play' menu and uncheck 'Auto Crossfade'."+ vbCRLF + "This will revert the crossfade setting to what it was when Auto Crossfade was last activated.")
	OnStartup
End Sub

' Sub OnStartup
' 	Dim aMnu
	
' 	'add link to turn on / off play menu
' 	Set aMnu = SDB.UI.AddMenuItem(SDB.UI.Menu_Play,4,1)
' 	aMnu.Caption = "Auto Crossfade"
' 	'Turn on ForgetCrossfade if first use
' 	If SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = True Then
' 		activateAutoCrossfade
' 	End If
' 	aMnu.Checked = SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active")
			
' 	Script.RegisterEvent aMnu, "OnClick", "turnOnOff"
' End Sub

Sub turnOnOff(aMnu)
	If SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = False Then
		'Remember Crossfade's previous state
		SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"prevState") = SDB.Player.isCrossfade
		'Turn On
		activateAutoCrossfade
		
		SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = True
		aMnu.Checked = True
	Else
		'Turn Off
		On Error Resume Next
		Script.UnregisterEvents SDB
		'Set crossfade back to previous state
		SDB.Player.isCrossfade = SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"prevState")
		
		SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = False
		aMnu.Checked = False
	End If
End Sub

' Sub activateAutoCrossfade
' 	Script.RegisterEvent SDB, "OnPlay", "refreshTimer"
' 	Script.RegisterEvent SDB, "OnSeek", "refreshTimer"
' 	Script.RegisterEvent SDB, "OnPause", "pauseTimer"
' 	Script.RegisterEvent SDB, "OnStop", "stopTimer"
' 	If SDB.Player.isPlaying Then
' 		refreshTimer
' 	End If
' End Sub


' Sub refreshTimer
' 	stopTimer
' 	Set trackTimer = SDB.CreateTimer(SDB.Player.CurrentSongLength - SDB.Player.PlaybackTime - 15000)   ' 15 seconds before end of song
'   	Script.RegisterEvent trackTimer, "OnTimer", "checkCrossfade" 
' End Sub

' Sub pauseTimer
' 	If SDB.Player.isPaused Then
' 		stopTimer
' 	Else
' 		refreshTimer
' 	End If
' End Sub

' Sub stopTimer
' 	'MsgBox("stopTimer")
' 	On Error Resume Next
' 	Script.UnregisterEvents trackTimer
' End Sub


' Sub checkCrossfade(Tmr)
' 	stopTimer
' 	Dim curAlbum, nextAlbum, curAArtist, nextAArtist, curTrack, nextTrack, curDisc, nextDisc

' 	'Do Nothing if there is not song next
' 	'(Index must be zero based while count is not)
' 	If SDB.Player.CurrentSongIndex = SDB.Player.CurrentSongList.Count - 1 Then
' 		Exit Sub
' 	End If
	
' 	If SDB.Player.isShuffle Then
' 		'if it's shuffling then crossfade cause who knows what is coming next
' 		SDB.Player.isCrossfade = True
' 	Else
' 		'for some reason I've found some of my albums tracks report -1 instead of the same album ID as the other tracks.. so I'm changing this
' 		'curAlbum = SDB.Player.CurrentSong.Album.ID
' 		'nextAlbum = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).Album.ID
' 		curAlbum = SDB.Player.CurrentSong.AlbumName
' 		nextAlbum = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).AlbumName
' 		curAArtist = SDB.Player.CurrentSong.AlbumArtistName
' 		nextAArtist = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).AlbumArtistName
' 		curTrack = SDB.Player.CurrentSong.TrackOrder
' 		nextTrack = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).TrackOrder
' 		curDisc = SDB.Player.CurrentSong.DiscNumber
' 		nextDisc = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).DiscNumber
		
' 		'check if what's coming next is next on the same album
' 		If (curAlbum = nextAlbum Or curAlbum = "") And curAArtist = nextAArtist And curDisc = nextDisc And curTrack+1 = nextTrack Then
' 			SDB.Player.isCrossfade = False
' 			'MsgBox("Turn Off Crossfade")
' 		Else
' 			SDB.Player.isCrossfade = True
' 			'MsgBox("Turn On Crossfade")
' 		End If
		
' 		'MsgBox("curAlbumID: "&curAlbum)
' 		'MsgBox("nextAlbumID: "&nextAlbum)
' 		'MsgBox("curAlbum: "&curAlbum&" - curArtist: "&curAArtist&" - Disc: "&curDisc&" - Track: "&curTrack)
' 		'MsgBox("nextAlbum: "&nextAlbum&" - nextArtist: "&nextAArtist&" - Disc: "&nextDisc&" - Track: "&nextTrack)
' 	End If

' End Sub