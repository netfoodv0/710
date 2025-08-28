import { RouteType } from './types';
import { 
  DashboardIcon, 
  HomeIcon,
  OrderIcon, 
  HistoryIcon, 
  MenuIcon, 
  SupportIcon, 
  SettingsIcon, 
  UsersIcon, 
  ClockIcon, 
  CouponIcon, 
  FidelidadeIcon,
  ReportIcon, 
  MapIcon, 
  BagIcon,
  OrganogramaIcon
} from '../ui';
import { KDSIcon } from '../icons';


export const sidebarRoutes: RouteType[] = [

  {
    path: "/",
    element: null,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardIcon />
    }
  },
  {
    path: "/pedidos",
    element: null,
    state: "pedidos",
    sidebarProps: {
      displayText: "Pedidos",
      icon: <OrderIcon />
    }
  },
  {
    path: "/historico",
    element: null,
    state: "historico",
    sidebarProps: {
      displayText: "Histórico",
      icon: <HistoryIcon />
    }
  },
  {
    path: "/cardapio",
    element: null,
    state: "cardapio",
    sidebarProps: {
      displayText: "Cardápio",
      icon: <MenuIcon />
    }
  },
  {
    path: "/atendimento",
    element: null,
    state: "atendimento",
    sidebarProps: {
      displayText: "Atendimento",
      icon: <SupportIcon />
    }
  },
  {
    path: "/kds",
    element: null,
    state: "kds",
    sidebarProps: {
      displayText: "KDS",
      icon: <KDSIcon />
    }
  },

  {
    path: "/usuarios",
    element: null,
    state: "usuarios",
    sidebarProps: {
      displayText: "Usuários",
      icon: <UsersIcon />
    },
    child: [
      {
        path: "/usuarios/operadores",
        element: null,
        state: "usuarios.operadores",
        sidebarProps: {
          displayText: "Operadores"
        }
      },
      {
        path: "/usuarios/motoboys",
        element: null,
        state: "usuarios.motoboys",
        sidebarProps: {
          displayText: "Motoboys"
        }
      }
    ]
  },
  {
    path: "/organograma",
    element: null,
    state: "organograma",
    sidebarProps: {
      displayText: "Organograma",
      icon: <OrganogramaIcon />
    }
  },
  {
    path: "/horarios",
    element: null,
    state: "horarios",
    sidebarProps: {
      displayText: "Horários",
      icon: <ClockIcon />
    }
  },
  {
    path: "/cupons",
    element: null,
    state: "cupons",
    sidebarProps: {
      displayText: "Cupons",
      icon: <CouponIcon />
    }
  },
  {
    path: "/fidelidade",
    element: null,
    state: "fidelidade",
    sidebarProps: {
      displayText: "Fidelidade",
      icon: <FidelidadeIcon />
    }
  },
  {
    path: "/relatorios",
    element: null,
    state: "relatorios",
    sidebarProps: {
      displayText: "Relatórios",
      icon: <ReportIcon />
    },
    child: [
      {
        path: "/relatorios/geral",
        element: null,
        state: "relatorios.geral",
        sidebarProps: {
          displayText: "Geral"
        }
      },
      {
        path: "/relatorios/clientes",
        element: null,
        state: "relatorios.clientes",
        sidebarProps: {
          displayText: "Clientes"
        }
      },
      {
        path: "/relatorios/produtos",
        element: null,
        state: "relatorios.produtos",
        sidebarProps: {
          displayText: "Produtos"
        }
      }
    ]
  },
  {
    path: "/mapa",
    element: null,
    state: "mapa",
    sidebarProps: {
      displayText: "Mapa",
      icon: <MapIcon />
    }
  },
  {
    path: "/estoque",
    element: null,
    state: "estoque",
    sidebarProps: {
      displayText: "Estoque",
      icon: <BagIcon />
    },
    child: [
      {
        path: "/estoque/produtos",
        element: null,
        state: "estoque.produtos",
        sidebarProps: {
          displayText: "Produtos"
        }
      },
      {
        path: "/estoque/insumos",
        element: null,
        state: "estoque.insumos",
        sidebarProps: {
          displayText: "Insumos"
        }
      },
      {
        path: "/estoque/acompanhamentos",
        element: null,
        state: "estoque.acompanhamentos",
        sidebarProps: {
          displayText: "Acompanhamentos"
        }
      }
    ]
  },
  {
    path: "/configuracoes",
    element: null,
    state: "configuracoes",
    sidebarProps: {
      displayText: "Configurações",
      icon: <SettingsIcon />
    }
  }
];
