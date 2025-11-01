"use client";

import { cn } from "@/lib/utils";
import { AnimatedList } from "@/components/magicui/animated-list";

const notifications = [
  // PEDIDOS E STATUS (Dashboard, Pedidos, HistoricoPedidos)
  { icon: "💰", title: "Novo Pedido Recebido", description: "Pedido #456 via app mobile! Cliente: João Silva - R$ 45,90" },
  { icon: "📦", title: "Pedido Em Preparo", description: "Pedido #789 - Pizza Margherita está sendo preparada na cozinha" },
  { icon: "🚚", title: "Pedido Em Entrega", description: "Pedido #234 saiu com motoboy Roberto - ETA: 25 min" },
  { icon: "✅", title: "Pedido Entregue", description: "Pedido #567 entregue com sucesso! Tempo total: 32 min" },
  { icon: "❌", title: "Pedido Cancelado", description: "Pedido #890 cancelado pelo cliente - Motivo: Mudança de planos" },
  { icon: "⏰", title: "Pedido Atrasado", description: "Pedido #123 está atrasado 15 min. Verificar status na cozinha" },
  { icon: "🔄", title: "Pedido Retornado", description: "Pedido #345 retornou - Cliente não estava em casa" },
  { icon: "📱", title: "Pedido via App", description: "Novo pedido #567 via aplicativo mobile - Cliente VIP" },
  { icon: "💻", title: "Pedido via Site", description: "Pedido #890 via site institucional - Primeira compra" },
  { icon: "📋", title: "Lote de Pedidos", description: "5 pedidos simultâneos recebidos! Pico de demanda detectado" },
  { icon: "⏳", title: "Pedido em Espera", description: "Pedido #234 aguardando aprovação - Valor: R$ 89,90" },
  { icon: "⏳", title: "Pedidos Pendentes", description: "8 pedidos aguardando aprovação - Total: R$ 456,70" },
  { icon: "🚫", title: "Pedido Fora da Área", description: "Cliente tentou pedir mas está fora da área de entrega (8km)" },
  { icon: "🚫", title: "Área de Entrega", description: "3 tentativas de pedido fora da área hoje - Zona: Jardins" },
  { icon: "📊", title: "Ticket Médio", description: "Ticket médio do dia: R$ 67,50 (+12% vs ontem) - Excelente!" },
  { icon: "📊", title: "Ticket Médio Semanal", description: "Ticket médio da semana: R$ 58,90 - Meta: R$ 55,00" },
  
  // PAGAMENTOS E FINANCEIRO (Dashboard, Relatorios)
  { icon: "💳", title: "Pagamento Confirmado", description: "PIX do pedido #321 confirmado - R$ 67,50" },
  { icon: "💳", title: "Pagamento Pendente", description: "Cartão do pedido #654 pendente - Aguardando confirmação" },
  { icon: "💳", title: "Pagamento Recusado", description: "Cartão do pedido #987 recusado - Cliente deve verificar limite" },
  { icon: "💰", title: "Receita Diária", description: "Receita de hoje: R$ 2.450,00 (+15% vs ontem) - Meta atingida!" },
  { icon: "📊", title: "Meta Semanal", description: "Meta de vendas da semana atingida com 2 dias de antecedência!" },
  { icon: "💳", title: "Falha no PIX", description: "PIX do pedido #432 falhou - Cliente deve tentar novamente" },
  { icon: "💳", title: "Reembolso Processado", description: "Reembolso de R$ 45,90 processado para pedido #123" },
  { icon: "💰", title: "Venda Diária", description: "Venda total do dia: R$ 3.890,50 - 47 pedidos realizados" },
  { icon: "💰", title: "Venda Semanal", description: "Venda da semana: R$ 18.450,00 - Crescimento de 23%" },
  { icon: "💰", title: "Venda Mensal", description: "Venda do mês: R$ 67.890,00 - Meta: R$ 65.000,00" },
  { icon: "📈", title: "Comparativo Mensal", description: "Janeiro vs Dezembro: +18% crescimento - R$ 67.890 vs R$ 57.450" },
  { icon: "📈", title: "Comparativo Anual", description: "2024 vs 2023: +34% crescimento - Excelente performance!" },
  
  // AVALIAÇÕES E FEEDBACK (Dashboard, Relatorios/Clientes)
  { icon: "⭐", title: "Avaliação 5 Estrelas", description: "João Silva: 'Melhor pizza da cidade! Entrega super rápida'" },
  { icon: "⭐", title: "Avaliação 4 Estrelas", description: "Maria Santos: 'Comida excelente, só demorou um pouco'" },
  { icon: "⭐", title: "Avaliação 3 Estrelas", description: "Pedro Oliveira: 'Sabor bom, mas pedido veio incompleto'" },
  { icon: "💬", title: "Comentário Positivo", description: "Ana Costa: 'Atendimento nota 10! Motoboy muito educado'" },
  { icon: "📝", title: "Sugestão Recebida", description: "Cliente sugeriu: 'Adicionar mais opções vegetarianas'" },
  { icon: "😊", title: "Cliente Satisfeito", description: "Lucia Mendes: 'Já é minha 22ª compra! Sempre perfeito'" },
  { icon: "📊", title: "Avaliação Média", description: "Avaliação média do dia: 4.7/5 - Excelente!" },
  { icon: "📊", title: "Avaliação Semanal", description: "Avaliação média da semana: 4.6/5 - 156 avaliações" },
  
  // CARDÁPIO E PRODUTOS (Cardapio, CadastroProduto)
  { icon: "⚠️", title: "Item Esgotado", description: "Cheesecake esgotado! Remover do cardápio temporariamente" },
  { icon: "⚠️", title: "Produto Acabando", description: "Pizza Margherita: apenas 3 unidades restantes" },
  { icon: "✅", title: "Cardápio Atualizado", description: "Cardápio atualizado com 5 novos produtos adicionados" },
  { icon: "🆕", title: "Novo Produto", description: "Smoothie de Frutas adicionado - Preço: R$ 18,90" },
  { icon: "🔥", title: "Produto Popular", description: "Hambúrguer Artesanal é o mais vendido hoje (23 unidades)" },
  { icon: "💰", title: "Promoção Ativa", description: "Combo Família com 15% de desconto - 8 vendas hoje" },
  { icon: "📸", title: "Foto Atualizada", description: "Foto da Pizza 4 Queijos foi atualizada no cardápio" },
  { icon: "🏷️", title: "Preço Alterado", description: "X-Burger: R$ 18,90 → R$ 19,90 (aumento de 5%)" },
  { icon: "📋", title: "Categoria Nova", description: "Nova categoria 'Sobremesas Especiais' criada" },
  { icon: "🔍", title: "Produto Inativo", description: "Produto 'Lasanha' marcado como inativo - baixa demanda" },
  { icon: "📊", title: "Venda de Produtos", description: "Top 3 produtos hoje: Hambúrguer (23), Pizza (18), Sushi (15)" },
  { icon: "📊", title: "Venda de Produtos Semanal", description: "Produto mais vendido da semana: Pizza Margherita (89 unidades)" },
  { icon: "📊", title: "Venda de Produtos Mensal", description: "Produto mais vendido do mês: Hambúrguer Artesanal (234 unidades)" },
  { icon: "⚠️", title: "Produtos Acabando", description: "5 produtos com estoque baixo - Verificar fornecedores" },
  { icon: "📦", title: "Estoque Crítico", description: "3 produtos em estoque crítico - Pedidos urgentes necessários" },
  
  // ESTOQUE E FORNECEDORES (Estoque)
  { icon: "📦", title: "Estoque Baixo", description: "Queijo Mussarela: apenas 2kg restantes - Pedir fornecedor" },
  { icon: "🚚", title: "Entrega Fornecedor", description: "Entrega de ingredientes chegou - Verificar qualidade" },
  { icon: "❌", title: "Produto Vencido", description: "Molho de Tomate venceu - Remover do estoque imediatamente" },
  { icon: "✅", title: "Inventário Realizado", description: "Inventário de estoque concluído - 98% de precisão" },
  { icon: "🔍", title: "Controle de Qualidade", description: "Verificação de qualidade programada para amanhã 8h" },
  { icon: "📦", title: "Estoque Crítico", description: "Farinha de trigo: CRÍTICO! Pedir urgente ao fornecedor" },
  { icon: "🚚", title: "Fornecedor Atrasado", description: "Fornecedor 'Frescos Ltda' atrasou entrega de verduras" },
  { icon: "📦", title: "Estoque Baixo Crítico", description: "8 ingredientes com estoque baixo - Pedidos urgentes" },
  { icon: "📦", title: "Estoque Médio", description: "15 ingredientes com estoque médio - Monitorar esta semana" },
  { icon: "📦", title: "Estoque Alto", description: "23 ingredientes com estoque alto - Otimizar pedidos" },
  
  // MENSAGENS E COMUNICAÇÃO (Atendimento/WhatsApp)
  { icon: "💬", title: "Nova Mensagem WhatsApp", description: "Cliente Felipe V. enviou mensagem sobre entrega" },
  { icon: "📱", title: "WhatsApp Ativo", description: "15 mensagens recebidas via WhatsApp nas últimas 2h" },
  { icon: "📧", title: "Email Recebido", description: "Novo email de suporte ao cliente - Responder em 24h" },
  { icon: "📞", title: "Ligação Perdida", description: "Cliente tentou ligar às 14:30 - Retornar contato" },
  { icon: "📱", title: "Push Notification", description: "Notificação enviada para 150 clientes sobre promoção" },
  { icon: "💬", title: "Chat Ativo", description: "3 conversas ativas no WhatsApp - 2 aguardando resposta" },
  { icon: "📱", title: "Resposta Automática", description: "Bot respondeu 45 mensagens automaticamente hoje" },
  { icon: "📱", title: "Tickets de Suporte", description: "5 tickets de suporte abertos - 3 aguardando resposta" },
  { icon: "📱", title: "Ticket Resolvido", description: "Ticket #123 foi resolvido - Cliente satisfeito" },
  { icon: "📱", title: "Ticket em Espera", description: "Ticket #456 aguardando resposta há 2 horas" },
  
  // RELATÓRIOS E ANALYTICS (Relatorios, Dashboard)
  { icon: "📊", title: "Relatório Diário", description: "Relatório de vendas do dia disponível - Download pronto" },
  { icon: "📈", title: "Vendas Crescentes", description: "Vendas aumentaram 15% esta semana vs semana anterior" },
  { icon: "👥", title: "Novos Clientes", description: "5 novos clientes cadastrados hoje - Total: 1.247" },
  { icon: "🔄", title: "Cliente Recorrente", description: "Ana M. fez seu 10º pedido! Promover para VIP" },
  { icon: "📊", title: "Relatório Mensal", description: "Relatório de performance do mês foi gerado automaticamente" },
  { icon: "📈", title: "Crescimento Trimestral", description: "Crescimento de 23% no último trimestre - Meta: 20%" },
  { icon: "🎯", title: "Meta Atingida", description: "Meta de clientes novos superada em 20% - Parabéns equipe!" },
  { icon: "📊", title: "Relatório Clientes", description: "Relatório de clientes exportado - 1.247 registros" },
  { icon: "📊", title: "Relatório Cupons", description: "Relatório de cupons disponível - 45 cupons ativos" },
  { icon: "📊", title: "Relatório Produtos", description: "Relatório de produtos exportado - 89 produtos analisados" },
  { icon: "📊", title: "Relatório Financeiro", description: "Relatório financeiro mensal disponível - Balanço completo" },
  { icon: "📊", title: "Relatório Operacional", description: "Relatório operacional semanal - Métricas de performance" },
  { icon: "📊", title: "Relatório de Entregas", description: "Relatório de entregas - Tempo médio: 28 min" },
  { icon: "📊", title: "Relatório de Qualidade", description: "Relatório de qualidade - 98% de satisfação" },
  
  // PROMOÇÕES E MARKETING (Relatorios/Cupons, Fidelidade)
  { icon: "💡", title: "Sugestão de Promoção", description: "Que tal criar promoção 'Happy Hour' para quartas-feiras?" },
  { icon: "🎉", title: "Promoção Especial", description: "Promoção de aniversário ativa até domingo - 30% desconto" },
  { icon: "🎯", title: "Campanha Ativa", description: "Campanha 'Segunda sem carne' funcionando - 25% mais vendas" },
  { icon: "📢", title: "Anúncio Publicado", description: "Anúncio no Google Ads publicado - Orçamento: R$ 500/mês" },
  { icon: "🎁", title: "Cupom Ativo", description: "Cupom 'PRIMEIRACOMPRA' usado por 12 clientes hoje" },
  { icon: "📱", title: "Redes Sociais", description: "Post no Instagram teve 150 curtidas em 1 hora" },
  { icon: "🎯", title: "Cupom Expirado", description: "Cupom 'DESCONTO20' expirou - 45 usos registrados" },
  { icon: "💰", title: "Promoção Lucrativa", description: "Promoção 'Combo Duplo' gerou R$ 890 em vendas extras" },
  { icon: "🎁", title: "Cupom Criado", description: "Novo cupom 'FREEGRATIS' criado - Válido por 7 dias" },
  { icon: "🎁", title: "Cupom Editado", description: "Cupom 'DESCONTO15' foi editado - Desconto aumentado para 20%" },
  { icon: "🎁", title: "Cupom Deletado", description: "Cupom 'TESTE' foi removido - Baixo uso detectado" },
  { icon: "📊", title: "Relatório de Cupons", description: "Relatório de cupons: 45 ativos, 12 expirados, 8 criados hoje" },
  { icon: "📊", title: "Efetividade de Cupons", description: "Cupom mais efetivo: 'PRIMEIRACOMPRA' - 89% de conversão" },
  
  // SISTEMA E MANUTENÇÃO (Configuracoes)
  { icon: "🔧", title: "Manutenção Programada", description: "Sistema será atualizado às 2h da manhã - 30 min de parada" },
  { icon: "📱", title: "App Atualizado", description: "Nova versão do app disponível na loja - Atualizar recomendado" },
  { icon: "🔒", title: "Segurança Reforçada", description: "Sistema de segurança foi atualizado - Login 2FA ativo" },
  { icon: "💾", title: "Backup Realizado", description: "Backup automático concluído - 2.3GB de dados salvos" },
  { icon: "⚡", title: "Performance Melhorada", description: "Velocidade do sistema aumentou em 30% após otimização" },
  { icon: "🔍", title: "Bug Corrigido", description: "Problema no sistema de pagamentos foi resolvido" },
  { icon: "📱", title: "App Instalado", description: "App do motoboy instalado em 3 novos dispositivos" },
  { icon: "🔧", title: "Configuração Alterada", description: "Configurações de entrega foram atualizadas" },
  { icon: "🔧", title: "Sistema Otimizado", description: "Sistema otimizado para melhor performance - 25% mais rápido" },
  
  // CLIMA E EVENTOS (Mapa, Dashboard)
  { icon: "🌧️", title: "Chuva Prevista", description: "Chuva prevista pode afetar entregas - Avisar motoboys" },
  { icon: "🎭", title: "Evento na Cidade", description: "Festival de gastronomia pode aumentar pedidos em 40%" },
  { icon: "🏈", title: "Jogo Importante", description: "Final do campeonato pode aumentar pedidos - Preparar equipe" },
  { icon: "🎄", title: "Fim de Ano", description: "Período de festas pode aumentar vendas - Estoque extra" },
  { icon: "🎃", title: "Halloween", description: "Promoção especial de Halloween ativa - Menu temático" },
  { icon: "💝", title: "Dia dos Namorados", description: "Menu especial para casais disponível - Reservas abertas" },
  { icon: "🌤️", title: "Clima Favorável", description: "Dia ensolarado - Expectativa de alta demanda" },
  { icon: "🌧️", title: "Clima Desfavorável", description: "Chuva forte - Expectativa de redução de 30% nas vendas" },
  
  // QUALIDADE E CONTROLE (Configuracoes)
  { icon: "🔍", title: "Inspeção de Qualidade", description: "Inspeção de qualidade programada para amanhã 8h" },
  { icon: "📋", title: "Checklist Pendente", description: "Checklist de limpeza da cozinha pendente - Responsável: Pedro" },
  { icon: "🧹", title: "Limpeza Realizada", description: "Limpeza da cozinha foi concluída - Certificado emitido" },
  { icon: "🌡️", title: "Temperatura OK", description: "Temperatura dos freezers está adequada - Monitoramento ativo" },
  { icon: "🧪", title: "Teste de Qualidade", description: "Teste de qualidade dos ingredientes aprovado - 100%" },
  { icon: "📋", title: "Certificação Renovada", description: "Certificação de qualidade foi renovada - Válida por 1 ano" },
  { icon: "🔍", title: "Auditoria Programada", description: "Auditoria de qualidade programada para próxima semana" },
  { icon: "🔍", title: "Controle de Qualidade", description: "Controle de qualidade realizado - 98% de aprovação" },
  
  // FIDELIDADE E RECOMPENSAS (Fidelidade)
  { icon: "🎁", title: "Cliente VIP", description: "Maria S. atingiu status VIP com 50 pedidos! Desconto 15%" },
  { icon: "🎯", title: "Ponto Resgatado", description: "Cliente resgatou 100 pontos por desconto de R$ 10" },
  { icon: "⭐", title: "Nova Categoria", description: "Cliente João P. foi promovido para categoria 'Ouro'" },
  { icon: "🎉", title: "Aniversário Cliente", description: "Ana M. faz aniversário hoje - Enviar parabéns e cupom" },
  { icon: "🔄", title: "Programa Fidelidade", description: "Programa de fidelidade ativado para 25 novos clientes" },
  { icon: "🎁", title: "Recompensa Especial", description: "Cliente VIP recebeu recompensa especial: jantar grátis" },
  { icon: "📊", title: "Pontos Acumulados", description: "Total de pontos distribuídos hoje: 2.450 - Recorde!" },
  { icon: "📊", title: "Programa Fidelidade", description: "Programa de fidelidade: 234 clientes ativos, 45 novos esta semana" },
  
  // USUÁRIOS E EQUIPE (Usuarios/Operadores, Usuarios/Motoboys)
  { icon: "👤", title: "Novo Operador", description: "Operador Carlos foi cadastrado - Cargo: Atendente" },
  { icon: "🛵", title: "Novo Motoboy", description: "Motoboy Pedro foi contratado e cadastrado no sistema" },
  { icon: "🔑", title: "Permissão Alterada", description: "Permissões do usuário Maria foram atualizadas" },
  { icon: "📱", title: "App Instalado", description: "App do motoboy instalado em 3 novos dispositivos" },
  { icon: "👥", title: "Equipe Completa", description: "Todos os motoboys estão online e disponíveis" },
  { icon: "👤", title: "Usuário Inativo", description: "Usuário Ana Costa marcado como inativo - 30 dias sem acesso" },
  { icon: "🔑", title: "Login Suspeito", description: "Tentativa de login suspeita detectada - IP bloqueado" },
  { icon: "📱", title: "App Atualizado", description: "App dos motoboys foi atualizado - Nova versão disponível" },
  { icon: "👥", title: "Organograma Atualizado", description: "Organograma da equipe foi atualizado - 3 novos cargos" },
  { icon: "👥", title: "Estrutura Organizacional", description: "Estrutura organizacional revisada - 5 departamentos ativos" },
  { icon: "👤", title: "Hierarquia Atualizada", description: "Hierarquia de usuários atualizada - Novos níveis de acesso" },
  
  // MAPA E ENTREGAS (Mapa)
  { icon: "🗺️", title: "Rota Otimizada", description: "Rota de entrega otimizada - Economia de 15% no tempo" },
  { icon: "📍", title: "Nova Zona", description: "Nova zona de entrega adicionada - Bairro Jardins" },
  { icon: "🚚", title: "Entregador Disponível", description: "Motoboy João está disponível para novas entregas" },
  { icon: "⏱️", title: "Tempo Médio", description: "Tempo médio de entrega: 28 min (meta: 30 min) - Excelente!" },
  { icon: "🎯", title: "Zona Quente", description: "Zona centro com alta demanda - Aumentar motoboys" },
  { icon: "🗺️", title: "Heatmap Ativo", description: "Heatmap de entregas ativo - Zonas de alta demanda identificadas" },
  { icon: "📍", title: "Raio de Entrega", description: "Raio de entrega configurado para 5km - 98% da cidade coberta" },
  { icon: "🚚", title: "Motoboy Offline", description: "Motoboy Diego está offline há 2 horas - Verificar status" },
  { icon: "🗺️", title: "Mapa de Calor", description: "Mapa de calor atualizado - Zona centro com maior concentração" },
  { icon: "🗺️", title: "Mapa de Calor Semanal", description: "Mapa de calor da semana - Padrões de entrega analisados" },
  { icon: "🗺️", title: "Mapa de Calor Mensal", description: "Mapa de calor do mês - Tendências de entrega identificadas" },
  { icon: "🚫", title: "Área de Entrega", description: "Cliente tentou pedir mas está fora da área (8.5km) - Zona: Morumbi" },
  { icon: "🚫", title: "Limite de Entrega", description: "5 tentativas de pedido fora da área hoje - Zonas: Morumbi, Brooklin" },
  { icon: "🗺️", title: "Expansão de Área", description: "Sugestão: expandir área de entrega para incluir Morumbi" },
  { icon: "🗺️", title: "Análise de Zonas", description: "Análise de zonas: centro (alta demanda), periferia (baixa demanda)" },
  
  // HISTÓRICO E ANÁLISE (HistoricoPedidos)
  { icon: "📊", title: "Histórico Exportado", description: "Histórico de pedidos exportado - 1.247 registros" },
  { icon: "📈", title: "Tendência de Vendas", description: "Tendência de vendas: crescimento de 12% no último mês" },
  { icon: "📊", title: "Análise de Clientes", description: "Análise de clientes concluída - 45% são recorrentes" },
  { icon: "📋", title: "Relatório Detalhado", description: "Relatório detalhado de pedidos disponível para download" },
  { icon: "📊", title: "Estatísticas Atualizadas", description: "Estatísticas de vendas atualizadas em tempo real" },
  { icon: "📈", title: "Comparativo Mensal", description: "Comparativo mensal: janeiro vs dezembro - +18% crescimento" },
  { icon: "📊", title: "Análise de Tendências", description: "Análise de tendências: crescimento consistente há 6 meses" },
  { icon: "📊", title: "Análise de Sazonalidade", description: "Análise de sazonalidade: fim de semana 40% mais vendas" },
  
  // CONFIGURAÇÕES E PERSONALIZAÇÃO (Configuracoes)
  { icon: "⚙️", title: "Configuração Salva", description: "Configurações de entrega foram salvas com sucesso" },
  { icon: "🎨", title: "Tema Alterado", description: "Tema do dashboard alterado para modo escuro" },
  { icon: "🌍", title: "Idioma Alterado", description: "Idioma do sistema alterado para português brasileiro" },
  { icon: "⏰", title: "Fuso Horário", description: "Fuso horário configurado para São Paulo (GMT-3)" },
  { icon: "💳", title: "Pagamento Configurado", description: "Novo método de pagamento configurado: PIX" },
  { icon: "📱", title: "Notificações Configuradas", description: "Configurações de notificações atualizadas" },
  { icon: "🔔", title: "Alerta Configurado", description: "Novo alerta configurado: estoque baixo" },
  { icon: "⚙️", title: "Configurações de Entrega", description: "Configurações de entrega atualizadas - Raio: 5km" },
  { icon: "⚙️", title: "Configurações de Pagamento", description: "Configurações de pagamento atualizadas - PIX ativo" },
  
  // CRESCIMENTO E DESEMPENHO
  { icon: "📈", title: "Crescimento de Clientes", description: "Crescimento de clientes: +15% esta semana, +34% este mês" },
  { icon: "📈", title: "Crescimento de Vendas", description: "Crescimento de vendas: +23% esta semana, +45% este mês" },
  { icon: "📈", title: "Crescimento de Pedidos", description: "Crescimento de pedidos: +18% esta semana, +32% este mês" },
  { icon: "📈", title: "Crescimento de Receita", description: "Crescimento de receita: +25% esta semana, +38% este mês" },
  { icon: "📊", title: "Métricas de Crescimento", description: "Métricas de crescimento: clientes +34%, vendas +45%, pedidos +32%" },
  { icon: "📊", title: "Análise de Crescimento", description: "Análise de crescimento: tendência positiva há 8 meses consecutivos" },
  { icon: "📊", title: "Projeção de Crescimento", description: "Projeção de crescimento: +40% no próximo trimestre" },
  
  // COMPARAÇÕES E ANÁLISES
  { icon: "📊", title: "Comparativo Semanal", description: "Comparativo semanal: esta semana vs semana anterior +23%" },
  { icon: "📊", title: "Comparativo Mensal", description: "Comparativo mensal: janeiro vs dezembro +18%" },
  { icon: "📊", title: "Comparativo Trimestral", description: "Comparativo trimestral: Q1 vs Q4 +34%" },
  { icon: "📊", title: "Comparativo Anual", description: "Comparativo anual: 2024 vs 2023 +45%" },
  { icon: "📊", title: "Análise Comparativa", description: "Análise comparativa: crescimento consistente em todos os períodos" },
  { icon: "📊", title: "Benchmark de Performance", description: "Benchmark de performance: acima da média do setor em 25%" },
  
  // TICKETS E SUPORTE
  { icon: "📱", title: "Ticket Aberto", description: "Novo ticket de suporte aberto - Cliente: João Silva" },
  { icon: "📱", title: "Ticket em Andamento", description: "Ticket #123 em andamento - Resposta em 2 horas" },
  { icon: "📱", title: "Ticket Resolvido", description: "Ticket #456 resolvido - Tempo de resolução: 4 horas" },
  { icon: "📱", title: "Ticket Fechado", description: "Ticket #789 fechado automaticamente - Cliente não respondeu" },
  { icon: "📱", title: "Tempo Médio de Resposta", description: "Tempo médio de resposta: 3.2 horas - Meta: 4 horas" },
  { icon: "📱", title: "Satisfação do Cliente", description: "Satisfação com suporte: 4.8/5 - Excelente!" },
  { icon: "📱", title: "Tickets Pendentes", description: "8 tickets pendentes - 3 urgentes, 5 normais" },
  { icon: "📱", title: "Tickets Urgentes", description: "3 tickets urgentes aguardando resposta - Prioridade máxima" }
];

// Cria um array infinito repetindo as notificações
const infiniteNotifications = Array.from({ length: 10 }, () => notifications).flat();

export function AnimatedListDemo({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-[370px] w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList>
        {infiniteNotifications.map((notification, index) => (
          <div key={index} className="w-full h-[62px] bg-white border border-gray-300 rounded-lg flex items-center px-4 shadow-md">
            <div className="flex items-center gap-3 w-full">
              <span className="text-xl">{notification.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{notification.title}</p>
                <p className="text-xs text-gray-600 truncate">{notification.description}</p>
              </div>
            </div>
          </div>
        ))}
      </AnimatedList>
      
      {/* Efeito de fade-out no final */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </div>
  );
}
