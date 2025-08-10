import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface TreatmentCenter {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  rating: number;
  specialties: string[];
}

const treatmentCenters: TreatmentCenter[] = [
  {
    id: 1,
    name: "Hazelden Betty Ford Foundation",
    location: "Center City, MN",
    city: "Center City",
    state: "MN",
    lat: 45.4215,
    lng: -92.8136,
    rating: 4.8,
    specialties: ["Alcohol Addiction", "Drug Addiction", "Dual Diagnosis"]
  },
  {
    id: 2,
    name: "Betty Ford Center",
    location: "Rancho Mirage, CA",
    city: "Rancho Mirage", 
    state: "CA",
    lat: 33.7399,
    lng: -116.4123,
    rating: 4.9,
    specialties: ["Alcohol Treatment", "Prescription Drug Addiction"]
  },
  {
    id: 3,
    name: "Passages Malibu",
    location: "Malibu, CA",
    city: "Malibu",
    state: "CA", 
    lat: 34.0259,
    lng: -118.7798,
    rating: 4.7,
    specialties: ["Luxury Treatment", "Holistic Therapy"]
  },
  // Additional mock centers for demonstration
  {
    id: 4,
    name: "Caron Treatment Centers",
    location: "Wernersville, PA",
    city: "Wernersville",
    state: "PA",
    lat: 40.3298,
    lng: -76.0819,
    rating: 4.6,
    specialties: ["Adolescent Treatment", "Adult Programs"]
  },
  {
    id: 5,
    name: "The Meadows",
    location: "Wickenburg, AZ",
    city: "Wickenburg",
    state: "AZ",
    lat: 33.9687,
    lng: -112.7296,
    rating: 4.5,
    specialties: ["Trauma Therapy", "Sex Addiction"]
  }
];

const TreatmentCenterMap: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [apiKey, setApiKey] = useState<string>('');
  const [isApiKeySet, setIsApiKeySet] = useState<boolean>(false);
  const [selectedCenter, setSelectedCenter] = useState<TreatmentCenter | null>(null);

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setIsApiKeySet(true);
      initializeMap();
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !apiKey) return;

    // Set Mapbox access token
    mapboxgl.accessToken = apiKey;
    
    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [-98.5795, 39.8283], // Center of United States
        zoom: 4,
        pitch: 0,
      });

      // Add navigation controls
      map.current.addControl(
        new mapboxgl.NavigationControl({
          visualizePitch: false,
        }),
        'top-right'
      );

      // Add markers for treatment centers
      treatmentCenters.forEach((center) => {
        // Create custom marker element
        const markerElement = document.createElement('div');
        markerElement.className = 'treatment-center-marker';
        markerElement.innerHTML = `
          <div class="w-8 h-8 bg-primary rounded-full border-2 border-white shadow-lg flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M12 2L13.09 7.26L18 8L13.09 8.74L12 14L10.91 8.74L6 8L10.91 7.26L12 2Z"/>
            </svg>
          </div>
        `;

        // Create popup content
        const popup = new mapboxgl.Popup({
          offset: 25,
          closeButton: true,
          closeOnClick: false
        }).setHTML(`
          <div class="p-4 min-w-[200px]">
            <h3 class="font-semibold text-lg mb-2">${center.name}</h3>
            <p class="text-gray-600 mb-2">${center.location}</p>
            <div class="flex items-center gap-1 mb-2">
              <span class="text-yellow-500">★</span>
              <span class="font-medium">${center.rating}</span>
            </div>
            <div class="text-sm text-gray-600">
              ${center.specialties.slice(0, 2).join(', ')}
            </div>
          </div>
        `);

        // Add marker to map
        new mapboxgl.Marker(markerElement)
          .setLngLat([center.lng, center.lat])
          .setPopup(popup)
          .addTo(map.current!);

        // Add click event to marker
        markerElement.addEventListener('click', () => {
          setSelectedCenter(center);
        });
      });

    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  useEffect(() => {
    return () => {
      map.current?.remove();
    };
  }, []);

  if (!isApiKeySet) {
    return (
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 max-w-6xl mx-auto shadow-lg">
        <div className="text-center mb-8">
          <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-foreground mb-4">Interactive Treatment Center Map</h3>
          <p className="text-muted-foreground mb-6">
            To display the interactive map, please enter your Mapbox public token below.
          </p>
          <p className="text-sm text-muted-foreground mb-6">
            Get your free token at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your Mapbox public token..."
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleApiKeySubmit} disabled={!apiKey.trim()}>
              Load Map
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Your token will only be stored locally in your browser
          </p>
        </div>

        {/* Preview of what the map will show */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card/30 rounded-lg p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">5+ Centers</h4>
            <p className="text-sm text-muted-foreground">Mapped nationwide</p>
          </div>
          <div className="bg-card/30 rounded-lg p-4 text-center">
            <Award className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Verified Facilities</h4>
            <p className="text-sm text-muted-foreground">Licensed & accredited</p>
          </div>
          <div className="bg-card/30 rounded-lg p-4 text-center">
            <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
            <h4 className="font-semibold text-foreground">Interactive Pins</h4>
            <p className="text-sm text-muted-foreground">Click for details</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 max-w-6xl mx-auto shadow-lg">
      <h3 className="text-2xl font-semibold text-foreground mb-6 text-center">
        Interactive Treatment Center Map
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div 
            ref={mapContainer} 
            className="w-full h-96 rounded-xl border border-border/30 shadow-inner"
            style={{ minHeight: '400px' }}
          />
        </div>

        {/* Selected Center Info */}
        <div className="lg:col-span-1">
          {selectedCenter ? (
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">{selectedCenter.name}</CardTitle>
                <p className="text-muted-foreground">{selectedCenter.location}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">{selectedCenter.rating}</span>
                    <span className="text-muted-foreground">rating</span>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Specialties:</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCenter.specialties.map((specialty, index) => (
                        <span 
                          key={index}
                          className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full" size="sm">
                      Learn More
                    </Button>
                    <Button variant="outline" className="w-full" size="sm">
                      Get Directions
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="h-full flex items-center justify-center">
              <CardContent className="text-center">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Click on a pin to see treatment center details
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default TreatmentCenterMap;