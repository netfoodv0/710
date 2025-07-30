import { Produto } from '../types/produtos';
import { hamburgueresMock } from './produtos/hamburgueres';
import { pizzasMock } from './produtos/pizzas';
import { bebidasMock } from './produtos/bebidas';
import { sobremesasMock } from './produtos/sobremesas';
import { templatesProduto } from './produtos/templates';

// Combinar todos os produtos em um array único
export const produtosMock: Produto[] = [
  ...hamburgueresMock,
  ...pizzasMock,
  ...bebidasMock,
  ...sobremesasMock
];

// Exportar templates
export { templatesProduto }; 