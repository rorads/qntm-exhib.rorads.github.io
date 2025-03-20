// Defining types for the quantum symbols project

// For the more detailed quantum symbols implementation
export interface QuantumSymbol {
  id: string;
  name: string;
  symbol: string;
  description: string;
  position: {
    x: number;
    y: number;
  };
  velocity: {
    x: number;
    y: number;
  };
  size: number;
  color: string;
}

export interface ModalOptions {
  title: string;
  content: string;
}

// For the simplified symbol interface
export interface SymbolData {
  id: string;
  emoji: string;
  content: string;
}

export interface ModalContent {
  title: string;
  body: string;
}