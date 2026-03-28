export interface AuthResponse {
    accessToken: string
}

export interface Product {
    id: number
    title: string
    price: number
    rating: number
    stock: number
    thumbnail: string
    category: string
    description: string
    images: string[]
    warrantyInformation: string
    shippingInformation: string
}

export interface ProductsResponse {
    products: Product[]
    total: number
    skip: number
    limit: number
}

export interface Category {
    slug: string
    name: string
    url: string
}