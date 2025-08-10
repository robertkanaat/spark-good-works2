import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCenter, setSelectedCenter] = useState<TreatmentCenter | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');

  // Get Mapbox token from Supabase secrets
  useEffect(() => {
    const getMapboxToken = async () => {
      console.log('Starting to fetch Mapbox token...');
      try {
        console.log('Calling supabase function get-secret...');
        const { data, error } = await supabase.functions.invoke('get-secret', {
          body: { name: 'MAPBOX_PUBLIC_TOKEN' }
        });
        
        console.log('Function response:', { data, error });
        
        if (error) {
          console.error('Error fetching Mapbox token:', error);
          console.log('Using fallback token due to error');
          setMapboxToken('pk.eyJ1IjoiZ2VuaXVzcmVjb3ZlcnkiLCJhIjoiY21lNjMwbnNvMTFsYjJpcHVyb3NkbTA1ZCJ9.GWZj3Wt68GZa2siKD791AA');
          setIsLoading(false);
          return;
        }
        
        if (data?.value) {
          console.log('Successfully got token from Supabase secrets');
          setMapboxToken(data.value);
          setIsLoading(false);
        } else {
          console.log('No token found in secrets, using fallback');
          // Fallback to hardcoded token if secret not found
          setMapboxToken('pk.eyJ1IjoiZ2VuaXVzcmVjb3ZlcnkiLCJhIjoiY21lNjMwbnNvMTFsYjJpcHVyb3NkbTA1ZCJ9.GWZj3Wt68GZa2siKD791AA');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Catch block error:', error);
        console.log('Using fallback token due to catch block');
        // Fallback to hardcoded token
        setMapboxToken('pk.eyJ1IjoiZ2VuaXVzcmVjb3ZlcnkiLCJhIjoiY21lNjMwbnNvMTFsYjJpcHVyb3NkbTA1ZCJ9.GWZj3Wt68GZa2siKD791AA');
        setIsLoading(false);
      }
    };

    getMapboxToken();
  }, []);

  useEffect(() => {
    if (!mapboxToken || !mapContainer.current || isLoading) return;

    // Set Mapbox access token
    mapboxgl.accessToken = mapboxToken;
    
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

    return () => {
      map.current?.remove();
    };
  }, [mapboxToken, isLoading]);

  if (isLoading) {
    return (
      <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 max-w-6xl mx-auto shadow-lg">
        <div className="text-center">
          <MapPin className="h-16 w-16 text-primary mx-auto mb-4 animate-pulse" />
          <h3 className="text-2xl font-semibold text-foreground mb-4">Loading Interactive Map...</h3>
          <p className="text-muted-foreground">Setting up your treatment center map</p>
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