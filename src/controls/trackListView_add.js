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
    title: 'Revert <strong>mood</strong> to auto crossfade',
    checkable: true,
    checked: false, // Make radio button and based on moods setting
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.locked(async () => {
            let track = list.getValue(0);
            if(list.count != 1) return;
            if(!track.mood) return;
            console.log('mood', track.mood);
            await setMoodAutoCrossfade(track.mood);
        })
    }
}
actions.alwaysCrossfadeMood = {
    title: 'Always crossfade <strong>mood</strong>',
    checkable: true,
    checked: false, // Make radio button and based on moods setting
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.locked(async () => {
            let track = list.getValue(0);
            if(list.count != 1) return;
            if(!track.mood) return;
            console.log('mood', track.mood);
            await setMoodAlwaysCrossfade(track.mood);
        })
    }
}
actions.neverCrossfadeMood = {
    title: 'Never crossfade <strong>mood</strong>',
    checkable: true,
    checked: false, // Make radio button and based on moods setting
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.locked(async () => {
            let track = list.getValue(0);
            if(list.count != 1) return;
            if(!track.mood) return;
            console.log('mood', track.mood);
            await setMoodNeverCrossfade(track.mood);
        })
    }
}



// Use radio button icon
actions.autoCrossfadeGenre = {
    title: `Revert <strong>genre</strong> to auto crossfade`,
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



// NOTE: Setting by collection has been removed because there's no easy way to get the collection of a track that I'm aware.
// ie. The "track.collection" property I've put in as a placeholder doesn't exist.

// actions.autoCrossfadeCollection = {
//     title: 'Revert <strong>collection</strong> to auto crossfade',
//     checkable: true,
//     checked: false, // Make radio button and based on collection's setting
//     execute: async () => {
//         let list = uitools.getSelectedTracklist();
//         await list.whenLoaded();
//         list.locked(async () => {
//             let track = list.getValue(0);
//             if(list.count != 1) return;
//             if(!track.collection) return;
//             console.log('collection', track.collection);
//             await setCollectionAutoCrossfade(track.collection)
//         })
//     }
// }
// actions.alwaysCrossfadeCollection = {
//     title: 'Always crossfade <strong>collection</strong>',
//     checkable: true,
//     checked: false, // Make radio button and based on collection's setting
//     execute: async () => {
//         let list = uitools.getSelectedTracklist();
//         await list.whenLoaded();
//         list.locked(async () => {
//             let track = list.getValue(0);
//             if(list.count != 1) return;
//             if(!track.collection) return;
//             console.log('collection', track.collection);
//             await setCollectionAlwaysCrossfade(track.collection)
//         })
//     }
// }
// actions.neverCrossfadeCollection = {
//     title: 'Never crossfade <strong>collection</strong>',
//     checkable: true,
//     checked: false, // Make radio button and based on collection's setting
//     execute: async () => {
//         let list = uitools.getSelectedTracklist();
//         await list.whenLoaded();
//         list.locked(async () => {
//             let track = list.getValue(0);
//             console.log('track', track);
//             if(list.count != 1) return;
//             if(!track.collection) return;
//             console.log('collection', track.collection);
//             await setCollectionNeverCrossfade(track.collection)
//         })
//     }
// }










window.menus.tracklistMenuItems.push({
    action: {
        title: 'Auto crossfade settings',
        icon: 'shuffle',
        visible: () => uitools.getCanEdit(),
        submenu: [
            {
                action: {
                    title: 'Selected track/s',   // Track overrules mood
                    execute: async () => {console.log('Opening...')},
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
            // {
            //     action: {
            //         title: 'Entire collection',
            //         submenu: [
            //             {action: actions.autoCrossfadeCollection},
            //             {action: actions.alwaysCrossfadeCollection},
            //             {action: actions.neverCrossfadeCollection}
            //         ]
            //     },
            // },
        ]
    },
    order: 100,
});





setTimeout(() => {window.whenReady(callback);
// //     let testList = uitools.getSelectedTracklist();
// //     // await testList.whenLoaded();
// //     testList.focusChange = function() {
//     //     }
//     let testList = uitools.getSelectedTracklist();
//     app.listen( testList, 'change', () => {
//         console.log  ('changed selection');
//     });

    console.log("Window ready");

    // app.listen( player.getSongList(), 'change', ()=>{
    //     console.log("playlist changed");
    // });
    // app.listen( uitools.getSelectedTracklist(), 'change', ()=>{
    //     console.log("selection changed (from uitools)");
    // });

    // app.listen( Native.getSelectedTracklist(), 'change', ()=>{
    //     console.log("selection changed (from native)");
    // });
    
}, 5000)

// app.listen( app.afterReload, 'change', () => {
//     console.log("reloaded");
//     app.listen( app.menuClosed, 'change', () => {
//         console.log  ('menu closed');
//     });
// });
    
    