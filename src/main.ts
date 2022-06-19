import './style.css'
import 'maplibre-gl/dist/maplibre-gl.css';
import maplibregl from 'maplibre-gl';
import * as turf from '@turf/turf';

const map = new maplibregl.Map({
    container: 'map',
    style: {
        version: 8,
        sources: {
            MIERUNEMAP: {
                type: 'raster',
                tiles: ['https://tile.mierune.co.jp/mierune_mono/{z}/{x}/{y}.png'],
                tileSize: 256,
                attribution:
                    "Maptiles by <a href='http://mierune.co.jp/' target='_blank'>MIERUNE</a>, under CC BY. Data by <a href='http://osm.org/copyright' target='_blank'>OpenStreetMap</a> contributors, under ODbL.",
            },
        },
        layers: [
            {
                id: 'MIERUNEMAP',
                type: 'raster',
                source: 'MIERUNEMAP',
                minzoom: 0,
                maxzoom: 18,
            },
        ],
    },
    center: [139.767, 35.681],
    zoom: 11,
});

map.addControl(
    new maplibregl.NavigationControl({
        visualizePitch: true,
    })
);

map.on('load', function () {
    const features = turf.featureCollection([
        turf.point([139.7594, 35.6865]),
        turf.point([139.7692, 35.6665]),
        turf.point([139.7812, 35.6849]),
    ]);
    map.addSource('FeaturesPoint', {
        type: 'geojson',
        data: features,
    });
    map.addLayer({
        id: 'FeaturesPoint',
        type: 'circle',
        source: 'FeaturesPoint',
        layout: {},
        paint: {
            'circle-pitch-alignment': 'map',
            'circle-stroke-color': '#1253A4',
            'circle-stroke-width': 5,
            'circle-stroke-opacity': 0.8,
            'circle-color': '#1253A4',
            'circle-radius': 5,
            'circle-opacity': 0.5,
        },
    });
    const center = turf.center(features);
    map.addSource('CenterPoint', {
        type: 'geojson',
        data: center,
    });
    map.addLayer({
        id: 'CenterPoint',
        type: 'circle',
        source: 'CenterPoint',
        layout: {},
        paint: {
            'circle-pitch-alignment': 'map',
            'circle-stroke-color': '#8DCF3F',
            'circle-stroke-width': 10,
            'circle-stroke-opacity': 0.8,
            'circle-color': '#8DCF3F',
            'circle-radius': 10,
            'circle-opacity': 0.5,
        },
    });
});
