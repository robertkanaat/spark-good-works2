import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, Users, Clock, Phone, Globe } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface SupportGroup {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  rating: number;
  reviews: number;
  phone?: string;
  website?: string;
  meetingTypes: string[];
  description: string;
  lat: number;
  lng: number;
  schedule: string;
  cost: string;
  format: string[];
}

interface SupportGroupMapProps {
  groups: SupportGroup[];
  selectedGroup: SupportGroup | null;
  onGroupSelect: (group: SupportGroup | null) => void;
}

const SupportGroupMap: React.FC<SupportGroupMapProps> = ({ groups, selectedGroup, onGroupSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState(false);

  // Check for Mapbox token on component mount
  useEffect(() => {
    // In a real implementation, you would get this from Supabase Edge Function secrets
    // For now, we'll show an input for the user to enter their token
    const token = localStorage.getItem('mapbox_token');
    if (token) {
      setMapboxToken(token);
    } else {
      setShowTokenInput(true);
    }
  }, []);

  const handleTokenSubmit = () => {
    if (mapboxToken) {
      localStorage.setItem('mapbox_token', mapboxToken);
      setShowTokenInput(false);
    }
  };

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || showTokenInput) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [-98.5795, 39.8283], // Center of US
      zoom: 3.5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, showTokenInput]);

  // Add markers for support groups
  useEffect(() => {
    if (!map.current || !groups.length) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    groups.forEach((group) => {
      // Create custom marker element
      const markerElement = document.createElement('div');
      markerElement.className = 'support-group-marker';
      markerElement.style.cssText = `
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: hsl(var(--primary));
        border: 3px solid white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
      `;

      // Add Users icon
      const icon = document.createElement('div');
      icon.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>`;
      markerElement.appendChild(icon);

      // Add hover effects
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.1)';
        markerElement.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)';
      });

      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
        markerElement.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      });

      // Create popup content
      const popupContent = document.createElement('div');
      popupContent.className = 'p-0 m-0';
      popupContent.innerHTML = `
        <div class="p-4 max-w-sm">
          <h3 class="font-bold text-lg mb-2 text-foreground">${group.name}</h3>
          <p class="text-sm text-muted-foreground mb-3 flex items-center">
            <svg width="16" height="16" class="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${group.location}
          </p>
          <p class="text-sm text-muted-foreground mb-3">${group.description}</p>
          <div class="flex items-center gap-2 mb-3">
            <div class="flex items-center">
              <svg width="16" height="16" class="text-yellow-400 fill-current mr-1" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              <span class="font-semibold text-sm">${group.rating}</span>
              <span class="text-muted-foreground text-sm">(${group.reviews})</span>
            </div>
            <span class="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-medium">${group.cost}</span>
          </div>
          <div class="space-y-2">
            <div class="flex items-center text-sm text-muted-foreground">
              <svg width="16" height="16" class="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12,6 12,12 16,14"/>
              </svg>
              ${group.schedule}
            </div>
            <div class="flex items-center text-sm text-muted-foreground">
              <svg width="16" height="16" class="mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
              </svg>
              ${group.format.join(", ")}
            </div>
          </div>
          <button onclick="window.selectSupportGroup(${group.id})" class="w-full mt-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
            View Details
          </button>
        </div>
      `;

      // Create popup
      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: true,
        closeOnClick: false,
        className: 'support-group-popup'
      }).setDOMContent(popupContent);

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([group.lng, group.lat])
        .setPopup(popup)
        .addTo(map.current!);

      markersRef.current.push(marker);

      // Handle marker click
      markerElement.addEventListener('click', () => {
        onGroupSelect(group);
        map.current?.flyTo({
          center: [group.lng, group.lat],
          zoom: 12,
          duration: 1000
        });
      });
    });

    // Add global function for popup button clicks
    (window as any).selectSupportGroup = (groupId: number) => {
      const group = groups.find(g => g.id === groupId);
      if (group) {
        onGroupSelect(group);
      }
    };

  }, [groups, onGroupSelect]);

  // Handle selected group changes
  useEffect(() => {
    if (!selectedGroup || !map.current) return;

    map.current.flyTo({
      center: [selectedGroup.lng, selectedGroup.lat],
      zoom: 12,
      duration: 1000
    });
  }, [selectedGroup]);

  if (showTokenInput) {
    return (
      <div className="h-96 flex items-center justify-center bg-muted/20 rounded-lg">
        <Card className="p-6 max-w-md mx-auto">
          <CardContent className="space-y-4">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Enable Interactive Map</h3>
              <p className="text-sm text-muted-foreground mb-4">
                To view the interactive map with support group locations, please enter your Mapbox public token. 
                You can get one free at{' '}
                <a href="https://account.mapbox.com/access-tokens/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  mapbox.com/account/access-tokens
                </a>
              </p>
            </div>
            <div className="space-y-3">
              <input
                type="text"
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                placeholder="pk.eyJ1..."
                className="w-full px-3 py-2 border border-input rounded-md text-sm"
              />
              <Button onClick={handleTokenSubmit} className="w-full">
                Enable Map
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 rounded-lg overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {selectedGroup && (
        <div className="absolute top-4 left-4 z-10">
          <Card className="p-4 max-w-sm bg-card/95 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-lg text-foreground">{selectedGroup.name}</h3>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedGroup.location}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onGroupSelect(null)}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{selectedGroup.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>{selectedGroup.format.join(", ")}</span>
                </div>
                {selectedGroup.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-primary" />
                    <a href={`tel:${selectedGroup.phone}`} className="hover:text-primary">
                      {selectedGroup.phone}
                    </a>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-1 mt-3">
                {selectedGroup.meetingTypes.slice(0, 2).map((type, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {type}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
    </div>
  );
};

export default SupportGroupMap;