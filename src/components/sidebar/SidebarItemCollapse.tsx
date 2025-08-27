import { Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { RouteType } from "./types";
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SidebarItem from "./SidebarItem";
import { useLocation } from "react-router-dom";
import React from "react";

type Props = {
  item: RouteType;
};

const SidebarItemCollapse = ({ item }: Props) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // Expandir automaticamente se estiver em uma página filha
  useEffect(() => {
    if (item.child && item.child.some(child => location.pathname.startsWith(child.path))) {
      setOpen(true);
    }
  }, [location.pathname, item.child]);

  // Verificar se o próprio item está ativo (não as páginas filhas)
  const isActive = location.pathname === item.path;

  const handleToggle = () => {
    setOpen(!open);
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
      <>
        <ListItemButton
          onClick={handleToggle}
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
              <Typography sx={{ 
                color: isActive ? "#8217d5" : "#374151", // Roxo quando ativo
                fontWeight: isActive ? 700 : 700, // Sempre bold
                fontSize: "14px" // Tamanho do texto 14px
              }}>
                {item.sidebarProps.displayText}
              </Typography>
            }
          />
          {open ? (
            <ExpandLessOutlinedIcon sx={{ marginRight: "16px" }} />
          ) : (
            <ExpandMoreOutlinedIcon sx={{ marginRight: "16px" }} />
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto">
          <List sx={{ padding: "0px", margin: "0px" }}>
            {item.child?.map((route, index) => (
              route.sidebarProps ? (
                route.child ? (
                  <SidebarItemCollapse item={route} key={index} />
                ) : (
                  <SidebarItem item={route} key={index} />
                )
              ) : null
            ))}
          </List>
        </Collapse>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;
