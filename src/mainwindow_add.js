

// On very first run
// TODO: This just runs when launched but should only run on first launch

import { deactivateAutoCrossfade } from "./logic";

// Perhaps just check if value exists yet? But then it won't show if someone uninstalls and reinstalls
window.whenReady( async () => {
    setTimeout(init, 3000);
});


async function init() {
    await pauseForDevtools();
	
    const initialized = app.getValue('dds_fc_initialized', undefined);

    if(!initialized) {
        await showOnboardingGuide();
        app.setValue('dds_fc_initialized', true);
        activateAutoCrossfade();
        
    } else {
        const autoCrossfade = app.getValue('dds_fc_auto-crossfade', undefined);
        if(autoCrossfade) {
            activateAutoCrossfade();
        } else {
            deactivateAutoCrossfade();
        }
    }
}


async function pauseForDevtools() {
    return new Promise((resolve, reject) => {
        messageDlg('Open dev tools: http://localhost:9222/', 'information', ['btnOK'], {
            defaultButton: 'btnOK'
        }, resolve);
    })
}


async function showOnboardingGuide() {
    return new Promise((resolve, reject) => {
        messageDlg('Forget Crossfade has been activated for the first time.\r\nTo deactivate it, go to the <strong>Play</strong> menu and uncheck <strong>Auto adjust crossfade</strong>.\r\nThis will revert the crossfade setting to what it was when Auto Crossfade was last activated.', 'information', ['btnOK'], {
            title: 'Forget Crossfade Onboarding',
            defaultButton: 'btnOK'
        }, resolve);
    })
}

