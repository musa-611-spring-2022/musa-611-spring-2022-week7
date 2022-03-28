let nav = document.querySelector('div.navigation');
let bg = document.querySelector('div.front-background');
let firstRender = true;
let secY;
let secN;
let mapZoom;
let isDuringZoom = false;
let mapCenter = [-17.9657487, 100];
let displayingSection = 0;
let sectionRenderer = { 0: null };

let renderNavBar = (h, scrollNumByScreen) => {
    let navHeight = linearInsert(scrollNumByScreen, 0, 1, 150, 50);
    nav.style.height = navHeight + 'px';

    let top = linearInsert(scrollNumByScreen, 0, 0.5, 0.4 * h, 0);
    nav.style.top = top + 'px';

    let b = linearInsert(scrollNumByScreen - 0.7, 0, 0.3, 0, 1);
    nav.style.backgroundColor = 'rgba(0,0,0,' + b + ')';

    // let bottom = (scrollNumByScreen - 0) * 100;
    // if (bottom < 0) bottom = 0;
    let bottom = linearInsert(scrollNumByScreen, 0, 2, 0, 200);
    bg.style.bottom = bottom + 'px';
};

let linearInsert = (x, min, max, start, end) => {
    if (x <= min) return start;
    if (x >= max) return end;
    let pct = (x - min) / (max - min);
    return ((end - start) * pct + start);
}

let whichSection = (scrollY) => {
    if (!secY) return 0;
    for (let i = 0; i < secY.length; i++) {
        elementY = secY[i];
        if (scrollY <= elementY) {
            // return i;
            return linearInsert(scrollY, secY[i - 1], secY[i], i - 1, i).toFixed(3);
        }
    }
    return secY.length - 1;
};

let onScroll = () => {
    let y = window.scrollY;
    let h = window.innerHeight;
    let scrollNumByScreen = y / h;

    // animate nav bar and logo
    if (scrollNumByScreen <= 2 || firstRender) renderNavBar(h, scrollNumByScreen);

    // console.log(scrollNumByScreen.toFixed(1))
    let newSecN = whichSection(y + h + 200);
    if (secN !== newSecN) {
        // console.log(secN);
        renderSection(newSecN);
        secN = newSecN;
    }

};

let renderSection = (n) => {
    const dest = [
        mapCenter,  //p0
        mapCenter,  //p0
        mapCenter,  //p1
        mapCenter,  //p2
        [0, 110],   //p3
        [40, 110],  //p4
        [60, 140],  //p5
        [60, 140],  //p6
        mapCenter
    ];
    const zoomLevels = [2.5, 2.5, 4, 4, 4, 4, 4, 2.5, 4, 4];
    const movingPct = 0.3;

    let lowerBound = Math.floor(n);
    let upperBound = lowerBound + 1;
    let z = zoomLevels[lowerBound];
    mapZoom = map.getZoom();
    displaySectionGeo(lowerBound);

    if (z !== mapZoom) {
        // changing map zoom
        if (isDuringZoom) return;
        map.flyTo(map.getCenter(), z, { duration: 2 });
        isDuringZoom = true;
    } else {
        // changing map center
        isDuringZoom = false;
        let [x1, y1] = dest[lowerBound];
        let [x2, y2] = dest[upperBound];
        let x = linearInsert(n, lowerBound, lowerBound + movingPct, x1, x2);
        let y = linearInsert(n, lowerBound, lowerBound + movingPct, y1, y2);

        camera.setDestination(x, y);
        camera.update();
    }
};

let displaySectionGeo = (n) => {
    if (displayingSection === n) return;
    console.log(n);
    displayingSection = n;
    // allLayers.clearLayers();
    clearLayers();

    if (sectionRenderer[n]) {
        sectionRenderer[n]();
    } else {
        console.log("section", n, "not exist");
    };
}

let clearLayers = () => {
    // map.eachLayer((l) => {
    //     if (!l._url) {
    //         map.removeLayer(l);
    //     }
    // })
    allLayers.clearLayers();
}

// scroll animation and slide control
$(document).on('scroll', onScroll);

// getting all the Y of slides
$(() => {
    onScroll();
    firstRender = false;

    secY = $('div.section').toArray().map((div) => {
        return $(div).position().top;
    });
    secY.unshift(0);
    secY.push(secY[secY.length - 1] + $('div.section').last().height());
    console.log(secY);
});