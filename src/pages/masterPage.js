import wixLocation from 'wix-location';

$w.onReady(function () {
    handlePageLayout(wixLocation.path[0]);
});

function handlePageLayout(page) {
    const isLaboratorioPage = (page === "laboratorio");

    const elementsToShowLaboratorio = [
        $w('#backgroundLaboratorio'),
        $w('#backgroundFooter')
    ];

    const elementsToHideLaboratorio = [
        $w('#logoClinica'),
        $w('#logoFooterClinica'),
        $w('#elementFooter1'),
        $w('#elementFooter2'),
        $w('#phoneClinica'),
        $w('#mailClinica'),
        $w('#localClinica1'),
        $w('#localClinica2'),
        $w('#menuClinica')
    ];

    if (isLaboratorioPage) {
        elementsToShowLaboratorio.forEach(element => element.show());
        elementsToHideLaboratorio.forEach(element => element.hide());
    } else {
        elementsToShowLaboratorio.forEach(element => element.hide());
    }
}
