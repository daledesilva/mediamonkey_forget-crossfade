
let trackTimer;
const trackEndBufferMS = 11000; // 11 seconds before end of track (To catch max crossfade which is 10 seconds)

export const crossfadeDirection = {
	out: 'crossfade out',
	in: 'crossfade in',
}

export const crossfadeType = {
	auto: 'auto',
	always: 'always',
	never: 'never',
}



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

	// These are added together for cur and next track to define how to adjust the crossfade
	const prefValues = {
		'auto': 0,
		'always': 1,
		'never': -1
	}

	const curTrackPref = prefValues[await getTrackPref(curTrack, crossfadeDirection.out)];
	const nextTrackPref = prefValues[await getTrackPref(nextTrack, crossfadeDirection.in)];
	const trackCrossfadePref = curTrackPref + nextTrackPref;
	if(trackCrossfadePref > 0) {
		console.log(`A TRACK requires ALWAYS crossfading`);
		setCrossfade(true);
		return;
	} else if(trackCrossfadePref < 0) {
		console.log(`A TRACK requires NEVER crossfading`);
		setCrossfade(false);
		return;
	}
	// The track prefs don't care or they cancel out.

	const curMoodPref = prefValues[await getMoodPref(curTrack)];
	const nextMoodPref = prefValues[await getMoodPref(nextTrack)];
	const moodCrossfadePref = curMoodPref + nextMoodPref;
	if(moodCrossfadePref > 0) {
		console.log(`A track's MOOD requires ALWAYS crossfading`);
		setCrossfade(true);
		return;
	} else if(moodCrossfadePref < 0) {
		console.log(`A track's MOOD requires NEVER crossfading`);
		setCrossfade(false);
		return;
	}
	// The mood prefs don't care or they cancel out.

	const curGenrePref = prefValues[await getGenrePref(curTrack)];
	const nextGenrePref = prefValues[await getGenrePref(nextTrack)];
	const genreCrossfadePref = curGenrePref + nextGenrePref;
	if(genreCrossfadePref > 0) {
		console.log(`A track's GENRE requires ALWAYS crossfading`);
		setCrossfade(true);
		return;
	} else if(genreCrossfadePref < 0) {
		console.log(`A track's GENRE requires NEVER crossfading`);
		setCrossfade(false);
		return;
	}
	// The genre prefs don't care or they cancel out.

	// Base the crossfade decision on whether it's the next track on the same album
	const isSameAlbum = nextTrack.idalbum === curTrack.idalbum;
	const isSameDisc = nextTrack.discNumberInt === curTrack.discNumberInt;
	const isNextTrack = nextTrack.trackNumberInt === curTrack.trackNumberInt + 1;
	if(isSameAlbum && isSameDisc && isNextTrack) {
		console.log(`It's the next track on the album, DON'T crossfade`);
		setCrossfade(false);
		return;
	} else {
		console.log(`It's NOT the next track on the album, DO crossfade`);
		setCrossfade(true);
		return;
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




async function getTrackPref(track, direction) {
	let extendedTags = await track.getExtendedTagsAsync();
	if(extendedTags) {
		extendedTags = JSON.parse(extendedTags);
		for(let i=0; i<extendedTags.length; i++) {
			const curTag = extendedTags[i];
			if(!curTag) continue;
			if(curTag.title.toLowerCase().trim() !== direction.toLowerCase()) continue;
			return curTag.value;
		}
	}
	// If no preference found
	return crossfadeType.auto
}

async function getMoodPref(track) {
	const mood = track.mood;
	if(!mood) return crossfadeType.auto;
	let moodDict = await getMoodCrossfadeList();
	return moodDict[mood] || crossfadeType.auto;
}

async function getGenrePref(track) {
	const genre = track.genre;
	if(!genre) return crossfadeType.auto;
	let genreDict = await getGenreCrossfadeList();
	return genreDict[genre] || crossfadeType.auto;
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
	await setExtendedTag(track, crossfadeDirection.in, crossfadeType.always);
}
export async function setTrackAlwaysCrossfadeOut(track) {
	await setExtendedTag(track, crossfadeDirection.out, crossfadeType.always);
}


export async function setTrackNeverCrossfade(track) {
	await setTrackNeverCrossfadeIn(track);
	await setTrackNeverCrossfadeOut(track);
}
export async function setTrackNeverCrossfadeIn(track) {
	await setExtendedTag(track, crossfadeDirection.in, crossfadeType.never);
}
export async function setTrackNeverCrossfadeOut(track) {
	await setExtendedTag(track, crossfadeDirection.out, crossfadeType.never);
}


export async function setTrackAutoCrossfade(track) {
	await setTrackAutoCrossfadeIn(track);
	await setTrackAutoCrossfadeOut(track);
}
export async function setTrackAutoCrossfadeIn(track) {
	await removeExtendedTag(track, crossfadeDirection.in);
}
export async function setTrackAutoCrossfadeOut(track) {
	await removeExtendedTag(track, crossfadeDirection.out);
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
	genreDict[genre] = crossfadeType.always;
	setGenreCrossfadeList(genreDict);
}

export async function setGenreNeverCrossfade(genre) {
	let genreDict = await getGenreCrossfadeList();
	genreDict[genre] = crossfadeType.never;
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




export async function setMoodAutoCrossfade(mood) {
	let moodDict = await getMoodCrossfadeList();
	delete moodDict[mood];
	setMoodCrossfadeList(moodDict);
}

export async function setMoodAlwaysCrossfade(mood) {
	let moodDict = await getMoodCrossfadeList();
	moodDict[mood] = crossfadeType.always;
	setMoodCrossfadeList(moodDict);
}

export async function setMoodNeverCrossfade(mood) {
	let moodDict = await getMoodCrossfadeList();
	moodDict[mood] = crossfadeType.never;
	setMoodCrossfadeList(moodDict);
}


async function getMoodCrossfadeList() {
	let moodDict = await app.getValue('dds_fc_mood-list', {});
	console.log('moodDict fetched', freeze(moodDict));
	return moodDict;
}
function setMoodCrossfadeList(moodDict) {
	console.log('moodDict just before set', freeze(moodDict));
	app.setValue('dds_fc_mood-list', moodDict);
}
