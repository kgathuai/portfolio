import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Logo({ onClick, size = "medium" }) {
  // Determine dimensions based on size prop
  const dimensions = {
    small: { width: 32, height: 32 },
    medium: { width: 40, height: 40 },
    large: { width: 48, height: 48 },
  }[size] || { width: 40, height: 40 };

  return (
    <Box
      component={motion.div}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      sx={{
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        src="/logo.png"
        alt="Ernest Kungu Logo"
        height={80}
        width={200}
        priority
      />
    </Box>
  );
}
