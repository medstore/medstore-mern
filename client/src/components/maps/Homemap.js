import React, { Component } from 'react';
import { useState, useRef, useCallback } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';
import Geocoder from "react-map-gl-geocoder";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import userData from './data'
import './homemap.css'

function Homemap() {
	const [showPopup, togglePopup] = useState(null);
	const [viewport, setViewport] = useState({
		width: "95%",
		height: "95%",
		latitude: 21.7679,
		longitude: 78.8718,
		zoom: 3.5
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
		className="mapView"
			ref={mapRef}
			{...viewport}
			mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
			onViewportChange={handleViewportChange}
			mapStyle="mapbox://styles/skgupta77159/ckrodymtt4fuj17mvlpbwydpq"
		>
			{/* <Geocoder
				mapRef={mapRef}
				onViewportChange={handleGeocoderViewportChange}
				mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
				position="top-left"
			/> */}
			{
				userData.map((data) => {
					return (
						<div key={data.id}>
							<Marker latitude={data.lati} longitude={data.long} offsetLeft={-20} offsetTop={-10}>
							<i className="fas fa-clinic-medical" style={{ fontSize: viewport.zoom * 5, color: '#ff0000' }} onClick={() => togglePopup(data.id)}></i>
								{/* <i className="fas fa-map-marker-alt" ></i> */}
							</Marker>
							{
								(data.id === showPopup) && <Popup
									latitude={data.lati}
									longitude={data.long}
									closeButton={true}
									closeOnClick={false}
									onClose={() => togglePopup(null)}
									anchor="bottom" >
									<div>{data.name}</div>
								</Popup>
							}

						</div>
					)
				})
			}
		</ReactMapGL>
	)
}

export default Homemap;