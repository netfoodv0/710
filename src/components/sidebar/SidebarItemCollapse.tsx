import React, { useState, useEffect } from "react";
import { ListItemButton, ListItemIcon, ListItemText, Typography, Collapse, List } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteType } from "./types";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import SidebarItem from "./SidebarItem";

type Props = {
  item: RouteType;
  isCollapsed?: boolean;
};

const SidebarItemCollapse = ({ item, isCollapsed = false }: Props) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = location.pathname.startsWith(item.path || "");

  const handleToggle = () => {
    if (isCollapsed) {
      // Se estiver colapsado e tiver subpáginas, navega para a primeira
      if (item.child && item.child.length > 0) {
        const firstChild = item.child[0];
        if (firstChild.path) {
          navigate(firstChild.path);
        }
      }
    } else {
      // Se estiver aberto, expande/colapsa normalmente
      setOpen(!open);
    }
  };

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
            paddingY: isCollapsed ? "14.5px" : "12px", // 53px quando fechado, 48px quando aberto
            paddingX: isCollapsed ? "0px" : "0px", // 0px à esquerda
            margin: "0px", // Remove margens
            backgroundColor: isActive ? "#f3f4f6" : "transparent", // Cinza claro quando ativo
            borderRight: "none", // Removida a borda roxa
            display: "flex",
            justifyContent: "space-between", // Distribui o espaço entre os elementos
            alignItems: "center",
            "& .MuiListItemIcon-root": {
              minWidth: isCollapsed ? "40px" : "40px", // Largura mínima para o ícone
              marginLeft: isCollapsed ? "24px" : "24px" // Margem à esquerda para o ícone
            }
          }}
        >
          <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <ListItemIcon>
              {renderIcon()}
            </ListItemIcon>
            
            {!isCollapsed && (
              <div style={{ overflow: "hidden", flex: 1 }}>
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
              </div>
            )}
          </div>
          
          {!isCollapsed && (
            <div style={{ marginRight: "16px" }}>
              {open ? (
                <ExpandLessOutlinedIcon />
              ) : (
                <ExpandMoreOutlinedIcon />
              )}
            </div>
          )}
        </ListItemButton>
        
        {open && !isCollapsed && (
          <div style={{ overflow: "hidden" }}>
            <Collapse in={open} timeout="auto">
              <List sx={{ padding: "0px", margin: "0px" }}>
                {item.child?.map((route, index) => (
                  route.sidebarProps ? (
                    route.child ? (
                      <SidebarItemCollapse item={route} key={index} isCollapsed={isCollapsed} />
                    ) : (
                      <SidebarItem item={route} key={index} isCollapsed={isCollapsed} />
                    )
                  ) : null
                ))}
              </List>
            </Collapse>
          </div>
        )}
      </>
    ) : null
  );
};

export default SidebarItemCollapse;
