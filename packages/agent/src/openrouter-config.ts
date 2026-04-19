export interface OpenRouterConfig {
  apiKey: string
  models: {
    extraction: string      // fragmenter + entityExtractor
    classification: string  // wikiClassifier + fragScorer
    wikiGeneration: string  // wiki content generation
    embedding: string       // vector embeddings
  }
}

export class NoOpenRouterKeyError extends Error {
  constructor() {
    super('no_openrouter_key')
    this.name = 'NoOpenRouterKeyError'
  }
}
