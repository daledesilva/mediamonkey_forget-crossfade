
let trackTimer;


// Sub activateAutoCrossfade
// 	Script.RegisterEvent SDB, "OnPlay", "refreshTrackEndTimer"
// 	Script.RegisterEvent SDB, "OnSeek", "refreshTrackEndTimer"
// 	Script.RegisterEvent SDB, "OnPause", "pauseTimer"
// 	Script.RegisterEvent SDB, "OnStop", "stopTrackEndTimer"
// 	If SDB.Player.isPlaying Then
// 		refreshTrackEndTimer
// 	End If
// End Sub


export function activateAutoCrossfade() {
	app.listen(app.player, 'playbackState', handlePlaybackChange);
	app.listen(app.player, 'repeatChange', handleRepeatChange);
	app.listen(app.player, 'shuffleChange', handleShuffleChange);
	app.listen(app.player, 'seekChange', handleSeek);
	if(app.player.playing){
		refreshTrackEndTimer();
	}
}

export function deactivateAutoCrossfade() {
	app.unlisten(app.player, 'playbackState', handlePlaybackChange);
	app.unlisten(app.player, 'repeatChange', handleRepeatChange);
	app.unlisten(app.player, 'shuffleChange', handleShuffleChange);
	app.unlisten(app.player, 'seekChange', handleSeek);
	stopTrackEndTimer();
}


function handlePlaybackChange(newState) {
	if(newState === 'play') {
		console.log('------------ PLAY')
		refreshTrackEndTimer();
		
	} else if(newState === 'pause') {
		console.log('------------ PAUSE')
		stopTrackEndTimer();
		
	} else if(newState === 'unpause') {
		console.log('------------ UNPAUSE')
		refreshTrackEndTimer();
		
	} else if(newState === 'stop') {
		console.log('------------ STOP')
		stopTrackEndTimer();
		
	}
	// NOTE: Track changed listened isn't needed because a track change causes a stop and play anyway
	// else if(newState === 'trackChanged') {
	// 	console.log('------------ CHANGE TRACKS')
	// 	refreshTrackEndTimer();
	// }
}

function handleRepeatChange(newState) {
	console.log('new Repeat state:', newState);
}

function handleShuffleChange(newState) {
	console.log('new Shuffle state:', newState);
}

function handleSeek(newValue) {
	console.log('seek to:', newValue);
}




// Sub refreshTrackEndTimer
// 	stopTrackEndTimer
// 	Set trackTimer = SDB.CreateTimer(SDB.Player.CurrentSongLength - SDB.Player.PlaybackTime - 15000)   ' 15 seconds before end of song
//   	Script.RegisterEvent trackTimer, "OnTimer", "checkCrossfade" 
// End Sub

function refreshTrackEndTimer() {
	stopTrackEndTimer();
	const player = app.player;
	const track = player.getCurrentTrack();
	const totTime = player.trackLengthMS;
	const curTime = player.trackPositionMS;
	trackTimer = totTime - curTime - 15000;   // 15 seconds before end of song
  	// app.listen(app, 'OnTimer', checkCrossfade);
}




// Sub stopTrackEndTimer
// 	'MsgBox("stopTrackEndTimer")
// 	On Error Resume Next
// 	Script.UnregisterEvents trackTimer
// End Sub

function stopTrackEndTimer() {
	//MsgBox("stopTrackEndTimer")
	// On Error Resume Next // !!!!!!!!!!! Manual conversion needed (try..catch?)
}



// Sub checkCrossfade(Tmr)
// 	stopTrackEndTimer
// 	Dim curAlbum, nextAlbum, curAArtist, nextAArtist, curTrack, nextTrack, curDisc, nextDisc

// 	'Do Nothing if there is not song next
// 	'(Index must be zero based while count is not)
// 	If SDB.Player.CurrentSongIndex = SDB.Player.CurrentSongList.Count - 1 Then
// 		Exit Sub
// 	End If
	
// 	If SDB.Player.isShuffle Then
// 		'if it's shuffling then crossfade cause who knows what is coming next
// 		SDB.Player.isCrossfade = True
// 	Else
// 		'for some reason I've found some of my albums tracks report -1 instead of the same album ID as the other tracks.. so I'm changing this
// 		'curAlbum = SDB.Player.CurrentSong.Album.ID
// 		'nextAlbum = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).Album.ID
// 		curAlbum = SDB.Player.CurrentSong.AlbumName
// 		nextAlbum = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).AlbumName
// 		curAArtist = SDB.Player.CurrentSong.AlbumArtistName
// 		nextAArtist = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).AlbumArtistName
// 		curTrack = SDB.Player.CurrentSong.TrackOrder
// 		nextTrack = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).TrackOrder
// 		curDisc = SDB.Player.CurrentSong.DiscNumber
// 		nextDisc = SDB.Player.PlaylistItems(SDB.Player.CurrentSongIndex+1).DiscNumber
		
// 		'check if what's coming next is next on the same album
// 		If (curAlbum = nextAlbum Or curAlbum = "") And curAArtist = nextAArtist And curDisc = nextDisc And curTrack+1 = nextTrack Then
// 			SDB.Player.isCrossfade = False
// 			'MsgBox("Turn Off Crossfade")
// 		Else
// 			SDB.Player.isCrossfade = True
// 			'MsgBox("Turn On Crossfade")
// 		End If
		
// 		'MsgBox("curAlbumID: "&curAlbum)
// 		'MsgBox("nextAlbumID: "&nextAlbum)
// 		'MsgBox("curAlbum: "&curAlbum&" - curArtist: "&curAArtist&" - Disc: "&curDisc&" - Track: "&curTrack)
// 		'MsgBox("nextAlbum: "&nextAlbum&" - nextArtist: "&nextAArtist&" - Disc: "&nextDisc&" - Track: "&nextTrack)
// 	End If

// End Sub