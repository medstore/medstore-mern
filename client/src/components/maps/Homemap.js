import React, { Component } from 'react';
import { useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

function Homemap() {
	const [viewport, setViewport] = useState({
		width: "95%",
		height: "95%",
		latitude: 21.7679,
		longitude: 78.8718,
		zoom: 3
	});
	const mapRef = useRef();
	const handleViewportChange = useCallback(
		(newViewport) => setViewport(newViewport),
		[]
	);

	const handleGeocoderViewportChange = useCallback(
		(newViewport) => {
			const geocoderDefaultOverrides = { transitionDuration: 1000 };

			return handleViewportChange({
				...newViewport,
				...geocoderDefaultOverrides
			});
		},
		[handleViewportChange]
	);


	return (
		<ReactMapGL
			ref={mapRef}
			{...viewport}
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
			onViewportChange={handleViewportChange}
			mapStyle="mapbox://styles/skgupta77159/ckrodymtt4fuj17mvlpbwydpq"
		>
			<Geocoder
				mapRef={mapRef}
				onViewportChange={handleGeocoderViewportChange}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
				position="top-left"
			/>
			<Marker latitude={21.7679} longitude={78.8718} offsetLeft={-20} offsetTop={-10}>
				<div>You are here</div>
			</Marker>
		</ReactMapGL>
	)
}

export default Homemap;