import { useState } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Container, Paper, Stack, Text, TextInput, Title } from "@mantine/core";
import { auth } from "../services/firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin", { replace: true });
    } catch (e) {
      const message = e instanceof Error ? e.message : "Login failed.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size={360} py={60}>
      <Paper withBorder p="xl" radius="md">
        <Stack gap="md">
          <Title order={1} size="h3">
            Admin Login
          </Title>
          <TextInput
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <TextInput
            label="Password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          {error ? (
            <Text size="sm" c="red.6" fw={600}>
              {error}
            </Text>
          ) : null}
          <Button color="cyan" onClick={handleSubmit} loading={loading}>
            Sign in
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
}

export default Login;
