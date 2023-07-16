import { activateAutoCrossfade, deactivateAutoCrossfade } from "./logic";


actions.autoAdjustCrossfade = {
    title: 'Auto adjust crossfade',
    hotkeyAble: true,
    visible: true,
    checkable: true,
    checked: app.getValue('dds_fc_auto-crossfade', undefined),
    icon: 'shuffle',
    execute: function (value) {
        const newState = this.checked;
        app.setValue('dds_fc_auto-crossfade', newState);

        if(newState) {
            activateAutoCrossfade();
            uitools.toastMessage.show('Auto adjust crossfading activated');
        } else {
            deactivateAutoCrossfade();
            uitools.toastMessage.show('Auto adjust crossfading deactivated');
        }
    }
}

actions.setTrackAlwaysCrossfade = {
    title: 'Always crossfade',
    hotkeyAble: true,
    visible: true,
    // checkable: true,
    // checked: app.getValue('dds_fc_auto-crossfade', undefined),
    icon: 'shuffle',
    execute: function (value) {
        console.log('value', value);
    }
}

actions.setTrackNeverCrossfade = {
    title: 'Always crossfade',
    hotkeyAble: true,
    visible: true,
    // checkable: true,
    // checked: app.getValue('dds_fc_auto-crossfade', undefined),
    icon: 'shuffle',
    execute: function (value) {
        console.log('value', value);
    }
}

actions.setTrackDefaultCrossfade = {
    title: 'Auto crossfade',
    hotkeyAble: true,
    visible: true,
    // checkable: true,
    // checked: app.getValue('dds_fc_auto-crossfade', undefined),
    icon: 'shuffle',
    execute: function (value) {
        console.log('value', value);
    }
}


window._menuItems.play.action.submenu.push({
    action: actions.autoAdjustCrossfade,
    order: 11,
    grouporder: 40,
})


// window.menus.tracklistMenuItems.push({
//     action: actions.setTrackDefaultCrossfade,
//     // order: 31,
//     // grouporder: 40
// });
// window.menus.tracklistMenuItems.push({
//     action: actions.setTrackAlwaysCrossfade,
//     // order: 31,
//     // grouporder: 40
// });
// window.menus.tracklistMenuItems.push({
//     action: actions.setTrackNeverCrossfade,
//     order: 31,
//     grouporder: 40
// });