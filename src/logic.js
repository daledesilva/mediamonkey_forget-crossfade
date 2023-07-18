
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
	app.listen(app.player, 'nowPlayingModified', handleNowPlayingModified);
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
	app.unlisten(app.player, 'nowPlayingModified', handleNowPlayingModified);
	stopTrackEndTimer();
}


function handlePlaybackChange(newState) {
	adjustCrossfade();
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
	adjustCrossfade();
	refreshTrackEndTimer();
}

function handleShuffleChange(newState) {
	adjustCrossfade();
	refreshTrackEndTimer();
}

function handleSeek(newValue) {
	adjustCrossfade();
	refreshTrackEndTimer();
}

function handleNowPlayingModified(newState) {
	adjustCrossfade();
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



async function adjustCrossfade() {
	stopTrackEndTimer();

	const curTrack = player.getCurrentTrack();
	const nextTrack = player.getNextTrack();
	if(!nextTrack) return;
	
	const tracksAllowCrossfade = await checkIfTracksAllowCrossfade(curTrack, nextTrack);
	if(!tracksAllowCrossfade) {
		// Tracks DON'T ALLOW it
		// console.log('TRACKS DON\'T ALLOW IT');
		setCrossfade(false);
		return;
	}
	
	const tracksForceCrossfade = await checkIfTracksForceCrossfade(curTrack, nextTrack);
	if(tracksForceCrossfade) {
		// Tracks REQUIRE it
		// console.log('TRACKS REQUIRE IT');
		setCrossfade(true);
		return;
	}
	
	// await checkUserSettings();
	// console.log('TRACKS ARE INDIFFERENT');
	const isSameAlbum = nextTrack.idalbum === curTrack.idalbum;
	const isSameDisc = nextTrack.discNumberInt === curTrack.discNumberInt;
	const isNextTrack = nextTrack.trackNumberInt === curTrack.trackNumberInt + 1;
	if(isSameAlbum && isSameDisc && isNextTrack) {
		// console.log('SAME ALBUM & SEQENTIAL');
		setCrossfade(false);
	} else {
		// console.log('NOT SAME ALBUM OR NOT SEQENTIAL');
		setCrossfade(true);
	}
}

function setCrossfade(value) {
	// console.log('Setting crossfade to', value);
	player.crossfade = value;
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


async function checkIfTracksAllowCrossfade(curTrack, nextTrack) {

	let curExtendedTags = await curTrack.getExtendedTagsAsync();
	if(curExtendedTags) {
		curExtendedTags = JSON.parse(curExtendedTags);
		for(let i=0; i<curExtendedTags.length; i++) {
			const curTag = curExtendedTags[i];
			if(!curTag) continue;
			if(curTag.title.toLowerCase().trim() !== 'crossfade out') continue;
			if(curTag.value.toLowerCase().trim() === 'never') return false;
		}
	}

	let nextExtendedTags = await nextTrack.getExtendedTagsAsync();
	if(nextExtendedTags) {
		nextExtendedTags = JSON.parse(nextExtendedTags);
		for(let i=0; i<nextExtendedTags.length; i++) {
			const curTag = nextExtendedTags[i];
			if(!curTag) continue;
			if(curTag.title.toLowerCase().trim() !== 'crossfade in') continue;
			if(curTag.value.toLowerCase().trim() === 'never') return false;
		}
	}

	return true;
}


async function checkIfTracksForceCrossfade(curTrack, nextTrack) {
	
	let curExtendedTags = await curTrack.getExtendedTagsAsync();
	if(curExtendedTags) {
		curExtendedTags = JSON.parse(curExtendedTags);
		for(let i=0; i<curExtendedTags.length; i++) {
			const curTag = curExtendedTags[i];
			if(!curTag) continue;
			if(curTag.title.toLowerCase().trim() !== 'crossfade out') continue;
			if(curTag.value.toLowerCase().trim() === 'always') return true;
		}
	}
	
	let nextExtendedTags = await nextTrack.getExtendedTagsAsync();
	if(nextExtendedTags) {
		nextExtendedTags = JSON.parse(nextExtendedTags);
		for(let i=0; i<nextExtendedTags.length; i++) {
			const curTag = nextExtendedTags[i];
			if(!curTag) continue;
			if(curTag.title.toLowerCase().trim() !== 'crossfade in') continue;
			if(curTag.value.toLowerCase().trim() === 'always') return true;
		}
	}

	return false;
}


export async function setAlbumAlwaysCrossfade(album) {
	const tracks = album.getTracklist();
	tracks.forEach(async track => {
		await setTrackAlwaysCrossfadeIn(track)
		await setTrackAlwaysCrossfadeOut(track)
	});
}
export async function setAlbumNeverCrossfade(album) {
	const tracks = album.getTracklist();
	tracks.forEach(async track => {
		await setTrackNeverCrossfadeIn(track)
		await setTrackNeverCrossfadeOut(track)
	});
}
export async function setAlbumAutoCrossfade(album) {
	const tracks = album.getTracklist();
	tracks.forEach(async track => {
		await setTrackAutoCrossfadeIn(track);
		await setTrackAutoCrossfadeOut(track);
	});
}
// TODO: RemoveCrossfade overides option too

export async function setTrackAlwaysCrossfade(track) {
	await setTrackAlwaysCrossfadeIn(track);
	await setTrackAlwaysCrossfadeOut(track);
}
export async function setTrackAlwaysCrossfadeIn(track) {
	await setExtendedTag(track, 'Crossfade In', 'Always');
}
export async function setTrackAlwaysCrossfadeOut(track) {
	await setExtendedTag(track, 'Crossfade Out', 'Always');
}


export async function setTrackNeverCrossfade(track) {
	await setTrackNeverCrossfadeIn(track);
	await setTrackNeverCrossfadeOut(track);
}
export async function setTrackNeverCrossfadeIn(track) {
	await setExtendedTag(track, 'Crossfade In', 'Never');
}
export async function setTrackNeverCrossfadeOut(track) {
	await setExtendedTag(track, 'Crossfade Out', 'Never');
}


export async function setTrackAutoCrossfade(track) {
	await setTrackAutoCrossfadeIn(track);
	await setTrackAutoCrossfadeOut(track);
}
export async function setTrackAutoCrossfadeIn(track) {
	await removeExtendedTag(track, 'Crossfade In');
}
export async function setTrackAutoCrossfadeOut(track) {
	await removeExtendedTag(track, 'Crossfade Out');
}



async function getExtendedTags(track) {
	let extendedTags = await track.getExtendedTagsAsync();
	if(extendedTags) {
		extendedTags = JSON.parse(extendedTags);
	} else {
		extendedTags = [];
	}
	return extendedTags;
}

async function setExtendedTag(track, title, value) {
	// Remove any existing versions of this tag but get other tags not created by this plugin
	await removeExtendedTag(track, title);
	let extendedTags = await getExtendedTags(track);
	// Add in (or back in), with new value
	extendedTags.push({title, value});
	await track.setExtendedTagsAsync(JSON.stringify(extendedTags));
}

async function removeExtendedTag(track, title) {
	let extendedTags = await getExtendedTags(track);
	for(let i=extendedTags.length-1; i>=0; i--) {
		let tag = extendedTags[i];
		if(tag.title.toLowerCase() == title.toLowerCase()) {
			extendedTags.splice(i, 1);
		}
	}
	await track.setExtendedTagsAsync(JSON.stringify(extendedTags));
}




export function freeze(val) {
	return JSON.parse(JSON.stringify(val));
}




export async function setGenreAutoCrossfade(genre) {
	let genreDict = await getGenreCrossfadeList();
	delete genreDict[genre];
	setGenreCrossfadeList(genreDict);
}

export async function setGenreAlwaysCrossfade(genre) {
	let genreDict = await getGenreCrossfadeList();
	genreDict[genre] = 'always';
	setGenreCrossfadeList(genreDict);
}

export async function setGenreNeverCrossfade(genre) {
	let genreDict = await getGenreCrossfadeList();
	genreDict[genre] = 'never';
	setGenreCrossfadeList(genreDict);
}


async function getGenreCrossfadeList() {
	let genreDict = await app.getValue('dds_fc_genre-list', {});
	console.log('genreDict fetched', freeze(genreDict));
	return genreDict;
}
function setGenreCrossfadeList(genreDict) {
	console.log('genreDict just before set', freeze(genreDict));
	app.setValue('dds_fc_genre-list', genreDict);
}
