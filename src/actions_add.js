import { activateAutoCrossfade, deactivateAutoCrossfade } from "./logic";





actions.autoAdjustCrossfade = {
    title: 'Auto adjust crossfade',
    hotkeyAble: true,
    visible: true,
    checkable: true,
    checked: true,
    icon: 'shuffle',
    execute: function (value) {
        const newState = this.checked;
        app.setValue('dds_fc_auto-crossfade', newState);

        if(newState) {
            activateAutoCrossfade();
            uitools.toastMessage.show('Auto adjust crossfading activated');
            const crossfadeMenuItem = getMenuItem('Crossfade', window._menuItems.play.action.submenu);
            crossfadeMenuItem.action.disabled = true;
        } else {
            deactivateAutoCrossfade();
            uitools.toastMessage.show('Auto adjust crossfading deactivated');
            const crossfadeMenuItem = getMenuItem('Crossfade', window._menuItems.play.action.submenu);
            crossfadeMenuItem.action.disabled = false;
        }
    }
}


window._menuItems.play.action.submenu.push({
    action: actions.autoAdjustCrossfade,
    order: 11,
    grouporder: 40,
})


function getMenuItem(titleStr, menuArr) {
    for(let i=0; i<menuArr.length; i++) {
        curItem = menuArr[i];
        if(curItem.action.title() === titleStr) {
            return curItem;
        }
    }
    return null;
}