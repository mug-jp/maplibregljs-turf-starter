
// MIERUNE MONO読み込み
const map = new mapboxgl.Map({
    container: "map",
    style: {
        version: 8,
        sources: {
            m_mono: {
                type: "raster",
                tiles: ["https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png"],
                tileSize: 256
            }
        },
        layers: [{
            id: "m_mono",
            type: "raster",
            source: "m_mono",
            minzoom: 0,
            maxzoom: 18
        }]
    },
    center: [139.770, 35.676],
    zoom: 13
});


map.on("load", function () {

    // 元ポイントを取得
    const features = turf.featureCollection([
        turf.point([139.7594, 35.6865]),
        turf.point([139.7692, 35.6665]),
        turf.point([139.7812, 35.6849])
    ]);

    // 元ポイント表示
    map.addSource("FeaturesPoint", {
        type: "geojson",
        data: features
    });
    map.addLayer({
        id: "FeaturesPoint",
        type: "circle",
        source: "FeaturesPoint",
        layout: {},
        paint: {
            "circle-pitch-alignment": "map",
            "circle-stroke-color": "#1253A4",
            "circle-stroke-width": 5,
            "circle-stroke-opacity": 0.8,
            "circle-color": "#1253A4",
            "circle-radius": 5,
            "circle-opacity": 0.5
        }
    });


    // センターポイントを取得
    const center = turf.center(features);

    // センターポイント表示
    map.addSource("CenterPoint", {
        type: "geojson",
        data: center
    });
    map.addLayer({
        id: "CenterPoint",
        type: "circle",
        source: "CenterPoint",
        layout: {},
        paint: {
            "circle-pitch-alignment": "map",
            "circle-stroke-color": "#8DCF3F",
            "circle-stroke-width": 10,
            "circle-stroke-opacity": 0.8,
            "circle-color": "#8DCF3F",
            "circle-radius": 10,
            "circle-opacity": 0.5
        }
    });

});

// コントロール関係表示
map.addControl(new mapboxgl.NavigationControl());
