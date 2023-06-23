
let trackTimer;
const trackEndBufferMS = 11000; // 11 seconds before end of track (To catch max crossfade which is 10 seconds)


export function activateAutoCrossfade() {

	// Disable the ability to crossfade manually
	const crossfadeMenuItem = getMenuItem('Crossfade', window._menuItems.play.action.submenu);
    crossfadeMenuItem.action.disabled = true;
	
	// Set up listeners and timers for autocrossfading
	app.listen(app.player, 'playbackState', handlePlaybackChange);
	app.listen(app.player, 'repeatChange', handleRepeatChange);
	app.listen(app.player, 'shuffleChange', handleShuffleChange);
	app.listen(app.player, 'seekChange', handleSeek);
	if(app.player.playing){
		refreshTrackEndTimer();
	}
}

export function deactivateAutoCrossfade() {
	
	// Re-enable the ability to crossfade manually
	const crossfadeMenuItem = getMenuItem('Crossfade', window._menuItems.play.action.submenu);
    crossfadeMenuItem.action.disabled = false;
	
	// Remove listeners and timers for autocrossfading
	app.unlisten(app.player, 'playbackState', handlePlaybackChange);
	app.unlisten(app.player, 'repeatChange', handleRepeatChange);
	app.unlisten(app.player, 'shuffleChange', handleShuffleChange);
	app.unlisten(app.player, 'seekChange', handleSeek);
	stopTrackEndTimer();
}


function handlePlaybackChange(newState) {
	if(newState === 'play') {
		refreshTrackEndTimer();
		
	} else if(newState === 'pause') {
		stopTrackEndTimer();
		
	} else if(newState === 'unpause') {
		refreshTrackEndTimer();
		
	} else if(newState === 'stop') {
		stopTrackEndTimer();
		
	}
	// NOTE: Track changed listener isn't needed because a track change causes a stop and play anyway
	// else if(newState === 'trackChanged') {
	// 	refreshTrackEndTimer();
	// }
}

function handleRepeatChange(newState) {
	refreshTrackEndTimer();
}

function handleShuffleChange(newState) {
	refreshTrackEndTimer();
}

function handleSeek(newValue) {
	refreshTrackEndTimer();
}


function refreshTrackEndTimer() {
	stopTrackEndTimer();
	const timeToTrackEnd = app.player.trackLengthMS - app.player.trackPositionMS
	if(timeToTrackEnd > trackEndBufferMS) {
		trackTimer = setTimeout( adjustCrossfade, timeToTrackEnd-trackEndBufferMS );
	} else {
		adjustCrossfade();
	}
}



function stopTrackEndTimer() {
	clearTimeout(trackTimer);
}



function adjustCrossfade() {
	stopTrackEndTimer();

	const curTrack = player.getCurrentTrack();
	const nextTrack = player.getNextTrack();
	if(!nextTrack) return;
	
	const isSameAlbum = nextTrack.idalbum === curTrack.idalbum;
	const isSameDisc = nextTrack.discNumberInt === curTrack.discNumberInt;
	const isNextTrack = nextTrack.trackNumberInt === curTrack.trackNumberInt + 1;
	if(isSameAlbum && isSameDisc && isNextTrack) {
		player.crossfade = false;
	} else {
		player.crossfade = true;
	}
}



function getMenuItem(titleStr, menuArr) {
    for(let i=0; i<menuArr.length; i++) {
        curItem = menuArr[i];
        if(curItem.action.title() === titleStr) {
            return curItem;
        }
    }
    return null;
}