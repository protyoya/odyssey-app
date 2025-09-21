import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  Waves, 
  Cloud, 
  Zap, 
  ExternalLink, 
  RefreshCw,
  MapPin,
  Clock,
  Shield
} from "lucide-react";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: 'flood' | 'earthquake' | 'weather' | 'safety' | 'traffic';
  location: string;
  timestamp: string;
  source: string;
  url?: string;
}

interface NewsFeedProps {
  destination: string;
}

const NewsFeed: React.FC<NewsFeedProps> = ({ destination }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>("");

  // Mock news data - in real app, this would fetch from APIs
  const mockNewsData: NewsItem[] = [
    {
      id: "1",
      title: "Flash Flood Warning Issued",
      description: "Heavy rainfall expected in central Paris. Avoid Seine river areas and underground passages.",
      severity: "high",
      type: "flood",
      location: "Paris, France",
      timestamp: "5 minutes ago",
      source: "Météo-France",
      url: "https://example.com/weather-alert"
    },
    {
      id: "2", 
      title: "Metro Line Disruption",
      description: "Line 1 services suspended due to flooding. Use alternative transportation methods.",
      severity: "medium",
      type: "traffic",
      location: "Paris Metro",
      timestamp: "12 minutes ago",
      source: "RATP",
      url: "https://example.com/metro-alert"
    },
    {
      id: "3",
      title: "Tourist Safety Advisory",
      description: "Authorities advise avoiding Pont Neuf area due to rising water levels. Emergency shelters available.",
      severity: "high",
      type: "safety",
      location: "Central Paris",
      timestamp: "18 minutes ago",
      source: "Prefecture de Police",
      url: "https://example.com/safety-alert"
    },
    {
      id: "4",
      title: "Weather Update",
      description: "Storm system moving northeast. Conditions expected to improve by evening.",
      severity: "medium",
      type: "weather",
      location: "Île-de-France Region",
      timestamp: "25 minutes ago",
      source: "France Weather Service"
    },
    {
      id: "5",
      title: "Emergency Services Coordination",
      description: "Additional rescue teams deployed. Emergency hotline 112 fully operational.",
      severity: "low",
      type: "safety",
      location: "Paris Metropolitan Area",
      timestamp: "32 minutes ago",
      source: "Emergency Services"
    }
  ];

  const fetchNews = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter news based on destination
      const filteredNews = mockNewsData.filter(item => 
        item.location.toLowerCase().includes(destination.toLowerCase().split(',')[0])
      );
      
      setNewsItems(filteredNews);
      setLastUpdate(new Date().toLocaleTimeString());
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    fetchNews();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchNews, 300000);
    return () => clearInterval(interval);
  }, [destination]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-4 h-4 text-destructive animate-pulse" />;
      case 'high':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case 'medium':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      case 'low':
        return <Shield className="w-4 h-4 text-primary" />;
      default:
        return <Shield className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'flood':
        return <Waves className="w-4 h-4 text-blue-500" />;
      case 'earthquake':
        return <Zap className="w-4 h-4 text-orange-500" />;
      case 'weather':
        return <Cloud className="w-4 h-4 text-gray-500" />;
      case 'safety':
        return <Shield className="w-4 h-4 text-green-500" />;
      case 'traffic':
        return <MapPin className="w-4 h-4 text-purple-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge className="bg-destructive text-destructive-foreground animate-pulse">Critical</Badge>;
      case 'high':
        return <Badge className="bg-destructive text-destructive-foreground">High</Badge>;
      case 'medium':
        return <Badge className="bg-warning text-warning-foreground">Medium</Badge>;
      case 'low':
        return <Badge className="bg-primary text-primary-foreground">Low</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <Card className="shadow-elegant border-primary/20">
      <CardHeader className="bg-gradient-card rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-primary">
            <AlertTriangle className="w-5 h-5" />
            Critical Updates - {destination}
          </CardTitle>
          <Button
            onClick={fetchNews}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-primary/30 hover:border-primary"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
        {lastUpdate && (
          <p className="text-xs text-muted-foreground">
            Last updated: {lastUpdate}
          </p>
        )}
      </CardHeader>
      <CardContent className="p-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : newsItems.length === 0 ? (
          <div className="text-center py-6">
            <Shield className="w-12 h-12 text-success mx-auto mb-3" />
            <h3 className="font-semibold text-foreground mb-2">All Clear</h3>
            <p className="text-sm text-muted-foreground">
              No critical alerts for {destination} at this time
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {newsItems.map((item) => (
              <Card key={item.id} className={`border-l-4 shadow-card ${
                item.severity === 'critical' ? 'border-l-destructive bg-destructive/5' :
                item.severity === 'high' ? 'border-l-destructive bg-destructive/5' :
                item.severity === 'medium' ? 'border-l-warning bg-warning/5' :
                'border-l-primary bg-primary/5'
              }`}>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2">
                        {getSeverityIcon(item.severity)}
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground text-sm">{item.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        </div>
                      </div>
                      {getSeverityBadge(item.severity)}
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          {getTypeIcon(item.type)}
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.timestamp}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Source: {item.source}</span>
                        {item.url && (
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2"
                            onClick={() => window.open(item.url, '_blank')}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NewsFeed;