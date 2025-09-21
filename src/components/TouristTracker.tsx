import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  MapPin, 
  Search, 
  Filter, 
  Users, 
  Clock, 
  Shield,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

interface Tourist {
  id: string;
  name: string;
  destination: string;
  status: 'safe' | 'warning' | 'alert';
  location: string;
  lastUpdate: string;
  duration: string;
}

const TouristTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<'all' | 'safe' | 'warning' | 'alert'>('all');

  // Mock tourist data
  const tourists: Tourist[] = [
    {
      id: "1",
      name: "John Smith",
      destination: "Paris, France",
      status: "safe",
      location: "Eiffel Tower Area",
      lastUpdate: "2 min ago",
      duration: "7 days"
    },
    {
      id: "2", 
      name: "Emma Johnson",
      destination: "Rome, Italy",
      status: "warning",
      location: "Near Colosseum",
      lastUpdate: "5 min ago",
      duration: "5 days"
    },
    {
      id: "3",
      name: "Michael Brown",
      destination: "Barcelona, Spain",
      status: "alert",
      location: "Outside designated area",
      lastUpdate: "1 min ago",
      duration: "10 days"
    },
    {
      id: "4",
      name: "Sarah Davis",
      destination: "Amsterdam, Netherlands",
      status: "safe",
      location: "Museum District",
      lastUpdate: "3 min ago",
      duration: "4 days"
    },
    {
      id: "5",
      name: "David Wilson",
      destination: "Berlin, Germany",
      status: "safe",
      location: "Brandenburg Gate",
      lastUpdate: "7 min ago",
      duration: "6 days"
    }
  ];

  const filteredTourists = tourists.filter(tourist => {
    const matchesSearch = tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tourist.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = statusFilter === 'all' || tourist.status === statusFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'safe':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'safe':
        return <Badge className="bg-success text-success-foreground">Safe Zone</Badge>;
      case 'warning':
        return <Badge className="bg-warning text-warning-foreground">Warning</Badge>;
      case 'alert':
        return <Badge variant="destructive">Alert</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const statusCounts = {
    safe: tourists.filter(t => t.status === 'safe').length,
    warning: tourists.filter(t => t.status === 'warning').length,
    alert: tourists.filter(t => t.status === 'alert').length,
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="w-5 h-5 text-primary" />
              <span className="text-lg font-bold text-primary">{tourists.length}</span>
            </div>
            <div className="text-xs text-muted-foreground">Total Tourists</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <CheckCircle className="w-5 h-5 text-success" />
              <span className="text-lg font-bold text-success">{statusCounts.safe}</span>
            </div>
            <div className="text-xs text-muted-foreground">Safe Zone</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              <span className="text-lg font-bold text-warning">{statusCounts.warning}</span>
            </div>
            <div className="text-xs text-muted-foreground">Warnings</div>
          </CardContent>
        </Card>
        
        <Card className="shadow-card">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <span className="text-lg font-bold text-destructive">{statusCounts.alert}</span>
            </div>
            <div className="text-xs text-muted-foreground">Critical Alerts</div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <Card className="shadow-elegant border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Users className="w-5 h-5" />
            Track Tourists
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or destination..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={() => setStatusFilter('all')}
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
              >
                <Filter className="w-4 h-4 mr-2" />
                All
              </Button>
              <Button
                onClick={() => setStatusFilter('safe')}
                variant={statusFilter === 'safe' ? 'default' : 'outline'}
                size="sm"
                className={statusFilter === 'safe' ? 'bg-success text-success-foreground' : ''}
              >
                Safe
              </Button>
              <Button
                onClick={() => setStatusFilter('warning')}
                variant={statusFilter === 'warning' ? 'default' : 'outline'}
                size="sm"
                className={statusFilter === 'warning' ? 'bg-warning text-warning-foreground' : ''}
              >
                Warning
              </Button>
              <Button
                onClick={() => setStatusFilter('alert')}
                variant={statusFilter === 'alert' ? 'destructive' : 'outline'}
                size="sm"
              >
                Alert
              </Button>
            </div>
          </div>

          {/* Tourist List */}
          <div className="space-y-3">
            {filteredTourists.map((tourist) => (
              <Card key={tourist.id} className="shadow-card border-l-4 border-l-primary">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(tourist.status)}
                      <div>
                        <h4 className="font-semibold text-foreground">{tourist.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {tourist.destination}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {tourist.duration}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right space-y-2">
                      {getStatusBadge(tourist.status)}
                      <div className="text-xs text-muted-foreground">
                        Last update: {tourist.lastUpdate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Current Location:</span>
                      <span className="font-medium text-foreground">{tourist.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredTourists.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold text-foreground mb-2">No tourists found</h3>
              <p className="text-sm text-muted-foreground">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TouristTracker;