import React from "react";
import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { RouteType } from "./types";

type Props = {
  item: RouteType;
  isCollapsed?: boolean;
};

const SidebarItem = ({ item, isCollapsed = false }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Lógica especial para o dashboard (rota raiz)
  const isActive = item.path === "/" 
    ? location.pathname === "/" || location.pathname === "/dashboard"
    : location.pathname === item.path;

  const handleClick = () => {
    if (item.path) {
      navigate(item.path);
    }
  };

  // Função para renderizar o ícone com a cor apropriada e opacidade
  const renderIcon = () => {
    if (!item.sidebarProps?.icon) return null;
    
    // Se o ícone for um elemento React, clona com a cor apropriada e opacidade
    if (React.isValidElement(item.sidebarProps.icon)) {
      return React.cloneElement(item.sidebarProps.icon, {
        color: isActive ? "#8217d5" : "#374151",
        style: { opacity: 0.7 } // 70% de opacidade
      } as any);
    }
    
    return item.sidebarProps.icon;
  };

  return (
    item.sidebarProps ? (
      <ListItemButton
        onClick={handleClick}
        selected={isActive}
        sx={{
          "&:hover": {
            backgroundColor: "#f3f4f6" // Cinza claro no hover
          },
          paddingY: isCollapsed ? "14.5px" : "12px", // 53px quando fechado, 48px quando aberto
          paddingX: isCollapsed ? "0px" : "0px", // 0px à esquerda
          margin: "0px", // Remove margens
          backgroundColor: isActive ? "#f3f4f6" : "transparent", // Cinza claro quando ativo
          borderRight: "none", // Removida a borda roxa
          "& .MuiListItemIcon-root": {
            minWidth: isCollapsed ? "40px" : "40px", // Largura mínima para o ícone
            marginLeft: isCollapsed ? "24px" : "24px" // Margem à esquerda para o ícone
          }
        }}
      >
        <ListItemIcon>
          {renderIcon()}
        </ListItemIcon>
        
        {!isCollapsed && (
          <div style={{ overflow: "hidden" }}>
            <ListItemText
              disableTypography
              primary={
                <Typography
                  sx={{
                    color: isActive ? "#8217d5" : "#374151", // Roxo quando ativo, cinza escuro quando não
                    fontWeight: isActive ? 700 : 700, // Sempre bold
                    fontSize: "14px" // Tamanho do texto 14px
                  }}
                >
                  {item.sidebarProps.displayText}
                </Typography>
              }
            />
          </div>
        )}
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;
