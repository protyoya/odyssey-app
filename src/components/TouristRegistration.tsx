import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, QrCode, Share2, Clock, AlertTriangle } from "lucide-react";
import QRCodeDisplay from "./QRCodeDisplay";
import LocationSharing from "./LocationSharing";
import EmergencyButton from "./EmergencyButton";
import NewsFeed from "./NewsFeed";

interface TouristData {
  name: string;
  email: string;
  phone: string;
  passport: string;
  destination: string;
  duration: string;
}

const TouristRegistration = () => {
  const [formData, setFormData] = useState<TouristData>({
    name: "",
    email: "",
    phone: "",
    passport: "",
    destination: "",
    duration: "",
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
  };

  const isFormValid = Object.values(formData).every(value => value.trim() !== "");

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
        <div className="max-w-2xl mx-auto pt-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Registration Complete</h1>
            <Badge variant="secondary" className="text-success bg-success/10">
              <QrCode className="w-4 h-4 mr-2" />
              Tourist ID Generated
            </Badge>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-card border-2 border-primary/20">
              <CardHeader className="text-center bg-gradient-primary text-primary-foreground rounded-t-lg">
                <CardTitle className="flex items-center justify-center gap-2">
                  <QrCode className="w-6 h-6" />
                  Your Tourist QR Code
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <QRCodeDisplay touristData={formData} />
              </CardContent>
            </Card>

            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-accent">
                  <Share2 className="w-5 h-5" />
                  Location Services
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {!showLocation ? (
                  <Button 
                    onClick={() => setShowLocation(true)}
                    className="w-full bg-gradient-hero hover:shadow-glow transition-all duration-300"
                    size="lg"
                  >
                    <MapPin className="w-5 h-5 mr-2" />
                    Share Live Location
                  </Button>
                ) : (
                  <LocationSharing destination={formData.destination} />
                )}
              </CardContent>
            </Card>

            <EmergencyButton 
              touristName={formData.name} 
              location={formData.destination}
            />

            <NewsFeed destination={formData.destination} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">
            Tourist Registration
          </h1>
          <p className="text-muted-foreground">Complete your registration to get started</p>
        </div>

        <Card className="shadow-elegant border-primary/20">
          <CardHeader className="bg-gradient-card rounded-t-lg">
            <CardTitle className="text-center text-primary">Registration Form</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground font-medium">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="border-border focus:border-primary transition-smooth"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="border-border focus:border-primary transition-smooth"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground font-medium">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="border-border focus:border-primary transition-smooth"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passport" className="text-foreground font-medium">Passport Number</Label>
                <Input
                  id="passport"
                  name="passport"
                  value={formData.passport}
                  onChange={handleInputChange}
                  placeholder="Enter passport number"
                  className="border-border focus:border-primary transition-smooth"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination" className="text-foreground font-medium">Destination</Label>
                <Input
                  id="destination"
                  name="destination"
                  value={formData.destination}
                  onChange={handleInputChange}
                  placeholder="Enter your destination"
                  className="border-border focus:border-primary transition-smooth"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration" className="text-foreground font-medium">
                  <Clock className="w-4 h-4 inline mr-1" />
                  Duration of Visit
                </Label>
                <Input
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 7 days"
                  className="border-border focus:border-primary transition-smooth"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full mt-6 bg-gradient-hero hover:shadow-glow transition-all duration-300 disabled:opacity-50"
                size="lg"
              >
                <QrCode className="w-5 h-5 mr-2" />
                Register & Generate QR Code
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TouristRegistration;