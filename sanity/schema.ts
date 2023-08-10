import { type SchemaTypeDefinition } from 'sanity'
import product_schema from './product_schema'
import product_category from './product_category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [product_schema , product_category],
}
