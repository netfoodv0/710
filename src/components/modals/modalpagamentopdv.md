

Quero que você gere apenas os dados (sem código) para um modal de formas de pagamento de um sistema PDV. O modal deve permitir:

1. Pagar usando duas ou mais formas de pagamento (ex.: metade em dinheiro, metade em cartão).
2. Dividir o pagamento entre várias pessoas, podendo definir valores iguais ou personalizados para cada parte.
3. Se a forma de pagamento for dinheiro, mostrar campo para valor recebido e calcular automaticamente o troco.

Estrutura do modal:
- Título.
- Valor total da compra.
- Seção para definir número de divisões (pessoas ou partes).
- Para cada parte:
  - Campo de valor (editável).
  - Campo de seleção de forma de pagamento (dinheiro, cartão, Pix, vale, etc.).
  - Se for dinheiro: campo de valor recebido e exibição de troco.
- Resumo dinâmico com total pago e valor restante.
- Botões de ação: cobrar cada parte, concluir (somente quando total pago ≥ total), cancelar.
- Validações: soma de valores não pode exceder total, dinheiro recebido não pode ser menor que o valor da parte.

Retorne os dados organizados em formato JSON para que eu possa usar no front-end.


Proposta de layout de modal — apenas dados e organização visual

Aqui está um esqueleto simplificado do que deveria aparecer no modal (sem estilização, apenas estrutura de campos e labels):

Modal “Formas de Pagamento”

Título: “Selecionar formas de pagamento”

Total a pagar: R$ 315,00 (exemplo de valor total)

1. Dividir pagamento

Label: “Dividir entre:”

Selector (combo ou stepper): quantidade de pessoas (ou partes) → [ ± ] 2 pessoas (padrão “1” — se maior que 1, dividir)

Botão: “Aplicar divisão”

2. Lista de partes/pagamentos

Para cada parte (gerado dinamicamente conforme número acima):

Parte 1

Campo: “Valor”: R$ 157,50 (se divisão igual) — editável

Se valor diferente, atualiza cálculo do restante.

Dropdown: “Forma de pagamento”: [Dinheiro / Cartão / Pix / Vouchers / Fidelidade / Outro]

Se forma = Dinheiro → abre campo “Dinheiro recebido”: R$ ___, e label “Troco”: R$ ___ (calculado em real-time)

(Repetir para Parte 2, Parte 3, etc.)

3. Resumo dinâmico

Total pago até agora: R$ ___

Restante: R$ ___ (se houver)

4. Ações

Botão “Cobrar parte 1”, “Cobrar parte 2” ... conforme partes existentes

Após pagamento de uma parte, marcar como “Pago” e avançar à próxima

Botão “Concluir” (habilitado somente quando total pago ≥ total)

Botão “Cancelar”

5. Mensagens e validações

Alerta se soma dos valores excede o total

Se "dinheiro recebido" < valor da parte: erro ou desativar "Concluir"

Se “dinheiro recebido” > valor da parte: exibe “Troco: R$ ___”

Exemplo textual com dados fictícios (para visualizar)
Título: Selecionar formas de pagamento
Total: R$ 315,00

1. Dividir entre: [±] 2 pessoas → Aplicar divisão

----------------------------------------
Parte 1:
 Valor: R$ 157,50
 Forma de pagamento: [Dinheiro ▼]
 Dinheiro recebido: R$ ___
 Troco: R$ ___

Parte 2:
 Valor: R$ 157,50
 Forma de pagamento: [Cartão ▼]

Resumo:
 Total pago: R$ 0,00
 Restante: R$ 315,00

[Ação] Cobrar Parte 1 → Após pagamento em dinheiro:
 Total pago: R$ 160,00
 Troco: R$ 2,50
 Restante: R$ 157,50
 Parte 1: Pago

[Ação] Cobrar Parte 2 → Abre tela/cartão etc.

[ Botão Concluir] (habilitado quando total pago ≥ total)

Resumo dos dados que devem aparecer no modal
Elemento	Detalhes
Título	Selecionar formas de pagamento
Total da venda	Valor total a ser pago (ex: R$ 315,00)
Divisão de pagamento	Número de partes (pessoas ou métodos) com possibilidade de igual ou personalizada
Campos para cada parte	Valor (editável), forma de pagamento (dropdown), dinheiro recebido e troco (se aplicável)
Resumo dinâmico	Total pago até o momento, valor restante
Botões de ação	Cobrar cada parte, Concluir (habilitado quando completo), Cancelar
Validações e alertas	Soma dos valores diferentes do total, dinheiro insuficiente, cálculo de troco