import { ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { RouteType } from "./types";
import React from "react";

type Props = {
  item: RouteType;
};

const SidebarItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = location.pathname === item.path;

  const handleClick = () => {
    if (item.path) {
      navigate(item.path);
    }
  };

  // Função para renderizar o ícone com a cor apropriada
  const renderIcon = () => {
    if (!item.sidebarProps?.icon) return null;
    
    // Se o ícone for um elemento React, clona com a cor apropriada
    if (React.isValidElement(item.sidebarProps.icon)) {
      return React.cloneElement(item.sidebarProps.icon, {
        color: isActive ? "#8217d5" : "#374151"
      } as any);
    }
    
    return item.sidebarProps.icon;
  };

  return (
    item.sidebarProps ? (
      <ListItemButton
        onClick={handleClick}
        sx={{
          "&:hover": {
            backgroundColor: "#f3f4f6" // Cinza claro no hover
          },
          paddingY: "12px",
          paddingX: "0px", // 0px à esquerda
          margin: "0px", // Remove margens
          backgroundColor: isActive ? "#f3f4f6" : "transparent", // Cinza claro quando ativo
          borderRight: "none", // Removida a borda roxa
          "& .MuiListItemIcon-root": {
            minWidth: "40px", // Largura mínima para o ícone
            marginLeft: "24px" // Margem à esquerda para o ícone
          }
        }}
      >
        <ListItemIcon>
          {renderIcon()}
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography
              sx={{
                color: isActive ? "#8217d5" : "#374151", // Roxo quando ativo, cinza escuro quando não
                fontWeight: isActive ? 600 : 400,
                fontSize: "14px" // Tamanho do texto 14px
              }}
            >
              {item.sidebarProps.displayText}
            </Typography>
          }
        />
      </ListItemButton>
    ) : null
  );
};

export default SidebarItem;
