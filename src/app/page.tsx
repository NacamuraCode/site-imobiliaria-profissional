"use client"

import { useState } from 'react'
import { Search, MapPin, Bed, Bath, Square, Heart, ShoppingCart, User, Menu, X, Star, Filter, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function ImobiliariaHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [cartItems, setCartItems] = useState(0)
  const [favorites, setFavorites] = useState<number[]>([])

  const imoveis = [
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
      destaque: true
    },
    {
      id: 2,
      titulo: "Casa Moderna com Piscina",
      preco: 1200000,
      endereco: "Av. dos Jardins, 456 - Bairro Nobre",
      quartos: 4,
      banheiros: 3,
      area: 250,
      imagem: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      tipo: "Casa",
      destaque: false
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
      destaque: true
    },
    {
      id: 4,
      titulo: "Apartamento Compacto e Moderno",
      preco: 450000,
      endereco: "Rua da Juventude, 321 - Vila Nova",
      quartos: 2,
      banheiros: 1,
      area: 65,
      imagem: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      tipo: "Apartamento",
      destaque: false
    },
    {
      id: 5,
      titulo: "Casa de Campo Aconchegante",
      preco: 680000,
      endereco: "Estrada do Campo, 654 - Zona Rural",
      quartos: 3,
      banheiros: 2,
      area: 180,
      imagem: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      tipo: "Casa",
      destaque: false
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
      destaque: true
    }
  ]

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const addToCart = (id: number) => {
    setCartItems(prev => prev + 1)
    // Animação do botão
    const button = document.getElementById(`cart-btn-${id}`)
    if (button) {
      button.classList.add('animate-pulse')
      setTimeout(() => button.classList.remove('animate-pulse'), 600)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                ImóvelPro
              </span>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">Início</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">Imóveis</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">Sobre</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 font-medium">Contato</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="relative hover:bg-blue-50 transition-all duration-300"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full animate-bounce">
                    {cartItems}
                  </Badge>
                )}
              </Button>
              
              <Button 
                variant="outline" 
                size="sm"
                className="hidden sm:flex hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
              >
                <User className="w-4 h-4 mr-2" />
                Entrar
              </Button>

              <Button 
                size="sm"
                className="hidden sm:flex bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
              >
                Cadastrar
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-in slide-in-from-top-2 duration-300">
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2">Início</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2">Imóveis</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2">Sobre</a>
                <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2">Contato</a>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="outline" size="sm">Entrar</Button>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-500">Cadastrar</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000">
            Encontre o
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent"> Imóvel Perfeito</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-200">
            Descubra as melhores oportunidades imobiliárias com nossa plataforma completa. 
            Compre, venda ou alugue com total segurança e praticidade.
          </p>

          {/* Search Bar */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl p-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-400">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Buscar por localização, tipo de imóvel..."
                  className="pl-10 h-12 border-gray-200 focus:border-blue-500 transition-colors duration-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 px-8"
              >
                <Search className="w-5 h-5 mr-2" />
                Buscar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" className="hover:bg-blue-50 transition-colors duration-300">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 transition-colors duration-300">
                Apartamentos
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 transition-colors duration-300">
                Casas
              </Button>
              <Button variant="outline" size="sm" className="hover:bg-blue-50 transition-colors duration-300">
                Coberturas
              </Button>
            </div>
            <div className="text-sm text-gray-600">
              {imoveis.length} imóveis encontrados
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Imóveis em Destaque
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Selecionamos os melhores imóveis para você. Cada propriedade é cuidadosamente avaliada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {imoveis.map((imovel, index) => (
              <Card 
                key={imovel.id} 
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white border-0 shadow-lg overflow-hidden animate-in fade-in-0 slide-in-from-bottom-4"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={imovel.imagem}
                    alt={imovel.titulo}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {imovel.destaque && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-3 right-3 bg-white/80 hover:bg-white transition-all duration-300"
                    onClick={() => toggleFavorite(imovel.id)}
                  >
                    <Heart 
                      className={`w-4 h-4 transition-colors duration-300 ${
                        favorites.includes(imovel.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>
                </div>

                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {imovel.tipo}
                    </Badge>
                    <span className="text-2xl font-bold text-blue-600">
                      {formatPrice(imovel.preco)}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {imovel.titulo}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 flex items-center">
                    <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                    {imovel.endereco}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Bed className="w-4 h-4 mr-1" />
                        {imovel.quartos}
                      </span>
                      <span className="flex items-center">
                        <Bath className="w-4 h-4 mr-1" />
                        {imovel.banheiros}
                      </span>
                      <span className="flex items-center">
                        <Square className="w-4 h-4 mr-1" />
                        {imovel.area}m²
                      </span>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="p-6 pt-0 flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                  >
                    Ver Detalhes
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                  <Button 
                    id={`cart-btn-${imovel.id}`}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
                    onClick={() => addToCart(imovel.id)}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Interessado
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-cyan-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Pronto para encontrar seu novo lar?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de pessoas que já encontraram o imóvel dos seus sonhos conosco.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 px-8"
            >
              Explorar Imóveis
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 px-8"
            >
              Anunciar Imóvel
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">ImóvelPro</span>
              </div>
              <p className="text-gray-400 text-sm">
                Sua plataforma completa para compra, venda e aluguel de imóveis.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Navegação</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Início</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Imóveis</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Sobre</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Contato</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Serviços</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Comprar</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Vender</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Alugar</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Avaliação</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Contato</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>(11) 9999-9999</li>
                <li>contato@imovelpro.com</li>
                <li>São Paulo, SP</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 ImóvelPro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}