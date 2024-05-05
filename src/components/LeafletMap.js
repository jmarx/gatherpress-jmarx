/**
 * External dependencies.
 */
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from '@wordpress/element';

/**
 * LeafletMap component for GatherPress.
 *
 * This component is used to embed a Leaflet Map with specified location,
 * zoom level, and height.
 *
 * @since 1.0.0
 *
 * @param {Object} props              - Component properties.
 * @param {string} props.location     - The location to be displayed on the map.
 * @param {number} [props.zoom=10]    - The zoom level of the map.
 * @param {number} [props.height=300] - The height of the map container.
 * @param {string} [props.className]  - Additional CSS class names for styling.
 *
 * @return {JSX.Element} The rendered React component.
 */
const LeafletMap = (props) => {
	const [position, setPosition] = useState([0, 0]);
	const { zoom, className, location, height } = props;
	const style = { height };
	console.log('location on leaflet', location);
	//** this will all work once I get the state issue worked out */
	useEffect(() => {
		axios
			.get(
				`https://nominatim.openstreetmap.org/search?q=${location}&format=geojson`
			)
			.then((res) => {
				console.log('useffect alldone', res);
				setPosition([
					res.data.features[0].geometry.coordinates[1],
					res.data.features[0].geometry.coordinates[0],
				]);
				console.log('pos after UE', position);
				console.log(res.data.features[0].geometry.coordinates[1], res.data.features[0].geometry.coordinates[0]);
			})
			.catch((err) => {
		console.log(err)
			});
	}, [position, location]);

	//convert location to position here

	return (
		<MapContainer
			style={style}
			className={className}
			center={position}
			zoom={zoom}
			scrollWheelZoom={false}
			height={height}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position}>
				<Popup>{location}</Popup>
			</Marker>
		</MapContainer>
	);
};

export default LeafletMap;
