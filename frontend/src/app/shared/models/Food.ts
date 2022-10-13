export class Food {
    // ! means required
    id!: string
    name!: string
    price!: number
    // ? means optional
    tags?: string[]
    favorite!: boolean
    stars!: number
    imageUrl!: string
    origins!: string[]
    cookTime!: string
}

// this is our Food model