const drawerWidth = 250;
export const styles = {
    pageContent: {
        flexGrow: 1,
        p: 3,
        background: "#f7fafc",
        minHeight: "100vh",
        padding: "30px",
        overflow:"hidden",
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        "& .MuiToolbar-root": {
            minHeight: "100px",
        }
    }
}