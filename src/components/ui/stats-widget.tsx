import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Progress } from './progress';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatsWidgetProps {
  title: string;
  value: string | number;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
    period: string;
  };
  icon?: React.ReactNode;
  progress?: {
    value: number;
    max: number;
    label?: string;
  };
  className?: string;
}

const StatsWidget: React.FC<StatsWidgetProps> = ({
  title,
  value,
  change,
  icon,
  progress,
  className
}) => {
  const getTrendIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return <TrendingUp className="w-3 h-3 text-green-600" />;
      case 'decrease':
        return <TrendingDown className="w-3 h-3 text-red-600" />;
      default:
        return <Minus className="w-3 h-3 text-slate-600" />;
    }
  };

  const getTrendColor = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase':
        return 'text-green-600';
      case 'decrease':
        return 'text-red-600';
      default:
        return 'text-slate-600';
    }
  };

  return (
    <Card className={`hover:shadow-md transition-shadow ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600">
          {title}
        </CardTitle>
        {icon && (
          <div className="h-4 w-4 text-slate-600">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-2xl font-bold text-slate-900">
            {typeof value === 'number' ? value.toLocaleString('pt-BR') : value}
          </div>
          
          {change && (
            <div className="flex items-center space-x-1">
              {getTrendIcon(change.type)}
              <span className={`text-xs font-medium ${getTrendColor(change.type)}`}>
                {change.type === 'increase' ? '+' : change.type === 'decrease' ? '-' : ''}
                {Math.abs(change.value)}% {change.period}
              </span>
            </div>
          )}
          
          {progress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-600">
                  {progress.label || 'Progresso'}
                </span>
                <span className="font-medium">
                  {((progress.value / progress.max) * 100).toFixed(1)}%
                </span>
              </div>
              <Progress 
                value={(progress.value / progress.max) * 100} 
                className="h-2"
              />
              <div className="text-xs text-slate-500">
                {progress.value.toLocaleString('pt-BR')} de {progress.max.toLocaleString('pt-BR')}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsWidget;