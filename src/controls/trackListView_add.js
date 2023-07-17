import { setTrackAlwaysCrossfade, setTrackAutoCrossfade, setTrackNeverCrossfade } from "../logic";


actions.autoCrossfadeTrack = {
    title: 'Auto crossfade track',
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
    title: 'Always crossfade track',
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
    title: 'Never crossfade track',
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


// Use radio button icon
actions.autoCrossfadeGenre = {
    title: 'Auto crossfade <genre-name>',
    checkable: true,
    checked: false, // Make radio button and based on genre's setting
    execute: async () => {
        // Get first track's genre
        // setGenreCrossfade(genre, 'auto');
    }
}
actions.alwaysCrossfadeGenre = {
    title: 'Always crossfade <genre-name>',
    checkable: true,
    checked: false, // Make radio button and based on genre's setting
    execute: async () => {
        // Get first track's genre
        // setGenreCrossfade(genre, 'always');
    }
}
actions.neverCrossfadeGenre = {
    title: 'Never crossfade <genre-name>',
    checkable: true,
    checked: false, // Make radio button and based on genre's setting
    execute: async () => {
        // Get first track's genre
        // setGenreCrossfade(genre, 'never');
    }
}


actions.autoCrossfadeMood = {
    title: 'Auto crossfade <mood-name>',
    checkable: true,
    checked: false, // Make radio button and based on moods setting
    execute: async () => {
        // Get first track's mood
        // setMoodCrossfade(mood, 'auto');
    }
}
actions.alwaysCrossfadeMood = {
    title: 'Always crossfade <mood-name>',
    checkable: true,
    checked: false, // Make radio button and based on moods setting
    execute: async () => {
        // Get first track's mood
        // setMoodCrossfade(mood, 'always');
    }
}
actions.neverCrossfadeMood = {
    title: 'Never crossfade <mood-name>',
    checkable: true,
    checked: false, // Make radio button and based on moods setting
    execute: async () => {
        // Get first track's mood
        // setMoodCrossfade(mood, 'never');
    }
}


actions.autoCrossfadeCollection = {
    title: 'Auto crossfade <collection-name>',
    checkable: true,
    checked: false, // Make radio button and based on collection's setting
    execute: async () => {
        // Get first track's collection
        // setCollectionCrossfade(collection, 'auto');
    }
}
actions.alwaysCrossfadeCollection = {
    title: 'Always crossfade <collection-name>',
    checkable: true,
    checked: false, // Make radio button and based on collection's setting
    execute: async () => {
        // Get first track's collection
        // setCollectionCrossfade(collection, 'always');
    }
}
actions.neverCrossfadeCollection = {
    title: 'Never crossfade <collection-name>',
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
        // icon: String,
        visible: () => uitools.getCanEdit(),
    },
    // order: Number,          // Required
    // grouporder: Number,     // Required
    submenu: [
        {
            action: {title: 'Selected tracks'},
            submenu: [
                {action: actions.autoCrossfadeTrack},
                {action: actions.alwaysCrossfadeTrack},
                {action: actions.neverCrossfadeTrack}
            ]
        },
        {
            action: {
                title: 'Entire <insert name> genre'
                // Only visible if all tracks have the same genre
            },
            submenu: [
                {action: actions.autoCrossfadeGenre},
                {action: actions.alwaysCrossfadeGenre},
                {action: actions.neverCrossfadeGenre}
            ]
        },
        {
            action: {
                title: 'Entire <insert name> mood'
                // Only visible if all tracks have the same mood
            },
            submenu: [
                {action: actions.autoCrossfadeMood},
                {action: actions.alwaysCrossfadeMood},
                {action: actions.neverCrossfadeMood}
            ]
        },
        {
            action: {
                title: 'Entire <insert name> collection'
                // Only visible if all tracks are in the same collection
            },
            submenu: [
                {action: actions.autoCrossfadeCollection},
                {action: actions.alwaysCrossfadeCollection},
                {action: actions.neverCrossfadeCollection}
            ]
        },
    ]
})