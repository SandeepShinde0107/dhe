import React from "react";
import { Box } from "@mui/material";

type Props = {
  checked: boolean;
  onChange: () => void;
};

export default function CircleToggle({ checked, onChange }: Props) {
  return (
    <Box
      onClick={onChange}
      sx={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        backgroundColor: checked ? "#0b5c60" : "#dfe4e6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: checked
          ? "0px 4px 10px rgba(0,0,0,0.15)"
          : "inset 0px 0px 6px rgba(0,0,0,0.12)",
        transition: "0.25s ease",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          backgroundColor: "#ffffff",
          position: "absolute",
          right: checked ? "6px" : "auto",
          left: checked ? "auto" : "6px",
          transition: "0.25s ease",
        }}
      />
    </Box>
  );
}
