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


window._menuItems.play.action.submenu.push({
    action: actions.autoAdjustCrossfade,
    order: 11,
    grouporder: 40,
})
