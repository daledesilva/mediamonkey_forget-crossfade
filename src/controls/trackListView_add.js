import { freeze, setAlbumAlwaysCrossfade, setAlbumAutoCrossfade, setAlbumNeverCrossfade, setGenreAlwaysCrossfade, setGenreAutoCrossfade, setGenreNeverCrossfade, setTrackAlwaysCrossfade, setTrackAutoCrossfade, setTrackNeverCrossfade } from "../logic";


actions.autoCrossfadeTrack = {
    title: 'Auto crossfade <strong>track/s</strong>',
    checkable: true,
    checked: false, // Make radio button and based on selected track's settings (blank if different)
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.forEach(track => {
            console.log('setting track to AUTO crossfade:', track.title);
            setTrackAutoCrossfade(track);
        });
    }
}
actions.alwaysCrossfadeTrack = {
    title: 'Always crossfade <strong>track/s</strong>',
    checkable: true,
    checked: false, // Make radio button and based on selected track's settings (blank if different)
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.forEach(track => {
            console.log('setting track to ALWAYS crossfade:', track.title);
            setTrackAlwaysCrossfade(track);
        });
    }
}
actions.neverCrossfadeTrack = {
    title: 'Never crossfade <strong>track/s</strong>',
    checkable: true,
    checked: false, // Make radio button and based on selected track's settings (blank if different)
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.forEach(track => {
            console.log('setting track to NEVER crossfade:', track.title);
            setTrackNeverCrossfade(track);
        });
    }
}






actions.autoCrossfadeMood = {
    title: 'Auto crossfade <strong>mood</strong>',
    checkable: true,
    checked: false, // Make radio button and based on moods setting
    execute: async () => {
        // Get first track's mood
        // setMoodCrossfade(mood, 'auto');
    }
}
actions.alwaysCrossfadeMood = {
    title: 'Always crossfade <strong>mood</strong>',
    checkable: true,
    checked: false, // Make radio button and based on moods setting
    execute: async () => {
        // Get first track's mood
        // setMoodCrossfade(mood, 'always');
    }
}
actions.neverCrossfadeMood = {
    title: 'Never crossfade <strong>mood</strong>',
    checkable: true,
    checked: false, // Make radio button and based on moods setting
    execute: async () => {
        // Get first track's mood
        // setMoodCrossfade(mood, 'never');
    }
}



// Use radio button icon
actions.autoCrossfadeGenre = {
    title: `Auto crossfade <strong>genre</strong>`,
    checkable: true,
    checked: false, // Make radio button and based on genre's setting
    // visible: getSelectedTrackGenreIfSame(),
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.locked(async () => {
            let track = list.getValue(0);
            if(list.count != 1) return;
            if(!track.genre) return;
            console.log('genre', track.genre);
            await setGenreAutoCrossfade(track.genre);
        })
    }
}
actions.alwaysCrossfadeGenre = {
    title: 'Always crossfade <strong>genre</strong>',
    checkable: true,
    checked: false, // Make radio button and based on genre's setting
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.locked(async () => {
            let track = list.getValue(0);
            if(list.count != 1) return;
            if(!track.genre) return;
            console.log('genre', track.genre);
            await setGenreAlwaysCrossfade(track.genre);
        })
    }
}
actions.neverCrossfadeGenre = {
    title: 'Never crossfade <strong>genre</strong>',
    checkable: true,
    checked: false, // Make radio button and based on genre's setting
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.locked(async () => {
            let track = list.getValue(0);
            if(list.count != 1) return;
            if(!track.genre) return;
            console.log('genre', track.genre);
            await setGenreNeverCrossfade(track.genre)
        })
    }
}



actions.autoCrossfadeCollection = {
    title: 'Auto crossfade <strong>collection</strong>',
    checkable: true,
    checked: false, // Make radio button and based on collection's setting
    execute: async () => {
        // Get first track's collection
        // setCollectionCrossfade(collection, 'auto');
    }
}
actions.alwaysCrossfadeCollection = {
    title: 'Always crossfade <strong>collection</strong>',
    checkable: true,
    checked: false, // Make radio button and based on collection's setting
    execute: async () => {
        // Get first track's collection
        // setCollectionCrossfade(collection, 'always');
    }
}
actions.neverCrossfadeCollection = {
    title: 'Never crossfade <strong>collection</strong>',
    checkable: true,
    checked: false, // Make radio button and based on collection's setting
    execute: async () => {
        // Get first track's collection
        // setCollectionCrossfade(collection, 'never');
    }
}










window.menus.tracklistMenuItems.push({
    action: {
        title: 'Auto crossfade settings',
        icon: 'shuffle',
        visible: () => uitools.getCanEdit(),
        submenu: [
            {
                action: {
                    title: 'Selected track/s',   // Track overrules mood
                    submenu: [
                        {action: actions.autoCrossfadeTrack},
                        {action: actions.alwaysCrossfadeTrack},
                        {action: actions.neverCrossfadeTrack}
                    ]
                },
            },
            {
                action: {
                    title: 'Entire mood',   // Mood overrules genre
                    submenu: [
                        {action: actions.autoCrossfadeMood},
                        {action: actions.alwaysCrossfadeMood},
                        {action: actions.neverCrossfadeMood}
                    ]
                },
            },
            {
                action: {
                    title: 'Entire genre',   // Genre overrules collection
                    submenu: [
                        {action: actions.autoCrossfadeGenre},
                        {action: actions.alwaysCrossfadeGenre},
                        {action: actions.neverCrossfadeGenre,}
                    ]
                },
            },
            {
                action: {
                    title: 'Entire collection',
                    submenu: [
                        {action: actions.autoCrossfadeCollection},
                        {action: actions.alwaysCrossfadeCollection},
                        {action: actions.neverCrossfadeCollection}
                    ]
                },
            },
        ]
    },
    order: 100,
});