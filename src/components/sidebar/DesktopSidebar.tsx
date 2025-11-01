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
        marginLeft: "0px",
        marginTop: "0px",
        marginBottom: "0px",
        height: "100vh",
        maxHeight: "100vh",
        overflow: "hidden",
        backgroundColor: "#ffffff",
        color: "#000000",
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        borderRight: "1px solid #e5e7eb",
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
          borderBottom: "1px solid #e5e7eb",
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
          maxHeight: "calc(100vh - 73px)",
          "&::-webkit-scrollbar": {
            width: "6px"
          },
          "&::-webkit-scrollbar-track": {
            background: "#f5f5f5"
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#d1d5db",
            borderRadius: "3px"
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#9ca3af"
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
