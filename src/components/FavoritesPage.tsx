"use client"

import { useState } from 'react'
import { Heart, MapPin, Bed, Bath, Square, Trash2, Share2, Eye, Filter, SortAsc, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

interface FavoritesPageProps {
  favorites: number[]
  onToggleFavorite: (id: number) => void
  onViewProperty: (property: any) => void
  onAddToCart: (id: number) => void
  onBack?: () => void
}

export default function FavoritesPage({ favorites, onToggleFavorite, onViewProperty, onAddToCart, onBack }: FavoritesPageProps) {
  const [sortBy, setSortBy] = useState('recent')
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock data - em um app real, isso viria de uma API
  const allProperties = [
    {
      id: 1,
      titulo: "Apartamento Luxuoso no Centro",
      preco: 850000,
      endereco: "Rua das Flores, 123 - Centro",
      quartos: 3,
      banheiros: 2,
      area: 120,
      imagem: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
      tipo: "Apartamento",
      addedToFavorites: "2024-01-15"
    },
    {
      id: 3,
      titulo: "Cobertura com Vista Panorâmica",
      preco: 2500000,
      endereco: "Rua do Mirante, 789 - Alto Padrão",
      quartos: 5,
      banheiros: 4,
      area: 350,
      imagem: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      tipo: "Cobertura",
      addedToFavorites: "2024-01-10"
    },
    {
      id: 6,
      titulo: "Loft Industrial no Centro",
      preco: 720000,
      endereco: "Rua Industrial, 987 - Centro Histórico",
      quartos: 1,
      banheiros: 1,
      area: 95,
      imagem: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      tipo: "Loft",
      addedToFavorites: "2024-01-08"
    }
  ]

  const favoriteProperties = allProperties.filter(property => favorites.includes(property.id))

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const filteredAndSortedProperties = favoriteProperties
    .filter(property => {
      const matchesSearch = property.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           property.endereco.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesType = filterType === 'all' || property.tipo.toLowerCase() === filterType.toLowerCase()
      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.preco - b.preco
        case 'price-high':
          return b.preco - a.preco
        case 'area':
          return b.area - a.area
        case 'recent':
        default:
          return new Date(b.addedToFavorites).getTime() - new Date(a.addedToFavorites).getTime()
      }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button
              variant="ghost"
              onClick={onBack}
              className="flex items-center space-x-2 mr-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </Button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Meus Favoritos
            </h1>
            <p className="text-gray-600">
              {favoriteProperties.length} {favoriteProperties.length === 1 ? 'imóvel salvo' : 'imóveis salvos'}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {favoriteProperties.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nenhum favorito ainda
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Comece a explorar nossos imóveis e salve seus favoritos clicando no ícone de coração.
            </p>
            <Button 
              className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600"
              onClick={onBack}
            >
              Explorar Imóveis
            </Button>
          </div>
        ) : (
          <>
            {/* Filters and Search */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Input
                      placeholder="Buscar nos favoritos..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-4"
                    />
                  </div>
                  
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os tipos</SelectItem>
                      <SelectItem value="apartamento">Apartamentos</SelectItem>
                      <SelectItem value="casa">Casas</SelectItem>
                      <SelectItem value="cobertura">Coberturas</SelectItem>
                      <SelectItem value="loft">Lofts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SortAsc className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recent">Mais recentes</SelectItem>
                    <SelectItem value="price-low">Menor preço</SelectItem>
                    <SelectItem value="price-high">Maior preço</SelectItem>
                    <SelectItem value="area">Maior área</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Properties Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProperties.map((property, index) => (
                <Card 
                  key={property.id} 
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white border-0 shadow-lg overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={property.imagem}
                      alt={property.titulo}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Favorite Badge */}
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white">
                      <Heart className="w-3 h-3 mr-1 fill-current" />
                      Favorito
                    </Badge>

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/80 hover:bg-white transition-all duration-300"
                        onClick={() => onToggleFavorite(property.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="bg-white/80 hover:bg-white transition-all duration-300"
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {property.tipo}
                      </Badge>
                      <span className="text-2xl font-bold text-blue-600">
                        {formatPrice(property.preco)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {property.titulo}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 flex items-center">
                      <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                      {property.endereco}
                    </p>

                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Bed className="w-4 h-4 mr-1" />
                          {property.quartos}
                        </span>
                        <span className="flex items-center">
                          <Bath className="w-4 h-4 mr-1" />
                          {property.banheiros}
                        </span>
                        <span className="flex items-center">
                          <Square className="w-4 h-4 mr-1" />
                          {property.area}m²
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-gray-500 mb-4">
                      Adicionado aos favoritos em {new Date(property.addedToFavorites).toLocaleDateString('pt-BR')}
                    </div>
                  </CardContent>

                  <CardFooter className="p-6 pt-0 flex gap-3">
                    <Button 
                      variant="outline" 
                      className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                      onClick={() => onViewProperty(property)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Detalhes
                    </Button>
                    <Button 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
                      onClick={() => onAddToCart(property.id)}
                    >
                      Interessado
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {filteredAndSortedProperties.length === 0 && searchTerm && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Filter className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Nenhum resultado encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar os filtros ou termo de busca
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}