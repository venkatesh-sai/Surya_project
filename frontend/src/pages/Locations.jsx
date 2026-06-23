import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import AnimatedLabel from "../components/AnimatedLabel";
import ScrollReveal from "../components/ScrollReveal";
import SEO from "../components/SEO";

const fallbackText = "Contact for details";

const locationPinIcon = L.divIcon({
  className: "surya-map-pin",
  html: '<span class="surya-map-pin-core" aria-hidden="true"></span>',
  iconSize: [34, 42],
  iconAnchor: [17, 42],
  popupAnchor: [0, -38],
});

function displayValue(value) {
  return value || fallbackText;
}

function serviceList(value) {
  return String(value || "")
    .split(/\r?\n|,/)
    .map((service) => service.trim())
    .filter(Boolean);
}

function coordinateValue(value) {
  const numberValue = Number.parseFloat(value);
  return Number.isFinite(numberValue) ? numberValue : null;
}

function locationCoordinates(location) {
  const latitude = coordinateValue(location.latitude);
  const longitude = coordinateValue(location.longitude);

  if (latitude === null || longitude === null) {
    return null;
  }

  if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    return null;
  }

  return [latitude, longitude];
}

function googleMapsUrl(location) {
  const coordinates = locationCoordinates(location);
  if (location.google_maps_url) {
    return location.google_maps_url;
  }

  return coordinates ? `https://www.google.com/maps?q=${coordinates[0]},${coordinates[1]}` : "";
}

function mapCenter(locations) {
  const coordinates = locations.map(locationCoordinates).filter(Boolean);

  if (!coordinates.length) {
    return [17.385, 78.4867];
  }

  const totals = coordinates.reduce(
    (sum, coordinate) => [sum[0] + coordinate[0], sum[1] + coordinate[1]],
    [0, 0]
  );

  return [totals[0] / coordinates.length, totals[1] / coordinates.length];
}

async function fetchLocations() {
  const response = await fetch("/api/locations/");

  if (!response.ok) {
    throw new Error("Unable to load locations.");
  }

  return response.json();
}

function LocationsMap({ locations }) {
  const mappedLocations = locations
    .map((location) => ({ ...location, coordinates: locationCoordinates(location) }))
    .filter((location) => location.coordinates);

  if (!mappedLocations.length) {
    return (
      <div className="locations-map-empty">
        <AnimatedLabel text="Map" />
        <h2>Map location will be updated soon.</h2>
        <p>Add latitude and longitude in the admin panel to show pins here.</p>
      </div>
    );
  }

  return (
    <div className="locations-map-panel">
      <div className="locations-map-overlay">
        <strong>Our Service Locations</strong>
        <span>Click a pin to open Google Maps</span>
      </div>
      <MapContainer
        center={mapCenter(mappedLocations)}
        scrollWheelZoom={false}
        zoom={mappedLocations.length > 1 ? 8 : 13}
        zoomControl={false}
      >
        <ZoomControl position="topright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mappedLocations.map((location) => (
          <Marker icon={locationPinIcon} key={location.id} position={location.coordinates}>
            <Popup>
              <div className="location-map-popup">
                <p className="location-map-popup-kicker">Surya Enterprises</p>
                <strong>{displayValue(location.name)}</strong>
                <span>{[location.area, location.city].filter(Boolean).join(", ") || fallbackText}</span>
                <dl>
                  <div>
                    <dt>Phone</dt>
                    <dd>{location.phone || fallbackText}</dd>
                  </div>
                  <div>
                    <dt>Hours</dt>
                    <dd>{location.working_hours || fallbackText}</dd>
                  </div>
                </dl>
                <a href={googleMapsUrl(location)} target="_blank" rel="noreferrer">
                  Open in Google Maps
                </a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    fetchLocations()
      .then((data) => {
        if (mounted) {
          setLocations(data);
          setError("");
        }
      })
      .catch((fetchError) => {
        if (mounted) {
          setError(fetchError.message);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Locations | Xerox & RISO Dealer Telangana | Surya Enterprises"
        description="Find Surya Enterprises locations and service coverage for Xerox, Fujifilm and RISO printer sales, installation, AMC and support."
        keywords="Surya Enterprises locations, Xerox dealer Telangana, RISO dealer Telangana, printer service locations, Hyderabad printer dealer"
        image="/images/seo-banner.jpg"
        url="/locations"
      />

      <section className="page-hero compact-hero locations-hero">
        <AnimatedLabel text="Locations" />
        <h1>Surya Enterprises locations and service coverage</h1>
        <p>
          Reach our team for Xerox, Fujifilm and RISO printer sales,
          installation, rentals, AMC and service support.
        </p>
      </section>

      <section className="page-section locations-map-section">
        <div className="section-header">
          <AnimatedLabel text="Map" />
          <h2>Find us on the map</h2>
          <p>Map pins are loaded from active database locations with latitude and longitude.</p>
        </div>

        {loading ? (
          <div className="locations-map-empty">
            <h2>Loading map...</h2>
            <p>Fetching location coordinates.</p>
          </div>
        ) : error ? (
          <div className="locations-map-empty">
            <h2>Map unavailable</h2>
            <p>{error}</p>
          </div>
        ) : (
          <LocationsMap locations={locations} />
        )}
      </section>

      <section className="page-section locations-section">
        <div className="section-header">
          <AnimatedLabel text="Visit / Contact" />
          <h2>Dealer and service locations</h2>
          <p>Location details are managed from the admin panel and loaded from the Django database.</p>
        </div>

        {loading ? (
          <div className="empty-products">
            <h3>Loading locations...</h3>
            <p>Fetching the latest location details.</p>
          </div>
        ) : error ? (
          <div className="empty-products">
            <h3>Unable to load locations</h3>
            <p>{error}</p>
          </div>
        ) : locations.length ? (
          <div className="locations-grid">
            {locations.map((location, index) => {
              const services = serviceList(location.services_available);
              return (
                <ScrollReveal className="location-card" index={index} key={location.id}>
                  <div className="location-card-header">
                    <div>
                      <p>{displayValue(location.area)}</p>
                      <h3>{displayValue(location.name)}</h3>
                    </div>
                    <span>{displayValue(location.city)}</span>
                  </div>

                  <dl className="location-details">
                    <div>
                      <dt>Address</dt>
                      <dd>{displayValue(location.address)}</dd>
                    </div>
                    <div>
                      <dt>Phone</dt>
                      <dd>
                        {location.phone ? <a href={`tel:${location.phone}`}>{location.phone}</a> : fallbackText}
                      </dd>
                    </div>
                    <div>
                      <dt>Email</dt>
                      <dd>
                        {location.email ? <a href={`mailto:${location.email}`}>{location.email}</a> : fallbackText}
                      </dd>
                    </div>
                    <div>
                      <dt>Working Hours</dt>
                      <dd>{displayValue(location.working_hours)}</dd>
                    </div>
                  </dl>

                  <div className="location-services">
                    <strong>Services available</strong>
                    {services.length ? (
                      <ul>
                        {services.map((service) => <li key={service}>{service}</li>)}
                      </ul>
                    ) : (
                      <p>{fallbackText}</p>
                    )}
                  </div>

                  {googleMapsUrl(location) ? (
                    <a className="primary-btn" href={googleMapsUrl(location)} target="_blank" rel="noreferrer">
                      View on Map
                    </a>
                  ) : (
                    <span className="secondary-btn disabled-link">Map link unavailable</span>
                  )}
                </ScrollReveal>
              );
            })}
          </div>
        ) : (
          <div className="empty-products">
            <h3>No locations found</h3>
            <p>Location records can be added from the admin panel.</p>
          </div>
        )}
      </section>
    </>
  );
}

export default Locations;
