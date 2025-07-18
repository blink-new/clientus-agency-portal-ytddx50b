import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Building2, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Zap, 
  Shield, 
  Users, 
  BarChart3,
  FileText,
  Clock,
  Target,
  Sparkles,
  Play,
  Quote
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState('materials');

  const features = {
    materials: {
      title: 'Organize materiais como um profissional',
      description: 'Upload em lote, versionamento automático e aprovação com um clique',
      items: [
        'Upload em lote com drag & drop',
        'Versionamento automático',
        'Aprovação com um clique',
        'Histórico completo'
      ],
      color: 'pink'
    },
    approvals: {
      title: 'Aprovações que fluem naturalmente',
      description: 'Sistema inteligente que acelera o processo de aprovação',
      items: [
        'Notificações automáticas',
        'Comentários em tempo real',
        'Aprovação por email',
        'Lembretes inteligentes'
      ],
      color: 'yellow'
    },
    analytics: {
      title: 'Analytics que fazem sentido',
      description: 'Métricas claras e acionáveis para sua agência',
      items: [
        'Dashboard em tempo real',
        'Relatórios automáticos',
        'Integração Meta/Google',
        'ROI por cliente'
      ],
      color: 'blue'
    },
    automation: {
      title: 'Automação que trabalha por você',
      description: 'Deixe a tecnologia cuidar das tarefas repetitivas',
      items: [
        'Agendamento inteligente',
        'Workflows personalizados',
        'Integrações nativas',
        'Backup automático'
      ],
      color: 'purple'
    }
  };

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'CEO, Digital Boost',
      avatar: '👩‍💼',
      rating: 4.9,
      metric: '+300% eficiência',
      quote: 'Clientus transformou nossa agência. Antes era caos, agora é pura organização.',
      color: 'pink'
    },
    {
      name: 'João Santos',
      role: 'Diretor, Creative Lab',
      avatar: '👨‍💻',
      rating: 5.0,
      metric: '-80% tempo aprovação',
      quote: 'Nunca mais perdemos um prazo. O sistema de aprovações é revolucionário.',
      color: 'blue'
    },
    {
      name: 'Ana Costa',
      role: 'Fundadora, Growth Agency',
      avatar: '👩‍🚀',
      rating: 4.8,
      metric: '+150% clientes',
      quote: 'Conseguimos escalar nossa operação sem contratar mais pessoas.',
      color: 'purple'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: 97,
      description: 'Perfeito para agências iniciantes',
      features: [
        'Até 5 clientes',
        'Gestão de materiais',
        'Aprovações básicas',
        'Relatórios simples',
        'Suporte por email'
      ],
      color: 'blue',
      popular: false
    },
    {
      name: 'Professional',
      price: 197,
      description: 'Para agências em crescimento',
      features: [
        'Clientes ilimitados',
        'Automações avançadas',
        'Analytics completo',
        'Integrações Meta/Google',
        'White-label',
        'Suporte prioritário'
      ],
      color: 'purple',
      popular: true
    },
    {
      name: 'Enterprise',
      price: null,
      description: 'Solução personalizada',
      features: [
        'Tudo do Professional',
        'API personalizada',
        'Suporte dedicado',
        'Treinamento incluso',
        'SLA garantido'
      ],
      color: 'orange',
      popular: false
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      pink: 'from-pink-500 to-pink-600 border-pink-200 bg-pink-50',
      yellow: 'from-yellow-500 to-yellow-600 border-yellow-200 bg-yellow-50',
      blue: 'from-blue-500 to-blue-600 border-blue-200 bg-blue-50',
      purple: 'from-purple-500 to-purple-600 border-purple-200 bg-purple-50',
      orange: 'from-orange-500 to-orange-600 border-orange-200 bg-orange-50',
      green: 'from-green-500 to-green-600 border-green-200 bg-green-50'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Clientus
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate('/login')}>
                Entrar
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={() => navigate('/login')}
              >
                Teste Grátis
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Folder Tab Effect */}
              <div className="relative">
                <div className="file-tab active inline-block px-6 py-3 text-sm font-medium text-slate-700">
                  Clientus.exe
                </div>
                <div className="bg-white rounded-lg rounded-tl-none border border-slate-200 p-8 shadow-xl">
                  <Badge className="mb-4 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-blue-200">
                    🚀 Revolucione sua agência
                  </Badge>
                  <h1 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
                    Organize sua agência
                    <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      como nunca antes
                    </span>
                  </h1>
                  <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    O SaaS que transforma o caos em eficiência. Gerencie clientes, 
                    materiais e campanhas em um só lugar, com a organização de um sistema de arquivos premium.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      size="lg" 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
                      onClick={() => navigate('/login')}
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Teste Grátis por 14 dias
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="text-lg px-8 py-6 border-2"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      Ver Demo
                    </Button>
                  </div>

                  <div className="mt-8 flex items-center space-x-6 text-sm text-slate-500">
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Sem cartão de crédito
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                      Setup em 5 minutos
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 px-4 py-3 border-b flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <div className="ml-4 text-sm text-slate-500">clientus.app/dashboard</div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg p-4 text-white">
                      <div className="text-2xl font-bold">24</div>
                      <div className="text-pink-100 text-sm">Materiais</div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-4 text-white">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-blue-100 text-sm">Clientes</div>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-4 text-white">
                      <div className="text-2xl font-bold">98%</div>
                      <div className="text-green-100 text-sm">Aprovação</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-slate-200 rounded w-3/4 mb-1"></div>
                          <div className="h-2 bg-slate-100 rounded w-1/2"></div>
                        </div>
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Do caos à organização perfeita
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Veja como o Clientus transforma a bagunça diária em um sistema organizado e eficiente
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* ANTES */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-red-600 mb-4">Sua agência hoje:</h3>
                <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: '💬', text: 'WhatsApp infinito', color: 'red' },
                      { icon: '📧', text: 'Emails perdidos', color: 'orange' },
                      { icon: '⏰', text: 'Aprovações atrasadas', color: 'yellow' },
                      { icon: '📊', text: 'Relatórios manuais', color: 'red' }
                    ].map((item, i) => (
                      <div key={i} className="bg-white border border-red-200 rounded-lg p-4 text-center transform rotate-1 hover:rotate-0 transition-transform">
                        <div className="text-2xl mb-2">{item.icon}</div>
                        <div className="text-sm font-medium text-slate-700">{item.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* DEPOIS */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-600 mb-4">Com Clientus:</h3>
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
                  <div className="space-y-4">
                    {[
                      { icon: '📁', text: 'Comunicação Centralizada', color: 'pink' },
                      { icon: '📁', text: 'Aprovações Automáticas', color: 'blue' },
                      { icon: '📁', text: 'Relatórios Inteligentes', color: 'green' },
                      { icon: '📁', text: 'Organização Total', color: 'purple' }
                    ].map((item, i) => (
                      <div key={i} className={`bg-gradient-to-r ${getColorClasses(item.color)} border rounded-lg p-4 flex items-center space-x-3 hover:scale-105 transition-transform`}>
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-medium text-slate-700">{item.text}</span>
                        <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Tabs Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Funcionalidades que fazem a diferença
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Cada recurso foi pensado para resolver os problemas reais das agências
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {Object.entries(features).map(([key, feature]) => (
              <button
                key={key}
                onClick={() => setActiveFeature(key)}
                className={`file-tab px-6 py-4 rounded-t-lg border-b-0 transition-all ${
                  activeFeature === key 
                    ? 'active bg-white border-slate-200 shadow-lg' 
                    : 'bg-slate-100 border-slate-300 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">
                    {key === 'materials' && '🎨'}
                    {key === 'approvals' && '✅'}
                    {key === 'analytics' && '📊'}
                    {key === 'automation' && '⚡'}
                  </span>
                  <span className="font-medium">
                    {key === 'materials' && 'Gestão de Materiais'}
                    {key === 'approvals' && 'Aprovações'}
                    {key === 'analytics' && 'Analytics'}
                    {key === 'automation' && 'Automação'}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg rounded-tl-none border border-slate-200 shadow-xl p-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-bold text-slate-900">
                  {features[activeFeature as keyof typeof features].title}
                </h3>
                <p className="text-lg text-slate-600">
                  {features[activeFeature as keyof typeof features].description}
                </p>
                <ul className="space-y-3">
                  {features[activeFeature as keyof typeof features].items.map((item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  onClick={() => navigate('/login')}
                >
                  Experimentar agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
                <div className="aspect-video bg-white rounded-lg shadow-inner flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mx-auto mb-4 flex items-center justify-center">
                      <span className="text-2xl text-white">
                        {activeFeature === 'materials' && '🎨'}
                        {activeFeature === 'approvals' && '✅'}
                        {activeFeature === 'analytics' && '📊'}
                        {activeFeature === 'automation' && '⚡'}
                      </span>
                    </div>
                    <p className="text-slate-500">Preview da funcionalidade</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Agências que já organizaram o caos
            </h2>
            <p className="text-xl text-slate-600">
              Veja os resultados reais de quem usa o Clientus
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <Card key={i} className={`card-hover border-2 ${getColorClasses(testimonial.color)}`}>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-2xl border-2 border-white shadow-lg">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{testimonial.name}</h4>
                      <p className="text-sm text-slate-600">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium">{testimonial.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      {testimonial.metric}
                    </Badge>
                  </div>
                  
                  <blockquote className="text-slate-700 italic">
                    <Quote className="w-4 h-4 text-slate-400 mb-2" />
                    "{testimonial.quote}"
                  </blockquote>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Escolha sua pasta de crescimento
            </h2>
            <p className="text-xl text-slate-600">
              Planos que crescem junto com sua agência
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => (
              <div key={i} className="relative">
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                      ⭐ Mais Popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`card-hover h-full ${plan.popular ? 'border-purple-300 shadow-xl scale-105' : 'border-slate-200'}`}>
                  <CardContent className="p-8">
                    {/* Folder Tab */}
                    <div className={`file-tab inline-block px-4 py-2 text-sm font-medium mb-6 ${getColorClasses(plan.color)}`}>
                      {plan.name}
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        {plan.price ? (
                          <>
                            <span className="text-4xl font-bold text-slate-900">R$ {plan.price}</span>
                            <span className="text-slate-500 ml-2">/mês</span>
                          </>
                        ) : (
                          <span className="text-4xl font-bold text-slate-900">Sob consulta</span>
                        )}
                      </div>
                      <p className="text-slate-600 mt-2">{plan.description}</p>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700' 
                          : 'bg-slate-900 hover:bg-slate-800'
                      }`}
                      onClick={() => navigate('/login')}
                    >
                      {plan.price ? 'Começar agora' : 'Falar com vendas'}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>

          {/* Guarantee */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-3 bg-green-50 border-2 border-green-200 rounded-xl px-6 py-4">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h4 className="font-bold text-green-800">Garantia de 30 dias</h4>
                <p className="text-green-700">Se não organizar sua agência, devolvemos 100% do valor</p>
              </div>
              <div className="bg-green-600 text-white rounded-full p-2">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para organizar sua agência?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Junte-se a centenas de agências que já transformaram o caos em eficiência
          </p>
          
          {/* CTA File System */}
          <div className="bg-white rounded-xl p-6 max-w-md mx-auto mb-8">
            <div className="flex items-center space-x-3 p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
              <span className="text-2xl">🚀</span>
              <span className="font-mono text-slate-700">iniciar_teste_gratuito.exe</span>
              <Button 
                className="ml-auto bg-green-600 hover:bg-green-700"
                onClick={() => navigate('/login')}
              >
                Executar
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="flex items-center text-blue-100">
              <Clock className="w-5 h-5 mr-2" />
              <span>Últimas 48h: Desconto de 30%</span>
            </div>
            <div className="flex items-center text-blue-100">
              <Target className="w-5 h-5 mr-2" />
              <span>Setup em 5 minutos</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">Clientus</span>
              </div>
              <p className="text-slate-400">
                Transformando agências através da organização inteligente.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Funcionalidades</a></li>
                <li><a href="#" className="hover:text-white">Preços</a></li>
                <li><a href="#" className="hover:text-white">Demo</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Empresa</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Sobre</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Carreiras</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white">Ajuda</a></li>
                <li><a href="#" className="hover:text-white">Contato</a></li>
                <li><a href="#" className="hover:text-white">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Clientus. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;