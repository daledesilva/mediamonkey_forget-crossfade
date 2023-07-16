import { setTrackAlwaysCrossfade, setTrackAutoCrossfade, setTrackNeverCrossfade } from "../logic";


actions.autoCrossfadeTrack = {
    title: 'Auto crossfade track',
    hotkeyAble: true,
    visible: uitools.getCanEdit(),
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.forEach(track => {
            console.log('setting track to AUTO crossfade:', track.title);
            setTrackAutoCrossfade(track);
        });

        // list.beginUpdate();
        // for(let i=0; i<list.count; i++) {
        //     const track = await list.getValue(i);
        //     console.log('track', track);
        // }
        // list.endUpdate();
    }
}
actions.alwaysCrossfadeTrack = {
    title: 'Always crossfade track',
    hotkeyAble: true,
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
    hotkeyAble: true,
    execute: async () => {
        let list = uitools.getSelectedTracklist();
        await list.whenLoaded();
        list.forEach(track => {
            console.log('setting track to NEVER crossfade:', track.title);
            setTrackNeverCrossfade(track);
        });
    }
}



// actions.trackAlwaysCrossfadeIn = {
//     title: 'Set track to always crossfade in',
//     hotkeyAble: true,
//     execute: (value) => console.log('value', value),//setTrackAlwaysCrossfadeIn
// }
// actions.trackAlwaysCrossfadeOut = {
//     title: 'Set track to always crossfade out',
//     hotkeyAble: true,
//     execute: (value) => console.log('value', value),//setTrackAlwaysCrossfadeIn
// }
// actions.trackNeverCrossfadeIn = {
//     title: 'Set track to never crossfade in',
//     hotkeyAble: true,
//     execute: (value) => console.log('value', value),//setTrackAlwaysCrossfadeIn
// }
// actions.trackNeverCrossfadeOut = {
//     title: 'Set track to never crossfade out',
//     hotkeyAble: true,
//     execute: (value) => console.log('value', value),//setTrackAlwaysCrossfadeIn
// }




// Auto Crossfade
// - When starting track
//   - Auto
//   - Always crossfade
//   - Never crossfade
// - When ending track
//   - Auto
//   - Always crossfade
//   - Never crossfade
// - Whole album
//   - Auto
//   - Always crossfade
//   - Never crossfade
// - Whole genre
//   - Auto
//   - Always crossfade
//   - Never crossfade



window.menus.tracklistMenuItems.push({
    action: actions.autoCrossfadeTrack,
    // order: 31,
    // grouporder: 40
});
window.menus.tracklistMenuItems.push({
    action: actions.alwaysCrossfadeTrack,
});
window.menus.tracklistMenuItems.push({
    action: actions.neverCrossfadeTrack,
});
