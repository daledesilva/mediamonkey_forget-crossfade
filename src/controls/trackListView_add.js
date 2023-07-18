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


// NOTE: Not sure how to get the album object, so remove this functionality as they can just select all tracks or the album node
// actions.autoCrossfadeAlbum = {
//     title: `Auto crossfade <strong>album</strong>`,
//     checkable: true,
//     checked: false, // Make radio button and based on album's setting
//     // visible: // If one track selected and has album,
//     execute: async () => {
//         let list = uitools.getSelectedTracklist();
//         await list.whenLoaded();
//         list.locked(() => {
//             let track = list.getValue(0);
//             if(list.count != 1) return;
//             if(!track.idalbum) return;
//             console.log('track', freeze(track));
//             console.log('idalbum', track.idalbum);
//             setAlbumAutoCrossfade(track.idalbum);
//         });
//     }
// }
// actions.alwaysCrossfadeAlbum = {
//     title: 'Always crossfade <strong>album</strong>',
//     checkable: true,
//     checked: false, // Make radio button and based on album's setting
//     execute: async () => {
//         let list = uitools.getSelectedTracklist();
//         await list.whenLoaded();
//         setAlbumAlwaysCrossfade(list.firstSelected().album);
//     }
// }
// actions.neverCrossfadeAlbum = {
//     title: 'Never crossfade <strong>album</strong>',
//     checkable: true,
//     checked: false, // Make radio button and based on album's setting
//     execute: async () => {
//         let list = uitools.getSelectedTracklist();
//         await list.whenLoaded();
//         setAlbumNeverCrossfade(list.firstSelected().album);
//     }
// }


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
    action: actions.autoCrossfadeTrack,
});
window.menus.tracklistMenuItems.push({
    action: actions.alwaysCrossfadeTrack,
});
window.menus.tracklistMenuItems.push({
    action: actions.neverCrossfadeTrack,
});


// window.menus.tracklistMenuItems.push({
//     action: actions.autoCrossfadeAlbum,
// });
// window.menus.tracklistMenuItems.push({
//     action: actions.alwaysCrossfadeAlbum,
// });
// window.menus.tracklistMenuItems.push({
//     action: actions.neverCrossfadeAlbum,
// });


window.menus.tracklistMenuItems.push({
    action: actions.autoCrossfadeGenre,
});
window.menus.tracklistMenuItems.push({
    action: actions.alwaysCrossfadeGenre,
});
window.menus.tracklistMenuItems.push({
    action: actions.neverCrossfadeGenre,
});


window.menus.tracklistMenuItems.push({
    action: actions.autoCrossfadeMood,
});
window.menus.tracklistMenuItems.push({
    action: actions.alwaysCrossfadeMood,
});
window.menus.tracklistMenuItems.push({
    action: actions.neverCrossfadeMood,
});


window.menus.tracklistMenuItems.push({
    action: actions.autoCrossfadeCollection,
});
window.menus.tracklistMenuItems.push({
    action: actions.alwaysCrossfadeCollection,
});
window.menus.tracklistMenuItems.push({
    action: actions.neverCrossfadeCollection,
});






// window.menus.tracklistMenuItems.push({
//     action: {
//         title: 'Auto crossfade settings',
//         // icon: String,
//         visible: () => uitools.getCanEdit(),
//     },
//     // order: Number,          // Required
//     // grouporder: Number,     // Required
//     submenu: [
//         {
//             action: {title: 'Selected tracks'},
//             submenu: [
//                 {action: actions.autoCrossfadeTrack},
//                 {action: actions.alwaysCrossfadeTrack},
//                 {action: actions.neverCrossfadeTrack}
//             ]
//         },
//         {
//             action: {
//                 title: 'Entire <insert name> genre'
//                 // Only visible if all tracks have the same genre
//             },
//             submenu: [
//                 {action: actions.autoCrossfadeGenre},
//                 {action: actions.alwaysCrossfadeGenre},
//                 {action: actions.neverCrossfadeGenre}
//             ]
//         },
//         {
//             action: {
//                 title: 'Entire <insert name> mood'
//                 // Only visible if all tracks have the same mood
//             },
//             submenu: [
//                 {action: actions.autoCrossfadeMood},
//                 {action: actions.alwaysCrossfadeMood},
//                 {action: actions.neverCrossfadeMood}
//             ]
//         },
//         {
//             action: {
//                 title: 'Entire <insert name> collection'
//                 // Only visible if all tracks are in the same collection
//             },
//             submenu: [
//                 {action: actions.autoCrossfadeCollection},
//                 {action: actions.alwaysCrossfadeCollection},
//                 {action: actions.neverCrossfadeCollection}
//             ]
//         },
//     ]
// })