import React, { useState, useEffect } from "react";
import { ListItemButton, ListItemIcon, ListItemText, Typography, Collapse, List } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { RouteType } from "./types";
import { motion, AnimatePresence } from "motion/react";
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
            paddingY: "12px",
            paddingX: isCollapsed ? "0px" : "0px", // 0px à esquerda
            margin: "0px", // Remove margens
            backgroundColor: isActive ? "#f3f4f6" : "transparent", // Cinza claro quando ativo
            borderRight: "none", // Removida a borda roxa
            "& .MuiListItemIcon-root": {
              minWidth: isCollapsed ? "40px" : "40px", // Largura mínima para o ícone
              marginLeft: isCollapsed ? "20px" : "24px" // Margem à esquerda para o ícone
            }
          }}
        >
          <ListItemIcon>
            {renderIcon()}
          </ListItemIcon>
          
          <AnimatePresence>
            {!isCollapsed && (
              <>
                                 <motion.div
                   initial={{ opacity: 0, width: 0, x: -10 }}
                   animate={{ opacity: 1, width: "auto", x: 0 }}
                   exit={{ opacity: 0, width: 0, x: -10 }}
                   transition={{ 
                     duration: 0.3,
                     ease: [0.4, 0.0, 0.2, 1]
                   }}
                   style={{ overflow: "hidden" }}
                 >
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
                </motion.div>
                
                <AnimatePresence>
                                     {open ? (
                     <motion.div
                       initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                       animate={{ opacity: 1, rotate: 0, scale: 1 }}
                       exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                       transition={{ 
                         duration: 0.3,
                         ease: [0.4, 0.0, 0.2, 1]
                       }}
                     >
                       <ExpandLessOutlinedIcon sx={{ marginRight: "16px" }} />
                     </motion.div>
                   ) : (
                     <motion.div
                       initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                       animate={{ opacity: 1, rotate: 0, scale: 1 }}
                       exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                       transition={{ 
                         duration: 0.3,
                         ease: [0.4, 0.0, 0.2, 1]
                       }}
                     >
                       <ExpandMoreOutlinedIcon sx={{ marginRight: "16px" }} />
                     </motion.div>
                   )}
                </AnimatePresence>
              </>
            )}
          </AnimatePresence>
        </ListItemButton>
        
        <AnimatePresence>
          {open && !isCollapsed && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>
      </>
    ) : null
  );
};

export default SidebarItemCollapse;
