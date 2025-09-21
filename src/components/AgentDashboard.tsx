import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  QrCode, 
  Users, 
  AlertTriangle, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar,
  Shield,
  Camera,
  Scan
} from "lucide-react";
import QRScanner from "./QRScanner";
import TouristTracker from "./TouristTracker";
import CriticalAlerts from "./CriticalAlerts";

const AgentDashboard = () => {
  const [activeTab, setActiveTab] = useState("scanner");
  const [scannedTourist, setScannedTourist] = useState(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Agent Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">Monitor and assist tourists</p>
            </div>
            <Badge variant="default" className="bg-success text-success-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Online
            </Badge>
          </div>
        </div>

        {/* Main Dashboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-card border border-border">
            <TabsTrigger value="scanner" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <QrCode className="w-4 h-4 mr-2" />
              Scanner
            </TabsTrigger>
            <TabsTrigger value="tracker" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Users className="w-4 h-4 mr-2" />
              Track
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Alerts
            </TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <TabsContent value="scanner" className="mt-0">
                <Card className="shadow-elegant border-primary/20">
                  <CardHeader className="bg-gradient-card rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-primary">
                      <Scan className="w-5 h-5" />
                      QR Code Scanner
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <QRScanner onScan={setScannedTourist} />
                  </CardContent>
                </Card>

                {/* Scanned Tourist Info */}
                {scannedTourist && (
                  <Card className="shadow-card border-success/30">
                    <CardHeader className="bg-success/10 rounded-t-lg">
                      <CardTitle className="text-success">Tourist Information</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-medium">{scannedTourist.name}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{scannedTourist.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{scannedTourist.phone}</span>
                          </div>
                        </div>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{scannedTourist.destination}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">{scannedTourist.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4 text-primary" />
                            <span className="text-sm text-muted-foreground">Passport: {scannedTourist.passport}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="tracker" className="mt-0">
                <TouristTracker />
              </TabsContent>

              <TabsContent value="alerts" className="mt-0">
                <Card className="shadow-elegant border-warning/20">
                  <CardHeader className="bg-warning/10 rounded-t-lg">
                    <CardTitle className="flex items-center gap-2 text-warning">
                      <AlertTriangle className="w-5 h-5" />
                      Critical Updates
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CriticalAlerts />
                  </CardContent>
                </Card>
              </TabsContent>
            </div>

            {/* Sidebar - Always visible Critical Alerts */}
            <div className="space-y-6">
              <Card className="shadow-card border-warning/30">
                <CardHeader className="bg-warning/10 rounded-t-lg">
                  <CardTitle className="text-sm font-medium text-warning flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Live Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <CriticalAlerts compact />
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 gap-4">
                <Card className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">24</div>
                    <div className="text-xs text-muted-foreground">Active Tourists</div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-success">18</div>
                    <div className="text-xs text-muted-foreground">In Safe Zone</div>
                  </CardContent>
                </Card>
                <Card className="shadow-card">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-warning">3</div>
                    <div className="text-xs text-muted-foreground">Alerts Pending</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    </div>
  );
};

export default AgentDashboard;