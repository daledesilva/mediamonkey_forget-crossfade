

// On very first run
// TODO: This just runs when launched but should only run on first launch

import { deactivateAutoCrossfade } from "./logic";

// Perhaps just check if value exists yet? But then it won't show if someone uninstalls and reinstalls
window.whenReady( async () => {

	//Remember Crossfade's previous state
    // app.setValue('dds_fc_prev-state', app.player.isCrossfade);
    setTimeout(init, 3000);
	// setTimeout(showOnboardingGuide, 5000);
});


async function init() {
    await pauseForDevtools();
	// // Turn On
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
        // messageDlg('Open dev tools: <a href="http://localhost:9222/" target="_blank" rel="noreferrer">http://localhost:9222/</a>', 'information', ['btnOK'], {
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



// Execute when the window is ready
// window.whenReady(() => {
//     uitools.toastMessage.show('Hello world! From Dale', {
//         disableUndo: true
//     });
// });



// Sub OnStartup
// 	Dim aMnu
	
// 	'add link to turn on / off play menu
// 	Set aMnu = SDB.UI.AddMenuItem(SDB.UI.Menu_Play,4,1)
// 	aMnu.Caption = "Auto Crossfade"
// 	'Turn on ForgetCrossfade if first use
// 	If SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active") = True Then
// 		activateAutoCrossfade
// 	End If
// 	aMnu.Checked = SDB.IniFile.BoolValue("ForgetCrossfade_MM"&Round(SDB.VersionHi),"active")
			
// 	Script.RegisterEvent aMnu, "OnClick", "turnOnOff"
// End Sub