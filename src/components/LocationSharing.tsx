import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface LocationSharingProps {
  destination: string;
}

interface Location {
  latitude: number;
  longitude: number;
}

const LocationSharing: React.FC<LocationSharingProps> = ({ destination }) => {
  const [location, setLocation] = useState<Location | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isInGeofence, setIsInGeofence] = useState(true);
  const { toast } = useToast();

  // Simulated geofence center (in a real app, this would be based on destination)
  const geofenceCenter = { latitude: 40.7128, longitude: -74.0060 }; // NYC example
  const geofenceRadius = 1000; // 1km radius

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = lat1 * Math.PI/180;
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return R * c;
  };

  const checkGeofence = (currentLocation: Location) => {
    const distance = calculateDistance(
      currentLocation.latitude,
      currentLocation.longitude,
      geofenceCenter.latitude,
      geofenceCenter.longitude
    );

    const inFence = distance <= geofenceRadius;
    setIsInGeofence(inFence);

    if (!inFence && isTracking) {
      toast({
        title: "Geofence Alert",
        description: "You have moved outside the designated area!",
        variant: "destructive",
      });
    }
  };

  const startTracking = () => {
    if (navigator.geolocation) {
      setIsTracking(true);
      
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          setLocation(newLocation);
          checkGeofence(newLocation);
        },
        (error) => {
          console.error("Error getting location:", error);
          toast({
            title: "Location Error",
            description: "Unable to access your location. Please enable location services.",
            variant: "destructive",
          });
        },
        {
          enableHighAccuracy: true,
          maximumAge: 30000,
          timeout: 27000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      toast({
        title: "Location Not Supported",
        description: "Your browser doesn't support location services.",
        variant: "destructive",
      });
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">Location Tracking</h3>
        <p className="text-sm text-muted-foreground">
          Stay within the designated area for {destination}
        </p>
      </div>

      {location && (
        <Card className="bg-gradient-card shadow-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              Current Location
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><strong>Latitude:</strong> {location.latitude.toFixed(6)}</div>
              <div><strong>Longitude:</strong> {location.longitude.toFixed(6)}</div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium">Geofence Status</span>
        </div>
        <Badge 
          variant={isInGeofence ? "default" : "destructive"}
          className={isInGeofence ? "bg-success text-success-foreground" : ""}
        >
          {isInGeofence ? (
            <>
              <CheckCircle className="w-3 h-3 mr-1" />
              Safe Zone
            </>
          ) : (
            <>
              <AlertTriangle className="w-3 h-3 mr-1" />
              Outside Zone
            </>
          )}
        </Badge>
      </div>

      <div className="space-y-3">
        {!isTracking ? (
          <Button 
            onClick={startTracking}
            className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300"
            size="lg"
          >
            <MapPin className="w-5 h-5 mr-2" />
            Start Location Tracking
          </Button>
        ) : (
          <Button 
            onClick={stopTracking}
            variant="outline"
            className="w-full border-destructive/30 hover:border-destructive text-destructive hover:bg-destructive/10 transition-smooth"
            size="lg"
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Stop Tracking
          </Button>
        )}

        {/* Simulated map placeholder */}
        <Card className="h-48 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
          <CardContent className="h-full flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="w-8 h-8 text-primary mx-auto" />
              <p className="text-sm text-muted-foreground">Interactive Map</p>
              <p className="text-xs text-muted-foreground">
                Showing geofenced area for {destination}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LocationSharing;