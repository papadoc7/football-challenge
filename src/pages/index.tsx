import Link from "next/link";
import { Button, Typography, Container, Box } from "@mui/material";
import commonStyles from "../styles/Common.module.css";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <Container maxWidth="sm" className={`${styles.container} ${commonStyles.textCenter}`}>
      <Box mt={4}>
        <Typography variant="h3" gutterBottom>
          Welcome to the Football League App!
        </Typography>
        <Typography variant="h6" paragraph>
          Track scores, create teams/players, and view teams/players statistics with ease.
        </Typography>

        <Box mt={3}>
          <Typography variant="h5" gutterBottom>
            Menu
          </Typography>

          <Box display="flex" flexDirection="column" gap={2}>
            <Link href="/new-game" passHref>
              <Button variant="contained" color="primary" fullWidth>
                Start a New Game
              </Button>
            </Link>
            <Link href="/result" passHref>
              <Button variant="contained" color="secondary" fullWidth>
                Enter Completed Game Result
              </Button>
            </Link>
            <Link href="/create-team" passHref>
              <Button variant="outlined" color="primary" fullWidth>
                Create Teams
              </Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button variant="outlined" color="secondary" fullWidth>
                View Dashboard
              </Button>
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
