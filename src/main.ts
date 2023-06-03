requirejs('helpers/vbsObjects');
// MediaMonkey Script

// NAME: Forget Crossfade
// Version: 1
// Author: Dale de Silva
// Website: www.oiltinman.com
// Date last edited: 1/03/2008

// INSTALL: Copy to Scripts\Auto\

// FILES THAT SHOULD BE PRESENT UPON A FRESH INSTALL:
// ForgetCrossfade.vbs


var trackTimer

function firstRun() {
	//Remember Crossfade's previous state
	JSON.parse(app.settings.getJSON(''))["ForgetCrossfade_MM"+Math.round(app.versionHi)]["prevState"] = app.player.isCrossfade
	// Turn On
	JSON.parse(app.settings.getJSON(''))["ForgetCrossfade_MM"+Math.round(app.versionHi)]["active"] = true
	alert("Forget Crossfade has been activated for the first time."+ "\r\nTo deactivate it, go to the 'Play' menu and uncheck 'Auto Crossfade'."+ "\r\nThis will revert the crossfade setting to what it was when Auto Crossfade was last activated.")
	OnStartup
}

function OnStartup() {
	var aMnu
	
	//add link to turn on / off play menu
//	Set aMnu = app.uI//[MenuItem(app.uI.menu_Play] = 4,1)
	aMnu.controlClass.textContent = "Auto Crossfade"
	//Turn on ForgetCrossfade if first use
	if(JSON.parse(app.settings.getJSON(''))["ForgetCrossfade_MM"+Math.round(app.versionHi)]["active"] == true){
		activateAutoCrossfade
	}
	aMnu.checked = JSON.parse(app.settings.getJSON(''))["ForgetCrossfade_MM"+Math.round(app.versionHi)]["active"]
			
	app.listen(aMnu, 'OnClick', turnOnOff)
}
whenReady( OnStartup );

function turnOnOff(aMnu) {
	if(JSON.parse(app.settings.getJSON(''))["ForgetCrossfade_MM"+Math.round(app.versionHi)]["active"] == false){
		//Remember Crossfade's previous state
		JSON.parse(app.settings.getJSON(''))["ForgetCrossfade_MM"+Math.round(app.versionHi)]["prevState"] = app.player.isCrossfade
		//Turn On
		activateAutoCrossfade
		
		JSON.parse(app.settings.getJSON(''))["ForgetCrossfade_MM"+Math.round(app.versionHi)]["active"] = true
		aMnu.checked = true
	}else{
		//Turn Off
		// On Error Resume Next // !!!!!!!!!!! Manual conversion needed (try..catch?)
		Script.unregisterEvents app
		//Set crossfade back to previous state
		app.player.isCrossfade = JSON.parse(app.settings.getJSON(''))["ForgetCrossfade_MM"+Math.round(app.versionHi)]["prevState"]
		
		JSON.parse(app.settings.getJSON(''))["ForgetCrossfade_MM"+Math.round(app.versionHi)]["active"] = false
		aMnu.checked = false
	}
}

function activateAutoCrossfade() {
	app.listen(app, 'OnPlay', refreshTimer)
	app.listen(app, 'OnSeek', refreshTimer)
	app.listen(app, 'OnPause', pauseTimer)
	app.listen(app, 'OnStop', stopTimer)
	if(app.player.isPlaying){
		refreshTimer
	}
}


function refreshTimer() {
	stopTimer
	trackTimer = setInterval(function(){ }, app.player.getCurrentTrack()Length - app.player.playbackTime - 15000)   // 15 seconds before end of song
  	app.listen(trackTimer, 'OnTimer', checkCrossfade) 
}

function pauseTimer() {
	if(app.player.isPaused){
		stopTimer
	}else{
		refreshTimer
	}
}

function stopTimer() {
	//MsgBox("stopTimer")
	// On Error Resume Next // !!!!!!!!!!! Manual conversion needed (try..catch?)
	Script.unregisterEvents trackTimer
}


function checkCrossfade(Tmr) {
	stopTimer
	var curAlbum, nextAlbum, curAArtist, nextAArtist, curTrack, nextTrack, curDisc, nextDisc

	//Do Nothing if there is not song next
	//(Index must be zero based while count is not)
	if(app.player.getCurrentTrack()Index == app.player.getCurrentTrack()List.length - 1){
		return
	}
	
	if(app.player.isShuffle){
		//if it's shuffling then crossfade cause who knows what is coming next
		app.player.isCrossfade = true
	}else{
		//for some reason I've found some of my albums tracks report -1 instead of the same album ID as the other tracks.. so I'm changing this
		//curAlbum = SDB.Player.CurrentSong.Album.ID
		//nextAlbum = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).Album.ID
		curAlbum = app.player.getCurrentTrack().album
		nextAlbum = app.player.playlistItems(app.player.getCurrentTrack()Index+1).album
		curAArtist = app.player.getCurrentTrack().albumArtist
		nextAArtist = app.player.playlistItems(app.player.getCurrentTrack()Index+1).albumArtist
		curTrack = app.player.getCurrentTrack().trackOrder
		nextTrack = app.player.playlistItems(app.player.getCurrentTrack()Index+1).trackOrder
		curDisc = app.player.getCurrentTrack().discNumber
		nextDisc = app.player.playlistItems(app.player.getCurrentTrack()Index+1).discNumber
		
		//check if what's coming next is next on the same album
		if((curAlbum == nextAlbum || curAlbum == "") && curAArtist == nextAArtist && curDisc = nextDisc && curTrack+1 = nextTrack){
			app.player.isCrossfade = false
			//MsgBox("Turn Off Crossfade")
		}else{
			app.player.isCrossfade = true
			//MsgBox("Turn On Crossfade")
		}
		
		//MsgBox("curAlbumID: "&curAlbum)
		//MsgBox("nextAlbumID: "&nextAlbum)
		//MsgBox("curAlbum: "&curAlbum&" - curArtist: "&curAArtist&" - Disc: "&curDisc&" - Track: "&curTrack)
		//MsgBox("nextAlbum: "&nextAlbum&" - nextArtist: "&nextAArtist&" - Disc: "&nextDisc&" - Track: "&nextTrack)
	}

}


// ============================================================================
// Automatically converted by the 'convertVBS2JS' MediaMonkey 5 plug-in.
// Based on http://slingfive.com/pages/code/scriptconverter
// ============================================================================
