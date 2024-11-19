import { useRouter } from "next/router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function BackLink({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.back();
  };

  return (
    <div>
      {/* MUI Button with Back Icon */}
      <Button
        onClick={handleClick}
        variant="outlined"
        startIcon={<ArrowBackIcon />}
        sx={{ marginTop: 2, marginLeft: 2 }}
      >
        Back
      </Button>
      {children}
    </div>
  );
}
