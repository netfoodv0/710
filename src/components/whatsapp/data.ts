import { ConversationListData } from './types/Conversation';

export const conversations = {
  conversation_list: [
    {
      contactName: "João Silva",
      lastMessage: "Perfeito! Vou fazer o pedido agora mesmo",
      lastTime: "14:30",
      image: "avatar.jpg",
      messageHistory: [
        {
          me: false,
          message: "Olá! Gostaria de fazer um pedido"
        },
        {
          me: true,
          message: "Olá João! Claro, posso te ajudar. O que você gostaria de pedir?"
        },
        {
          me: false,
          message: "Queria um hambúrguer duplo com batata frita e refrigerante"
        },
        {
          me: true,
          message: "Excelente escolha! O hambúrguer duplo custa R$ 25,90, batata frita R$ 8,90 e refrigerante R$ 6,90. Total: R$ 41,70"
        },
        {
          me: false,
          message: "Perfeito! Vou fazer o pedido agora mesmo"
        }
      ]
    },
    {
      contactName: "Maria Santos",
      lastMessage: "Muito obrigada pelo atendimento!",
      lastTime: "13:45",
      image: "avatar2.jpg",
      messageHistory: [
        {
          me: true,
          message: "Olá Maria! Como posso ajudar?"
        },
        {
          me: false,
          message: "Oi! Queria saber se vocês fazem entrega na minha região"
        },
        {
          me: true,
          message: "Claro! Qual é o seu CEP?"
        },
        {
          me: false,
          message: "Meu CEP é 01234-567"
        },
        {
          me: true,
          message: "Perfeito! Fazemos entrega na sua região. O tempo médio é de 30-45 minutos"
        },
        {
          me: false,
          message: "Muito obrigada pelo atendimento!"
        }
      ]
    },
    {
      contactName: "Pedro Costa",
      lastMessage: "Qual o tempo de entrega?",
      lastTime: "12:20",
      image: "avatar.jpg",
      messageHistory: [
        {
          me: false,
          message: "Bom dia! Qual o tempo de entrega?"
        },
        {
          me: true,
          message: "Bom dia Pedro! O tempo médio de entrega é de 30-45 minutos, dependendo da sua localização"
        }
      ]
    },
    {
      contactName: "Ana Oliveira",
      lastMessage: "Perfeito, muito obrigada!",
      lastTime: "11:15",
      image: "avatar2.jpg",
      messageHistory: [
        {
          me: true,
          message: "Olá Ana! Bem-vinda ao nosso atendimento"
        },
        {
          me: false,
          message: "Oi! Queria fazer uma reclamação sobre meu pedido anterior"
        },
        {
          me: true,
          message: "Sinto muito pelo problema. Pode me contar o que aconteceu?"
        },
        {
          me: false,
          message: "O pedido chegou frio e com atraso"
        },
        {
          me: true,
          message: "Peço desculpas pela experiência ruim. Vou registrar sua reclamação e oferecer um desconto na próxima compra"
        },
        {
          me: false,
          message: "Perfeito, muito obrigada!"
        }
      ]
    },
    {
      contactName: "Carlos Ferreira",
      lastMessage: "Vou verificar o cardápio",
      lastTime: "10:30",
      image: "avatar3.png",
      messageHistory: [
        {
          me: false,
          message: "Bom dia! Vocês têm opções vegetarianas?"
        },
        {
          me: true,
          message: "Bom dia Carlos! Sim, temos várias opções vegetarianas no cardápio"
        },
        {
          me: false,
          message: "Vou verificar o cardápio"
        }
      ]
    },
    {
      contactName: "Fernanda Lima",
      lastMessage: "Entendi, obrigada!",
      lastTime: "09:45",
      image: "avatar2.jpg",
      messageHistory: [
        {
          me: true,
          message: "Olá Fernanda! Como posso ajudar?"
        },
        {
          me: false,
          message: "Oi! Queria saber sobre as promoções de hoje"
        },
        {
          me: true,
          message: "Claro! Hoje temos 20% de desconto em todos os hambúrgueres e 2x1 em refrigerantes"
        },
        {
          me: false,
          message: "Entendi, obrigada!"
        }
      ]
    },
    {
      contactName: "Roberto Alves",
      lastMessage: "Vou fazer o pedido",
      lastTime: "08:20",
      image: "avatar.jpg",
      messageHistory: [
        {
          me: false,
          message: "Bom dia! Queria fazer um pedido para entrega"
        },
        {
          me: true,
          message: "Bom dia Roberto! Perfeito, estou aqui para ajudar"
        },
        {
          me: false,
          message: "Vou fazer o pedido"
        }
      ]
    },
    {
      contactName: "Juliana Costa",
      lastMessage: "Perfeito! Até mais",
      lastTime: "07:30",
      image: "avatar2.jpg",
      messageHistory: [
        {
          me: true,
          message: "Olá Juliana! Como posso ajudar?"
        },
        {
          me: false,
          message: "Oi! Queria agradecer pelo ótimo atendimento ontem"
        },
        {
          me: true,
          message: "Que bom que você gostou! Ficamos felizes em ter atendido bem"
        },
        {
          me: false,
          message: "Perfeito! Até mais"
        }
      ]
    }
  ] as ConversationListData[]
};
