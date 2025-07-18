import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  FileImage,
  Target,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Play,
  Pause
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface CalendarEvent {
  id: string;
  title: string;
  type: 'material' | 'campaign';
  status: string;
  date: string;
  time?: string;
  description?: string;
  platform?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface CalendarTimelineProps {
  events?: CalendarEvent[];
  onEventClick?: (event: CalendarEvent) => void;
  className?: string;
}

const CalendarTimeline: React.FC<CalendarTimelineProps> = ({ 
  events = [], 
  onEventClick,
  className 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [viewMode, setViewMode] = useState<'month' | 'week'>('month');

  // Mock events if none provided
  const mockEvents: CalendarEvent[] = [
    {
      id: '1',
      title: 'Post Instagram - Black Friday',
      type: 'material',
      status: 'approved',
      date: '2024-01-20',
      time: '14:00',
      description: 'Post promocional para Black Friday',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Story Facebook - Produto',
      type: 'material',
      status: 'pending',
      date: '2024-01-22',
      time: '09:30',
      description: 'Story para lançamento do produto',
      priority: 'medium'
    },
    {
      id: '3',
      title: 'Campanha Verão 2024',
      type: 'campaign',
      status: 'active',
      date: '2024-01-25',
      description: 'Início da campanha de verão',
      platform: 'Instagram',
      priority: 'high'
    },
    {
      id: '4',
      title: 'Banner Site - Promoção',
      type: 'material',
      status: 'revision',
      date: '2024-01-28',
      time: '16:00',
      description: 'Banner para promoção especial',
      priority: 'low'
    }
  ];

  const displayEvents = events.length > 0 ? events : mockEvents;

  const getMonthDays = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getEventsForDate = (date: Date | null) => {
    if (!date) return [];
    const dateStr = date.toISOString().split('T')[0];
    return displayEvents.filter(event => event.date === dateStr);
  };

  const getEventTypeIcon = (type: string) => {
    return type === 'material' ? (
      <FileImage className="w-3 h-3" />
    ) : (
      <Target className="w-3 h-3" />
    );
  };

  const getStatusColor = (status: string, type: string) => {
    if (type === 'material') {
      switch (status) {
        case 'approved': return 'bg-green-100 text-green-800 border-green-200';
        case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'revision': return 'bg-orange-100 text-orange-800 border-orange-200';
        case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    } else {
      switch (status) {
        case 'active': return 'bg-green-100 text-green-800 border-green-200';
        case 'paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        case 'scheduled': return 'bg-blue-100 text-blue-800 border-blue-200';
        case 'completed': return 'bg-gray-100 text-gray-800 border-gray-200';
        default: return 'bg-gray-100 text-gray-800 border-gray-200';
      }
    }
  };

  const getStatusIcon = (status: string, type: string) => {
    if (type === 'material') {
      switch (status) {
        case 'approved': return <CheckCircle className="w-3 h-3" />;
        case 'pending': return <Clock className="w-3 h-3" />;
        case 'revision': return <AlertCircle className="w-3 h-3" />;
        case 'rejected': return <XCircle className="w-3 h-3" />;
        default: return <Clock className="w-3 h-3" />;
      }
    } else {
      switch (status) {
        case 'active': return <Play className="w-3 h-3" />;
        case 'paused': return <Pause className="w-3 h-3" />;
        case 'scheduled': return <CalendarIcon className="w-3 h-3" />;
        case 'completed': return <CheckCircle className="w-3 h-3" />;
        default: return <CalendarIcon className="w-3 h-3" />;
      }
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-green-500';
      default: return 'border-l-gray-300';
    }
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const monthDays = getMonthDays(currentDate);
  const monthName = currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    onEventClick?.(event);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              Calendário de Materiais e Campanhas
            </CardTitle>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('month')}
              >
                Mês
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('week')}
              >
                Semana
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('prev')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <h2 className="text-lg font-semibold text-gray-900 capitalize">
              {monthName}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateMonth('next')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays.map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {monthDays.map((day, index) => {
              const dayEvents = getEventsForDate(day);
              const isToday = day && day.toDateString() === new Date().toDateString();
              
              return (
                <div
                  key={index}
                  className={cn(
                    "min-h-[100px] p-2 border border-gray-100 bg-white hover:bg-gray-50 transition-colors",
                    day ? "cursor-pointer" : "bg-gray-50",
                    isToday && "bg-blue-50 border-blue-200"
                  )}
                >
                  {day && (
                    <>
                      <div className={cn(
                        "text-sm font-medium mb-1",
                        isToday ? "text-blue-600" : "text-gray-900"
                      )}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            onClick={() => handleEventClick(event)}
                            className={cn(
                              "text-xs p-1 rounded border-l-2 cursor-pointer hover:shadow-sm transition-shadow",
                              getStatusColor(event.status, event.type),
                              getPriorityColor(event.priority)
                            )}
                          >
                            <div className="flex items-center gap-1 mb-1">
                              {getEventTypeIcon(event.type)}
                              {getStatusIcon(event.status, event.type)}
                            </div>
                            <div className="truncate font-medium">
                              {event.title}
                            </div>
                            {event.time && (
                              <div className="text-xs opacity-75">
                                {event.time}
                              </div>
                            )}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-500 text-center py-1">
                            +{dayEvents.length - 2} mais
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Modal */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getEventTypeIcon(selectedEvent.type)}
                  {selectedEvent.title}
                </DialogTitle>
                <DialogDescription>
                  {selectedEvent.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Tipo:</span>
                  <Badge variant="outline">
                    {selectedEvent.type === 'material' ? 'Material' : 'Campanha'}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Status:</span>
                  <Badge className={cn("border", getStatusColor(selectedEvent.status, selectedEvent.type))}>
                    {getStatusIcon(selectedEvent.status, selectedEvent.type)}
                    <span className="ml-1 capitalize">{selectedEvent.status}</span>
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Data:</span>
                  <span className="text-sm text-gray-900">
                    {new Date(selectedEvent.date).toLocaleDateString('pt-BR')}
                    {selectedEvent.time && ` às ${selectedEvent.time}`}
                  </span>
                </div>

                {selectedEvent.platform && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Plataforma:</span>
                    <span className="text-sm text-gray-900">{selectedEvent.platform}</span>
                  </div>
                )}

                {selectedEvent.priority && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Prioridade:</span>
                    <Badge 
                      className={cn(
                        "border",
                        selectedEvent.priority === 'high' ? 'bg-red-100 text-red-800 border-red-200' :
                        selectedEvent.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 border-yellow-200' :
                        'bg-green-100 text-green-800 border-green-200'
                      )}
                    >
                      {selectedEvent.priority === 'high' ? 'Alta' : 
                       selectedEvent.priority === 'medium' ? 'Média' : 'Baixa'}
                    </Badge>
                  </div>
                )}

                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                    Fechar
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Ver Detalhes
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarTimeline;