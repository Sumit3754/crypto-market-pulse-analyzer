
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const alerts = [
  {
    id: 1,
    token: 'UNI',
    type: 'price_spike',
    message: 'Price increased 15% in last hour',
    severity: 'high',
    time: '2 min ago',
  },
  {
    id: 2,
    token: 'AAVE',
    type: 'liquidity_drop',
    message: 'Liquidity decreased by 25%',
    severity: 'medium',
    time: '5 min ago',
  },
  {
    id: 3,
    token: 'LINK',
    type: 'volume_surge',
    message: 'Trading volume 3x above average',
    severity: 'low',
    time: '8 min ago',
  },
];

export const AlertsPanel = () => {
  const [showAll, setShowAll] = useState(false);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'price_spike': return TrendingUp;
      case 'liquidity_drop': return TrendingDown;
      case 'volume_surge': return AlertTriangle;
      default: return Bell;
    }
  };

  const displayedAlerts = showAll ? alerts : alerts.slice(0, 3);

  return (
    <Card className="p-4 bg-black/40 backdrop-blur-lg border-purple-500/20">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bell className="h-5 w-5 text-purple-400" />
            <h3 className="font-semibold text-white">Market Alerts</h3>
          </div>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
        </div>
        
        <div className="space-y-3">
          {displayedAlerts.map((alert) => {
            const IconComponent = getAlertIcon(alert.type);
            return (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start space-x-3">
                  <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-white text-sm">{alert.token}</span>
                      <span className="text-xs text-gray-400">{alert.time}</span>
                    </div>
                    <p className="text-gray-300 text-xs mt-1">{alert.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {alerts.length > 3 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            className="w-full border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            {showAll ? 'Show Less' : `Show ${alerts.length - 3} More`}
          </Button>
        )}
      </div>
    </Card>
  );
};
