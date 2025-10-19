"use client"

import { useState } from 'react'
import { ArrowLeft, Heart, Share2, MapPin, Bed, Bath, Square, Car, Wifi, Dumbbell, Shield, Calendar, Phone, Mail, MessageCircle, Camera, Play, Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface PropertyDetailsProps {
  property: any
  onBack: () => void
  onAddToCart: (id: number) => void
  onToggleFavorite: (id: number) => void
  isFavorite: boolean
}

export default function PropertyDetails({ property, onBack, onAddToCart, onToggleFavorite, isFavorite }: PropertyDetailsProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showContactForm, setShowContactForm] = useState(false)
  const [showVirtualTour, setShowVirtualTour] = useState(false)

  const images = [
    property.imagem,
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448075-bb485b067938?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560449752-2dd9b55c3d0e?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?w=800&h=600&fit=crop"
  ]

  const amenities = [
    { icon: Car, label: "2 Vagas de Garagem" },
    { icon: Wifi, label: "Internet Fibra Ótica" },
    { icon: Dumbbell, label: "Academia" },
    { icon: Shield, label: "Portaria 24h" },
    { icon: Calendar, label: "Salão de Festas" }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onToggleFavorite(property.id)}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card className="overflow-hidden">
              <div className="relative">
                <img
                  src={images[currentImageIndex]}
                  alt={property.titulo}
                  className="w-full h-96 object-cover"
                />
                
                {/* Navigation Arrows */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={prevImage}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                  onClick={nextImage}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* Virtual Tour Button */}
                <Button
                  className="absolute bottom-4 left-4 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setShowVirtualTour(true)}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Tour Virtual
                </Button>
              </div>

              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`Imagem ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Property Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">
                      {property.tipo}
                    </Badge>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {property.titulo}
                    </h1>
                    <p className="text-gray-600 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.endereco}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-blue-600">
                      {formatPrice(property.preco)}
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatPrice(property.preco / property.area)}/m²
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 py-6 border-t border-b">
                  <div className="text-center">
                    <Bed className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-2xl font-bold">{property.quartos}</p>
                    <p className="text-sm text-gray-600">Quartos</p>
                  </div>
                  <div className="text-center">
                    <Bath className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-2xl font-bold">{property.banheiros}</p>
                    <p className="text-sm text-gray-600">Banheiros</p>
                  </div>
                  <div className="text-center">
                    <Square className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                    <p className="text-2xl font-bold">{property.area}</p>
                    <p className="text-sm text-gray-600">m²</p>
                  </div>
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-4">Descrição</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Este magnífico {property.tipo.toLowerCase()} oferece uma experiência de vida única, 
                    combinando elegância, conforto e localização privilegiada. Com acabamentos de alto padrão 
                    e uma arquitetura moderna, este imóvel é perfeito para quem busca qualidade de vida e 
                    sofisticação. A propriedade conta com amplos ambientes, iluminação natural abundante 
                    e uma vista deslumbrante que proporciona momentos únicos de contemplação.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>Comodidades</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => {
                    const Icon = amenity.icon
                    return (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">{amenity.label}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Location Map */}
            <Card>
              <CardHeader>
                <CardTitle>Localização</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-600">Mapa interativo em breve</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="font-medium">Supermercado</p>
                    <p className="text-gray-600">200m</p>
                  </div>
                  <div>
                    <p className="font-medium">Escola</p>
                    <p className="text-gray-600">500m</p>
                  </div>
                  <div>
                    <p className="font-medium">Hospital</p>
                    <p className="text-gray-600">1.2km</p>
                  </div>
                  <div>
                    <p className="font-medium">Metrô</p>
                    <p className="text-gray-600">800m</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Interessado?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">JS</span>
                  </div>
                  <div>
                    <p className="font-semibold">João Silva</p>
                    <p className="text-sm text-gray-600">Corretor Especialista</p>
                    <div className="flex items-center mt-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span className="text-xs text-gray-600 ml-1">5.0</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
                    onClick={() => onAddToCart(property.id)}
                  >
                    Demonstrar Interesse
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Ligar
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      WhatsApp
                    </Button>
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setShowContactForm(!showContactForm)}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                </div>

                {showContactForm && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <Input id="email" type="email" placeholder="seu@email.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Gostaria de mais informações sobre este imóvel..."
                        rows={3}
                      />
                    </div>
                    <Button className="w-full">
                      Enviar Mensagem
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Financing Calculator */}
            <Card>
              <CardHeader>
                <CardTitle>Simulador de Financiamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Valor de Entrada</Label>
                  <Input type="number" placeholder="170000" />
                </div>
                <div className="space-y-2">
                  <Label>Prazo (anos)</Label>
                  <Input type="number" placeholder="30" />
                </div>
                <Button variant="outline" className="w-full">
                  Calcular Parcelas
                </Button>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-800">Parcela estimada:</p>
                  <p className="text-2xl font-bold text-green-600">R$ 3.240/mês</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {showVirtualTour && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Tour Virtual 360°</h3>
              <Button
                variant="ghost"
                onClick={() => setShowVirtualTour(false)}
              >
                ×
              </Button>
            </div>
            <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <p className="text-gray-600">Tour virtual em desenvolvimento</p>
                <p className="text-sm text-gray-500 mt-2">
                  Em breve você poderá explorar este imóvel em 360°
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}