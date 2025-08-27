import { Drawer, List, Stack, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sidebarRoutes } from "./SidebarConfig";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import "./Sidebar.css";

const DesktopSidebar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/landing');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "240px",
        flexShrink: 0,
        marginLeft: "24px",
        marginTop: "16px",
        marginBottom: "16px",
        height: "calc(100vh - 32px)",
        maxHeight: "calc(100vh - 32px)",
        overflow: "hidden",
        "& .MuiDrawer-paper": {
          width: "240px",
          height: "calc(100vh - 32px)",
          maxHeight: "calc(100vh - 32px)",
          boxSizing: "border-box",
          border: "2px solid rgba(255, 255, 255, 0.5)",
          backgroundColor: "rgba(255, 255, 255, 0.6)",
          color: "#000000",
          marginLeft: "24px",
          marginTop: "16px",
          marginBottom: "16px",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
          borderBottomLeftRadius: "16px",
          borderBottomRightRadius: "16px",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column"
        }
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
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={0}
        >
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
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        ))}
      </List>
    </Drawer>
  );
};

export default DesktopSidebar;
