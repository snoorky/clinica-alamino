$w.onReady(function () {
    initializeFAQ();
});

function initializeFAQ() {
    $w('#repeaterFAQ').forEachItem(($item, itemData, index) => {
        index !== 0 ? $item('#answerFAQ').collapse() : $item('#answerFAQ').expand();
        $item('#containerFAQ').onClick(() => handleFAQClick($item));
    });
}

function handleFAQClick(clickedItem) {
    $w('#repeaterFAQ').forEachItem(($item) => {
        if ($item !== clickedItem) $item('#answerFAQ').collapse();
    });

    clickedItem('#answerFAQ').collapsed ? clickedItem('#answerFAQ').expand() : clickedItem('#answerFAQ').collapse();
}