import wixData from 'wix-data';
import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {
    const collectionName = "Depoimentos";
    const itemsPerPage = wixWindowFrontend.formFactor === "Desktop" ? 4 : 2;
    let currentIndex = 0;
    let items = [];
    let slideInterval;

    const progressBar = $w('#progressBarDepoimentos');
    const repeater = $w('#containerDepoimentos');

    function fetchItems(collectionName) {
        return wixData.query(collectionName).find();
    }

    function startSlideInterval() {
        slideInterval = setInterval(showNextItem, 3000);
    }

    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    function showCurrentItems() {
        if (items.length === 0) return;

        const currentPageItems = getCurrentPageItems();
        repeater.data = currentPageItems;
    }

    function getCurrentPageItems() {
        const currentPageItems = [];
        for (let i = 0; i < itemsPerPage; i++) {
            let itemIndex = (currentIndex + i) % items.length;
            currentPageItems.push(items[itemIndex]);
        }
        return currentPageItems;
    }

    function updateProgressBar() {
        const progressValue = calculateProgressValue();
        progressBar.value = progressValue;
    }

    function calculateProgressValue() {
        const totalImages = items.length;
        return (currentIndex === totalImages - 1) ? 100 : ((currentIndex + 1) / totalImages) * 100;
    }

    function showNextItem() {
        currentIndex = (currentIndex + 1) % items.length;
        showCurrentItems();
        updateProgressBar();
    }

    function initialize() {
        fetchItems(collectionName).then(results => {
            items = results.items;
            if (items.length > 0) {
                showCurrentItems();
                updateProgressBar();
                startSlideInterval();

                repeater.onMouseIn(stopSlideInterval);
                repeater.onMouseOut(startSlideInterval);
            }
        });

        repeater.onItemReady(onItemReady);
    }

    function onItemReady($item, itemData) {
        $item('#imgDepoimento').src = itemData.image;
        $item('#imgDepoimento').alt = "depoimento";
        $item('#imgDepoimento').tooltip = "";
    }

    initialize();
});