




actions.autoAdjustCrossfade = {
    title: 'Auto adjust crossfade',
    hotkeyAble: true,
    visible: true,
    checkable: true,
    checked: true,
    icon: 'shuffle',
    execute: function () {
        messageDlg('Auto adjust crossfade set to on/poff.', 'information', ['btnOK'], {
            defaultButton: 'btnOK'
        }, undefined);
    }
}


window._menuItems.play.action.submenu.push({
    action: actions.autoAdjustCrossfade,
    order: 11,
    grouporder: 40,
})