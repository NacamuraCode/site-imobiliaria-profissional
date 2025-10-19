"use client"

import { useState } from 'react'
import { ArrowLeft, Users, Award, MapPin, Phone, Mail, MessageCircle, Star, Calendar, TrendingUp, Home, Shield, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface AboutPageProps {
  onBack: () => void
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const [showContactForm, setShowContactForm] = useState(false)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const stats = [
    { icon: Home, label: "Imóveis Vendidos", value: "2.500+", color: "text-blue-600" },
    { icon: Users, label: "Clientes Satisfeitos", value: "1.800+", color: "text-green-600" },
    { icon: Calendar, label: "Anos de Experiência", value: "15+", color: "text-purple-600" },
    { icon: TrendingUp, label: "Taxa de Sucesso", value: "98%", color: "text-orange-600" }
  ]

  const team = [
    {
      name: "João Silva",
      role: "CEO & Fundador",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      bio: "15 anos de experiência no mercado imobiliário, especialista em investimentos de alto padrão.",
      specialties: ["Investimentos", "Alto Padrão", "Comercial"]
    },
    {
      name: "Maria Santos",
      role: "Diretora de Vendas",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      bio: "Especialista em vendas residenciais com foco em atendimento personalizado e resultados excepcionais.",
      specialties: ["Residencial", "Primeiro Imóvel", "Financiamento"]
    },
    {
      name: "Carlos Oliveira",
      role: "Especialista em Locação",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      bio: "Expert em locações corporativas e residenciais, com amplo conhecimento do mercado de aluguéis.",
      specialties: ["Locação", "Corporativo", "Gestão"]
    }
  ]

  const services = [
    {
      icon: Home,
      title: "Compra e Venda",
      description: "Assessoria completa para compra e venda de imóveis residenciais e comerciais."
    },
    {
      icon: Shield,
      title: "Consultoria Jurídica",
      description: "Suporte jurídico especializado para todas as etapas da transação imobiliária."
    },
    {
      icon: TrendingUp,
      title: "Avaliação de Imóveis",
      description: "Avaliações precisas baseadas em análise de mercado e características do imóvel."
    },
    {
      icon: Users,
      title: "Gestão de Locação",
      description: "Administração completa de imóveis para locação, incluindo captação de inquilinos."
    }
  ]

  const testimonials = [
    {
      name: "Ana Costa",
      role: "Cliente",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      text: "Excelente atendimento! Encontrei meu apartamento dos sonhos em apenas 2 semanas. Equipe muito profissional.",
      rating: 5
    },
    {
      name: "Roberto Lima",
      role: "Investidor",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
      text: "Já fiz 3 investimentos através da ImóvelPro. Sempre com transparência e excelentes oportunidades.",
      rating: 5
    },
    {
      name: "Fernanda Souza",
      role: "Proprietária",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      text: "Venderam minha casa em tempo recorde e pelo melhor preço do mercado. Recomendo sem hesitar!",
      rating: 5
    }
  ]

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    setContactForm({ name: '', email: '', subject: '', message: '' })
    setShowContactForm(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Sobre a ImóvelPro
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Há mais de 15 anos transformando sonhos em realidade no mercado imobiliário brasileiro
          </p>
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="w-6 h-6" />
            <span className="text-lg">Empresa certificada e licenciada</span>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="about" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="about">Nossa História</TabsTrigger>
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
            <TabsTrigger value="contact">Contato</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about" className="space-y-12">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <Icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                      <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                      <p className="text-gray-600">{stat.label}</p>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Mission & Vision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-6 h-6 mr-2 text-blue-600" />
                    Nossa Missão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Conectar pessoas aos seus imóveis ideais através de tecnologia inovadora, 
                    atendimento personalizado e transparência total. Acreditamos que encontrar 
                    o lar perfeito deve ser uma experiência prazerosa e segura para todos.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-6 h-6 mr-2 text-green-600" />
                    Nossa Visão
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    Ser a plataforma imobiliária mais confiável e inovadora do Brasil, 
                    revolucionando a forma como as pessoas compram, vendem e alugam imóveis, 
                    sempre priorizando a satisfação e segurança dos nossos clientes.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Company Story */}
            <Card>
              <CardHeader>
                <CardTitle>Nossa História</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <div className="space-y-6 text-gray-700">
                  <p>
                    A ImóvelPro nasceu em 2009 com uma visão simples: tornar o mercado imobiliário 
                    mais acessível, transparente e eficiente para todos. Fundada por João Silva, 
                    um veterano do setor com mais de 20 anos de experiência, a empresa começou 
                    como uma pequena corretora em São Paulo.
                  </p>
                  
                  <p>
                    Ao longo dos anos, expandimos nossa atuação para todo o Brasil, sempre mantendo 
                    nossos valores fundamentais: honestidade, profissionalismo e inovação. Em 2018, 
                    lançamos nossa plataforma digital, revolucionando a forma como nossos clientes 
                    interagem com o mercado imobiliário.
                  </p>
                  
                  <p>
                    Hoje, somos orgulhosos de ter ajudado mais de 1.800 famílias a encontrar seus 
                    lares ideais e de ter facilitado mais de R$ 500 milhões em transações imobiliárias. 
                    Nossa equipe cresceu, nossa tecnologia evoluiu, mas nosso compromisso com a 
                    excelência permanece o mesmo.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Testimonials */}
            <div>
              <h2 className="text-3xl font-bold text-center mb-8">O que nossos clientes dizem</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-12 h-12 rounded-full mr-4"
                        />
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-gray-600">{testimonial.role}</p>
                        </div>
                      </div>
                      <div className="flex mb-3">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-700 italic">"{testimonial.text}"</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Team Tab */}
          <TabsContent value="team" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossa Equipe</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Conheça os profissionais dedicados que tornam a ImóvelPro uma referência no mercado imobiliário
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-700 mb-4 text-sm leading-relaxed">{member.bio}</p>
                    
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {member.specialties.map((specialty, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        E-mail
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Services Tab */}
          <TabsContent value="services" className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nossos Serviços</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Oferecemos uma gama completa de serviços imobiliários para atender todas as suas necessidades
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                          <p className="text-gray-700">{service.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Additional Services */}
            <Card>
              <CardHeader>
                <CardTitle>Serviços Adicionais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Financiamento Imobiliário</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Seguro Residencial</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Reforma e Decoração</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Mudanças e Logística</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Documentação Legal</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span>Vistoria Técnica</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Entre em Contato</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Endereço</p>
                        <p className="text-gray-600">Av. Paulista, 1000 - São Paulo, SP</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">Telefone</p>
                        <p className="text-gray-600">(11) 3000-0000</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">E-mail</p>
                        <p className="text-gray-600">contato@imovelpro.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium">WhatsApp</p>
                        <p className="text-gray-600">(11) 99999-9999</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Office Hours */}
                <Card>
                  <CardHeader>
                    <CardTitle>Horário de Funcionamento</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Segunda - Sexta</span>
                        <span>8:00 - 18:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sábado</span>
                        <span>9:00 - 15:00</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Domingo</span>
                        <span>Fechado</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Envie uma Mensagem</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Assunto</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea
                        id="message"
                        rows={4}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        required
                      />
                    </div>
                    
                    <Button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600">
                      Enviar Mensagem
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}