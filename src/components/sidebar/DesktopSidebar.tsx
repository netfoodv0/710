import { Drawer, List, Stack, Toolbar, Typography } from "@mui/material";
import { sidebarRoutes } from "./SidebarConfig";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import "./Sidebar.css";

const DesktopSidebar = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: "240px",
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: "240px",
          boxSizing: "border-box",
          borderRight: "1px solid #e5e7eb", // Borda cinza
          backgroundColor: "#ffffff", // Fundo branco
          color: "#374151" // Texto cinza escuro
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
          backgroundColor: "#ffffff",
          zIndex: 1,
          borderBottom: "1px solid #e5e7eb",
          boxSizing: "border-box",
          "&.MuiToolbar-root": {
            height: "73px !important",
            minHeight: "73px !important"
          }
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
            sx={{ 
              color: "#8217d5",
              fontWeight: 900,
              fontSize: "36px",
              fontStyle: "italic"
            }}
          >
            VOULT
          </Typography>
        </Stack>
      </Toolbar>
      
      {/* Lista de itens da sidebar */}
      <List disablePadding>
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
