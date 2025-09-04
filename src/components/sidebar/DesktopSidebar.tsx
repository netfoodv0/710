import { Drawer, List, Stack, Toolbar, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { sidebarRoutes } from "./SidebarConfig";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import { MenuIcon } from "../ui";
import "./Sidebar.css";

const DesktopSidebar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogoClick = () => {
    navigate('/landing');
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      style={{
        width: isOpen ? 240 : 80,
        flexShrink: 0,
        marginLeft: "24px",
        marginTop: "16px",
        marginBottom: "16px",
        height: "calc(100vh - 32px)",
        maxHeight: "calc(100vh - 32px)",
        overflow: "hidden",
        border: "2px solid rgba(255, 255, 255, 0.5)",
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        color: "#000000",
        borderTopLeftRadius: "16px",
        borderTopRightRadius: "16px",
        borderBottomLeftRadius: "16px",
        borderBottomRightRadius: "16px",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        transition: "width 0.3s ease-in-out"
      }}
    >
      {/* Cabeçalho fixo */}
      <Toolbar 
        disableGutters
        sx={{ 
          height: "73px !important",
          minHeight: "73px !important",
          maxHeight: "73px !important",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "sticky",
          top: 0,
          backgroundColor: "transparent",
          zIndex: 1,
          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
          boxSizing: "border-box",
          flexShrink: 0
        }}
      >
        <Stack
          sx={{ width: "100%" }}
          direction="row"
          alignItems="center"
          justifyContent={isOpen ? "center" : "center"}
          spacing={1}
        >
          {isOpen && (
            <div>
              <Typography 
                variant="h6" 
                onClick={handleLogoClick}
                sx={{ 
                  color: "#8217d5",
                  fontWeight: 900,
                  fontSize: "36px",
                  fontStyle: "italic",
                  cursor: "pointer",
                  "&:hover": {
                    opacity: 0.8
                  }
                }}
              >
                VOULT
              </Typography>
            </div>
          )}
          
          {/* Botão toggle */}
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: "#8217d5",
              backgroundColor: "rgba(130, 23, 213, 0.1)",
              "&:hover": {
                backgroundColor: "rgba(130, 23, 213, 0.2)"
              },
              width: 32,
              height: 32,
              marginLeft: isOpen ? 1 : 0
            }}
          >
            <MenuIcon color="#8217d5" size={20} />
          </IconButton>
        </Stack>
      </Toolbar>
      
      {/* Lista de itens da sidebar - com scroll quando necessário */}
      <List 
        disablePadding 
        sx={{ 
          flex: 1,
          overflow: "auto",
          maxHeight: "calc(100vh - 32px - 73px)",
          "&::-webkit-scrollbar": {
            width: "6px"
          },
          "&::-webkit-scrollbar-track": {
            background: "rgba(255, 255, 255, 0.6)"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255, 255, 255, 0.8)",
            borderRadius: "3px"
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "rgba(255, 255, 255, 1)"
          }
        }}
      >
        {sidebarRoutes.map((route, index) => (
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} isCollapsed={!isOpen} />
            ) : (
              <SidebarItem item={route} key={index} isCollapsed={!isOpen} />
            )
          ) : null
        ))}
      </List>
    </div>
  );
};

export default DesktopSidebar;
